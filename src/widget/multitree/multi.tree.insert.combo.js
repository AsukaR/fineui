/**
 * 可以往当前选中节点下添加新值的下拉树
 * @class BI.MultiTreeInsertCombo
 * @extends BI.Single
 */

BI.MultiTreeInsertCombo = BI.inherit(BI.Single, {

    constants: {
        offset: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 25
        }
    },

    _defaultConfig: function () {
        return BI.extend(BI.MultiTreeInsertCombo.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-multi-tree-insert-combo",
            itemsCreator: BI.emptyFn,
            valueFormatter: BI.emptyFn,
            height: 24,
            allowEdit: true
        });
    },

    _init: function () {
        BI.MultiTreeInsertCombo.superclass._init.apply(this, arguments);

        var self = this, o = this.options;

        var isInit = false;
        var want2showCounter = false;

        this.storeValue = {value: o.value || {}};

        this.trigger = BI.createWidget({
            type: "bi.multi_select_trigger",
            allowEdit: o.allowEdit,
            height: o.height,
            valueFormatter: o.valueFormatter,
            // adapter: this.popup,
            masker: {
                offset: this.constants.offset
            },
            searcher: {
                type: "bi.multi_tree_searcher",
                text: o.text,
                watermark: o.watermark,
                itemsCreator: o.itemsCreator,
                popup: {
                    type: "bi.multi_tree_search_insert_pane",
                    listeners: [{
                        eventName: BI.MultiTreeSearchInsertPane.EVENT_ADD_ITEM,
                        action: function () {
                            self.storeValue.value[self.trigger.getSearcher().getKeyword()] = {};
                            self._assertShowValue();
                            // setValue以更新paras.value, 之后从search popup中拿到的就能有add的值了
                            self.combo.setValue(self.storeValue);
                            self.trigger.stopEditing();
                        }
                    }]
                }
            },
            switcher: {
                el: {
                    type: "bi.multi_tree_check_selected_button"
                },
                popup: {
                    type: "bi.multi_tree_check_pane",
                    itemsCreator: o.itemsCreator
                }
            },
            value: {value: o.value || {}}

        });

        this.combo = BI.createWidget({
            type: "bi.combo",
            toggle: false,
            container: o.container,
            el: this.trigger,
            adjustLength: 1,
            popup: {
                type: "bi.multi_tree_popup_view",
                ref: function () {
                    self.popup = this;
                    self.trigger.setAdapter(this);
                },
                listeners: [{
                    eventName: BI.MultiTreePopup.EVENT_AFTERINIT,
                    action: function () {
                        self.trigger.getCounter().adjustView();
                        isInit = true;
                        if (want2showCounter === true) {
                            showCounter();
                        }
                    }
                }, {
                    eventName: BI.MultiTreePopup.EVENT_CHANGE,
                    action: function () {
                        change = true;
                        var val = {
                            type: BI.Selection.Multi,
                            value: this.hasChecked() ? this.getValue() : {}
                        };
                        self.trigger.getSearcher().setState(val);
                        self.trigger.getCounter().setButtonChecked(val);
                        self.fireEvent(BI.MultiTreeInsertCombo.EVENT_CLICK_ITEM, self.combo.getValue());
                    }
                }, {
                    eventName: BI.MultiTreePopup.EVENT_CLICK_CONFIRM,
                    action: function () {
                        self.combo.hideView();
                    }
                }, {
                    eventName: BI.MultiTreePopup.EVENT_CLICK_CLEAR,
                    action: function () {
                        clear = true;
                        self.setValue();
                        self._defaultState();
                    }
                }],
                itemsCreator: o.itemsCreator,
                onLoaded: function () {
                    BI.nextTick(function () {
                        self.trigger.getCounter().adjustView();
                        self.trigger.getSearcher().adjustView();
                    });
                }
            },
            value: {value: o.value || {}},
            hideChecker: function (e) {
                return triggerBtn.element.find(e.target).length === 0;
            }
        });

        var change = false;
        var clear = false;          // 标识当前是否点击了清空

        var isSearching = function () {
            return self.trigger.getSearcher().isSearching();
        };

        var isPopupView = function () {
            return self.combo.isViewVisible();
        };

        this.trigger.on(BI.MultiSelectTrigger.EVENT_FOCUS, function () {
            self.fireEvent(BI.MultiTreeInsertCombo.EVENT_FOCUS);
        });
        this.trigger.on(BI.MultiSelectTrigger.EVENT_BLUR, function () {
            self.fireEvent(BI.MultiTreeInsertCombo.EVENT_BLUR);
        });

        this.trigger.on(BI.MultiSelectTrigger.EVENT_START, function () {
            self.storeValue = {value: self.combo.getValue()};
            this.setValue(self.storeValue);
        });
        this.trigger.on(BI.MultiSelectTrigger.EVENT_STOP, function () {
            self.storeValue = {value: this.getValue()};
            self.combo.setValue(self.storeValue);
            BI.nextTick(function () {
                if (isPopupView()) {
                    self.combo.populate();
                }
            });
            self.fireEvent(BI.MultiTreeInsertCombo.EVENT_STOP);
        });

        this.trigger.on(BI.MultiSelectTrigger.EVENT_SEARCHING, function () {
            self.fireEvent(BI.MultiTreeInsertCombo.EVENT_SEARCHING);
        });

        function showCounter () {
            if (isSearching()) {
                self.storeValue = {value: self.trigger.getValue()};
            } else if (isPopupView()) {
                self.storeValue = {value: self.combo.getValue()};
            }
            self.trigger.setValue(self.storeValue);
        }

        this.trigger.on(BI.MultiSelectTrigger.EVENT_BEFORE_COUNTER_POPUPVIEW, function () {
            if (want2showCounter === false) {
                want2showCounter = true;
            }
            if (isInit === true) {
                want2showCounter = null;
                showCounter();
            }
        });
        this.trigger.on(BI.MultiSelectTrigger.EVENT_TRIGGER_CLICK, function () {
            self.combo.toggle();
        });
        this.trigger.on(BI.MultiSelectTrigger.EVENT_COUNTER_CLICK, function () {
            if (!self.combo.isViewVisible()) {
                self.combo.showView();
            }
        });

        this.trigger.on(BI.MultiSelectTrigger.EVENT_CHANGE, function () {
            var checked = this.getSearcher().hasChecked();
            var val = {
                type: BI.Selection.Multi,
                value: checked ? this.getValue() : {}
            };
            this.getSearcher().setState(val);
            this.getCounter().setButtonChecked(val);
            self.fireEvent(BI.MultiTreeInsertCombo.EVENT_CLICK_ITEM, self.combo.getValue());
        });

        this.combo.on(BI.Combo.EVENT_BEFORE_POPUPVIEW, function () {
            if (isSearching()) {
                return;
            }
            if (change === true) {
                self.storeValue = {value: self.combo.getValue()};
                change = false;
            }
            self.combo.setValue(self.storeValue);
            self.populate();

        });
        this.combo.on(BI.Combo.EVENT_BEFORE_HIDEVIEW, function () {
            if (isSearching()) {
                self.trigger.stopEditing();
                self.fireEvent(BI.MultiTreeInsertCombo.EVENT_CONFIRM);
            } else {
                if (isPopupView()) {
                    self.trigger.stopEditing();
                    self.storeValue = {value: self.combo.getValue()};
                    if (clear === true) {
                        self.storeValue = {value: {}};
                    }
                    self.fireEvent(BI.MultiTreeInsertCombo.EVENT_CONFIRM);
                }
            }
            clear = false;
            change = false;
        });

        var triggerBtn = BI.createWidget({
            type: "bi.trigger_icon_button",
            width: o.height,
            height: o.height,
            cls: "multi-select-trigger-icon-button"
        });
        triggerBtn.on(BI.TriggerIconButton.EVENT_CHANGE, function () {
            self.trigger.getCounter().hideView();
            if (self.combo.isViewVisible()) {
                self.combo.hideView();
            } else {
                self.combo.showView();
            }
        });
        BI.createWidget({
            type: "bi.absolute",
            element: this,
            items: [{
                el: this.combo,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, {
                el: triggerBtn,
                right: 0,
                top: 0,
                bottom: 0
            }]
        });
    },

    _assertShowValue: function () {
        this.trigger.getSearcher().setState(this.storeValue);
        this.trigger.getCounter().setButtonChecked(this.storeValue);
    },

    _defaultState: function () {
        this.trigger.stopEditing();
        this.combo.hideView();
    },

    setValue: function (v) {
        this.storeValue.value = v || {};
        this.combo.setValue({
            value: v || {}
        });
    },

    getValue: function () {
        return BI.deepClone(this.storeValue.value);
    },

    populate: function () {
        this.combo.populate.apply(this.combo, arguments);
    }
});

BI.MultiTreeInsertCombo.EVENT_FOCUS = "EVENT_FOCUS";
BI.MultiTreeInsertCombo.EVENT_BLUR = "EVENT_BLUR";
BI.MultiTreeInsertCombo.EVENT_STOP = "EVENT_STOP";
BI.MultiTreeInsertCombo.EVENT_CLICK_ITEM = "EVENT_CLICK_ITEM";
BI.MultiTreeInsertCombo.EVENT_SEARCHING = "EVENT_SEARCHING";
BI.MultiTreeInsertCombo.EVENT_CONFIRM = "EVENT_CONFIRM";

BI.shortcut("bi.multi_tree_insert_combo", BI.MultiTreeInsertCombo);