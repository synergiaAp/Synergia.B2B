var HoodSelectionOfferDetailsModal = /** @class */ (function () {
    function HoodSelectionOfferDetailsModal() {
        this.canChangeExhaustCount = false;
        this.canChangeExhaustStreamAccepted = false;
        this.hoodPartsPriceList = {};
    }
    HoodSelectionOfferDetailsModal.prototype.init = function () {
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
        this.additionalFilterExhaustCountControl = $('#AdditionalFilterExhaustCount');
        this.additionalFilterFilterAcceptedControl = $('#AdditionalFilterFilterAccepted');
        this.additionalFilterExhaustStreamAcceptedControl = $('#AdditionalFilterExhaustStreamAccepted');
        this.ventilatorDiameterInfoControl = $('#VentilatorDiameterInfo');
        this.exhaustCountInfoControl = $('#ExhaustCountInfo');
        this.additionalFilterExhaustCountInfoControl = $('#AdditionalFilterExhaustCountInfo');
        this.exhaustCountAdditionalValueControl = $('#ExhaustCountAdditionalValue');
        this.ventilatorCountAdditionalValueControl = $('#VentilatorCountAdditionalValue');
        this.controlPanelUnitEnabledControl = $('#ControlPanelUnitEnabled');
        this.controlPanelCountControl = $('#ControlPanelCount');
        this.controlUnitCountControl = $('#ControlUnitCount');
        this.priceControl = $('#Price');
        this.loadHoodPartsPriceList()
            .then(function () {
            _this.setUpFormControls();
        });
        //this.setUpFormControls();
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
        this.additionalFilterExhaustCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.additionalFilterFilterAcceptedControl.change(function () {
            _this.canChangeExhaustCount = true;
            _this.setUpFormControls();
        });
        this.additionalFilterExhaustStreamAcceptedControl.change(function () {
            _this.canChangeExhaustStreamAccepted = true;
            _this.setUpFormControls();
        });
        this.ventilatorCountAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.exhaustCountAdditionalValueControl.change(function () {
            _this.setUpFormControls();
        });
        this.controlPanelUnitEnabledControl.change(function () {
            _this.setUpFormControls();
        });
        this.controlPanelCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.controlUnitCountControl.change(function () {
            _this.setUpFormControls();
        });
        $(document).on('ExhaustStreamCalculated', function (event, ExhaustStreamCalculated) {
            _this.exhaustStreamCalculatedControl.val(ExhaustStreamCalculated);
        });
    };
    HoodSelectionOfferDetailsModal.prototype.loadHoodPartsPriceList = function () {
        var _this = this;
        return $.ajax({
            url: '/Api/ApiHoodPartsPriceList/GetAll',
            data: '',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET'
        }).then(function (result) {
            for (var i = 0; i < result.length; i++) {
                _this.hoodPartsPriceList[result[i].Name] = result[i].PriceNet;
            }
            return $.when(null);
        });
    };
    HoodSelectionOfferDetailsModal.prototype.setUpFormControls = function () {
        this.hoodNrValue = '';
        this.exhaustCountInfoControl.text('').removeClass('text-danger');
        this.filterAcceptedControl.val('').closest('.row').addClass('hidden');
        this.additionalFilterExhaustCountInfoControl.text('');
        this.displayHideAdditionalFilterControls(false);
        this.setUpType();
        this.setUpFilters();
        this.setUpLenth();
        this.setUpWidth();
        this.setUpHeight();
        this.setUpVentilatorCount();
        this.setUpVentilatorDiameter();
        this.setUpWiresCount();
        this.setUpAdditionalFilterFilterAccepted();
        this.setUpExhaustCount();
        this.setUpExhaustDiameter();
        this.setUpVentilatorStream();
        this.setUpExhaustStream();
        this.setUpControlPanelUnit();
        this.setUpPrice();
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
    HoodSelectionOfferDetailsModal.prototype.displayHideAdditionalFilterControls = function (display) {
        var AdditionalFilterExhaustStreamAccepted = this.additionalFilterExhaustStreamAcceptedControl.val();
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
            this.additionalFilterExhaustCountControl.closest('.col-sm-3').removeClass('hidden');
            this.additionalFilterFilterAcceptedControl.closest('.col-sm-3').removeClass('hidden');
            this.additionalFilterExhaustStreamAcceptedControl.closest('.col-sm-3').removeClass('hidden');
            if (this.exhaustStreamAcceptedControl.attr('data-value') != '' && AdditionalFilterExhaustStreamAccepted != '') {
                this.exhaustStreamAcceptedControl.val(parseInt(this.exhaustStreamAcceptedControl.attr('data-value')) - parseInt(AdditionalFilterExhaustStreamAccepted));
            }
        }
        else {
            this.additionalFilterExhaustCountControl.closest('.col-sm-3').addClass('hidden');
            this.additionalFilterFilterAcceptedControl.closest('.col-sm-3').addClass('hidden');
            this.additionalFilterExhaustStreamAcceptedControl.closest('.col-sm-3').addClass('hidden');
            this.exhaustStreamAcceptedControl.val(this.exhaustStreamAcceptedControl.attr('data-value'));
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpType = function () {
        this.typeValue = this.typeControl.val();
        this.hoodNrValue = this.typeValue + '-';
    };
    HoodSelectionOfferDetailsModal.prototype.setUpFilters = function () {
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
    HoodSelectionOfferDetailsModal.prototype.setUpLenth = function () {
        var lengthValue = this.lengthAdditionalValueControl.val() != '' ? this.lengthAdditionalValueControl.val() : this.lengthControl.val();
        if (lengthValue != '') {
            this.hoodNrValue += lengthValue + 'x';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpWidth = function () {
        var widthValue = this.widthAdditionalValueControl.val() != '' ? this.widthAdditionalValueControl.val() : this.widthControl.val();
        if (widthValue != '') {
            this.hoodNrValue += widthValue + 'x';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpHeight = function () {
        var heightValue = this.heightAdditionalValueControl.val() != '' ? this.heightAdditionalValueControl.val() : this.heightControl.val();
        if (heightValue != '') {
            this.hoodNrValue += heightValue + '-';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpVentilatorCount = function () {
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
        if (this.ventilatorDiameterAdditionalValueControl.val() != '') {
            this.ventilatorCountAdditionalValueControl.closest('.col-sm-3').removeClass('hidden');
        }
        else {
            this.ventilatorCountAdditionalValueControl.val('').closest('.col-sm-3').addClass('hidden');
        }
        ventilatorCountValue = this.ventilatorCountAdditionalValueControl.val() != '' && this.ventilatorDiameterAdditionalValueControl.val() != ''
            ? this.ventilatorCountAdditionalValueControl.val()
            : this.ventilatorCountControl.val();
        if (ventilatorCountValue != '') {
            this.hoodNrValue += ventilatorCountValue + 'x';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpVentilatorDiameter = function () {
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
            this.hoodNrValue += (this.ventilatorDiameterAdditionalValueControl.val() != '' && this.ventilatorCountAdditionalValueControl.val() != ''
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
    HoodSelectionOfferDetailsModal.prototype.setUpWiresCount = function () {
        var wiresCountValue = this.wiresCountControl.val();
        if (this.typeValue == 'JSI-R' || this.typeValue == 'JLI-R' || this.typeValue == 'JSI-S' || this.typeValue == 'JLI-S'
            || this.typeValue == 'JSKI' || this.typeValue == 'JKI') {
            this.wiresCountControl.closest('.col-sm-3').addClass('hidden');
            this.wiresCountControl.val('');
        }
        else {
            this.wiresCountControl.closest('.col-sm-3').removeClass('hidden');
            if (this.wiresCountControl.val() == '') {
                this.wiresCountControl.val('0');
            }
        }
        wiresCountValue = this.wiresCountControl.val();
        if (wiresCountValue != '' && wiresCountValue != '0' && this.typeValue != 'JVI-R-W' && this.typeValue != 'JSVI-S-W') {
            if (this.ventilatorCountControl.val() != '') {
                this.hoodNrValue = this.hoodNrValue.slice(0, -1) + '/';
            }
            this.hoodNrValue += wiresCountValue + 'x100-';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpExhaustCount = function () {
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
    };
    HoodSelectionOfferDetailsModal.prototype.setUpExhaustDiameter = function () {
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
                aaabbbItems.push({ min: 144, max: 250, diameter: 400, name: 'JFF-1+7' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 400, name: 'JFF-2+6' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 400, name: 'JFF-3+5' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 400, name: 'JFF-4+4' });
                aaabbbItems.push({ min: 971, max: 1220, diameter: 400, name: 'JFF-5+3' });
                aaabbbItems.push({ min: 1221, max: 1440, diameter: 400, name: 'JFF-6+2' });
                aaabbbItems.push({ min: 1441, max: 1670, diameter: 400, name: 'JFF-7+1' });
                aaabbbItems.push({ min: 1671, max: 1900, diameter: 400, name: 'JFF-8' });
                break;
            case 'UV':
                aaabbbItems.push({ min: 144, max: 1900, diameter: 400, name: 'UV' });
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
        this.displayHideAdditionalFilterControls(aaabbbItems[0].name != null);
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
                var additionalInfo = '';
                var lengthValue = this.lengthControl.val();
                if ((this.typeValue == 'JSKI' || this.typeValue == 'JKI') && lengthValue != '') {
                    var hobItems = [
                        { min: 0, max: 100, name: 'płyta 1/1' },
                        { min: 101, max: 150, name: 'płyta 2/1' },
                        { min: 151, max: 200, name: 'płyta 2/2' },
                        { min: 201, max: 250, name: 'płyta 3/2' },
                        { min: 251, max: 300, name: 'płyta 3/3' },
                    ];
                    var hobValue_1 = parseInt(exhaustStreamAcceptedValue) / parseInt(lengthValue) / 3.6 * 1000;
                    var hobItem = hobItems.filter(function (obj) {
                        return hobValue_1 >= obj.min && hobValue_1 <= obj.max;
                    });
                    if (hobItem.length == 1) {
                        additionalInfo += ' ' + hobItem[0].name;
                    }
                }
                this.exhaustCountInfoControl.text(rangeMin + '-' + rangeMax + additionalInfo);
                if (diameterItem[0].name != null) {
                    this.filterAcceptedControl.val(diameterItem[0].name).closest('.row').removeClass('hidden');
                }
            }
            else if (calculatedValue_1 > aaabbbItems[aaabbbItems.length - 1].max) {
                this.exhaustCountInfoControl.text('Zwiększ liczbę króćców').addClass('text-danger');
            }
            else {
                this.exhaustCountInfoControl.text('Zmniejsz liczbę króćców').addClass('text-danger');
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
        if (this.typeValue == 'JVI-R') {
            this.exhaustDiameterAdditionalValueControl.val('').closest('.col-sm-3').addClass('invisible');
        }
        else {
            this.exhaustDiameterAdditionalValueControl.closest('.col-sm-3').removeClass('invisible');
        }
        exhaustDiameterValue = (this.exhaustDiameterAdditionalValueControl.val() != '' && this.exhaustCountAdditionalValueControl.val() != '' ? this.exhaustDiameterAdditionalValueControl.val() : exhaustDiameterValue);
        var additionalFilterExhaustCount = this.additionalFilterExhaustCountControl.closest('.col-sm-3').hasClass('hidden')
            ? ''
            : this.additionalFilterExhaustCountControl.val();
        var exhaustCountValueNumber = null;
        if (this.exhaustDiameterAdditionalValueControl.val() != '') {
            this.exhaustCountAdditionalValueControl.closest('.col-sm-3').removeClass('invisible');
        }
        else {
            this.exhaustCountAdditionalValueControl.val('').closest('.col-sm-3').addClass('invisible');
        }
        if (this.exhaustCountAdditionalValueControl.val() != '' && this.exhaustDiameterAdditionalValueControl.val() != '') {
            exhaustCountValue = this.exhaustCountAdditionalValueControl.val();
        }
        if (exhaustCountValue != '') {
            exhaustCountValueNumber = parseInt(exhaustCountValue);
            if (exhaustDiameterValue != '' && this.additionalFilterExhaustDiameter != null && exhaustDiameterValue == this.additionalFilterExhaustDiameter
                && additionalFilterExhaustCount != '') {
                exhaustCountValueNumber += parseInt(additionalFilterExhaustCount);
            }
            this.hoodNrValue += exhaustCountValueNumber + 'x';
        }
        if (items.length > 0) {
            this.hoodNrValue += exhaustDiameterValue;
            if (this.additionalFilterExhaustDiameter != null && exhaustDiameterValue != this.additionalFilterExhaustDiameter && additionalFilterExhaustCount != '') {
                this.hoodNrValue += '/' + additionalFilterExhaustCount + 'x' + this.additionalFilterExhaustDiameter;
            }
            ;
            this.hoodNrValue += '-';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpVentilatorStream = function () {
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
    HoodSelectionOfferDetailsModal.prototype.setUpExhaustStream = function () {
        var exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.attr('data-value');
        if (exhaustStreamAcceptedValue == '' || exhaustStreamAcceptedValue == null) {
            exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
        }
        if (exhaustStreamAcceptedValue != '') {
            this.hoodNrValue += exhaustStreamAcceptedValue + 'm³/h';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpAdditionalFilterFilterAccepted = function () {
        this.additionalFilterExhaustDiameter = null;
        var items = [];
        var additionalFilterFilterAccepted = this.additionalFilterFilterAcceptedControl.val();
        var additionalFilterExhaustCount = this.additionalFilterExhaustCountControl.val();
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
        this.additionalFilterFilterAcceptedControl.empty();
        for (var i = 0; i < items.length; i++) {
            this.additionalFilterFilterAcceptedControl.append('<option>' + items[i].name + '</option>');
        }
        var seletedItemInItems = items.filter(function (obj) {
            return additionalFilterFilterAccepted == obj.name;
        });
        if (seletedItemInItems.length > 0 && seletedItemInItems[0].name != '') {
            this.additionalFilterFilterAcceptedControl.val(additionalFilterFilterAccepted);
            if (additionalFilterFilterAccepted != '' && additionalFilterExhaustCount != '') {
                var rangeMin = seletedItemInItems[0].min * parseInt(additionalFilterExhaustCount);
                var rangeMax = seletedItemInItems[0].max * parseInt(additionalFilterExhaustCount);
                this.additionalFilterExhaustCountInfoControl.text(rangeMin + '-' + rangeMax);
                this.additionalFilterExhaustDiameter = seletedItemInItems[0].diameter;
            }
        }
        else {
            additionalFilterFilterAccepted = this.additionalFilterFilterAcceptedControl.val();
        }
        this.additionalFilterFilterAcceptedControl.selectpicker('refresh');
    };
    HoodSelectionOfferDetailsModal.prototype.setUpControlPanelUnit = function () {
        if (this.filtersControl.val() == 'UV') {
            //this.controlPanelUnitEnabledControl.attr('checked', true);
            this.controlPanelUnitEnabledControl.closest('.col-sm-3').addClass('hidden');
        }
        else {
            this.controlPanelUnitEnabledControl.closest('.col-sm-3').removeClass('hidden');
        }
        if (this.controlPanelUnitEnabledControl.is(':checked') || this.filtersControl.val() == 'UV') {
            this.controlPanelCountControl.closest('.row').removeClass('hidden');
        }
        else {
            this.controlPanelCountControl.val('').closest('.row').addClass('hidden');
            this.controlUnitCountControl.val('');
        }
        if (this.controlPanelCountControl.val() != '' && this.controlUnitCountControl.val() != '') {
            this.hoodNrValue += '+FC';
        }
    };
    HoodSelectionOfferDetailsModal.prototype.setUpPrice = function () {
        var price = null;
        if (this.filtersControl.val() != 'Turbo' && this.filtersControl.val() != 'UV-Turbo') {
            price = this.getFilterPrice(this.exhaustCountControl.val(), this.filterAcceptedControl.val());
        }
        else {
            price = this.getFilterPrice(this.exhaustCountControl.val(), this.filtersControl.val());
        }
        if (this.additionalFilterExhaustCountControl.val() != '' && this.additionalFilterFilterAcceptedControl.val() != '') {
            price += this.getFilterPrice(this.additionalFilterExhaustCountControl.val(), this.additionalFilterFilterAcceptedControl.val());
        }
        if (this.controlPanelCountControl.is(':visible') && this.controlPanelCountControl.val() != '' && this.controlUnitCountControl.val() != '') {
            price += parseInt(this.controlPanelCountControl.val()) * this.hoodPartsPriceList['cena za panel dotykowy']
                + parseInt(this.controlUnitCountControl.val()) * this.hoodPartsPriceList['cena za jednostkę sterującą'];
        }
        if (price != null && !isNaN(price)) {
            this.priceControl.val(utility.toInt(Math.round(price)));
        }
        else {
            this.priceControl.val('');
        }
        //console.log(d1);
    };
    HoodSelectionOfferDetailsModal.prototype.getFilterPrice = function (exhaustCount, filterAcepted) {
        var a = (2 * (parseInt(this.lengthControl.val()) + parseInt(this.widthControl.val())) * this.hoodPartsPriceList['cena za mb okapu'] / 1000
            + 2 * parseInt(this.heightControl.val()) * (parseInt(this.lengthControl.val()) + parseInt(this.widthControl.val())) * this.hoodPartsPriceList['cena za powierzchnie boczne okapu'] / 1000000
            + parseInt(this.lengthControl.val()) * parseInt(this.widthControl.val()) * this.hoodPartsPriceList['cena za dach okapu'] / 1000000);
        var b1 = null;
        if (this.wiresCountControl.closest('.col-sm-3').hasClass('hidden')) {
            b1 = (parseInt(this.ventilatorCountControl.val()) * this.hoodPartsPriceList['cena za wiązke JSI']
                + parseInt(this.ventilatorCountControl.val()) * this.hoodPartsPriceList['cena za nawiewnik']);
        }
        else {
            b1 = (parseInt(this.wiresCountControl.val()) * this.hoodPartsPriceList['cena za wiązke JSI']
                + parseInt(this.ventilatorCountControl.val()) * this.hoodPartsPriceList['cena za nawiewnik']);
        }
        var b2 = (parseInt(this.wiresCountControl.val()) * this.hoodPartsPriceList['cena za wiązke JVI']);
        var modulesCount = 1;
        var filterName = filterAcepted;
        var filtersCount = exhaustCount;
        var filtersCountNumber = null;
        if (filtersCount != '') {
            filtersCountNumber = parseInt(filtersCount);
            filtersCount = filterAcepted;
            if (filtersCount != '' && new RegExp("\\d+$").test(filtersCount)) {
                if (filtersCount.indexOf('-') >= 0) {
                    if (filtersCount.indexOf('+') >= 0) {
                        filterName = filtersCount.substr(0, filtersCount.indexOf('-')) + (parseInt(filtersCount.charAt(filtersCount.indexOf('-') + 1)) + parseInt(filtersCount.charAt(filtersCount.indexOf('+') + 1))).toString();
                    }
                    else {
                        filterName = filtersCount.substr(0, filtersCount.indexOf('-')) + parseInt(filtersCount.charAt(filtersCount.indexOf('-') + 1)).toString();
                    }
                    filtersCount = filtersCount.charAt(filtersCount.indexOf('-') + 1);
                }
                else {
                    filterName = filtersCount.substr(0, filtersCount.length - 1);
                    filtersCount = filtersCount.charAt(filtersCount.length - 1);
                }
            }
            else {
                filtersCount = '';
            }
            if (filtersCount != '') {
                filtersCountNumber = filtersCountNumber * parseInt(filtersCount);
            }
        }
        var c1 = (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE']);
        var c2 = (filtersCountNumber * this.hoodPartsPriceList['turboswing']);
        var c3 = (filtersCountNumber * this.hoodPartsPriceList['UV-Turbo']);
        var c4 = ((modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE'])
            + (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za filtr FF-8']));
        var c5 = ((modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE'])
            + (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za filtr FF-5']));
        var c6 = ((modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE'])
            + (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za UV'] + modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['dopłata z FF do FF dla UV']));
        var c7 = (parseInt(this.lengthControl.val()) * parseInt(this.widthControl.val()) / 1000000 * this.hoodPartsPriceList['płyty kondensacyjne']);
        var d1 = parseInt(this.ventilatorCountControl.val()) * this.hoodPartsPriceList['wentylator wiązki'];
        var d2 = this.hoodPartsPriceList['cena za panel dotykowy'];
        var d3 = this.hoodPartsPriceList['ledy punktowe'];
        var price = null;
        switch (this.typeValue) {
            case 'JSI-R':
                switch (filterName) {
                    case 'JCE':
                        price = a + b1 + c1;
                        break;
                    case 'JFF5':
                        price = a + b1 + c5;
                        break;
                    case 'JFF8':
                        price = a + b1 + c4;
                        break;
                    case 'UV':
                        price = a + b1 + c6 + d2;
                        break;
                    case 'Turbo':
                        price = a + b1 + c2;
                        break;
                    case 'UV-Turbo':
                        price = a + b1 + c3;
                        break;
                }
                break;
            case 'JSVI-R':
                switch (filterName) {
                    case 'JCE':
                        price = a + b1 + b2 + c1;
                        break;
                    case 'JFF5':
                        price = a + b1 + b2 + c5;
                        break;
                    case 'JFF8':
                        price = a + b1 + b2 + c4;
                        break;
                    case 'UV':
                        price = a + b1 + b2 + c6 + d2;
                        break;
                    case 'Turbo':
                        price = a + b1 + b2 + c2;
                        break;
                    case 'UV-Turbo':
                        price = a + b1 + b2 + c3;
                        break;
                }
                break;
            case 'JSVI-R-W':
                switch (filterName) {
                    case 'JCE':
                        price = a + b1 + b2 + c1 + d1;
                        break;
                    case 'JFF5':
                        price = a + b1 + b2 + c5 + d1;
                        break;
                    case 'JFF8':
                        price = a + b1 + b2 + c4 + d1;
                        break;
                    case 'UV':
                        price = a + b1 + b2 + c6 + d2 + d1;
                        break;
                    case 'Turbo':
                        price = a + b1 + b2 + c2 + d1;
                        break;
                    case 'UV-Turbo':
                        price = a + b1 + b2 + c3 + d1;
                        break;
                }
                break;
            case 'JVI-R':
                switch (filterName) {
                    case 'JCE':
                        price = a + b2 + c1;
                        break;
                    case 'JFF5':
                        price = a + b2 + c5;
                        break;
                    case 'JFF8':
                        price = a + b2 + c4;
                        break;
                    case 'UV':
                        price = a + b2 + c6 + d2;
                        break;
                    case 'Turbo':
                        price = a + b2 + c2;
                        break;
                    case 'UV-Turbo':
                        price = a + b2 + c3;
                        break;
                }
                break;
            case 'JVI-R-W':
                switch (filterName) {
                    case 'JCE':
                        price = a + b2 + c1 + d1;
                        break;
                    case 'JFF5':
                        price = a + b2 + c5 + d1;
                        break;
                    case 'JFF8':
                        price = a + b2 + c4 + d1;
                        break;
                    case 'UV':
                        price = a + b2 + c6 + d2 + d1;
                        break;
                    case 'Turbo':
                        price = a + b2 + c2 + d1;
                        break;
                    case 'UV-Turbo':
                        price = a + b2 + c3 + d1;
                        break;
                }
                break;
            case 'JLI-R':
                switch (filterName) {
                    case 'JCE':
                        price = a + c1;
                        break;
                    case 'JFF5':
                        price = a + c5;
                        break;
                    case 'JFF8':
                        price = a + c4;
                        break;
                    case 'UV':
                        price = a + c6 + d2;
                        break;
                    case 'Turbo':
                        price = a + c2;
                        break;
                    case 'UV-Turbo':
                        price = a + c3;
                        break;
                    case 'Brak':
                        price = a;
                        break;
                }
                break;
            case 'JSI-S':
                switch (filterName) {
                    case 'JCE':
                        price = 1.4 * a + b1 + c1;
                        break;
                    case 'JFF5':
                        price = 1.4 * a + b1 + c5;
                        break;
                    case 'JFF8':
                        price = 1.4 * a + b1 + c4;
                        break;
                    case 'UV':
                        price = 1.4 * a + b1 + c6 + d2;
                        break;
                    case 'Turbo':
                        price = 1.4 * a + b1 + c2;
                        break;
                    case 'UV-Turbo':
                        price = 1.4 * a + b1 + c3;
                        break;
                }
                break;
            case 'JSVI-S':
                switch (filterName) {
                    case 'JCE':
                        price = 1.4 * a + b1 + b2 + c1;
                        break;
                    case 'JFF5':
                        price = 1.4 * a + b1 + b2 + c5;
                        break;
                    case 'JFF8':
                        price = 1.4 * a + b1 + b2 + c4;
                        break;
                    case 'UV':
                        price = 1.4 * a + b1 + b2 + c6 + d2;
                        break;
                    case 'Turbo':
                        price = 1.4 * a + b1 + b2 + c2;
                        break;
                    case 'UV-Turbo':
                        price = 1.4 * a + b1 + b2 + c3;
                        break;
                }
                break;
            case 'JSVI-S-W':
                switch (filterName) {
                    case 'JCE':
                        price = 1.4 * a + b1 + b2 + c1 + d1;
                        break;
                    case 'JFF5':
                        price = 1.4 * a + b1 + b2 + c5 + d1;
                        break;
                    case 'JFF8':
                        price = 1.4 * a + b1 + b2 + c4 + d1;
                        break;
                    case 'UV':
                        price = 1.4 * a + b1 + b2 + c6 + d2 + d1;
                        break;
                    case 'Turbo':
                        price = 1.4 * a + b1 + b2 + c2 + d1;
                        break;
                    case 'UV-Turbo':
                        price = 1.4 * a + b1 + b2 + c3 + d1;
                        break;
                }
                break;
            case 'JLI-S':
                switch (filterName) {
                    case 'JCE':
                        price = 1.4 * a + c1;
                        break;
                    case 'JFF5':
                        price = 1.4 * a + c5;
                        break;
                    case 'JFF8':
                        price = 1.4 * a + c4;
                        break;
                    case 'UV':
                        price = 1.4 * a + c6 + d2;
                        break;
                    case 'Turbo':
                        price = 1.4 * a + c2;
                        break;
                    case 'UV-Turbo':
                        price = 1.4 * a + c3;
                        break;
                    case 'Brak':
                        price = 1.4 * a;
                        break;
                }
                break;
            case 'JSKI':
                price = a + b1 + c7;
                break;
            case 'JKI':
                price = a + c7;
                break;
        }
        return price;
    };
    return HoodSelectionOfferDetailsModal;
}());
var hoodSelectionOfferDetails = new HoodSelectionOfferDetailsModal();
$(document).ready(function () {
    hoodSelectionOfferDetails.init();
});
//# sourceMappingURL=_HoodSelectionOfferDetailsModal.js.map