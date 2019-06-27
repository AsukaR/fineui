/**
 * guy
 * 复选框item
 * @type {*|void|Object}
 */
BI.LastTreeLeafItem = BI.inherit(BI.BasicButton, {
    _defaultConfig: function () {
        return BI.extend(BI.LastTreeLeafItem.superclass._defaultConfig.apply(this, arguments), {
            extraCls: "bi-last-tree-leaf-item bi-list-item-active",
            logic: {
                dynamic: false
            },
            id: "",
            pId: "",
            layer: 0,
            height: 30
        });
    },
    _init: function () {
        BI.LastTreeLeafItem.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        this.checkbox = BI.createWidget({
            type: "bi.checkbox"
        });
        this.text = BI.createWidget({
            type: "bi.label",
            textAlign: "left",
            whiteSpace: "nowrap",
            textHeight: o.height,
            height: o.height,
            hgap: o.hgap,
            text: o.text,
            value: o.value,
            py: o.py,
            keyword: o.keyword
        });
        this.checkbox.on(BI.Controller.EVENT_CHANGE, function (type) {
            if (type === BI.Events.CLICK) {
                self.setSelected(self.isSelected());
            }
            self.fireEvent(BI.Controller.EVENT_CHANGE, arguments);
        });
        var type = BI.LogicFactory.createLogicTypeByDirection(BI.Direction.Left);
        var items = BI.LogicFactory.createLogicItemsByDirection(BI.Direction.Left, ((o.layer === 0) ? "" : {
            width: 15,
            el: {
                type: "bi.layout",
                cls: (o.pNode && o.pNode.isLastNode) ? "" : "base-line-conn-background",
                width: 15,
                height: o.height
            }
        }), {
            width: 30,
            el: {
                type: "bi.layout",
                cls: "last-line-conn-background",
                width: 30,
                height: o.height
            }
        }, {
            el: this.text
        });
        BI.createWidget(BI.extend({
            element: this
        }, BI.LogicFactory.createLogic(type, BI.extend(o.logic, {
            items: items
        }))));
    },

    doRedMark: function () {
        this.text.doRedMark.apply(this.text, arguments);
    },

    unRedMark: function () {
        this.text.unRedMark.apply(this.text, arguments);
    },

    doHighLight: function () {
        this.text.doHighLight.apply(this.text, arguments);
    },

    unHighLight: function () {
        this.text.unHighLight.apply(this.text, arguments);
    },

    getId: function () {
        return this.options.id;
    },

    getPId: function () {
        return this.options.pId;
    },

    doClick: function () {
        BI.LastTreeLeafItem.superclass.doClick.apply(this, arguments);
        //    this.checkbox.setSelected(this.isSelected());
    },

    setSelected: function (v) {
        BI.LastTreeLeafItem.superclass.setSelected.apply(this, arguments);
        //    this.checkbox.setSelected(v);
    }
});

BI.shortcut("bi.last_tree_leaf_item", BI.LastTreeLeafItem);