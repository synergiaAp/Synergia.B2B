var MonthlyReportDetails = /** @class */ (function () {
    function MonthlyReportDetails() {
    }
    MonthlyReportDetails.prototype.init = function () {
        var _this = this;
        this.calculateScrollableHeight();
        $(window).resize(function () {
            _this.calculateScrollableHeight();
        });
    };
    MonthlyReportDetails.prototype.calculateScrollableHeight = function () {
        var height = ($(window).height() - 320);
        $('#modalAddMonthlyReportScrollableContent').height(height)
            .css('max-height', height + 'px');
    };
    return MonthlyReportDetails;
}());
var monthlyReportDetails = new MonthlyReportDetails();
$(document).ready(function () {
    monthlyReportDetails.init();
});
//# sourceMappingURL=_MonthlyReportDetails.js.map