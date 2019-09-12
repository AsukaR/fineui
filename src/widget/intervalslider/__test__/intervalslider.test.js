/**
 * @author windy
 * @version 2.0
 * Created by windy on 2019/9/12
 */
describe("intervalSlider", function () {

    /**
     * test_author_windy
     */
    it("defaultValue", function (done) {
        var intervalSliderLabel = BI.Test.createWidget({
            type: "bi.interval_slider",
            width: 300,
            unit: "px",
            cls: "layout-bg-white",
            digit: 1
        });
        intervalSliderLabel.setMinAndMax({
            min: 0,
            max: 120
        });
        intervalSliderLabel.setValue({
            min: 10,
            max: 120
        });
        intervalSliderLabel.populate();
        BI.nextTick(function () {
            expect(intervalSliderLabel.element.find(".sign-editor-text").get(0).innerHTML).to.equal("10.0px");
            expect(intervalSliderLabel.element.find(".sign-editor-text").get(1).innerHTML).to.equal("120.0px");
            intervalSliderLabel.destroy();
            done();
        });
    });

});