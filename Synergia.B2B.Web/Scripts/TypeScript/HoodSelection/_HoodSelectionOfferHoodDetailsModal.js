var HoodSelectionOfferHoodDetailsModal = /** @class */ (function () {
    function HoodSelectionOfferHoodDetailsModal() {
        this.areControlsDisabled = false;
        this.canChangeExhaustCount = false;
        //private canChangeExhaustStreamAccepted: boolean = false;
        this.hoodPartsPriceList = {};
        this.isEditDataLoading = false;
    }
    HoodSelectionOfferHoodDetailsModal.prototype.init = function () {
        var _this = this;
        this.assignControls();
        this.loadHoodPartsPriceList()
            .then(function () {
            _this.setUpFormControls();
        });
        this.typeControl.change(function () {
            _this.setUpFormControls();
        });
        this.filterTypeControl.change(function () {
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
        this.exhaustStreamAdditionalValueControl.change(function () {
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
            //this.canChangeExhaustStreamAccepted = true;
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
        this.lightingLED12036WCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.lightingLED12060WCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.lightingLED15050WCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.lightingLED15075WCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.lightingLED6018WCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.lightingLED6030WCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.lightingLED9045WCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.lightingLED9CountControl.change(function () {
            _this.setUpFormControls();
        });
        this.priceAdditionalValueControl.change(function () {
            _this.priceAdditionalValueControl.val(utility.toInt(_this.priceAdditionalValueControl.val()));
            _this.setUpFinalPriceSingleElement();
        });
        this.layoutTypeControl.change(function () {
            _this.setUpFormControls();
        });
        this.moduleCountControl.change(function () {
            _this.setUpFormControls();
        });
        this.additionalAccessoryAnsulEnabledControl.change(function () {
            _this.setUpFormControls();
        });
        this.additionalAccessoryAnsulTypeControl.change(function () {
            _this.setUpFormControls();
        });
        this.weightAdditionalValueControl.change(function () {
            _this.setUpFinalWeightSingleElement();
        });
        $(document).on('ExhaustStreamCalculated', function (event, ExhaustStreamCalculated) {
            _this.exhaustStreamCalculatedControl.val(ExhaustStreamCalculated);
        });
        $('#modalHoodSelectionOfferHoodDetails').on('hide.bs.modal', function () {
            if (_this.areControlsDisabled == false) {
                _this.save();
            }
        });
        $('#modalHoodSelectionOfferHoodDetails').on('show.bs.modal', function () {
            $('[href="#pillOfferDetails"]').tab('show');
        });
        $('#btnAddNewHood').click(function () {
            _this.edit(null);
        });
        this.calculateScrollableHeight();
        $(window).resize(function () {
            if (_this.resizeTimeout != null) {
                clearTimeout(_this.resizeTimeout);
            }
            _this.resizeTimeout = setTimeout(function () {
                clearTimeout(_this.resizeTimeout);
                _this.resizeTimeout = null;
                _this.calculateScrollableHeight();
            }, 300);
        });
    };
    HoodSelectionOfferHoodDetailsModal.prototype.assignControls = function () {
        this.hoodNrControl = $('#HoodNr');
        this.typeControl = $('#Type');
        this.filterTypeControl = $('#FilterType');
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
        this.maxVentilatorStreamControl = $('#MaxVentilatorStream');
        this.exhaustStreamAcceptedControl = $('#ExhaustStreamAccepted');
        this.exhaustStreamAdditionalValueControl = $('#ExhaustStreamAdditionalValue');
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
        this.locationTypeControl = $('#LocationType');
        this.moduleCountControl = $('#ModuleCount');
        this.lightingLED12036WCountControl = $('#LightingLED12036WCount');
        this.lightingLED12060WCountControl = $('#LightingLED12060WCount');
        this.lightingLED15050WCountControl = $('#LightingLED15050WCount');
        this.lightingLED15075WCountControl = $('#LightingLED15075WCount');
        this.lightingLED6018WCountControl = $('#LightingLED6018WCount');
        this.lightingLED6030WCountControl = $('#LightingLED6030WCount');
        this.lightingLED9045WCountControl = $('#LightingLED9045WCount');
        this.lightingLED9CountControl = $('#LightingLED9Count');
        this.priceAdditionalValueControl = $('#PriceAdditionalValue');
        this.priceAdditionalValueControl = $('#PriceAdditionalValue');
        this.hoodOfferNumberModalControl = $('#HoodOfferNumberModal');
        this.hoodStatusTextModalControl = $('#HoodStatusTextModal');
        this.orderNoTextControl = $('#OrderNoText');
        this.weightControl = $('#Weight');
        this.weightAdditionalValueControl = $('#WeightAdditionalValue');
        this.layoutTypeControl = $('#LayoutType');
        this.additionalAccessoryAnsulEnabledControl = $('#AdditionalAccessoryAnsulEnabled');
        this.additionalAccessoryAnsulTypeControl = $('#AdditionalAccessoryAnsulType');
        this.finalPriceSingleElementControl = $('#FinalPriceSingleElement');
        this.finalWeightSingleElementControl = $('#FinalWeightSingleElement');
    };
    HoodSelectionOfferHoodDetailsModal.prototype.disableAllControls = function () {
        $('#modalHoodSelectionOfferHoodDetails').find('select, input:text, input:checkbox, textarea').attr('disabled', true);
        //$('#btnSaveHoodOffer').hide();
        //$('#btnAddNewHood').hide();
        //this.areControlsDisabled = true;
        //$('#hoodOfferElementsTable_wrapper .remove').hide();
        //hoodSelectionOfferDetails.areControlsDisabled = true;
    };
    HoodSelectionOfferHoodDetailsModal.prototype.calculateScrollableHeight = function () {
        var height = ($(window).height() - 340);
        $('#modalHoodSelectionOfferHoodDetails #pillOfferDetails .scrollableContent').height(height)
            .css('max-height', height + 'px');
        height += 47;
        $('#modalHoodSelectionOfferHoodDetails #pillAirCalculation .scrollableContent').height(height)
            .css('max-height', height + 'px');
    };
    HoodSelectionOfferHoodDetailsModal.prototype.loadHoodPartsPriceList = function () {
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
    HoodSelectionOfferHoodDetailsModal.prototype.clearFormValues = function () {
        $('#formHoodSelectionOfferHoodDetails').find('input, textarea').val('');
        $('#formHoodSelectionOfferHoodDetails').find('input:checkbox').prop('checked', false);
        $('#formHoodSelectionOfferHoodDetails').find('select').each(function (index, element) {
            $(element)[0].selectedIndex = 0;
        });
        $('#formHoodSelectionOfferHoodDetails [data-initval]').each(function (index, element) {
            $(element).val($(element).attr('data-initval'));
        });
        this.heightControl.val('540').trigger('change');
        this.ventilatorDiameterControl.val('250').trigger('change');
        this.locationTypeControl.val('Wyspowy').trigger('change');
        this.typeControl.selectpicker('refresh');
        //if (typeof hoodSelectionOfferDetailsHoodList !== 'undefined') {
        //    this.orderNoTextControl.val(hoodSelectionOfferDetailsHoodList.getListItemsCount() + 1).trigger('change');
        //}
    };
    HoodSelectionOfferHoodDetailsModal.prototype.edit = function (hoodOfferElementId) {
        var _this = this;
        this.hoodOfferElementId = hoodOfferElementId;
        this.clearFormValues();
        if (this.hoodOfferElementId != null) {
            this.isEditDataLoading = true;
            $.ajax({
                url: '/Api/ApiHoodOfferElements/GetHoodOfferElementData',
                data: { id: this.hoodOfferElementId },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET'
            }).then(function (result) {
                _this.typeControl.val(result.Type).trigger('change');
                _this.filterTypeControl.val(result.FilterType).trigger('change');
                _this.lengthControl.val(result.Length).trigger('change');
                _this.lengthAdditionalValueControl.val(result.LengthAdditionalValue).trigger('change');
                _this.widthControl.val(result.Width).trigger('change');
                _this.widthAdditionalValueControl.val(result.WidthAdditionalValue).trigger('change');
                _this.heightControl.val(result.Height).trigger('change');
                _this.heightAdditionalValueControl.val(result.HeightAdditionalValue).trigger('change');
                _this.ventilatorDiameterControl.val(result.VentilatorDiameter).trigger('change');
                _this.ventilatorDiameterAdditionalValueControl.val(result.VentilatorDiameterAdditionalValue).trigger('change');
                _this.wiresCountControl.val(result.WiresCount).trigger('change');
                _this.ventilatorCountControl.val(result.VentilatorCount).trigger('change');
                _this.ventilatorCountAdditionalValueControl.val(result.VentilatorCountAdditionalValue).trigger('change');
                _this.ventilatorStreamControl.val(result.VentilatorStream).trigger('change');
                _this.exhaustStreamAdditionalValueControl.val(result.ExhaustStreamAdditionalValue).trigger('change');
                _this.hoodOfferNumberModalControl.val(result.HoodOfferNumberModal).trigger('change');
                _this.hoodStatusTextModalControl.val(result.HoodStatusTextModal).trigger('change');
                if (result.AdditionalFilterExhaustStreamAccepted != null) {
                    result.ExhaustStreamAccepted += result.AdditionalFilterExhaustStreamAccepted;
                }
                _this.exhaustStreamAcceptedControl.val(result.ExhaustStreamAccepted).trigger('change');
                _this.exhaustCountControl.val(result.ExhaustCount).trigger('change');
                _this.exhaustDiameterControl.val(result.ExhaustDiameter).trigger('change');
                _this.exhaustDiameterAdditionalValueControl.val(result.ExhaustDiameterAdditionalValue).trigger('change');
                _this.exhaustCountAdditionalValueControl.val(result.ExhaustCountAdditionalValue).trigger('change');
                _this.controlPanelUnitEnabledControl.prop('checked', result.ControlPanelUnitEnabled).trigger('change');
                _this.controlPanelCountControl.val(result.ControlPanelCount).trigger('change');
                _this.controlUnitCountControl.val(result.ControlUnitCount).trigger('change');
                _this.additionalFilterExhaustCountControl.val(result.AdditionalFilterExhaustCount).trigger('change');
                _this.additionalFilterFilterAcceptedControl.val(result.AdditionalFilterFilterAccepted).trigger('change');
                _this.additionalFilterExhaustStreamAcceptedControl.val(result.AdditionalFilterExhaustStreamAccepted).trigger('change');
                _this.locationTypeControl.val(result.LocationType).trigger('change');
                _this.moduleCountControl.val(result.ModuleCount).trigger('change');
                _this.lightingLED12036WCountControl.val(result.LightingLED12036WCount).trigger('change');
                _this.lightingLED12060WCountControl.val(result.LightingLED12060WCount).trigger('change');
                _this.lightingLED15050WCountControl.val(result.LightingLED15050WCount).trigger('change');
                _this.lightingLED15075WCountControl.val(result.LightingLED15075WCount).trigger('change');
                _this.lightingLED6018WCountControl.val(result.LightingLED6018WCount).trigger('change');
                _this.lightingLED6030WCountControl.val(result.LightingLED6030WCount).trigger('change');
                _this.lightingLED9045WCountControl.val(result.LightingLED9045WCount).trigger('change');
                _this.lightingLED9CountControl.val(result.LightingLED9Count).trigger('change');
                _this.additionalAccessoryAnsulEnabledControl.prop('checked', result.AdditionalAccessoryAnsulEnabled).trigger('change');
                _this.orderNoTextControl.val(result.OrderNoText).trigger('change');
                _this.additionalAccessoryAnsulTypeControl.val(result.AdditionalAccessoryAnsulType).trigger('change');
                //this.priceControl.val(result.Price);
                $('#Comments').val(result.Comments).trigger('change');
                $('#HoodOfferElementId').val(result.HoodOfferElementId);
                $('#SAllDevicesEnabled').prop('checked', result.SAllDevicesEnabled).trigger('change');
                if (result.SAllDevicesValue < 0.3) {
                    result.SAllDevicesValue = 0.7;
                }
                $('#SAllDevicesValue').val(result.SAllDevicesValue.toFixed(2)).trigger('change');
                $('#Factor063Enabled').prop('checked', result.Factor063Enabled).trigger('change');
                _this.priceAdditionalValueControl.val(utility.toInt(result.PriceAdditionalValue)).trigger('change');
                _this.finalPriceSingleElementControl.val(result.FinalPriceSingleElement);
                _this.finalWeightSingleElementControl.val(result.FinalWeightSingleElement);
                _this.layoutTypeControl.val(result.LayoutType).trigger('change');
                _this.weightControl.val(result.Weight).trigger('change');
                _this.weightAdditionalValueControl.val(result.WeightAdditionalValue).trigger('change');
            }).then(function () {
                return hoodSelectionOfferDetailsAirCalculation.edit(_this.hoodOfferElementId);
            }).then(function () {
                if (_this.areControlsDisabled) {
                    _this.disableAllControls();
                }
                _this.isEditDataLoading = false;
                $('#modalHoodSelectionOfferHoodDetails').modal();
            }).fail(function (xhr) {
                console.error(xhr);
                utility.showError();
            });
        }
        else {
            this.setNextOrderNo();
            hoodSelectionOfferDetailsAirCalculation.edit(null);
            $('#modalHoodSelectionOfferHoodDetails').modal();
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setNextOrderNo = function () {
        var _this = this;
        $.get('/Api/ApiHoodOfferElements/GetNextHoodOfferElementOrderNo?hoodOfferId=' + $('#HoodOfferId').val())
            .then(function (result) {
            _this.orderNoTextControl.val(result);
        }).fail(function (xhr) {
            console.error(xhr);
        });
    };
    HoodSelectionOfferHoodDetailsModal.prototype.save = function () {
        var dataToSend = $.extend(utility.getFormData($('#formHoodSelectionOfferHoodDetails')), {
            hoodOfferId: $('#HoodOfferId').val(),
            SAllDevicesEnabled: $('#SAllDevicesEnabled').is(':checked'),
            SAllDevicesValue: $('#SAllDevicesValue').val(),
            Factor063Enabled: $('#Factor063Enabled').is(':checked'),
            ControlPanelUnitEnabled: this.controlPanelUnitEnabledControl.is(':checked'),
            PriceAdditionalValue: numeral(this.priceAdditionalValueControl.val()).value(),
            FinalPriceSingleElement: numeral(this.finalPriceSingleElementControl.val()).value(),
            AdditionalAccessoryAnsulEnabled: this.additionalAccessoryAnsulEnabledControl.is(':checked'),
        });
        dataToSend.Price = this.priceControl.val().replace(',', '.').replace(' ', '');
        $.ajax({
            url: '/Api/ApiHoodOfferElements/SaveHoodOfferElementData',
            data: JSON.stringify(dataToSend),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST'
        }).then(function (result) {
            hoodSelectionOfferDetailsAirCalculation.hoodOfferElementId = result;
            return hoodSelectionOfferDetailsAirCalculation.save();
        }).then(function () {
            if (typeof hoodSelectionOfferDetailsHoodList !== 'undefined') {
                hoodSelectionOfferDetailsHoodList.loadList();
            }
            if (typeof hoodSelectionAllOfferDetailsHoodList !== 'undefined') {
                hoodSelectionAllOfferDetailsHoodList.loadList();
            }
        }).fail(function (xhr) {
            console.error(xhr);
            utility.showError();
        });
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpFormControls = function () {
        this.hoodNrValue = '';
        this.exhaustCountInfoControl.text('').removeClass('text-danger');
        this.filterAcceptedControl.val('').attr('data-hiddenName', '').closest('.row').addClass('hidden');
        this.additionalFilterExhaustCountInfoControl.text('');
        this.displayHideAdditionalFilterControls(false);
        this.setUpType();
        if (this.typeValue == "JKI" || this.typeValue == "JSKI") {
            $('.lighting1').addClass('hidden').find('input:text').val('0');
            $('.lighting2').removeClass('hidden');
        }
        else {
            $('.lighting1').removeClass('hidden');
            $('.lighting2').addClass('hidden').find('input:text').val('0');
        }
        this.setUpLayoutType();
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
        this.setUpAdditionalAccessory();
        this.setUpPrice();
        this.canChangeExhaustCount = false;
        //this.canChangeExhaustStreamAccepted = false;
        this.hoodNrControl.val(this.hoodNrValue);
        if (this.typeValue == "JKI" || this.typeValue == "JLI-S" || this.typeValue == "JLI-R") {
            $('#panelVentilator').addClass('hidden');
        }
        else {
            $('#panelVentilator').removeClass('hidden');
        }
        this.setUpWeight();
    };
    HoodSelectionOfferHoodDetailsModal.prototype.displayHideAdditionalFilterControls = function (display) {
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
    HoodSelectionOfferHoodDetailsModal.prototype.setUpLayoutType = function () {
        var items = [];
        var modulesCount = parseInt(this.moduleCountControl.val());
        //items.push({ value: '', text: '' });
        if (modulesCount == 1) {
            items.push({ value: 1, text: '1' });
        }
        else if (modulesCount == 2) {
            items.push({ value: 2, text: '2-1' });
            items.push({ value: 3, text: '2-2' });
        }
        else if (modulesCount == 3) {
            items.push({ value: 4, text: '3-1' });
        }
        else if (modulesCount >= 4) {
            items.push({ value: 5, text: '4-1' });
            items.push({ value: 6, text: '4-2' });
        }
        var selectedValue = this.layoutTypeControl.val();
        this.layoutTypeControl.empty();
        for (var i = 0; i < items.length; i++) {
            this.layoutTypeControl.append('<option value="' + items[i].value + '">' + items[i].text + '</option>');
        }
        if (this.layoutTypeControl.find('option[value="' + selectedValue + '"]')) {
            this.layoutTypeControl.val(selectedValue);
        }
        this.layoutTypeControl.selectpicker('refresh');
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpType = function () {
        this.typeValue = this.typeControl.val();
        this.hoodNrValue = this.typeValue + '-';
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpFilters = function () {
        var filtersValue = this.filterTypeControl.val();
        var items = [];
        if (this.typeValue != 'JSKI' && this.typeValue != 'JKI') {
            items.push('JCE', 'JFF5', 'JFF8', 'UV', 'Turbo', 'UV-Turbo');
            if (this.typeValue == 'JLI-R' || this.typeValue == 'JLI-S') {
                items.push('Brak');
            }
        }
        this.filterTypeControl.empty();
        for (var i = 0; i < items.length; i++) {
            this.filterTypeControl.append('<option>' + items[i] + '</option>');
        }
        if (items.length == 0) {
            this.filterTypeControl.closest('.col-sm-3').addClass('hidden');
        }
        else {
            this.filterTypeControl.closest('.col-sm-3').removeClass('hidden');
        }
        //this.filtersControl.attr('disabled', items.length == 0);
        if ($.inArray(filtersValue, items) >= 0) {
            this.filterTypeControl.val(filtersValue);
        }
        else {
            filtersValue = this.filterTypeControl.val();
        }
        this.filterTypeControl.selectpicker('refresh');
        if (items.length > 0 && filtersValue != 'Brak') {
            this.hoodNrValue += filtersValue + '-';
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpLenth = function () {
        var lengthValue = this.lengthAdditionalValueControl.val() != '' ? this.lengthAdditionalValueControl.val() : this.lengthControl.val();
        if (lengthValue != '') {
            this.hoodNrValue += lengthValue + 'x';
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpWidth = function () {
        var widthValue = this.widthAdditionalValueControl.val() != '' ? this.widthAdditionalValueControl.val() : this.widthControl.val();
        if (widthValue != '') {
            this.hoodNrValue += widthValue + 'x';
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpHeight = function () {
        var heightValue = this.heightAdditionalValueControl.val() != '' ? this.heightAdditionalValueControl.val() : this.heightControl.val();
        if (heightValue != '') {
            this.hoodNrValue += heightValue + '-';
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpVentilatorCount = function () {
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
    HoodSelectionOfferHoodDetailsModal.prototype.setUpVentilatorDiameter = function () {
        var ventilatorDiameterValue = this.ventilatorDiameterControl.val();
        var items = [];
        if (this.typeValue == 'JVI-R' || this.typeValue == 'JVI-R-W') {
            items.push('100');
        }
        else if (this.typeValue == 'JSI-R' || this.typeValue == 'JSVI-R' || this.typeValue == 'JSVI-R-W' || this.typeValue == 'JSVI-S'
            || this.typeValue == 'JSI-S' || this.typeValue == 'JSVI-S-W' || this.typeValue == 'JSKI') {
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
    HoodSelectionOfferHoodDetailsModal.prototype.setUpWiresCount = function () {
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
    HoodSelectionOfferHoodDetailsModal.prototype.setUpExhaustCount = function () {
        var filtersValue = this.filterTypeControl.val();
        var exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
        if (this.canChangeExhaustCount && !this.isEditDataLoading) {
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
    HoodSelectionOfferHoodDetailsModal.prototype.setUpExhaustDiameter = function () {
        var exhaustDiameterValue = this.exhaustDiameterControl.val();
        var items = [];
        var filtersValue = this.filterTypeControl.val();
        var aaabbbItems = [];
        switch (filtersValue) {
            case 'JCE':
                aaabbbItems.push({ min: 144, max: 250, diameter: 200, name: 'JCE-1+1' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 200, name: 'JCE2' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 315, name: 'JCE3' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 315, name: 'JCE4' });
                aaabbbItems.push({ min: 971, max: 1250, diameter: 315, name: 'JCE5' });
                aaabbbItems.push({ min: 1251, max: 1440, diameter: 400, name: 'JCE6' });
                aaabbbItems.push({ min: 1441, max: 1670, diameter: 400, name: 'JCE7' });
                aaabbbItems.push({ min: 1671, max: 2000, diameter: 400, name: 'JCE8' });
                break;
            case 'JFF5':
                aaabbbItems.push({ min: 144, max: 250, diameter: 315, name: 'JFF-1+4' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 315, name: 'JFF-2+3' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 315, name: 'JFF-3+2' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 315, name: 'JFF-4+1' });
                aaabbbItems.push({ min: 971, max: 1250, diameter: 315, name: 'JFF-5' });
                break;
            case 'JFF8':
                aaabbbItems.push({ min: 144, max: 250, diameter: 400, name: 'JFF-1+7' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 400, name: 'JFF-2+6' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 400, name: 'JFF-3+5' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 400, name: 'JFF-4+4' });
                aaabbbItems.push({ min: 971, max: 1250, diameter: 400, name: 'JFF-5+3' });
                aaabbbItems.push({ min: 1251, max: 1440, diameter: 400, name: 'JFF-6+2' });
                aaabbbItems.push({ min: 1441, max: 1670, diameter: 400, name: 'JFF-7+1' });
                aaabbbItems.push({ min: 1671, max: 2000, diameter: 400, name: 'JFF-8' });
                break;
            case 'UV':
                aaabbbItems.push({ min: 144, max: 250, diameter: 400, name: 'UV-1+7', hiddenName: 'UV-1+7' });
                aaabbbItems.push({ min: 251, max: 500, diameter: 400, name: 'UV-2+6', hiddenName: 'UV-2+6' });
                aaabbbItems.push({ min: 501, max: 755, diameter: 400, name: 'UV-3+5', hiddenName: 'UV-3+5' });
                aaabbbItems.push({ min: 756, max: 970, diameter: 400, name: 'UV-4+4', hiddenName: 'UV-4+4' });
                aaabbbItems.push({ min: 971, max: 1250, diameter: 400, name: 'UV-5+3', hiddenName: 'UV-5+3' });
                aaabbbItems.push({ min: 1251, max: 1440, diameter: 400, name: 'UV-6+2', hiddenName: 'UV-6+2' });
                aaabbbItems.push({ min: 1441, max: 1670, diameter: 400, name: 'UV-7+1', hiddenName: 'UV-7+1' });
                aaabbbItems.push({ min: 1671, max: 2000, diameter: 400, name: 'UV-8', hiddenName: 'UV-8' });
            case 'Turbo':
            case 'UV-Turbo':
                aaabbbItems.push({ min: 0, max: 800, diameter: 315 });
                break;
            default: // this.typeValue == 'JSKI' || this.typeValue == 'JKI'
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
                this.exhaustCountInfoControl.html('(' + rangeMin + '-' + rangeMax + 'm<sup>3</sup>/h)' + additionalInfo);
                if (diameterItem[0].name != null) {
                    this.filterAcceptedControl.val(diameterItem[0].name).attr('data-hiddenName', diameterItem[0].name).closest('.row').removeClass('hidden');
                    if (diameterItem[0].hiddenName != null) {
                        this.filterAcceptedControl.attr('data-hiddenName', diameterItem[0].hiddenName);
                    }
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
        //if (this.typeValue == 'JVI-R') {
        //    this.exhaustDiameterAdditionalValueControl.val('').closest('.col-sm-3').addClass('invisible');
        //} else {
        //    this.exhaustDiameterAdditionalValueControl.closest('.col-sm-3').removeClass('invisible');
        //}
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
            if (!isNaN(parseInt(exhaustCountValue))) {
                exhaustCountValueNumber = parseInt(exhaustCountValue);
                if (exhaustDiameterValue != '' && this.additionalFilterExhaustDiameter != null && exhaustDiameterValue == this.additionalFilterExhaustDiameter
                    && additionalFilterExhaustCount != '' && parseInt(additionalFilterExhaustCount)) {
                    exhaustCountValueNumber += parseInt(additionalFilterExhaustCount);
                }
                this.hoodNrValue += exhaustCountValueNumber + 'x';
            }
            else {
                this.hoodNrValue += exhaustCountValue + 'x';
            }
        }
        if (items.length > 0) {
            this.hoodNrValue += exhaustDiameterValue;
            if (this.additionalFilterExhaustDiameter != null && (exhaustDiameterValue != this.additionalFilterExhaustDiameter || isNaN(parseInt(exhaustCountValue))) && additionalFilterExhaustCount != '') {
                this.hoodNrValue += '/' + additionalFilterExhaustCount + 'x' + this.additionalFilterExhaustDiameter;
            }
            if (this.typeValue == 'JVI-R-W' || this.typeValue == 'JLI-R' || this.typeValue == 'JLI-S' || this.typeValue == 'JKI') {
                this.hoodNrValue += '-';
            }
            else {
                this.hoodNrValue += '+';
            }
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpVentilatorStream = function () {
        if (this.typeValue == 'JVI-R-W' || this.typeValue == 'JLI-R' || this.typeValue == 'JLI-S' || this.typeValue == 'JKI') {
            this.ventilatorStreamControl.closest('.col-sm-3').addClass('hidden');
            this.maxVentilatorStreamControl.closest('.col-sm-3').addClass('hidden');
            this.ventilatorStreamControl.val('');
        }
        else {
            this.ventilatorStreamControl.closest('.col-sm-3').removeClass('hidden');
            this.maxVentilatorStreamControl.closest('.col-sm-3').removeClass('hidden');
            if (this.ventilatorStreamControl.val() == '') {
                this.ventilatorStreamControl.val('0');
            }
        }
        var ventilatorStreamValue = this.ventilatorStreamControl.val();
        if (ventilatorStreamValue != '') {
            this.hoodNrValue += ventilatorStreamValue + 'm³/h-';
        }
        var exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
        if (exhaustStreamAcceptedValue != '') {
            var maxVentilatorStream = Math.round(0.9 * parseInt(exhaustStreamAcceptedValue));
            this.maxVentilatorStreamControl.val(maxVentilatorStream);
        }
        else {
            this.maxVentilatorStreamControl.val('');
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpExhaustStream = function () {
        var exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.attr('data-value');
        if (exhaustStreamAcceptedValue == '' || exhaustStreamAcceptedValue == null) {
            exhaustStreamAcceptedValue = this.exhaustStreamAcceptedControl.val();
        }
        if (this.exhaustStreamAdditionalValueControl.val() != '') {
            exhaustStreamAcceptedValue = this.exhaustStreamAdditionalValueControl.val();
        }
        if (exhaustStreamAcceptedValue != '') {
            this.hoodNrValue += exhaustStreamAcceptedValue + 'm³/h';
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpAdditionalFilterFilterAccepted = function () {
        this.additionalFilterExhaustDiameter = null;
        var items = [];
        var additionalFilterFilterAccepted = this.additionalFilterFilterAcceptedControl.val();
        var additionalFilterExhaustCount = this.additionalFilterExhaustCountControl.val();
        var filtersValue = this.filterTypeControl.val();
        if (filtersValue != '' && filtersValue != 'Turbo' && filtersValue != 'UV-Turbo') {
            items.push({ name: '' });
            items.push({ min: 144, max: 250, diameter: 200, name: 'JCE-1+1' });
            items.push({ min: 251, max: 500, diameter: 200, name: 'JCE2' });
            items.push({ min: 501, max: 755, diameter: 315, name: 'JCE3' });
            items.push({ min: 756, max: 970, diameter: 315, name: 'JCE4' });
            items.push({ min: 971, max: 1250, diameter: 315, name: 'JCE5' });
            items.push({ min: 1251, max: 1440, diameter: 400, name: 'JCE6' });
            items.push({ min: 1441, max: 1670, diameter: 400, name: 'JCE7' });
            items.push({ min: 1671, max: 2000, diameter: 400, name: 'JCE8' });
            if (filtersValue == 'JFF5' || filtersValue == 'JFF8' || filtersValue == 'UV') {
                items.push({ min: 144, max: 250, diameter: 315, name: 'JFF-1+4' });
                items.push({ min: 251, max: 500, diameter: 315, name: 'JFF-2+3' });
                items.push({ min: 501, max: 755, diameter: 315, name: 'JFF-3+2' });
                items.push({ min: 756, max: 970, diameter: 315, name: 'JFF-4+1' });
                items.push({ min: 971, max: 1250, diameter: 315, name: 'JFF-5' });
            }
            if (filtersValue == 'JFF8' || filtersValue == 'UV') {
                items.push({ min: 144, max: 250, diameter: 400, name: 'JFF-1+7' });
                items.push({ min: 251, max: 500, diameter: 400, name: 'JFF-2+6' });
                items.push({ min: 501, max: 755, diameter: 400, name: 'JFF-3+5' });
                items.push({ min: 756, max: 970, diameter: 400, name: 'JFF-4+4' });
                items.push({ min: 971, max: 1250, diameter: 400, name: 'JFF-5+3' });
                items.push({ min: 1251, max: 1440, diameter: 400, name: 'JFF-6+2' });
                items.push({ min: 1441, max: 1670, diameter: 400, name: 'JFF-7+1' });
                items.push({ min: 1671, max: 2000, diameter: 400, name: 'JFF-8' });
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
    HoodSelectionOfferHoodDetailsModal.prototype.setUpControlPanelUnit = function () {
        if (this.filterTypeControl.val() == 'UV') {
            this.controlPanelUnitEnabledControl.val('').closest('.col-sm-2').addClass('hidden');
        }
        else {
            this.controlPanelUnitEnabledControl.closest('.col-sm-2').removeClass('hidden');
        }
        if (this.controlPanelUnitEnabledControl.is(':checked') || this.filterTypeControl.val() == 'UV') {
            this.controlPanelCountControl.closest('.col-sm-2').removeClass('hidden');
            this.controlUnitCountControl.closest('.col-sm-2').removeClass('hidden');
            if (this.controlPanelCountControl.val() == '') {
                this.controlPanelCountControl.val('1');
            }
            if (this.controlUnitCountControl.val() == '') {
                this.controlUnitCountControl.val('1');
            }
        }
        else {
            this.controlPanelCountControl.val('').closest('.col-sm-2').addClass('hidden');
            this.controlUnitCountControl.val('').closest('.col-sm-2').addClass('hidden');
            this.controlUnitCountControl.val('');
        }
        if (this.controlPanelCountControl.val() != '' && parseInt(this.controlPanelCountControl.val()) > 0) {
            this.hoodNrValue += '+FC';
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpAdditionalAccessory = function () {
        if (this.additionalAccessoryAnsulEnabledControl.is(':checked')) {
            this.additionalAccessoryAnsulTypeControl.closest('.col-sm-3').removeClass('hidden');
            if (this.additionalAccessoryAnsulTypeControl.val() == null) {
                this.additionalAccessoryAnsulTypeControl.val(this.additionalAccessoryAnsulTypeControl.find('option:first').val()).trigger('change');
            }
        }
        else {
            this.additionalAccessoryAnsulTypeControl.val(null).closest('.col-sm-3').addClass('hidden');
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpPrice = function () {
        var price = null;
        if (this.filterTypeControl.val() != 'Turbo' && this.filterTypeControl.val() != 'UV-Turbo') {
            price = this.getFilterPrice(this.exhaustCountControl.val(), this.filterAcceptedControl.attr('data-hiddenName'), true);
        }
        else {
            price = this.getFilterPrice(this.exhaustCountControl.val(), this.filterTypeControl.val(), true);
        }
        if (this.additionalFilterExhaustCountControl.val() != '' && this.additionalFilterFilterAcceptedControl.val() != '') {
            price += this.getFilterPrice(this.additionalFilterExhaustCountControl.val(), this.additionalFilterFilterAcceptedControl.val(), false);
        }
        if (this.controlPanelCountControl.val() != '' && this.controlUnitCountControl.val() != '') {
            price += parseInt(this.controlPanelCountControl.val()) * this.hoodPartsPriceList['cena za panel dotykowy']
                + parseInt(this.controlUnitCountControl.val()) * this.hoodPartsPriceList['cena za jednostkę sterującą'];
        }
        price += parseInt(this.lightingLED9CountControl.val()) * this.hoodPartsPriceList['ledy punktowe'];
        //price += this.getAnsulPrice();
        if (price != null && !isNaN(price)) {
            this.priceControl.val(utility.toInt(Math.round(price)));
        }
        else {
            this.priceControl.val('');
        }
        this.setUpFinalPriceSingleElement();
    };
    //private getAnsulPrice() {
    //    let result = 0;
    //    if (this.additionalAccessoryAnsulEnabledControl.is(':checked') && this.additionalAccessoryAnsulTypeControl.val() != 'Brak wyboru') {
    //        result += this.hoodPartsPriceList['ANSUL układ ' + this.additionalAccessoryAnsulTypeControl.val().charAt(this.additionalAccessoryAnsulTypeControl.val().length - 13) + '-zbiornikowy'];
    //    }
    //    return result
    //}
    HoodSelectionOfferHoodDetailsModal.prototype.getFilterPrice = function (exhaustCount, filterAcepted, isMainFilter) {
        var a = (2 * (parseInt(this.lengthControl.val()) + parseInt(this.widthControl.val())) * this.hoodPartsPriceList['cena za mb okapu'] / 1000
            + 2 * parseInt(this.heightControl.val()) * (parseInt(this.lengthControl.val()) + parseInt(this.widthControl.val())) * this.hoodPartsPriceList['cena za powierzchnie boczne okapu'] / 1000000
            + parseInt(this.lengthControl.val()) * parseInt(this.widthControl.val()) * this.hoodPartsPriceList['cena za dach okapu'] / 1000000);
        var b1 = null;
        var jsiPrice = null;
        if (this.heightControl.val() == '540') {
            if (this.ventilatorDiameterControl.val() == '250') {
                jsiPrice = this.hoodPartsPriceList['cena za nawiewnik 500x500'];
            }
            else {
                jsiPrice = this.hoodPartsPriceList['cena za nawiewnik 500x200'];
            }
        }
        else {
            jsiPrice = this.hoodPartsPriceList['cena za nawiewnik 330x500'];
        }
        //if (this.wiresCountControl.closest('.col-sm-3').hasClass('hidden')) {
        b1 = parseInt(this.ventilatorCountControl.val()) * jsiPrice;
        // + parseInt(this.ventilatorCountControl.val()) * this.hoodPartsPriceList['cena za nawiewnik']);
        //} else {
        //    b1 = (parseInt(this.wiresCountControl.val()) * jsiPrice
        //        + parseInt(this.ventilatorCountControl.val()) * this.hoodPartsPriceList['cena za nawiewnik']);
        //}
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
                    // JCE1-1
                    if (filtersCount.indexOf('JCE') >= 0) {
                        filterName = 'JCE';
                    }
                    else if (filtersCount.indexOf('+') >= 0) {
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
        if (filterName != '' && filterName != null && filterName.startsWith('UV') && !filterName.startsWith('UV-Turbo')) {
            filterName = filterName.substr(0, 2);
        }
        var c1 = (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE']);
        var c2 = (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['turboswing']);
        var c3 = (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['UV-Turbo']);
        var c4 = ((modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE'])
            + (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za filtr FF-8']));
        var c5 = ((modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE'])
            + (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za filtr FF-5']));
        var c6 = ((modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za komorę filtracji'] + filtersCountNumber * this.hoodPartsPriceList['cena za filtr JCE'])
            + (modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['cena za UV'] + modulesCount * parseInt(exhaustCount) * this.hoodPartsPriceList['dopłata z FF do FF dla UV']));
        var c7 = (parseInt(this.lengthControl.val()) * parseInt(this.widthControl.val()) / 1000000 * this.hoodPartsPriceList['płyty kondensacyjne']);
        var d1 = null;
        if (this.ventilatorCountControl.closest('.col-sm-3').hasClass('hidden')) {
            d1 = parseInt(this.wiresCountControl.val()) * this.hoodPartsPriceList['wentylator wiązki'];
        }
        else {
            d1 = parseInt(this.ventilatorCountControl.val()) * this.hoodPartsPriceList['wentylator wiązki'];
        }
        //let d2 = this.hoodPartsPriceList['cena za panel dotykowy'];
        //let d3 = this.hoodPartsPriceList['ledy punktowe'];
        var price = null;
        switch (this.typeValue) {
            case 'JSI-R':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? a + b1 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? a + b1 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? a + b1 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? a + b1 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? a + b1 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? a + b1 : 0) + c3;
                        break;
                }
                break;
            case 'JSVI-R':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? a + b1 + b2 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? a + b1 + b2 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? a + b1 + b2 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? a + b1 + b2 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? a + b1 + b2 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? a + b1 + b2 : 0) + c3;
                        break;
                }
                break;
            case 'JSVI-R-W':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? a + b1 + b2 + d1 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? a + b1 + b2 + d1 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? a + b1 + b2 + d1 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? a + b1 + b2 + d1 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? a + b1 + b2 + d1 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? a + b1 + b2 + d1 : 0) + c3;
                        break;
                }
                break;
            case 'JVI-R':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? a + b2 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? a + b2 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? a + b2 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? a + b2 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? a + b2 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? a + b2 : 0) + c3;
                        break;
                }
                break;
            case 'JVI-R-W':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? a + b2 + d1 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? a + b2 + d1 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? a + b2 + d1 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? a + b2 + d1 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? a + b2 + d1 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? a + b2 + d1 : 0) + c3;
                        break;
                }
                break;
            case 'JLI-R':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? a : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? a : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? a : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? a : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? a : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? a : 0) + c3;
                        break;
                    case 'Brak':
                        price = a;
                        break;
                }
                break;
            case 'JSI-S':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? 1.4 * a + b1 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? 1.4 * a + b1 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? 1.4 * a + b1 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? 1.4 * a + b1 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? 1.4 * a + b1 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? 1.4 * a + b1 : 0) + c3;
                        break;
                }
                break;
            case 'JSVI-S':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 : 0) + c3;
                        break;
                }
                break;
            case 'JSVI-S-W':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 + d1 : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 + d1 : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 + d1 : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 + d1 : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 + d1 : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? 1.4 * a + b1 + b2 + d1 : 0) + c3;
                        break;
                }
                break;
            case 'JLI-S':
                switch (filterName) {
                    case 'JCE':
                        price = (isMainFilter ? 1.4 * a : 0) + c1;
                        break;
                    case 'JFF5':
                        price = (isMainFilter ? 1.4 * a : 0) + c5;
                        break;
                    case 'JFF8':
                        price = (isMainFilter ? 1.4 * a : 0) + c4;
                        break;
                    case 'UV':
                        price = (isMainFilter ? 1.4 * a : 0) + c6;
                        break;
                    case 'Turbo':
                        price = (isMainFilter ? 1.4 * a : 0) + c2;
                        break;
                    case 'UV-Turbo':
                        price = (isMainFilter ? 1.4 * a : 0) + c3;
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
    HoodSelectionOfferHoodDetailsModal.prototype.getWeight = function () {
        var m13 = parseInt(this.layoutTypeControl.val());
        var c7 = parseInt(this.lengthControl.val());
        var m33 = 0;
        switch (m13) {
            case 1:
                m33 = c7;
                break;
            case 2:
                m33 = c7 / 2;
                break;
            case 3:
                m33 = c7;
                break;
            case 4:
                m33 = c7 / 3;
                break;
            case 5:
                m33 = c7 / 4;
                break;
            case 6:
                m33 = c7 / 2;
                break;
        }
        var c9 = parseInt(this.heightControl.val());
        var m29 = c9;
        var m25 = 8;
        var n33 = (m33 - 10) * (m29 + 85) / 1000000;
        var o33 = n33 * m25;
        var c8 = parseInt(this.widthControl.val());
        var m34 = 0;
        switch (m13) {
            case 1:
                m34 = c8;
                break;
            case 2:
                m34 = c8;
                break;
            case 3:
                m34 = c8 / 2;
                break;
            case 4:
                m34 = c8;
                break;
            case 5:
                m34 = c8;
                break;
            case 6:
                m34 = c8 / 2;
                break;
        }
        var n34 = m34 * (m29 + 85) / 1000000;
        var o34 = n34 * m25;
        var o35 = 0;
        switch (m13) {
            case 1:
                o35 = 2 * (o33 + o34);
                break;
            case 2:
                o35 = 2 * (2 * o33 + o34);
                break;
            case 3:
                o35 = 2 * (o33 + 2 * o34);
                break;
            case 4:
                o35 = 2 * (3 * o33 + o34);
                break;
            case 5:
                o35 = 2 * (4 * o33 + o34);
                break;
            case 6:
                o35 = 2 * (2 * o33 + 2 * o34);
                break;
        }
        var m40 = 0;
        switch (m13) {
            case 1:
                m40 = 0;
                break;
            case 2:
                m40 = c8 - 80;
                break;
            case 3:
                m40 = c7 - 80;
                break;
            case 4:
                m40 = (c8 - 80) * 2;
                break;
            case 5:
                m40 = (c8 - 80) * 3;
                break;
            case 6:
                m40 = (c7 - 80 - 80 + c8 - 80);
                break;
        }
        var n40 = m40 / 1000;
        var m22 = 1.5;
        var o40 = n40 * m22 * 2;
        var m41 = 0;
        if (m13 == 1) {
            m41 = 0;
        }
        else {
            m41 = m29;
        }
        var n41 = m41 / 1000;
        var o41 = n41 * m22 * 4;
        var m44 = m29;
        var n44 = m44 / 1000;
        var o44 = n44 * m22 * 4;
        var m24 = 6.4;
        var m45 = m44 - 16;
        var n45 = m45 / 1000 * 0.08;
        var o45 = n45 * m24 * 4;
        var m48 = c7;
        var m49 = c8;
        var n50 = m48 * (m49 + 4 * 48) / 1000000;
        var o50 = n50 * m24;
        var c10 = c8;
        var m52 = c10;
        var m26 = m25 * 1.5;
        var n52 = m52 / 1000 * 0.085;
        var o52 = n52 * m26;
        var d10 = 2;
        var c12 = (this.typeValue.indexOf('-S') >= 0);
        var n37 = n33 * 2 + n34 * 2;
        var m27 = 16.5;
        var o37 = n37 * (m27 - m25) * 0.75;
        var obudowa = Math.ceil((o35 + o40 + o41 + o44 + o45 + o50 + o52 * d10 + (c12 == true ? o37 : 0)) * 10) / 10;
        //console.log('obudowa: ' + obudowa);
        var e14 = 0;
        if (this.typeValue == 'JKI' || this.typeValue == 'JSKI') {
            e14 = 0;
        }
        else {
            var d14 = this.getFilterWeight(this.filterAcceptedControl.val());
            var c14 = parseInt(this.exhaustCountControl.val());
            e14 = d14 * c14;
        }
        var e15 = 0;
        if (this.typeValue == 'JKI' || this.typeValue == 'JSKI' || this.additionalFilterFilterAcceptedControl.val() == ''
            || this.additionalFilterFilterAcceptedControl.val() == null) {
            e15 = 0;
        }
        else {
            var d15 = this.getFilterWeight(this.additionalFilterFilterAcceptedControl.val());
            var c15 = parseInt(this.additionalFilterExhaustCountControl.val());
            e15 = d15 * c15;
        }
        var ventilatorCount = 0;
        if (this.ventilatorCountControl.closest('.col-sm-3').hasClass('hidden')) {
            ventilatorCount = parseInt(this.wiresCountControl.val());
        }
        else {
            ventilatorCount = parseInt(this.ventilatorCountControl.val());
        }
        var e16 = 0;
        if (!$('#panelVentilator').hasClass('hidden')) {
            if (this.heightControl.val() == '540' && this.ventilatorDiameterControl.val() == '250') {
                e16 = ventilatorCount * 7.7;
            }
            else {
                e16 = ventilatorCount * 5.2;
            }
        }
        var e17 = 0;
        var wiresCount = 0;
        if (!$('#panelVentilator').hasClass('hidden') && !this.wiresCountControl.closest('.col-sm-3').hasClass('hidden')) {
            wiresCount = parseInt(this.wiresCountControl.val());
            if (this.heightControl.val() == '540') {
                if (this.typeValue.indexOf('-W') >= 0) {
                    e17 = wiresCount * 6.6;
                }
                else {
                    e17 = wiresCount * 6;
                }
            }
            else {
                if (this.typeValue.indexOf('-W') >= 0) {
                    e17 = wiresCount * 5.2;
                }
                else {
                    e17 = wiresCount * 4.5;
                }
            }
        }
        var e18 = 0;
        if (this.lightingLED6030WCountControl.val() != '' && this.lightingLED6030WCountControl.val() != '0') {
            e18 += parseInt(this.lightingLED6030WCountControl.val()) * 2;
        }
        if (this.lightingLED6018WCountControl.val() != '' && this.lightingLED6018WCountControl.val() != '0') {
            e18 += parseInt(this.lightingLED6018WCountControl.val()) * 2;
        }
        if (this.lightingLED9045WCountControl.val() != '' && this.lightingLED9045WCountControl.val() != '0') {
            e18 += parseInt(this.lightingLED9045WCountControl.val()) * 3;
        }
        if (this.lightingLED12036WCountControl.val() != '' && this.lightingLED12036WCountControl.val() != '0') {
            e18 += parseInt(this.lightingLED12036WCountControl.val()) * 4;
        }
        if (this.lightingLED12060WCountControl.val() != '' && this.lightingLED12060WCountControl.val() != '0') {
            e18 += parseInt(this.lightingLED12060WCountControl.val()) * 4;
        }
        if (this.lightingLED15050WCountControl.val() != '' && this.lightingLED15050WCountControl.val() != '0') {
            e18 += parseInt(this.lightingLED15050WCountControl.val()) * 5;
        }
        if (this.lightingLED15075WCountControl.val() != '' && this.lightingLED15075WCountControl.val() != '0') {
            e18 += parseInt(this.lightingLED15075WCountControl.val()) * 5;
        }
        if (this.lightingLED9CountControl.val() != '' && this.lightingLED9CountControl.val() != '0') {
            e18 += parseInt(this.lightingLED9CountControl.val()) * 0.8;
        }
        var c73 = 0;
        if (this.typeValue == 'JKI' || this.typeValue == 'JSKI') {
            c73 = 0;
        }
        else {
            c73 = 1;
        }
        var m56 = m48;
        var f2 = Math.ceil(c8 / 100) * 100;
        var j15 = 0;
        var j15Array = [
            { f2Value: 900, height330: 408, height540: 488 },
            { f2Value: 1000, height330: 305, height540: 558 },
            { f2Value: 1100, height330: 380, height540: 638 },
            { f2Value: 1200, height330: 460, height540: 698 },
            { f2Value: 1300, height330: 540, height540: 758 },
            { f2Value: 1400, height330: 640, height540: 858 },
            { f2Value: 1500, height330: 730, height540: 730 },
            { f2Value: 1600, height330: 640, height540: 830 },
            { f2Value: 1700, height330: 730, height540: 810 },
            { f2Value: 1800, height330: 820, height540: 790 }
        ];
        for (var _i = 0, j15Array_1 = j15Array; _i < j15Array_1.length; _i++) {
            var item = j15Array_1[_i];
            if (item.f2Value == f2) {
                if (this.heightControl.val() == '330') {
                    j15 = item.height330;
                }
                else if (this.heightControl.val() == '540') {
                    j15 = item.height540;
                }
                break;
            }
        }
        var m57 = j15;
        var n58 = m56 * m57 / 1000000;
        var o58 = n58 * m24;
        var m61 = Math.floor(m56 / 500) * 2;
        var m63 = 551;
        var m64 = 522;
        var n65 = m63 * m64 / 1000000 * m61;
        var o65 = n65 * m24;
        var m68 = 551;
        var m62 = Math.ceil(m56 / 500) * 2;
        var m67 = 0;
        if (500 - 500 * m62 / 2 + m56 == 500) {
            m67 = 0;
        }
        else {
            m67 = 500 - 500 * m62 / 2 + m56;
        }
        var m69 = m67 + 22;
        var n70 = m68 * m69 / 1000000 * (m62 - m61);
        var o70 = n70 * m24;
        var o73 = Math.round((o58 + o65 + o70) * 10) / 10;
        var e19 = 0;
        if (c73 == 1) {
            e19 = 0;
        }
        else {
            e19 = o73;
        }
        var elementyWewnetrzne = e14 + e15 + e16 + e17 + e18 + e19;
        //console.log('elementyWewnetrzne: ' + elementyWewnetrzne);
        var suma = Math.ceil(obudowa + elementyWewnetrzne + 2);
        // 71 kg -> 75 kg, 76 kg -> 80 kg
        suma = Math.ceil(suma / 5) * 5;
        //console.log('suma: ' + suma);
        if (isNaN(suma)) {
            return null;
        }
        else {
            return suma;
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.getFilterWeight = function (filterName) {
        if (filterName == 'JCE-1+1' || filterName == 'JCE2') {
            return 5;
        }
        else if (filterName == 'JCE3') {
            return 7.2;
        }
        else if (filterName == 'JCE4') {
            return 9.1;
        }
        else if (filterName == 'JCE5') {
            return 10.9;
        }
        else if (filterName == 'JCE6') {
            return 13;
        }
        else if (filterName == 'JCE7') {
            return 14.8;
        }
        else if (filterName == 'JCE8') {
            return 16.7;
        }
        else if (filterName == 'JFF-1+4' || filterName == 'JFF-2+3' || filterName == 'JFF-3+2' || filterName == 'JFF-4+1' || filterName == 'JFF-5') {
            return 14.9;
        }
        else if (filterName == 'JFF-1+7' || filterName == 'JFF-2+6' || filterName == 'JFF-3+5' || filterName == 'JFF-4+4' || filterName == 'JFF-5+3'
            || filterName == 'JFF-6+2' || filterName == 'JFF-7+1' || filterName == 'JFF-8') {
            return 22.6;
        }
        else if (this.filterTypeControl.val() == 'UV') {
            return 32.6;
        }
        else if (this.filterTypeControl.val() == 'UV-Turbo') {
            return 13.3;
        }
        else if (this.filterTypeControl.val() == 'Turbo') {
            return 11.3;
        }
        return 0;
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpWeight = function () {
        var calculatedWeight = this.getWeight();
        this.weightControl.val(calculatedWeight).trigger('change');
        this.setUpFinalWeightSingleElement();
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpFinalPriceSingleElement = function () {
        if (this.priceAdditionalValueControl.val() || this.priceControl.val()) {
            var finalPriceSingleElement = numeral(this.priceAdditionalValueControl.val()).value() + numeral(this.priceControl.val()).value();
            this.finalPriceSingleElementControl.val(utility.toInt(finalPriceSingleElement));
        }
        else {
            this.finalPriceSingleElementControl.val('');
        }
    };
    HoodSelectionOfferHoodDetailsModal.prototype.setUpFinalWeightSingleElement = function () {
        if (this.weightAdditionalValueControl.val() || this.weightControl.val()) {
            var finalWeightSingleElement = numeral(this.weightAdditionalValueControl.val()).value() + numeral(this.weightControl.val()).value();
            this.finalWeightSingleElementControl.val(finalWeightSingleElement);
        }
        else {
            this.finalWeightSingleElementControl.val('');
        }
    };
    return HoodSelectionOfferHoodDetailsModal;
}());
var hoodSelectionOfferDetails = new HoodSelectionOfferHoodDetailsModal();
$(document).ready(function () {
    hoodSelectionOfferDetails.init();
});
//# sourceMappingURL=_HoodSelectionOfferHoodDetailsModal.js.map