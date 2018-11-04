/**
 * 加号表示的组节点
 *
 * Created by GUY on 2016/1/27.
 * @class BI.MultiLayerSelectTreePlusGroupNode
 * @extends BI.NodeButton
 */
BI.MultiLayerSelectTreePlusGroupNode = BI.inherit(BI.NodeButton, {
    _defaultConfig: function () {
        var conf = BI.MultiLayerSelectTreePlusGroupNode.superclass._defaultConfig.apply(this, arguments);
        return BI.extend(conf, {
            extraCls: "bi-multilayer-select-tree-first-plus-group-node bi-list-item-active",
            layer: 0, // 第几层级
            id: "",
            pId: "",
            readonly: true,
            open: false,
            height: 24
        });
    },
    _init: function () {
        BI.MultiLayerSelectTreePlusGroupNode.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        this.node = BI.createWidget({
            type: "bi.select_tree_plus_group_node",
            cls: "bi-list-item-none",
            stopPropagation: true,
            logic: {
                dynamic: true
            },
            id: o.id,
            pId: o.pId,
            open: o.open,
            height: o.height,
            hgap: o.hgap,
            text: o.text,
            value: o.value,
            py: o.py
        });
        this.node.on(BI.Controller.EVENT_CHANGE, function (type) {
            self.setSelected(self.isSelected());
            self.fireEvent(BI.Controller.EVENT_CHANGE, arguments);
        });

        var needBlankLayers = [];
        var pNode = o.pNode;
        while (pNode) {
            if (pNode.isLastNode) {
                needBlankLayers.push(pNode.layer)
            }
            pNode = pNode.pNode;
        }

        var items = [];
        BI.count(0, o.layer, function (index) {
            items.push({
                type: "bi.layout",
                cls: BI.contains(needBlankLayers, index) ? "" : "base-line-conn-background",
                width: 12,
                height: o.height
            });
        });
        items.push(this.node);
        BI.createWidget({
            type: "bi.td",
            element: this,
            columnSize: BI.makeArray(o.layer, 12),
            items: [items]
        });
    },

    isOnce: function () {
        return true;
    },

    doRedMark: function () {
        this.node.doRedMark.apply(this.node, arguments);
    },

    unRedMark: function () {
        this.node.unRedMark.apply(this.node, arguments);
    },

    isSelected: function () {
        return this.node.isSelected();
    },

    setSelected: function (b) {
        BI.MultiLayerSelectTreePlusGroupNode.superclass.setSelected.apply(this, arguments);
        this.node.setSelected(b);
    },

    doClick: function () {
        BI.NodeButton.superclass.doClick.apply(this, arguments);
        this.node.setSelected(this.isSelected());
    },

    setOpened: function (v) {
        BI.MultiLayerSelectTreePlusGroupNode.superclass.setOpened.apply(this, arguments);
        this.node.setOpened(v);
    }
});

BI.shortcut("bi.multilayer_select_tree_plus_group_node", BI.MultiLayerSelectTreePlusGroupNode);