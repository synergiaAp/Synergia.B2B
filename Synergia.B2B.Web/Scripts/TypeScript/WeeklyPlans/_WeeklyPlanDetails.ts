class WeeklyPlanDetails {
    public init() {
        this.calculateScrollableHeight();
        $(window).resize(() => {
            this.calculateScrollableHeight();
        });
    }

    private calculateScrollableHeight() {
        let height = ($(window).height() - 320);
        $('#modalAddWeeklyPlanScrollableContent').height(height)
            .css('max-height', height + 'px');
    }
}

let weeklyPlanDetails = new WeeklyPlanDetails();
$(document).ready(function () {
    weeklyPlanDetails.init();
});