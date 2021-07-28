var HoodSelectionOfferDetailsAirCalculation = /** @class */ (function () {
    function HoodSelectionOfferDetailsAirCalculation() {
    }
    HoodSelectionOfferDetailsAirCalculation.prototype.init = function () {
        var _this = this;
        this.assignControls();
        this.assignEvents();
        this.setUpFormControls();
        $('#modalHoodSelectionOfferDetails').on('hidden.bs.modal', function () {
            _this.sAllDevicesEnabledControl.prop('checked', true);
        });
    };
    HoodSelectionOfferDetailsAirCalculation.prototype.assignControls = function () {
        this.tblHoodSelectionOfferDetailsAirCalculationControl = $('#tblHoodSelectionOfferDetailsAirCalculation');
        this.tblHoodSelectionOfferDetailsAirCalculationInfo = $('#tblHoodSelectionOfferDetailsAirCalculationInfo');
        this.spanExhaustStreamCalculatedControl = $('#spanExhaustStreamCalculated');
        this.sAllDevicesEnabledControl = $('#SAllDevicesEnabled');
        this.sAllDevicesValueControl = $('#SAllDevicesValue');
        this.factor063EnabledControl = $('#Factor063Enabled');
    };
    HoodSelectionOfferDetailsAirCalculation.prototype.assignEvents = function () {
        var _this = this;
        this.tblHoodSelectionOfferDetailsAirCalculationControl.find('input, select').change(function () {
            _this.setUpFormControls();
        });
        this.tblHoodSelectionOfferDetailsAirCalculationInfo.find('input').change(function () {
            _this.setUpFormControls();
        });
    };
    HoodSelectionOfferDetailsAirCalculation.prototype.setUpFormControls = function () {
        var _this = this;
        var mpSum = 0;
        if (this.sAllDevicesEnabledControl.is(':checked')) {
            //$('.calcS').each((i, el) => {
            //    if ($(el).attr('data-value') == null) {
            //        $(el).attr('data-value', $(el).val());
            //    }
            //});
            $('.calcS').val(this.sAllDevicesValueControl.val());
        }
        //else {
        //    $('.calcS').each((i, el) => {
        //        if ($(el).attr('data-value') != null) {
        //            $(el).val($(el).attr('data-value'));
        //        }
        //    });
        //    $('.calcS').removeAttr('data-value');
        //}
        this.tblHoodSelectionOfferDetailsAirCalculationControl.find('>tbody>tr').each(function (i, el) {
            var element = $(el);
            var selectedNameId = element.find('select.calcName').val();
            var deviceItem = _this.deviceList.filter(function (obj) {
                return obj.Id == selectedNameId;
            })[0];
            var calcKeValue = deviceItem != null ? deviceItem.Ke : 0;
            var calcMpValue = calcKeValue * 3.6 * numeral(element.find('.calcPower').val()).value() * parseFloat(element.find('.calcS').val());
            if (isNaN(calcMpValue) || calcMpValue == 0) {
                calcMpValue = 0;
            }
            calcMpValue = Math.ceil(calcMpValue);
            mpSum += calcMpValue;
            if (selectedNameId != '') {
                element.find('.calcKe').val(calcKeValue);
                element.find('.calcMp').val(calcMpValue);
                if (element.find('.calcS').val() == '') {
                    element.find('.calcS').val(_this.sAllDevicesValueControl.val());
                }
                element.find('.calcS, .calcAlternativeName, .calcPower').attr('disabled', false);
            }
            else {
                element.find('.calcKe').val('');
                element.find('.calcMp').val('');
                element.find('.calcS, .calcAlternativeName, .calcPower').val('').attr('disabled', true);
            }
        });
        if (this.factor063EnabledControl.is(':checked')) {
            mpSum = Math.ceil(mpSum * 0.63);
        }
        this.spanExhaustStreamCalculatedControl.text(mpSum);
        $(document).trigger('ExhaustStreamCalculated', [mpSum]);
    };
    HoodSelectionOfferDetailsAirCalculation.prototype.clearFormValues = function () {
        $('#tblHoodSelectionOfferDetailsAirCalculation').find('input').val('');
        $('#tblHoodSelectionOfferDetailsAirCalculation').find('select').val('').selectpicker('refresh');
        if (this.hoodOfferElementId == null) {
            this.sAllDevicesEnabledControl.prop('checked', true);
            this.sAllDevicesValueControl.val('0.70');
            this.factor063EnabledControl.prop('checked', false);
        }
        this.setUpFormControls();
    };
    HoodSelectionOfferDetailsAirCalculation.prototype.edit = function (hoodOfferElementId) {
        var _this = this;
        this.hoodOfferElementId = hoodOfferElementId;
        this.clearFormValues();
        if (this.hoodOfferElementId != null) {
            return $.ajax({
                url: '/Api/ApiHoodOfferElementAirCalculationDevices/GetHoodOfferElementAirCalculationDevices',
                data: { hoodOfferElementId: this.hoodOfferElementId },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET'
            }).then(function (result) {
                var elements = result.Elements;
                $('#tblHoodSelectionOfferDetailsAirCalculation > tbody > tr').each(function (index, element) {
                    var orderNo = parseInt($(element).attr('data-orderno'));
                    var existingItem = elements.find(function (element, index, array) {
                        return element.OrderNo == orderNo;
                    });
                    if (existingItem != null) {
                        $(element).find('select.calcName').val(existingItem.HoodOfferAirCalculationDeviceId).trigger('change');
                        $(element).find('.calcNumber').val(existingItem.CustomOrderNo);
                        $(element).find('.calcAlternativeName').val(existingItem.AdditionalName);
                        $(element).find('.calcPower').val(numeral(existingItem.Power).format('0.[00]'));
                        $(element).find('.calcS').val(existingItem.SValue);
                        $(element).find('input[type="hidden"]').val(existingItem.Id);
                    }
                });
                _this.setUpFormControls();
            }).fail(function (xhr) {
                console.error(xhr);
                utility.showError();
            });
        }
        return $.when(null);
    };
    HoodSelectionOfferDetailsAirCalculation.prototype.save = function () {
        var dataToSend = {
            hoodOfferElementId: this.hoodOfferElementId,
            elements: []
        };
        $('#tblHoodSelectionOfferDetailsAirCalculation > tbody > tr').each(function (index, element) {
            var orderNo = parseInt($(element).attr('data-orderno'));
            dataToSend.elements.push({
                Id: $(element).find('input[type="hidden"]').val(),
                HoodOfferAirCalculationDeviceId: $(element).find('select.calcName').val(),
                OrderNo: orderNo,
                CustomOrderNo: $(element).find('.calcNumber').val(),
                AdditionalName: $(element).find('.calcAlternativeName').val(),
                Power: numeral($(element).find('.calcPower').val()).value(),
                SValue: $(element).find('.calcS').val(),
                MpValue: $(element).find('.calcMp').val()
            });
        });
        return $.ajax({
            url: '/Api/ApiHoodOfferElementAirCalculationDevices/SaveHoodOfferElementAirCalculationDevices',
            data: JSON.stringify(dataToSend),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST'
        }).then(function (result) {
        }).fail(function (xhr) {
            console.error(xhr);
            utility.showError();
        });
    };
    return HoodSelectionOfferDetailsAirCalculation;
}());
var hoodSelectionOfferDetailsAirCalculation = new HoodSelectionOfferDetailsAirCalculation();
$(document).ready(function () {
    hoodSelectionOfferDetailsAirCalculation.init();
});
//# sourceMappingURL=_HoodSelectionOfferDetailsAirCalculation.js.map