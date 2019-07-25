/**
 * 文字trigger
 *
 * Created by GUY on 2015/9/15.
 * @class BI.IconTextTrigger
 * @extends BI.Trigger
 */
BI.IconTextTrigger = BI.inherit(BI.Trigger, {
    _const: {
        hgap: 4
    },

    _defaultConfig: function () {
        var conf = BI.IconTextTrigger.superclass._defaultConfig.apply(this, arguments);
        return BI.extend(conf, {
            baseCls: (conf.baseCls || "") + " bi-text-trigger",
            height: 24,
            iconHeight: null,
            iconWidth: null,
            textCls: ""
        });
    },

    _init: function () {
        BI.IconTextTrigger.superclass._init.apply(this, arguments);
        var self = this, o = this.options, c = this._const;
        this.text = BI.createWidget({
            type: "bi.label",
            cls: "select-text-label" + (BI.isKey(o.textCls) ? (" " + o.textCls) : ""),
            textAlign: "left",
            height: o.height,
            text: o.text
        });
        this.trigerButton = BI.createWidget({
            type: "bi.trigger_icon_button",
            width: o.triggerWidth || o.height
        });

        BI.createWidget({
            element: this,
            type: "bi.htape",
            ref: function (_ref) {
                self.wrapper = _ref;
            },
            items: [{
                el: {
                    type: "bi.icon_change_button",
                    cls: "icon-combo-trigger-icon",
                    iconCls: o.iconCls,
                    ref: function (_ref) {
                        self.icon = _ref;
                    },
                    iconHeight: o.iconHeight,
                    iconWidth: o.iconWidth,
                    disableSelected: true
                },
                width: BI.isEmptyString(o.iconCls) ? 0 : (o.iconWrapperWidth || o.height)
            },
            {
                el: this.text,
                lgap: BI.isEmptyString(o.iconCls) ? 5 : 0
            }, {
                el: this.trigerButton,
                width: o.triggerWidth || o.height
            }
            ]
        });
    },

    setValue: function (value) {
        this.text.setValue(value);
    },

    setIcon: function (iconCls) {
        var o = this.options;
        this.icon.setIcon(iconCls);
        var iconItem = this.wrapper.attr("items")[0];
        var textItem = this.wrapper.attr("items")[1];
        if(BI.isNull(iconCls) || BI.isEmptyString(iconCls)) {
            if(iconItem.width !== 0) {
                iconItem.width = 0;
                textItem.lgap = 5;
                this.wrapper.resize();
            }
        }else{
            if(iconItem.width !== (o.iconWrapperWidth || o.height)) {
                iconItem.width = (o.iconWrapperWidth || o.height);
                textItem.lgap = 0;
                this.wrapper.resize();
            }
        }
    },

    setTextCls: function(cls) {
        var o = this.options;
        this.text.element.removeClass(o.textCls).addClass(cls);
    },

    setText: function (text) {
        this.text.setText(text);
    }
});
BI.shortcut("bi.icon_text_trigger", BI.IconTextTrigger);