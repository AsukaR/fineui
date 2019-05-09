BI.DynamicDateTrigger = BI.inherit(BI.Trigger, {
    _const: {
        hgap: 4,
        vgap: 2,
        yearLength: 4,
        yearMonthLength: 6,
        yearFullMonthLength: 7,
        compareFormat: "%Y-%X-%d"
    },

    props: {
        extraCls: "bi-date-trigger",
        min: "1900-01-01", // 最小日期
        max: "2099-12-31", // 最大日期
        height: 24,
        format: "" // 显示的日期格式化方式
    },

    _init: function () {
        BI.DynamicDateTrigger.superclass._init.apply(this, arguments);
        var self = this, o = this.options, c = this._const;
        this.storeTriggerValue = "";
        this.editor = BI.createWidget({
            type: "bi.sign_editor",
            height: o.height,
            validationChecker: function (v) {
                var formatStr = self._getStandardDateStr(v);
                var date = formatStr.match(/\d+/g);
                !BI.isKey(o.format) && self._autoAppend(v, date);
                return self._dateCheck(formatStr) && BI.checkDateLegal(formatStr) && self._checkVoid({
                    year: date[0] | 0,
                    month: date[1] | 0,
                    day: date[2] | 0
                });
            },
            quitChecker: function () {
                return false;
            },
            hgap: c.hgap,
            vgap: c.vgap,
            allowBlank: true,
            watermark: BI.i18nText("BI-Basic_Unrestricted"),
            errorText: function () {
                var str = "";
                if (!BI.isKey(o.format)) {
                    str = self.editor.isEditing() ? BI.i18nText("BI-Date_Trigger_Error_Text"): BI.i18nText("BI-Year_Trigger_Invalid_Text");
                }
                return str;
            },
            title: function () {
                var storeValue = self.storeValue || {};
                var type = storeValue.type || BI.DynamicDateCombo.Static;
                var value = storeValue.value;
                switch (type) {
                    case BI.DynamicDateCombo.Dynamic:
                        var text = self._getText(value);
                        var date = BI.getDate();
                        date = BI.DynamicDateHelper.getCalculation(value);
                        var dateStr = BI.print(date, self._getFormatString());
                        return BI.isEmptyString(text) ? dateStr : (text + ":" + dateStr);
                    case BI.DynamicDateCombo.Static:
                    default:
                        if (BI.isNull(value) || BI.isNull(value.day)) {
                            return "";
                        }
                        return BI.print(BI.getDate(value.year, (value.month - 1), value.day), self._getFormatString());
                }
            }
        });
        this.editor.on(BI.SignEditor.EVENT_KEY_DOWN, function () {
            self.fireEvent(BI.DynamicDateTrigger.EVENT_KEY_DOWN);
        });
        this.editor.on(BI.SignEditor.EVENT_FOCUS, function () {
            self.storeTriggerValue = self.getKey();
            self.fireEvent(BI.DynamicDateTrigger.EVENT_FOCUS);
        });
        this.editor.on(BI.SignEditor.EVENT_STOP, function () {
            self.fireEvent(BI.DynamicDateTrigger.EVENT_STOP);
        });
        this.editor.on(BI.SignEditor.EVENT_VALID, function () {
            self.fireEvent(BI.DynamicDateTrigger.EVENT_VALID);
        });
        this.editor.on(BI.SignEditor.EVENT_ERROR, function () {
            self.fireEvent(BI.DynamicDateTrigger.EVENT_ERROR);
        });
        this.editor.on(BI.SignEditor.EVENT_CONFIRM, function () {
            var value = self.editor.getValue();
            if (BI.isNotNull(value)) {
                self.editor.setState(value);
            }

            if (BI.isNotEmptyString(value) && !BI.isEqual(self.storeTriggerValue, self.getKey())) {
                var formatStr = self._getStandardDateStr(value);
                var date = formatStr.match(/\d+/g);
                self.storeValue = {
                    type: BI.DynamicDateCombo.Static,
                    value: {
                        year: date[0] | 0,
                        month: date[1] | 0,
                        day: date[2] | 0
                    }
                };
            }
            self.fireEvent(BI.DynamicDateTrigger.EVENT_CONFIRM);
        });
        this.editor.on(BI.SignEditor.EVENT_SPACE, function () {
            if (self.editor.isValid()) {
                self.editor.blur();
            }
        });
        this.editor.on(BI.SignEditor.EVENT_START, function () {
            self.fireEvent(BI.DynamicDateTrigger.EVENT_START);
        });
        this.editor.on(BI.SignEditor.EVENT_CHANGE, function () {
            self.fireEvent(BI.DynamicDateTrigger.EVENT_CHANGE);
        });
        BI.createWidget({
            type: "bi.htape",
            element: this,
            items: [{
                el: this.editor
            }, {
                el: BI.createWidget(),
                width: 24
            }]
        });
        this.setValue(o.value);
    },

    _getStandardDateStr: function (v) {
        var c = this._const;
        var result = [0, 1, 2];
        var formatArray = this._getFormatString().match(/%./g);
        BI.each(formatArray, function (idx, v) {
            switch (v) {
                case "%Y":
                case "%y":
                    result[0] = idx;
                    break;
                case "%X":
                case "%x":
                    result[1] = idx;
                    break;
                case "%d":
                case "%e":
                default:
                    result[2] = idx;
                    break;
            }
        });
        var dateArray = v.match(/\d+/g);
        var newArray = [];
        BI.each(dateArray, function (idx) {
            newArray[idx] = dateArray[result[idx]];
        });
        // 这边之所以不直接返回join结果是因为年的格式可能只有2位，所以需要format一下
        if(newArray.length === result.length && newArray[0].length === 2) {
            return BI.print(BI.parseDateTime(newArray.join("-"), c.compareFormat), c.compareFormat);
        }
        // 这边format成-20-也没关系, 反正都是不合法的
        return newArray.join("-");
    },

    _getFormatString: function () {
        return this.options.format || this._const.compareFormat;
    },

    _dateCheck: function (date) {
        return BI.print(BI.parseDateTime(date, "%Y-%x-%d"), "%Y-%x-%d") === date ||
            BI.print(BI.parseDateTime(date, "%Y-%X-%d"), "%Y-%X-%d") === date ||
            BI.print(BI.parseDateTime(date, "%Y-%x-%e"), "%Y-%x-%e") === date ||
            BI.print(BI.parseDateTime(date, "%Y-%X-%e"), "%Y-%X-%e") === date;
    },
    _checkVoid: function (obj) {
        return !BI.checkDateVoid(obj.year, obj.month, obj.day, this.options.min, this.options.max)[0];
    },
    _autoAppend: function (v, dateObj) {
        if (BI.isNotNull(dateObj) && BI.checkDateLegal(v)) {
            switch (v.length) {
                case this._const.yearLength:
                    if (this._yearCheck(v)) {
                        this.editor.setValue(v + "-");
                    }
                    break;
                case this._const.yearMonthLength:
                case this._const.yearFullMonthLength:
                    var splitMonth = v.split("-")[1];
                    if ((BI.isNotNull(splitMonth) && splitMonth.length === 2) || this._monthCheck(v)) {
                        this.editor.setValue(v + "-");
                    }
                    break;
            }
        }
    },

    _yearCheck: function (v) {
        var date = BI.print(BI.parseDateTime(v, this._getFormatString()), this._const.compareFormat);
        return BI.print(BI.parseDateTime(v, "%Y"), "%Y") === v && date >= this.options.min && date <= this.options.max;
    },

    _monthCheck: function (v) {
        var date = BI.parseDateTime(v, this._getFormatString());
        var dateStr = BI.print(date, this._const.compareFormat);
        return (date.getMonth() >= 0 && (BI.print(BI.parseDateTime(v, "%Y-%X"), "%Y-%X") === v ||
            BI.print(BI.parseDateTime(v, "%Y-%x"), "%Y-%x") === v)) && dateStr >= this.options.min && dateStr <= this.options.max;
    },

    _setInnerValue: function (date) {
        var dateStr = BI.print(date, this._getFormatString());
        this.editor.setState(dateStr);
        this.editor.setValue(dateStr);
    },

    _getText: function (obj) {
        var value = "";
        var endText = "";
        if(BI.isNotNull(obj.year)) {
            if(BI.parseInt(obj.year) !== 0) {
                value += Math.abs(obj.year) + BI.i18nText("BI-Basic_Year") + (obj.year < 0 ? BI.i18nText("BI-Basic_Front") : BI.i18nText("BI-Basic_Behind"));
            }
            endText = getPositionText(BI.i18nText("BI-Basic_Year"), obj.position);
        }
        if(BI.isNotNull(obj.quarter)) {
            if(BI.parseInt(obj.quarter) !== 0) {
                value += Math.abs(obj.quarter) + BI.i18nText("BI-Basic_Single_Quarter") + (obj.quarter < 0 ? BI.i18nText("BI-Basic_Front") : BI.i18nText("BI-Basic_Behind"));
            }
            endText = getPositionText(BI.i18nText("BI-Basic_Single_Quarter"), obj.position);
        }
        if(BI.isNotNull(obj.month)) {
            if(BI.parseInt(obj.month) !== 0) {
                value += Math.abs(obj.month) + BI.i18nText("BI-Basic_Month") + (obj.month < 0 ? BI.i18nText("BI-Basic_Front") : BI.i18nText("BI-Basic_Behind"));
            }
            endText = getPositionText(BI.i18nText("BI-Basic_Month"), obj.position);
        }
        if(BI.isNotNull(obj.week)) {
            if(BI.parseInt(obj.week) !== 0) {
                value += Math.abs(obj.week) + BI.i18nText("BI-Basic_Week") + (obj.week < 0 ? BI.i18nText("BI-Basic_Front") : BI.i18nText("BI-Basic_Behind"));
            }
            endText = getPositionText(BI.i18nText("BI-Basic_Week"), obj.position);
        }
        if(BI.isNotNull(obj.day)) {
            if(BI.parseInt(obj.day) !== 0) {
                value += Math.abs(obj.day) + BI.i18nText("BI-Basic_Day") + (obj.day < 0 ? BI.i18nText("BI-Basic_Front") : BI.i18nText("BI-Basic_Behind"));
            }
            endText = BI.size(obj) === 1 ? getPositionText(BI.i18nText("BI-Basic_Month"), obj.position) : "";
        }
        if(BI.isNotNull(obj.workDay) && BI.parseInt(obj.workDay) !== 0) {
            value += Math.abs(obj.workDay) + BI.i18nText("BI-Basic_Work_Day") + (obj.workDay < 0 ? BI.i18nText("BI-Basic_Front") : BI.i18nText("BI-Basic_Behind"));
        }
        return value +  endText;

        function getPositionText (baseText, position) {
            switch (position) {
                case BI.DynamicDateCard.OFFSET.BEGIN:
                    return baseText + BI.i18nText("BI-Basic_Begin_Start");
                case BI.DynamicDateCard.OFFSET.END:
                    return baseText + BI.i18nText("BI-Basic_End_Stop");
                case BI.DynamicDateCard.OFFSET.CURRENT:
                default:
                    return BI.i18nText("BI-Basic_Current_Day");
            }
        }
    },

    setValue: function (v) {
        var type, value, self = this;
        var date = BI.getDate();
        this.storeValue = v;
        if (BI.isNotNull(v)) {
            type = v.type || BI.DynamicDateCombo.Static;
            value = v.value || v;
        }
        switch (type) {
            case BI.DynamicDateCombo.Dynamic:
                var text = this._getText(value);
                date = BI.DynamicDateHelper.getCalculation(value);
                this._setInnerValue(date, text);
                break;
            case BI.DynamicDateCombo.Static:
            default:
                if (BI.isNull(value) || BI.isNull(value.day)) {
                    this.editor.setState("");
                    this.editor.setValue("");
                } else {
                    var dateStr = BI.print(BI.getDate(value.year, (value.month - 1), value.day), this._getFormatString());
                    this.editor.setState(dateStr);
                    this.editor.setValue(dateStr);
                }
                break;
        }
    },

    getKey: function () {
        return this.editor.getValue();
    },
    getValue: function () {
        return this.storeValue;
    }

});

BI.DynamicDateTrigger.EVENT_FOCUS = "EVENT_FOCUS";
BI.DynamicDateTrigger.EVENT_START = "EVENT_START";
BI.DynamicDateTrigger.EVENT_STOP = "EVENT_STOP";
BI.DynamicDateTrigger.EVENT_CONFIRM = "EVENT_CONFIRM";
BI.DynamicDateTrigger.EVENT_CHANGE = "EVENT_CHANGE";
BI.DynamicDateTrigger.EVENT_VALID = "EVENT_VALID";
BI.DynamicDateTrigger.EVENT_ERROR = "EVENT_ERROR";
BI.DynamicDateTrigger.EVENT_TRIGGER_CLICK = "EVENT_TRIGGER_CLICK";
BI.DynamicDateTrigger.EVENT_KEY_DOWN = "EVENT_KEY_DOWN";
BI.shortcut("bi.dynamic_date_trigger", BI.DynamicDateTrigger);
