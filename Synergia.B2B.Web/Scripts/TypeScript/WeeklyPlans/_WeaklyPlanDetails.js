var WeaklyPlanDetails = /** @class */ (function () {
    function WeaklyPlanDetails() {
    }
    WeaklyPlanDetails.prototype.init = function () {
        var _this = this;
        this.calculateScrollableHeight();
        $(window).resize(function () {
            _this.calculateScrollableHeight();
        });
    };
    WeaklyPlanDetails.prototype.calculateScrollableHeight = function () {
        var height = ($(window).height() - 320);
        $('#modalAddWeaklyPlanScrollableContent').height(height)
            .css('max-height', height + 'px');
    };
    return WeaklyPlanDetails;
}());
var weaklyPlanDetails = new WeaklyPlanDetails();
$(document).ready(function () {
    weaklyPlanDetails.init();
});
//# sourceMappingURL=_WeaklyPlanDetails.js.map