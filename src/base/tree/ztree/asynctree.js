/**
 * guy
 * 同步树
 * @class BI.AsyncTree
 * @extends BI.TreeView
 */
BI.AsyncTree = BI.inherit(BI.TreeView, {
    _defaultConfig: function () {
        return BI.extend(BI.AsyncTree.superclass._defaultConfig.apply(this, arguments), {});
    },
    _init: function () {
        BI.AsyncTree.superclass._init.apply(this, arguments);
    },

    // 配置属性
    _configSetting: function () {
        var paras = this.options.paras;
        var self = this;
        var setting = {
            async: {
                enable: false,  // 很明显这棵树把异步请求关掉了，所有的异步请求都是手动控制的
                otherParam: BI.cjkEncodeDO(paras)
            },
            check: {
                enable: true
            },
            data: {
                key: {
                    title: "title",
                    name: "text"
                },
                simpleData: {
                    enable: true
                }
            },
            view: {
                showIcon: false,
                expandSpeed: "",
                nameIsHTML: true,
                dblClickExpand: false
            },
            callback: {
                beforeCheck: beforeCheck,
                onCheck: onCheck,
                beforeExpand: beforeExpand,
                onExpand: onExpand,
                onCollapse: onCollapse,
                onClick: onClick
            }
        };

        function onClick (event, treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj(treeId);
            // 当前点击节点的状态是半选，且为true_part, 则将其改为false_part,使得点击半选后切换到的是全选
            var checked = treeNode.checked;
            var status = treeNode.getCheckStatus();
            if(status.half === true && status.checked === true) {
                checked = false;
            }
            zTree.checkNode(treeNode, !checked, true, true);
        }

        function beforeCheck (treeId, treeNode) {
            treeNode.halfCheck = false;
            if (treeNode.checked === true) {
                // 将展开的节点halfCheck设为false，解决展开节点存在halfCheck=true的情况 guy
                // 所有的半选状态都需要取消halfCheck=true的情况
                function track (children) {
                    BI.each(children, function (i, ch) {
                        if (ch.halfCheck === true) {
                            ch.halfCheck = false;
                            track(ch.children);
                        }
                    });
                }

                track(treeNode.children);

                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var nodes = treeObj.getSelectedNodes();
                BI.each(nodes, function (index, node) {
                    node.halfCheck = false;
                });
            }
            var status = treeNode.getCheckStatus();
            // 当前点击节点的状态是半选，且为true_part, 则将其改为false_part,使得点击半选后切换到的是全选
            if(status.half === true && status.checked === true) {
                treeNode.checked = false;
            }
        }

        function beforeExpand (treeId, treeNode) {
            self._beforeExpandNode(treeId, treeNode);
        }

        function onCheck (event, treeId, treeNode) {
            self._selectTreeNode(treeId, treeNode);
        }

        function onExpand (event, treeId, treeNode) {
            treeNode.halfCheck = false;
        }

        function onCollapse (event, treeId, treeNode) {
            treeNode.halfCheck = false;
        }

        return setting;
    },

    // 用来更新this.options.paras.selectedValues, 和ztree内部无关
    _selectTreeNode: function (treeId, treeNode) {
        var self = this, o = this.options;
        var parentValues = BI.deepClone(treeNode.parentValues || self._getParentValues(treeNode));
        var name = this._getNodeValue(treeNode);
        //        var values = parentValues.concat([name]);
        if (treeNode.checked === true) {
        } else {
            var tNode = treeNode;
            var pNode = this._getTree(this.options.paras.selectedValues, parentValues);
            if (BI.isNotNull(pNode[name])) {
                delete pNode[name];
            }
            while (tNode != null && BI.isEmpty(pNode)) {
                parentValues = parentValues.slice(0, parentValues.length - 1);
                tNode = tNode.getParentNode();
                if (tNode != null) {
                    pNode = this._getTree(this.options.paras.selectedValues, parentValues);
                    name = this._getNodeValue(tNode);
                    delete pNode[name];
                }
            }
        }
        BI.AsyncTree.superclass._selectTreeNode.apply(self, arguments);
    },

    // 展开节点
    _beforeExpandNode: function (treeId, treeNode) {
        var self = this, o = this.options;
        var parentValues = treeNode.parentValues || self._getParentValues(treeNode);
        var op = BI.extend({}, o.paras, {
            id: treeNode.id,
            times: 1,
            parentValues: parentValues.concat(this._getNodeValue(treeNode)),
            checkState: treeNode.getCheckStatus()
        });
        var complete = function (d) {
            var nodes = d.items || [];
            if (nodes.length > 0) {
                callback(self._dealWidthNodes(nodes), !!d.hasNext);
            }
        };
        var times = 1;

        function callback (nodes, hasNext) {
            self.nodes.addNodes(treeNode, nodes);
            // 展开节点是没有分页的
            if (hasNext === true) {
                BI.delay(function () {
                    times++;
                    op.times = times;
                    o.itemsCreator(op, complete);
                }, 100);
            }
        }

        if (!treeNode.children) {
            setTimeout(function () {
                o.itemsCreator(op, complete);
            }, 17);
        }
    },

    // a,b 两棵树
    // a->b b->a 做两次校验, 构造一个校验后的map
    // e.g. 以a为基准，如果b没有此节点，则在map中添加。 如b有,且是全选的, 则在map中构造全选（为什么不添加a的值呢？ 因为这次是取并集）, 如果b中也有和a一样的存值，就递归
    _join: function (valueA, valueB) {
        var self = this;
        var map = {};
        track([], valueA, valueB);
        track([], valueB, valueA);
        function track (parent, node, compare) {
            BI.each(node, function (n, item) {
                if (BI.isNull(compare[n])) {
                    self._addTreeNode(map, parent, n, item);
                } else if (BI.isEmpty(compare[n])) {
                    self._addTreeNode(map, parent, n, {});
                } else {
                    track(parent.concat([n]), node[n], compare[n]);
                }
            });
        }

        return map;
    },

    hasChecked: function () {
        return !BI.isEmpty(this.options.paras.selectedValues) || BI.AsyncTree.superclass.hasChecked.apply(this, arguments);
    },

    getValue: function () {
        if (!this.nodes) {
            return {};
        }
        var checkedValues = this._getSelectedValues();
        if (BI.isEmpty(checkedValues)) {
            return BI.deepClone(this.options.paras.selectedValues);
        }
        if (BI.isEmpty(this.options.paras.selectedValues)) {
            return checkedValues;
        }
        return this._join(checkedValues, this.options.paras.selectedValues);
    },

    // 生成树方法
    stroke: function (config) {
        delete this.options.keyword;
        BI.extend(this.options.paras, config);
        var setting = this._configSetting();
        this._initTree(setting);
    }
});

BI.shortcut("bi.async_tree", BI.AsyncTree);