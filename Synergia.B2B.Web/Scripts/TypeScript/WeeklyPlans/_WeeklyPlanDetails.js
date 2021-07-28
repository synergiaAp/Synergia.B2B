var WeeklyPlanDetails = /** @class */ (function () {
    function WeeklyPlanDetails() {
    }
    WeeklyPlanDetails.prototype.init = function () {
        var _this = this;
        this.calculateScrollableHeight();
        $(window).resize(function () {
            _this.calculateScrollableHeight();
        });
    };
    WeeklyPlanDetails.prototype.calculateScrollableHeight = function () {
        var height = ($(window).height() - 320);
        $('#modalAddWeeklyPlanScrollableContent').height(height)
            .css('max-height', height + 'px');
    };
    return WeeklyPlanDetails;
}());
var weeklyPlanDetails = new WeeklyPlanDetails();
$(document).ready(function () {
    weeklyPlanDetails.init();
});
//# sourceMappingURL=_WeeklyPlanDetails.js.map