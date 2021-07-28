var HoodSelectionDetails = /** @class */ (function () {
    function HoodSelectionDetails() {
        this.typeControl = $('#Type');
        this.filtersControl = $('#Filters');
    }
    HoodSelectionDetails.prototype.init = function () {
        var _this = this;
        this.setUpFormControls();
        this.typeControl.change(function () {
            _this.setUpFormControls();
        });
        this.filtersControl.change(function () {
            _this.setUpFormControls();
        });
    };
    HoodSelectionDetails.prototype.setUpFormControls = function () {
        this.typeValue = this.typeControl.val();
        this.setUpFilters();
    };
    HoodSelectionDetails.prototype.setUpFilters = function () {
        this.filtersValue = this.filtersControl.val();
        var items = [];
        if (this.typeValue != 'JSKI' && this.typeValue != 'JKI') {
            items.push('JCE', 'JFF5', 'JFF8', 'UV', 'Turbo', 'UV-Turbo');
            if (this.typeValue == 'JLI-R' || this.typeValue == 'JLI-S') {
                items.push('Brak');
            }
        }
        this.filtersControl.empty();
        for (var i = 0; i < items.length; i++) {
            this.filtersControl.append('<option>' + items[i] + '</option>');
        }
        this.filtersControl.attr('disabled', items.length == 0);
        if ($.inArray(this.filtersValue, items) >= 0) {
            this.filtersControl.val(this.filtersValue);
        }
        else {
            this.filtersValue = this.filtersControl.val();
        }
    };
    return HoodSelectionDetails;
}());
var hoodSelectionDetails = new HoodSelectionDetails();
$(document).ready(function () {
    hoodSelectionDetails.init();
});
//# sourceMappingURL=HoodSelectionDetails.js.map