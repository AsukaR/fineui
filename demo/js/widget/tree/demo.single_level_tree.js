/**
 * Created by Dailer on 2017/7/26.
 */


Demo.SingleLevelTree = BI.inherit(BI.Widget, {

    render: function () {
        var self = this;
        var tree = BI.createWidget({
            type: "bi.single_level_tree",
            items: BI.deepClone(Demo.CONSTANTS.LEVELTREE),
            value: "11"
        });

        return {
            type: "bi.vtape",
            items: [{
                el: tree
            }, {
                el: {
                    type: "bi.button",
                    height: 25,
                    text: "getValue",
                    handler: function () {
                        BI.Msg.alert("", "我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本我是一段文本一短文本");
                    }
                },
                height: 25
            }, {
                el: {
                    type: "bi.button",
                    height: 25,
                    text: "setValue (第二级文件1)",
                    handler: function () {
                        tree.setValue(["2"]);
                    }
                },
                height: 25
            }],
            width: 500,
            hgap: 300
        };
    }
});

BI.shortcut("demo.single_level_tree", Demo.SingleLevelTree);