class MonthlyReportDetails {
    public init() {
        this.calculateScrollableHeight();
        $(window).resize(() => {
            this.calculateScrollableHeight();
        });
    }

    private calculateScrollableHeight() {
        let height = ($(window).height() - 320);
        $('#modalAddMonthlyReportScrollableContent').height(height)
            .css('max-height', height + 'px');
    }

    //public addInformation(informationType: string) {
    //    let informationRow = $('.row[data-informationType]').first().clone();
    //    console.log(informationRow);
    //    $(informationRow).insertBefore($('.addInformation[data-informationType=' + informationType + ']'));
    //}
}

let monthlyReportDetails = new MonthlyReportDetails();
$(document).ready(function () {
    monthlyReportDetails.init();
});

