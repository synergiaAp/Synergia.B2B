class HoodSelectionOfferDetailsAirCalculation {
    public hoodOfferElementId: number;

    public deviceList: Array<any>;

    private tblHoodSelectionOfferDetailsAirCalculationControl: JQuery;
    private tblHoodSelectionOfferDetailsAirCalculationInfo: JQuery;
    private spanExhaustStreamCalculatedControl: JQuery;
    private sAllDevicesEnabledControl: JQuery;
    private sAllDevicesValueControl: JQuery;
    private factor063EnabledControl: JQuery;

    public init() {
        this.assignControls();
        this.assignEvents();
        this.setUpFormControls();

        $('#modalHoodSelectionOfferDetails').on('hidden.bs.modal', () => {
            this.sAllDevicesEnabledControl.prop('checked', true);
        });
    }

    private assignControls() {
        this.tblHoodSelectionOfferDetailsAirCalculationControl = $('#tblHoodSelectionOfferDetailsAirCalculation');
        this.tblHoodSelectionOfferDetailsAirCalculationInfo = $('#tblHoodSelectionOfferDetailsAirCalculationInfo');
        this.spanExhaustStreamCalculatedControl = $('#spanExhaustStreamCalculated');
        this.sAllDevicesEnabledControl = $('#SAllDevicesEnabled');
        this.sAllDevicesValueControl = $('#SAllDevicesValue');
        this.factor063EnabledControl = $('#Factor063Enabled');
    }

    private assignEvents() {
        this.tblHoodSelectionOfferDetailsAirCalculationControl.find('input, select').change(() => {
            this.setUpFormControls();
        });
        this.tblHoodSelectionOfferDetailsAirCalculationInfo.find('input').change(() => {
            this.setUpFormControls();
        });
    }

    private setUpFormControls() {
        let mpSum = 0;
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

        this.tblHoodSelectionOfferDetailsAirCalculationControl.find('>tbody>tr').each((i, el) => {
            let element = $(el);
            let selectedNameId = element.find('select.calcName').val();
            let deviceItem = this.deviceList.filter((obj) => {
                return obj.Id == selectedNameId;
            })[0];

            let calcKeValue = deviceItem != null ? deviceItem.Ke : 0;
            let calcMpValue = calcKeValue * 3.6 * numeral(element.find('.calcPower').val()).value() * parseFloat(element.find('.calcS').val());
            if (isNaN(calcMpValue) || calcMpValue == 0) {
                calcMpValue = 0;
            }
            calcMpValue = Math.ceil(calcMpValue);
            mpSum += calcMpValue;

            if (selectedNameId != '') {
                element.find('.calcKe').val(calcKeValue);
                element.find('.calcMp').val(calcMpValue);

                if (element.find('.calcS').val() == '') {
                    element.find('.calcS').val(this.sAllDevicesValueControl.val());
                }
                element.find('.calcS, .calcAlternativeName, .calcPower').attr('disabled', false);
            } else {
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
    }

    public clearFormValues() {
        $('#tblHoodSelectionOfferDetailsAirCalculation').find('input').val('');
        $('#tblHoodSelectionOfferDetailsAirCalculation').find('select').val('').selectpicker('refresh');

        if (this.hoodOfferElementId == null) {
            this.sAllDevicesEnabledControl.prop('checked', true);
            this.sAllDevicesValueControl.val('0.70');
            this.factor063EnabledControl.prop('checked', false);
        }
        this.setUpFormControls();
    }

    public edit(hoodOfferElementId?: number) {
        this.hoodOfferElementId = hoodOfferElementId;
        this.clearFormValues();

        if (this.hoodOfferElementId != null) {
            return $.ajax({
                url: '/Api/ApiHoodOfferElementAirCalculationDevices/GetHoodOfferElementAirCalculationDevices',
                data: { hoodOfferElementId: this.hoodOfferElementId },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET'
            }).then((result) => {
                let elements = result.Elements;
                $('#tblHoodSelectionOfferDetailsAirCalculation > tbody > tr').each((index, element) => {
                    let orderNo = parseInt($(element).attr('data-orderno'));
                    let existingItem = elements.find((element, index, array) => {
                        return element.OrderNo == orderNo
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
                this.setUpFormControls();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        }

        return $.when(null);
    }

    public save() {
        let dataToSend = {
            hoodOfferElementId: this.hoodOfferElementId,
            elements: []
        };

        $('#tblHoodSelectionOfferDetailsAirCalculation > tbody > tr').each((index, element) => {
            let orderNo = parseInt($(element).attr('data-orderno'));
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
        }).then((result) => {

        }).fail((xhr) => {
            console.error(xhr);
            utility.showError();
        });
    }
}

let hoodSelectionOfferDetailsAirCalculation = new HoodSelectionOfferDetailsAirCalculation();
$(document).ready(function () {
    hoodSelectionOfferDetailsAirCalculation.init();
});