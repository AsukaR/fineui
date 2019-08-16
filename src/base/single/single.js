/**
 * guy
 * 这仅仅只是一个超类, 所有简单控件的基类
 * 1、类的控制，
 * 2、title的控制
 * 3、文字超过边界显示3个点
 * 4、cursor默认pointor
 * @class BI.Single
 * @extends BI.Widget
 * @abstract
 */
BI.Single = BI.inherit(BI.Widget, {
    _defaultConfig: function () {
        var conf = BI.Single.superclass._defaultConfig.apply(this, arguments);
        return BI.extend(conf, {
            _baseCls: (conf._baseCls || "") + " bi-single",
            readonly: false,
            title: null,
            warningTitle: null,
            tipType: null, // success或warning
            value: null,
            belowMouse: false   // title是否跟随鼠标
        });
    },

    _showToolTip: function (e, opt) {
        opt || (opt = {});
        var self = this, o = this.options;
        var type = this.getTipType() || (this.isEnabled() ? "success" : "warning");
        var title = type === "success" ? this.getTitle() : (this.getWarningTitle() || this.getTitle());
        if (BI.isKey(title)) {
            BI.Tooltips.show(e, this.getName(), title, type, this, opt);
            if (o.action) {
                BI.Actions.runAction(o.action, "hover", o, this);
            }
            BI.Actions.runGlobalAction("hover", o, this);
        }
    },

    _getShowTitle: function() {
        var type = this.getTipType() || (this.isEnabled() ? "success" : "warning");
        return type === "success" ? this.getTitle() : (this.getWarningTitle() || this.getTitle());
    },

    _hideTooltip: function () {
        var self = this;
        var tooltip = BI.Tooltips.get(this.getName());
        if (BI.isNotNull(tooltip)) {
            tooltip.element.fadeOut(200, function () {
                BI.Tooltips.remove(self.getName());
            });
        }
    },

    _init: function () {
        BI.Single.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        if (BI.isKey(o.title) || BI.isKey(o.warningTitle)
            || BI.isFunction(o.title) || BI.isFunction(o.warningTitle)) {
            this.enableHover({
                belowMouse: o.belowMouse,
                container: o.container
            });
        }
    },

    _clearTimeOut: function () {
        if (BI.isNotNull(this.showTimeout)) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        if (BI.isNotNull(this.hideTimeout)) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    },

    enableHover: function (opt) {
        opt || (opt = {});
        var self = this;
        if (!this._hoverBinded) {
            this.element.on("mouseenter.title" + this.getName(), function (e) {
                self._e = e;
                if (self.getTipType() === "warning" || (BI.isKey(self.getWarningTitle()) && !self.isEnabled())) {
                    self.showTimeout = BI.delay(function () {
                        if (BI.isNotNull(self.showTimeout)) {
                            self._showToolTip(self._e || e, opt);
                        }
                    }, 200);
                } else if (self.getTipType() === "success" || self.isEnabled()) {
                    self.showTimeout = BI.delay(function () {
                        if (BI.isNotNull(self.showTimeout)) {
                            self._showToolTip(self._e || e, opt);
                        }
                    }, 500);
                }
                // 如果当前控件设置了title, 那么最终显示的是当前title，而不应该是祖先的title
                BI.isKey(self._getShowTitle()) && e.stopPropagation();
            });
            this.element.on("mousemove.title" + this.getName(), function (e) {
                self._e = e;
                if (BI.isNotNull(self.showTimeout)) {
                    clearTimeout(self.showTimeout);
                    self.showTimeout = null;
                }
                if(BI.isNull(self.hideTimeout)) {
                    self.hideTimeout = BI.delay(function () {
                        if (BI.isNotNull(self.hideTimeout)) {
                            self._hideTooltip();
                        }
                    }, 500);
                }

                self.showTimeout = BI.delay(function () {
                    // DEC-5321 IE下如果回调已经进入事件队列，clearTimeout将不会起作用
                    if (BI.isNotNull(self.showTimeout)) {
                        if (BI.isNotNull(self.hideTimeout)) {
                            clearTimeout(self.hideTimeout);
                            self.hideTimeout = null;
                        }
                        self._showToolTip(self._e || e, opt);
                    }
                }, 500);
                // 如果当前控件设置了title, 那么最终显示的是当前title，而不应该是祖先的title
                BI.isKey(self._getShowTitle()) && e.stopPropagation();

            });
            this.element.on("mouseleave.title" + this.getName(), function (e) {
                self._e = null;
                self._clearTimeOut();
                self._hideTooltip();
            });
            this._hoverBinded = true;
        }
    },

    disabledHover: function () {
        // 取消hover事件
        this._clearTimeOut();
        this._hideTooltip();
        this.element.unbind("mouseenter.title" + this.getName())
            .unbind("mousemove.title" + this.getName())
            .unbind("mouseleave.title" + this.getName());
        this._hoverBinded = false;
    },

    populate: function (items) {
        this.items = items || [];
    },

    // opt: {container: '', belowMouse: false}
    setTitle: function (title, opt) {
        this.options.title = title;
        if (BI.isKey(title) || BI.isFunction(title)) {
            this.enableHover(opt);
        } else {
            this.disabledHover();
        }
    },

    setWarningTitle: function (title, opt) {
        this.options.warningTitle = title;
        if (BI.isKey(title) || BI.isFunction(title)) {
            this.enableHover(opt);
        } else {
            this.disabledHover();
        }
    },

    getTipType: function () {
        return this.options.tipType;
    },

    isReadOnly: function () {
        return !!this.options.readonly;
    },

    getTitle: function () {
        var title = this.options.title;
        if(BI.isFunction(title)) {
            return title();
        }
        return title;
    },

    getWarningTitle: function () {
        var title = this.options.warningTitle;
        if(BI.isFunction(title)) {
            return title();
        }
        return title;
    },

    setValue: function (val) {
        if (!this.options.readonly) {
            this.options.value = val;
        }
    },

    getValue: function () {
        return this.options.value;
    },

    _unMount: function () {
        BI.Single.superclass._unMount.apply(this, arguments);
        BI.Tooltips.remove(this.getName());
    }
});