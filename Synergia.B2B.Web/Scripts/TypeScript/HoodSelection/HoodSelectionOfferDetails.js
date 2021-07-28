var HoodSelectionOfferDetails = /** @class */ (function () {
    function HoodSelectionOfferDetails() {
        this.canChangeExhaustCount = false;
        this.canChangeExhaustStreamAccepted = false;
    }
    HoodSelectionOfferDetails.prototype.init = function () {
        var _this = this;
        this.hoodNrControl = $('#HoodNr');
        this.typeControl = $('#Type');
        this.filtersControl = $('#Filters');
        this.lengthControl = $('#Length');
        this.lengthAdditionalValueControl = $('#LengthAdditionalValue');
        this.widthControl = $('#Width');
        this.widthAdditionalValueControl = $('#WidthAdditionalValue');
        this.heightControl = $('#Height');
        this.heightAdditionalValueControl = $('#HeightAdditionalValue');
        this.ventilatorCountControl = $('#VentilatorCount');
        this.wiresCountControl = $('#WiresCount');
        this.ventilatorDiameterControl = $('#VentilatorDiameter');
        this.ventilatorDiameterAdditionalValueControl = $('#VentilatorDiameterAdditionalValue');
        this.exhaustCountControl = $('#ExhaustCount');
        this.exhaustDiameterControl = $('#ExhaustDiameter');
        this.exhaustDiameterAdditionalValueControl = $('#ExhaustDiameterAdditionalValue');
        this.ventilatorStreamControl = $('#VentilatorStream');
        this.exhaustStreamAcceptedControl = $('#ExhaustStreamAccepted');
        this.exhaustStreamCalculatedControl = $('#ExhaustStreamCalculated');
        this.filterAcceptedControl = $('#FilterAccepted');
        this.exhaustCountAdditionalValueControl = $('#ExhaustCountAdditionalValue');
        this.filterAcceptedAdditionalValueControl = $('#FilterAcceptedAdditionalValue');
        this.exhaustStreamAcceptedAdditionalValueControl = $('#ExhaustStreamAcceptedAdditionalValue');
        this.ventilatorDiameterInfoControl = $('#VentilatorDiameterInfo');
        this.exhaustCountInfoControl = $('#ExhaustCountInfo');
        this.exhaustCountAdditionalValueInfoControl = $('#ExhaustCountAdditionalValueInfo');
        this.setUpFormControls();
        this.typeControl.change(function () {
            _this.setUpFormControls();
        });
        this.filtersControl.change(function () {
            _this.canChangeExhaustCount = true;
            _this.setUpFormControls();
        });
        this.lengthControl.change(function () {
            _this.setUpFormControls();
        });
        this.lengthAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.widthControl.change(function () {
            _this.setUpFormControls();
        });
        this.widthAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.heightControl.change(function () {
            _this.setUpFormControls();
        });
        this.heightAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.ventilatorCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.wiresCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.ventilatorDiameterControl.change(function () {
            _this.setUpFormControls();
        });
        this.ventilatorDiameterAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.exhaustCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.exhaustDiameterControl.change(function () {
            _this.setUpFormControls();
        });
        this.exhaustDiameterAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.ventilatorStreamControl.change(function () {
            _this.setUpFormControls();
        });
        this.exhaustStreamAcceptedControl.change(function () {
            _this.canChangeExhaustCount = true;
            _this.exhaustStreamAcceptedControl.attr('data-value', _this.exhaustStreamAcceptedControl.val());
            _this.setUpFormControls();
        });
        this.exhaustCountAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.filterAcceptedAdditionalValueControl.change(function () {
            _this.canChangeExhaustCount = true;
            _this.setUpFormControls();
        });
        this.exhaustStreamAcceptedAdditionalValueControl.change(function () {
            _this.canChangeExhaustStreamAccepted = true;
            _this.setUpFormControls();
        });
        $(document).on('ExhaustStreamCalculated', function (event, ExhaustStreamCalculated) {
            _this.exhaustStreamCalculatedControl.val(ExhaustStreamCalculated);
        });
    };
    HoodSelectionOfferDetails.prototype.setUpFormControls = function () {
        this.hoodNrValue = '';
        this.exhaustCountInfoControl.text('').removeClass('text-danger');
        this.filterAcceptedControl.val('').closest('.row').addClass('hidden');
        this.exhaustCountAdditionalValueInfoControl.text('');
        this.displayHideAdditionalFilterControls(false);
        this.setUpType();
        this.setUpFilters();
        this.setUpLenth();
        this.setUpWidth();
        this.setUpHeight();
        this.setUpVentilatorCount();
        this.setUpVentilatorDiameter();
        this.setUpWiresCount();
        this.setUpFilterAcceptedAdditionalValue();
        this.setUpExhaustCount();
        this.setUpExhaustDiameter();
        this.setUpVentilatorStream();
        this.setUpExhaustStream();
        this.canChangeExhaustCount = false;
        this.canChangeExhaustStreamAccepted = false;
        this.hoodNrControl.val(this.hoodNrValue);
        if (this.typeValue == "JKI" || this.typeValue == "JLI-S" || this.typeValue == "JLI-R") {
            $('#panelVentilator').addClass('hidden');
        }
        else {
            $('#panelVentilator').removeClass('hidden');
        }
    };
    HoodSelectionOfferDetails.prototype.displayHideAdditionalFilterControls = function (display) {
        var exhaustStreamAcceptedAdditionalValue = this.exhaustStreamAcceptedAdditionalValueControl.val();
        var exhaustStreamAcceptedControlValue = this.exhaustStreamAcceptedControl.val();
        if (exhaustStreamAcceptedControlValue != '') {
            if (this.exhaustStreamAcceptedControl.attr('data-value') == '') {
                this.exhaustStreamAcceptedControl.attr('data-value', exhaustStreamAcceptedControlValue);
            }
        }
        else {
            this.exhaustStreamAcceptedControl.removeAttr('data-value');
        }
        if (display) {
            this.exhaustCountAdditionalValueControl.closest('.col-sm-3').removeClass('hidden');
            this.filterAcceptedAdditionalValueControl.closest('.col-sm-3').removeClass('hidden');
            this.exhaustStreamAcceptedAdditionalValueControl.closest('.col-sm-3').removeClass('hidden');
            if (this.exhaustStreamAcceptedControl.attr('data-value') != '' && exhaustStreamAcceptedAdditionalValue != '') {
                this.exhaustStreamAcceptedControl.val(parseInt(this.exhaustStreamAcceptedControl.attr('data-value')) - parseInt(exhaustStreamAcceptedAdditionalValue));
            }
        }
        else {
            this.exhaustCountAdditionalValueControl.closest('.col-sm-3').addClass('hidden');
            this.filterAcceptedAdditionalValueControl.closest('.col-sm-3').addClass('hidden');
            this.exhaustStreamAcceptedAdditionalValueControl.closest('.col-sm-3').addClass('hidden');
            this.exhaustStreamAcceptedControl.val(this.exhaustStreamAcceptedControl.attr('data-value'));
        }
    };
    HoodSelectionOfferDetails.prototype.setUpType = function () {
        this.typeValue = this.typeControl.val();
        this.hoodNrValue = this.typeValue + '-';
    };
    HoodSelectionOfferDetails.prototype.setUpFilters = function () {
        var filtersValue = this.filtersControl.val();
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
        if (items.length == 0) {
            this.filtersControl.closest('.col-sm-3').addClass('hidden');
        }
        else {
            this.filtersControl.closest('.col-sm-3').removeClass('hidden');
        }
        //this.filtersControl.attr('disabled', items.length == 0);
        if ($.inArray(filtersValue, items) >= 0) {
            this.filtersControl.val(filtersValue);
        }
        else {
            filtersValue = this.filtersControl.val();
        }
        this.filtersControl.selectpicker('refresh');
        if (items.length > 0 && filtersValue != 'Brak') {
            this.hoodNrValue += filtersValue + '-';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpLenth = function () {
        var lengthValue = this.lengthAdditionalValueControl.val() != '' ? this.lengthAdditionalValueControl.val() : this.lengthControl.val();
        if (lengthValue != '') {
            this.hoodNrValue += lengthValue + 'x';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpWidth = function () {
        var widthValue = this.widthAdditionalValueControl.val() != '' ? this.widthAdditionalValueControl.val() : this.widthControl.val();
        if (widthValue != '') {
            this.hoodNrValue += widthValue + 'x';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpHeight = function () {
        var heightValue = this.heightAdditionalValueControl.val() != '' ? this.heightAdditionalValueControl.val() : this.heightControl.val();
        if (heightValue != '') {
            this.hoodNrValue += heightValue + '-';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpVentilatorCount = function () {
        var ventilatorCountValue = this.ventilatorCountControl.val();
        if (this.typeValue == 'JVI-R' || this.typeValue == 'JVI-R-W' || this.typeValue == 'JLI-R' || this.typeValue == 'JLI-S' || this.typeValue == 'JKI') {
            this.ventilatorCountControl.closest('.col-sm-3').addClass('hidden');
            this.ventilatorCountControl.val('');
        }
        else {
            if (this.typeValue == 'JSI-S' || this.typeValue == 'JSVI-S') {
                this.ventilatorCountControl.trigger("touchspin.updatesettings", { min: 1, initval: '1' });
                if (ventilatorCountValue == '') {
                    this.ventilatorCountControl.val('1');
                }
            }
            else {
                this.ventilatorCountControl.trigger("touchspin.updatesettings", { min: 0, initval: '' });
            }
            this.ventilatorCountControl.closest('.col-sm-3').removeClass('hidden');
        }
        ventilatorCountValue = this.ventilatorCountControl.val();
        if (ventilatorCountValue != '') {
            this.hoodNrValue += ventilatorCountValue + 'x';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpVentilatorDiameter = function () {
        var ventilatorDiameterValue = this.ventilatorDiameterControl.val();
        var items = [];
        if (this.typeValue == 'JVI-R' || this.typeValue == 'JVI-R-W') {
            items.push('100');
        }
        else if (this.typeValue == 'JSI-R' || this.typeValue == 'JSVI-R' || this.typeValue == 'JSVI-R-W' || this.typeValue == 'JSVI-S'
            || this.typeValue == 'JSVI-S-W' || this.typeValue == 'JSKI') {
            var heightValue = this.heightControl.val();
            if (heightValue == '330') {
                items.push('200');
            }
            else {
                items.push('160', '250');
            }
        }
        this.ventilatorDiameterControl.empty();
        for (var i = 0; i < items.length; i++) {
            this.ventilatorDiameterControl.append('<option>' + items[i] + '</option>');
        }
        if (items.length == 0) {
            this.ventilatorDiameterControl.closest('.col-sm-3').addClass('hidden');
            this.ventilatorDiameterAdditionalValueControl.closest('.col-sm-3').addClass('hidden');
            ;
            this.ventilatorDiameterAdditionalValueControl.val('');
        }
        else {
            this.ventilatorDiameterControl.closest('.col-sm-3').removeClass('hidden');
            this.ventilatorDiameterAdditionalValueControl.closest('.col-sm-3').removeClass('hidden');
        }
        if ($.inArray(ventilatorDiameterValue, items) >= 0) {
            this.ventilatorDiameterControl.val(ventilatorDiameterValue);
        }
        else {
            if ($.inArray('250', items) >= 0) {
                this.ventilatorDiameterControl.val('250');
            }
            ventilatorDiameterValue = this.ventilatorDiameterControl.val();
        }
        this.ventilatorDiameterControl.selectpicker('refresh');
        if (ventilatorDiameterValue != '' && ventilatorDiameterValue != null && this.ventilatorCountControl.val() != '') {
            this.hoodNrValue += (this.ventilatorDiameterAdditionalValueControl.val() != ''
                ? this.ventilatorDiameterAdditionalValueControl.val()
                : ventilatorDiameterValue)
                + '-';
        }
        var minRange = 0;
        var maxRange = 0;
        switch (ventilatorDiameterValue) {
            case '100':
                minRange = 30;
                maxRange = 50;
                break;
            case '160':
                minRange = 145;
                maxRange = 250;
                break;
            case '200':
                minRange = 180;
                maxRange = 325;
                break;
            case '250':
                minRange = 360;
                maxRange = 540;
                break;
        }
        var ventilatorCountValue = this.ventilatorCountControl.val();
        if (ventilatorCountValue != '' && ventilatorDiameterValue != '' && ventilatorDiameterValue != null) {
            this.ventilatorDiameterInfoControl.html('(' + parseInt(ventilatorCountValue) * minRange + '-' + parseInt(ventilatorCountValue) * maxRange + 'm<sup>3</sup>/h)');
        }
        else {
            this.ventilatorDiameterInfoControl.text('');
        }
    };
    HoodSelectionOfferDetails.prototype.setUpWiresCount = function () {
        var wiresCountValue = this.wiresCountControl.val();
        if (this.typeValue == 'JSI-R' || this.typeValue == 'JLI-R' || this.typeValue == 'JSI-S' || this.typeValue == 'JLI-S'
            || this.typeValue == 'JSKI' || this.typeValue == 'JKI') {
            this.wiresCountControl.closest('.col-sm-3').addClass('hidden');
            this.wiresCountControl.val('');
        }
        else {
            this.wiresCountControl.closest('.col-sm-3').removeClass('hidden');
        }
        wiresCountValue = this.wiresCountControl.val();
        if (wiresCountValue != '' && wiresCountValue != '0' && this.typeValue != 'JVI-R-W' && this.typeValue != 'JSVI-S-W') {
            if (this.ventilatorCountControl.val() != '') {
                this.hoodNrValue = this.hoodNrValue.slice(0, -1) + '/';
            }
            this.hoodNrValue += wiresCountValue + 'x100-';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpExhaustCount = function () {
        var filtersValue = this.filtersControl.val();
        var exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
        if (this.canChangeExhaustCount) {
            if (exhaustStreamAcceptedValue != '' && filtersValue != '') {
                if (filtersValue == 'Turbo' || filtersValue == 'UV-Turbo') {
                    var newExhaustCountValue = Math.ceil(parseInt(exhaustStreamAcceptedValue) / 800);
                    if (newExhaustCountValue == 0) {
                        newExhaustCountValue = 1;
                    }
                    this.exhaustCountControl.val(newExhaustCountValue);
                }
            }
        }
        var exhaustCountValue = this.exhaustCountControl.val();
        if (exhaustCountValue != '') {
            this.hoodNrValue += exhaustCountValue + 'x';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpExhaustDiameter = function () {
        var exhaustDiameterValue = this.exhaustDiameterControl.val();
        var items = [];
        var filtersValue = this.filtersControl.val();
        var aaabbbItems = [];
        switch (filtersValue) {
            case 'JCE':
                aaabbbItems.push({ min: 144, max: 250, diameter: 200, name: 'JCE-1+1' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 200, name: 'JCE2' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 315, name: 'JCE3' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 315, name: 'JCE4' });
                aaabbbItems.push({ min: 971, max: 1220, diameter: 315, name: 'JCE5' });
                aaabbbItems.push({ min: 1221, max: 1440, diameter: 400, name: 'JCE6' });
                aaabbbItems.push({ min: 1441, max: 1670, diameter: 400, name: 'JCE7' });
                aaabbbItems.push({ min: 1671, max: 1900, diameter: 400, name: 'JCE8' });
                break;
            case 'JFF5':
                aaabbbItems.push({ min: 144, max: 250, diameter: 315, name: 'JFF-1+4' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 315, name: 'JFF-2+3' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 315, name: 'JFF-3+2' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 315, name: 'JFF-4+1' });
                aaabbbItems.push({ min: 971, max: 1220, diameter: 315, name: 'JFF-5' });
                break;
            case 'JFF8':
            case 'UV':
                aaabbbItems.push({ min: 144, max: 250, diameter: 400, name: 'JFF-1+7' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 400, name: 'JFF-2+6' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 400, name: 'JFF-3+5' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 400, name: 'JFF-4+4' });
                aaabbbItems.push({ min: 971, max: 1220, diameter: 400, name: 'JFF-5+3' });
                aaabbbItems.push({ min: 1221, max: 1440, diameter: 400, name: 'JFF-6+2' });
                aaabbbItems.push({ min: 1441, max: 1670, diameter: 400, name: 'JFF-7+1' });
                aaabbbItems.push({ min: 1671, max: 1900, diameter: 400, name: 'JFF-8' });
                break;
            case 'Turbo':
            case 'UV-Turbo':
                aaabbbItems.push({ min: 0, max: 800, diameter: 315 });
                break;
            default:// this.typeValue == 'JSKI' || this.typeValue == 'JKI'
                aaabbbItems.push({ min: 0, max: 320, diameter: 200 });
                aaabbbItems.push({ min: 321, max: 630, diameter: 250 });
                aaabbbItems.push({ min: 630, max: 900, diameter: 315 });
                aaabbbItems.push({ min: 900, max: 1510, diameter: 400 });
                break;
        }
        var exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
        var exhaustCountValue = this.exhaustCountControl.val();
        if (exhaustStreamAcceptedValue != '' && exhaustCountValue != '') {
            var calculatedValue_1 = parseInt(exhaustStreamAcceptedValue) / parseInt(exhaustCountValue);
            var diameterItem = aaabbbItems.filter(function (obj) {
                return calculatedValue_1 >= obj.min && calculatedValue_1 <= obj.max;
            });
            if (diameterItem.length > 0) {
                items.push(diameterItem[0].diameter.toString());
                var rangeMin = diameterItem[0].min * parseInt(exhaustCountValue);
                var rangeMax = diameterItem[0].max * parseInt(exhaustCountValue);
                this.exhaustCountInfoControl.text(rangeMin + '-' + rangeMax);
                if (diameterItem[0].name != null) {
                    this.filterAcceptedControl.val(diameterItem[0].name).closest('.row').removeClass('hidden');
                    this.displayHideAdditionalFilterControls(true);
                    exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
                    calculatedValue_1 = parseInt(exhaustStreamAcceptedValue) / parseInt(exhaustCountValue);
                    diameterItem = aaabbbItems.filter(function (obj) {
                        return calculatedValue_1 >= obj.min && calculatedValue_1 <= obj.max;
                    });
                    if (diameterItem.length > 0) {
                        items.pop();
                        items.push(diameterItem[0].diameter.toString());
                        var rangeMin_1 = diameterItem[0].min * parseInt(exhaustCountValue);
                        var rangeMax_1 = diameterItem[0].max * parseInt(exhaustCountValue);
                        this.exhaustCountInfoControl.text(rangeMin_1 + '-' + rangeMax_1);
                        if (diameterItem[0].name != null) {
                            this.filterAcceptedControl.val(diameterItem[0].name);
                        }
                        else {
                            this.exhaustCountInfoControl.text('Zwiększ liczbę króćców').addClass('text-danger');
                        }
                    }
                }
            }
            else {
                this.exhaustCountInfoControl.text('Zwiększ liczbę króćców').addClass('text-danger');
            }
        }
        this.exhaustDiameterControl.empty();
        for (var i = 0; i < items.length; i++) {
            this.exhaustDiameterControl.append('<option>' + items[i] + '</option>');
        }
        if ($.inArray(exhaustDiameterValue, items) >= 0) {
            this.exhaustDiameterControl.val(exhaustDiameterValue);
        }
        else {
            exhaustDiameterValue = this.exhaustDiameterControl.val();
        }
        this.exhaustDiameterControl.selectpicker('refresh');
        if (items.length > 0) {
            this.hoodNrValue += (this.exhaustDiameterAdditionalValueControl.val() != '' ? this.exhaustDiameterAdditionalValueControl.val() : exhaustDiameterValue) + '-';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpVentilatorStream = function () {
        var ventilatorStreamValue = this.ventilatorStreamControl.val();
        if (this.typeValue == 'JVI-R-W' || this.typeValue == 'JLI-R' || this.typeValue == 'JLI-S' || this.typeValue == 'JKI') {
            this.ventilatorStreamControl.closest('.col-sm-3').addClass('hidden');
            this.ventilatorStreamControl.val('');
        }
        else {
            this.ventilatorStreamControl.closest('.col-sm-3').removeClass('hidden');
        }
        ventilatorStreamValue = this.ventilatorStreamControl.val();
        if (ventilatorStreamValue != '') {
            this.hoodNrValue += ventilatorStreamValue + 'm³/h-';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpExhaustStream = function () {
        var exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
        if (exhaustStreamAcceptedValue != '') {
            this.hoodNrValue += exhaustStreamAcceptedValue + 'm³/h';
        }
    };
    HoodSelectionOfferDetails.prototype.setUpFilterAcceptedAdditionalValue = function () {
        var items = [];
        var filterAcceptedAdditionalValue = this.filterAcceptedAdditionalValueControl.val();
        var exhaustCountAdditionalValue = this.exhaustCountAdditionalValueControl.val();
        var filtersValue = this.filtersControl.val();
        if (filtersValue != '' && filtersValue != 'Turbo' && filtersValue != 'UV-Turbo') {
            items.push({ name: '' });
            items.push({ min: 144, max: 250, diameter: 200, name: 'JCE-1+1' });
            items.push({ min: 251, max: 500, diameter: 200, name: 'JCE2' });
            items.push({ min: 501, max: 755, diameter: 315, name: 'JCE3' });
            items.push({ min: 756, max: 970, diameter: 315, name: 'JCE4' });
            items.push({ min: 971, max: 1220, diameter: 315, name: 'JCE5' });
            items.push({ min: 1221, max: 1440, diameter: 400, name: 'JCE6' });
            items.push({ min: 1441, max: 1670, diameter: 400, name: 'JCE7' });
            items.push({ min: 1671, max: 1900, diameter: 400, name: 'JCE8' });
            if (filtersValue == 'JFF5' || filtersValue == 'JFF8' || filtersValue == 'UV') {
                items.push({ min: 144, max: 250, diameter: 315, name: 'JFF-1+4' });
                items.push({ min: 251, max: 500, diameter: 315, name: 'JFF-2+3' });
                items.push({ min: 501, max: 755, diameter: 315, name: 'JFF-3+2' });
                items.push({ min: 756, max: 970, diameter: 315, name: 'JFF-4+1' });
                items.push({ min: 971, max: 1220, diameter: 315, name: 'JFF-5' });
            }
            if (filtersValue == 'JFF8' || filtersValue == 'UV') {
                items.push({ min: 144, max: 250, diameter: 400, name: 'JFF-1+7' });
                items.push({ min: 251, max: 500, diameter: 400, name: 'JFF-2+6' });
                items.push({ min: 501, max: 755, diameter: 400, name: 'JFF-3+5' });
                items.push({ min: 756, max: 970, diameter: 400, name: 'JFF-4+4' });
                items.push({ min: 971, max: 1220, diameter: 400, name: 'JFF-5+3' });
                items.push({ min: 1221, max: 1440, diameter: 400, name: 'JFF-6+2' });
                items.push({ min: 1441, max: 1670, diameter: 400, name: 'JFF-7+1' });
                items.push({ min: 1671, max: 1900, diameter: 400, name: 'JFF-8' });
            }
        }
        this.filterAcceptedAdditionalValueControl.empty();
        for (var i = 0; i < items.length; i++) {
            this.filterAcceptedAdditionalValueControl.append('<option>' + items[i].name + '</option>');
        }
        var seletedItemInItems = items.filter(function (obj) {
            return filterAcceptedAdditionalValue == obj.name;
        });
        if (seletedItemInItems.length > 0 && seletedItemInItems[0].name != '') {
            this.filterAcceptedAdditionalValueControl.val(filterAcceptedAdditionalValue);
            if (filterAcceptedAdditionalValue != '' && exhaustCountAdditionalValue != '') {
                var rangeMin = seletedItemInItems[0].min * parseInt(exhaustCountAdditionalValue);
                var rangeMax = seletedItemInItems[0].max * parseInt(exhaustCountAdditionalValue);
                this.exhaustCountAdditionalValueInfoControl.text(rangeMin + '-' + rangeMax);
            }
        }
        else {
            filterAcceptedAdditionalValue = this.filterAcceptedAdditionalValueControl.val();
        }
        this.filterAcceptedAdditionalValueControl.selectpicker('refresh');
    };
    return HoodSelectionOfferDetails;
}());
var hoodSelectionOfferDetails = new HoodSelectionOfferDetails();
$(document).ready(function () {
    hoodSelectionOfferDetails.init();
});
//# sourceMappingURL=HoodSelectionOfferDetails.js.map