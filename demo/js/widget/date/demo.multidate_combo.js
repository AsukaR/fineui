/**
 * Created by Dailer on 2017/7/11.
 */
Demo.Date = BI.inherit(BI.Widget, {
    props: {
        baseCls: "demo-date"
    },

    _init: function () {
        Demo.Date.superclass._init.apply(this, arguments);
    },

    render: function () {
        var self = this;
        return {
            type: "bi.horizontal_auto",
            vgap: 20,
            items: [{
                type: "bi.dynamic_date_combo",
                ref: function () {
                    self.datecombo = this;
                },
                width: 300,
                // allowEdit: false,
                // format: "%Y-%X-%d", // yyyy-MM-dd
                // format: "%Y/%X/%d", // yyyy/MM/dd
                // format: "%Y-%x-%e",  // yyyy-M-d
                // format: "%Y/%x/%e",  // yyyy/M/d
                // format: "%X/%d/%Y",  // MM/dd/yyyy
                // format: "%X/%e/%y",  // MM/d/yy
                // format: "%X.%d.%Y",  // MM.dd.yyyy
                // format: "%X.%e.%Y",  // MM.d.yyyy
                // format: "%X-%e-%y",  // MM.d.yyyy
                value: {
                    type: 1,
                    value: {
                        year: 2018,
                        month: 2,
                        day: 23
                    }
                }
            }, {
                type: "bi.button",
                text: "getValue",
                width: 300,
                handler: function () {
                    BI.Msg.alert("date", JSON.stringify(self.datecombo.getValue()));
                }
            }, {
                type: "bi.dynamic_date_time_combo",
                ref: function () {
                    self.datetimecombo = this;
                },
                width: 300,
                // allowEdit: false,
                // format: "%Y-%X-%d %H:%M:%S", // yyyy-MM-dd HH:mm:ss
                // format: "%Y/%X/%d %H:%M:%S", // yyyy/MM/dd HH:mm:ss
                // format: "%Y-%X-%d %I:%M:%S",  // yyyy-MM-dd hh:mm:ss
                // format: "%Y/%X/%d %I:%M:%S",  // yyyy/MM/dd hh:mm:ss
                // format: "%Y-%X-%d %H:%M:%S %p",  // yyyy-MM-dd HH:mm:ss a
                // format: "Y/%X/%d %H:%M:%S %p",  // yyyy/MM/dd HH:mm:ss a
                // format: "%Y-%X-%d %I:%M:%S %p",  // yyyy-MM-dd hh:mm:ss a
                // format: "%Y/%X/%d %I:%M:%S %p",  // yyyy/MM/dd hh:mm:ss a
                // format: "%X/%d/%Y %I:%M:%S",  // MM/dd/yyyy hh:mm:ss
                // format: "%X/%d/%Y %H:%M:%S",  // MM/dd/yyyy HH:mm:ss
                // format: "%X/%d/%Y %I:%M:%S",  // MM/dd/yyyy hh:mm:ss a
                // format: "%X/%d/%Y %H:%M:%S %p",  // MM/dd/yyyy HH:mm:ss a
                // format: "%X/%d/%Y %I:%M:%S %p",  // MM/dd/yyyy hh:mm:ss a
                // format: "%X/%d/%Y %H:%M:%S %p",  // MM/dd/yyyy HH:mm:ss a
                // format: "%X/%d/%Y %l:%M %p",  // MM/dd/yyyy h:mm a
                // format: "%X-%d-%Y %k:%M %p",  // MM/dd/yyyy H:mm a
                // format: "%Y-%x-%e %l:%M",  // yyyy-M-d h:mm
                // format: "%Y-%x-%e %k:%M",  // yyyy-M-d H:mm
                value: {
                    type: 1,
                    value: {
                        year: 2018,
                        month: 2,
                        day: 23
                    }
                }
            }, {
                type: "bi.button",
                text: "getValue",
                width: 300,
                handler: function () {
                    BI.Msg.alert("date", JSON.stringify(self.datetimecombo.getValue()));
                }
            }, {
                type: "bi.button",
                text: "setValue '2017-12-31'",
                width: 300,
                handler: function () {
                    self.datecombo.setValue({
                        year: 2017,
                        month: 11,
                        day: 31
                    });
                }
            }]
        };
    }
});

BI.shortcut("demo.multidate_combo", Demo.Date);