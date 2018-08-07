/**
 * @class BI.SelectTreeCombo
 * @extends BI.Widget
 */
BI.SelectTreeCombo = BI.inherit(BI.Widget, {

    _defaultConfig: function () {
        return BI.extend(BI.SelectTreeCombo.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-select-tree-combo",
            height: 30,
            text: "",
            items: [],
            value: "",
            attributes: {
                tabIndex: 0
            }
        });
    },

    _init: function () {
        BI.SelectTreeCombo.superclass._init.apply(this, arguments);
        var self = this, o = this.options;

        this.trigger = BI.createWidget({
            type: "bi.single_tree_trigger",
            text: o.text,
            height: o.height,
            items: o.items,
            value: o.value
        });

        this.popup = BI.createWidget({
            type: "bi.select_level_tree",
            items: o.items,
            value: o.value
        });

        this.combo = BI.createWidget({
            type: "bi.combo",
            container: o.container,
            element: this,
            adjustLength: 2,
            el: this.trigger,
            popup: {
                el: this.popup
            }
        });

        this.combo.on(BI.Controller.EVENT_CHANGE, function () {
            self.fireEvent(BI.Controller.EVENT_CHANGE, arguments);
        });

        this.popup.on(BI.SingleTreePopup.EVENT_CHANGE, function () {
            self.setValue(self.popup.getValue());
            self.combo.hideView();
        });
    },

    setValue: function (v) {
        v = BI.isArray(v) ? v : [v];
        this.trigger.setValue(v);
        this.popup.setValue(v);
    },

    getValue: function () {
        return this.popup.getValue();
    },

    populate: function (items) {
        this.combo.populate(items);
    }
});


BI.shortcut("bi.select_tree_combo", BI.SelectTreeCombo);