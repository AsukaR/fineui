/**
 *自适应水平和垂直方向都居中容器
 * Created by GUY on 2016/12/2.
 *
 * @class BI.FlexVerticalCenter
 * @extends BI.Layout
 */
BI.FlexWrapperHorizontalCenter = BI.inherit(BI.Layout, {
    props: function () {
        return BI.extend(BI.FlexWrapperHorizontalCenter.superclass.props.apply(this, arguments), {
            baseCls: "bi-flex-scrollable-vertical-center-adapt-layout clearfix",
            verticalAlign: BI.VerticalAlign.Top,
            rowSize: [],
            scrollable: true,
            scrolly: false,
            hgap: 0,
            vgap: 0,
            lgap: 0,
            rgap: 0,
            tgap: 0,
            bgap: 0
        });
    },
    render: function () {
        var self = this, o = this.options;
        return {
            type: "bi.flex_scrollable_vertical",
            ref: function (_ref) {
                self.wrapper = _ref;
            },
            horizontalAlign: BI.HorizontalAlign.Center,
            verticalAlign: o.verticalAlign,
            rowSize: o.rowSize,
            scrollx: o.scrollx,
            scrolly: o.scrolly,
            scrollable: o.scrollable,
            hgap: o.hgap,
            vgap: o.vgap,
            tgap: o.tgap,
            bgap: o.bgap,
            items: o.items
        };
    },

    update: function (opt) {
        return this.wrapper.update(opt);
    },

    populate: function (items) {
        this.wrapper.populate(items);
    }
});
BI.shortcut("bi.flex_scrollable_horizontal_adapt", BI.FlexWrapperHorizontalCenter);
BI.shortcut("bi.flex_scrollable_horizontal_center_adapt", BI.FlexWrapperHorizontalCenter);