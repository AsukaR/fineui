/**
 * 单选输入框
 * Created by guy on 15/11/3.
 * @class BI.SingleSelectEditor
 * @extends Widget
 */
BI.SingleSelectEditor = BI.inherit(BI.Widget, {

    _defaultConfig: function () {
        return BI.extend(BI.SingleSelectEditor.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-single-select-editor",
            el: {}
        });
    },

    _init: function () {
        BI.SingleSelectEditor.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        this.editor = BI.createWidget(o.el, {
            type: "bi.state_editor",
            element: this,
            height: o.height,
            watermark: BI.i18nText("BI-Basic_Search"),
            allowBlank: true,
            value: o.value,
            text: o.text
        });

        this.editor.on(BI.Controller.EVENT_CHANGE, function () {
            self.fireEvent(BI.Controller.EVENT_CHANGE, arguments);
        });

        this.editor.on(BI.StateEditor.EVENT_PAUSE, function () {
            self.fireEvent(BI.SingleSelectEditor.EVENT_PAUSE);
        });
        this.editor.on(BI.StateEditor.EVENT_FOCUS, function () {
            self.fireEvent(BI.SingleSelectEditor.EVENT_FOCUS);
        });
        this.editor.on(BI.StateEditor.EVENT_BLUR, function () {
            self.fireEvent(BI.SingleSelectEditor.EVENT_BLUR);
        });
    },

    focus: function () {
        this.editor.focus();
    },

    blur: function () {
        this.editor.blur();
    },

    setState: function (state) {
        this.editor.setState(state);
    },

    setValue: function (v) {
        this.editor.setValue(v);
    },

    getValue: function () {
        var v = this.editor.getState();
        if (BI.isArray(v) && v.length > 0) {
            return v[v.length - 1];
        }
        return "";

    },

    getKeywords: function () {
        var val = this.editor.getLastChangedValue();
        var keywords = val.match(/[\S]+/g);
        if (BI.isEndWithBlank(val)) {
            return keywords.concat([" "]);
        }
        return keywords;
    },

    populate: function (items) {

    }
});

BI.SingleSelectEditor.EVENT_FOCUS = "EVENT_FOCUS";
BI.SingleSelectEditor.EVENT_BLUR = "EVENT_BLUR";
BI.SingleSelectEditor.EVENT_PAUSE = "EVENT_PAUSE";
BI.shortcut("bi.single_select_editor", BI.SingleSelectEditor);