var HoodSelectionOfferDetailsForm = /** @class */ (function () {
    function HoodSelectionOfferDetailsForm() {
        this.areControlsDisabled = false;
    }
    HoodSelectionOfferDetailsForm.prototype.init = function () {
        this.hoodOfferId = $('#HoodOfferId').val();
        this.assignControlsEvents();
        this.loadHoodOfferData();
    };
    HoodSelectionOfferDetailsForm.prototype.disableAllControls = function () {
        $('#formSaveHoodOfferDetails, #formHoodOfferNumber').find('select, input:text, input:checkbox').attr('disabled', true);
        //$('#btnSaveHoodOffer').hide();
        $('#btnAddNewHood').hide();
        this.areControlsDisabled = true;
        $('#hoodOfferElementsTable_wrapper .remove').hide();
        hoodSelectionOfferDetails.areControlsDisabled = true;
    };
    HoodSelectionOfferDetailsForm.prototype.assignControlsEvents = function () {
        var _this = this;
        $('#HoodInstallationObjectId').change(function () {
            _this.loadInstallationObjectDetails();
        });
        $('#ChBHoodAddNewInstallationObject').change(function () {
            var isAddNewInstallationObject = $('#ChBHoodAddNewInstallationObject').is(':checked');
            if (isAddNewInstallationObject) {
                $('#ColHoodInstallationObjectsDropDown').addClass('hidden');
                $('#ColHoodInstallationObjectName').removeClass('hidden');
            }
            else {
                $('#ColHoodInstallationObjectsDropDown').removeClass('hidden');
                $('#ColHoodInstallationObjectName').addClass('hidden');
            }
            $('#HoodInstallationObjectId').val('').trigger('change');
            $('#HoodOfferSearchObject').val('').trigger('change');
            $("#HoodInstallationObjectTempName").val('');
            _this.loadInstallationObjectDetails();
        });
        $('#btnSaveHoodOffer').click(function () {
            _this.saveHoodOffer();
        });
        $("#HoodOfferSearchObject").autocomplete({
            source: function (request, response) {
                $.getJSON("/Api/ApiInstallationObjects/SearchObject", {
                    term: request.term,
                    //groupId: $('#SearchProductsForOfferGroupId').val()
                }, response);
            },
            minLength: 0,
            select: function (event, ui) {
                $('#HoodInstallationObjectId').val(ui.item.InstallationObjectId).trigger('change');
                $('#HoodInstallationObjectTempName').val(ui.item.label);
                //console.log("Selected: " + ui.item.ProductId);
                //offerDetails.addOfferElement(ui.item.ProductId, 1, ui.item.PersonalProductId, false)
                //    .then(() => {
                //        $("#HoodOfferSearchObject").val("");
                //        this.scrollOfferElementsTableToBottom = true;
                //        this.loadList();
                //    });
            },
            //pogrubienie tekstu
            open: function (e, ui) {
                var acData = $(this).data('ui-autocomplete');
                acData
                    .menu
                    .element
                    .find('li')
                    .each(function () {
                    var me = $(this);
                    var keywords = acData.term.split(' ').join('|');
                    me.html('<div class="ui-menu-item-wrapper">' + me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<b>$1</b>') + '</div>');
                });
            },
            params: { "auto_dealer": "yes" }
        });
        $("#HoodOfferSearchObject").blur(function () {
            $("#HoodOfferSearchObject").val($("#HoodInstallationObjectTempName").val());
        });
        $('#btnClearSearchObject').click(function () {
            $("#HoodOfferSearchObject").val('');
            $("#HoodInstallationObjectTempName").val('');
            $('#HoodInstallationObjectId').val('').trigger('change');
        });
        $('#btnFinishHoodOffer').click(function () {
            _this.finishHoodOffer();
        });
        $('#btnOfferHoodOffer').click(function () {
            _this.offerHoodOffer();
        });
    };
    HoodSelectionOfferDetailsForm.prototype.offerHoodOffer = function () {
        var _this = this;
        swal({
            title: '',
            text: 'Czy na pewno chcesz stworzyć ofertę?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            _this.createHoodFinalOfferFromHoodOffer();
            //this.setHoodOfferStatus(HoodOfferStatus.Offered);
        });
    };
    HoodSelectionOfferDetailsForm.prototype.finishHoodOffer = function () {
        var _this = this;
        swal({
            title: '',
            text: 'Czy na pewno chcesz zakończyć dobór?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            _this.setHoodOfferStatus(HoodOfferStatus.Finished);
        });
    };
    HoodSelectionOfferDetailsForm.prototype.createHoodFinalOfferFromHoodOffer = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiHoodOffers/CreateHoodFinalOfferFromHoodOffer',
            data: JSON.stringify(this.hoodOfferId),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST'
        }).then(function (result) {
            utility.showSuccess('Oferta została stworzona');
            _this.loadHoodOfferData();
            hoodSelectionOfferDetailsHoodList.loadList();
        }).fail(function (xhr) {
            console.error(xhr);
            utility.showError(xhr.responseJSON != null ? xhr.responseJSON.Message : null);
        });
    };
    HoodSelectionOfferDetailsForm.prototype.setHoodOfferStatus = function (status) {
        var _this = this;
        this.saveHoodOffer()
            .then(function () {
            $.ajax({
                url: '/Api/ApiHoodOffers/SetHoodOfferStatus',
                data: JSON.stringify({ hoodOfferId: _this.hoodOfferId, status: status }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result) {
                        utility.showSuccess('Oferta doboru została zakończona');
                        _this.loadHoodOfferData();
                        hoodSelectionOfferDetailsHoodList.loadList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        });
    };
    HoodSelectionOfferDetailsForm.prototype.loadInstallationObjectDetails = function () {
        if ($('#HoodInstallationObjectId').val() != "") {
            $.ajax({
                url: '/Api/ApiInstallationObjects/GetInstallationObjectData',
                data: { installationObjectId: $('#HoodInstallationObjectId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: function (result) {
                    $('#HoodInstallationObjectAddress').val(result.Address).trigger('change').prop('disabled', true);
                    $('#HoodInstallationObjectName').val(result.Name).trigger('change').prop('disabled', true);
                    $('#HoodInstallationObjectTempName').val(result.Name).trigger('change').prop('disabled', true);
                    $('#HoodOfferSearchObject').val(result.Name);
                    $('#HoodInstallationObjectCountry').val(result.Country).trigger('change').prop('disabled', true);
                    $('#HoodInstallationObjectCity').val(result.City).trigger('change').prop('disabled', true);
                    $('#HoodInstallationObjectPostalCode').val(result.PostalCode).trigger('change').prop('disabled', true);
                    $('#HoodInstallationObjectType').val(result.Type).trigger('change').prop('disabled', true);
                },
            });
        }
        else {
            var isAddNewInstallationObject = $('#ChBHoodAddNewInstallationObject').is(':checked');
            $('#HoodInstallationObjectAddress').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectTempName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectCountry').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectCity').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectPostalCode').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectType').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
        }
    };
    HoodSelectionOfferDetailsForm.prototype.loadHoodOfferData = function () {
        var _this = this;
        $('#ChBHoodAddNewInstallationObject').prop('checked', false).trigger('change');
        $.ajax({
            url: '/Api/ApiHoodOffers/GetHoodOfferData',
            data: { hoodOfferId: this.hoodOfferId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                //$('#btnFinishHoodOffer, #btnOrderHoodOffer').addClass('hidden');
                //if (result.Status == <number>OfferStatus.Draft) {
                //    this.enableAllControls();
                //    $('#btnFinishOffer').removeClass('hidden');
                //} else if (result.Status == <number>OfferStatus.Finished) {
                //    $('#btnOrderOffer').removeClass('hidden');
                //    this.disableAllControls();
                //} else if (result.Status == <number>OfferStatus.Ordered) {
                //    this.disableAllControls();
                //}
                //$('#HoodOfferDate').val(result.HoodOfferDate).trigger('change');
                var hoodOfferNumber = result.HoodOfferNumber;
                if (hoodOfferNumber == '') {
                    hoodOfferNumber = '-';
                }
                $('#HoodOfferNumber').val(hoodOfferNumber).trigger('change');
                $('#HoodStatusText').val(result.HoodStatusText).trigger('change');
                $('#HoodInstallationObjectId').val(result.HoodInstallationObjectId).trigger('change'); //val używane do kontrolek typu TextBox, DropDownList
                $('#HoodOfferNumberModal').val(hoodOfferNumber).trigger('change');
                $('#HoodStatusTextModal').val(result.HoodStatusText).trigger('change');
                $('#HoodOfferContactPerson').val(result.HoodOfferContactPerson).trigger('change');
                $('#HoodOfferContactEmail').val(result.HoodOfferContactEmail).trigger('change');
                $('#HoodOfferContactPhone').val(result.HoodOfferContactPhone).trigger('change');
                $('#HoodOfferRegionId').val(result.HoodOfferRegionId).trigger('change');
                $('#LanguageId').val(result.LanguageId).trigger('change');
                $('#Comment').val(result.Comment).trigger('change');
                $('#btnFinishHoodOffer').addClass('hidden');
                $('#btnOfferHoodOffer').addClass('hidden');
                $('#HoodOfferNumber').removeAttr('disabled');
                if (result.HoodStatus == HoodOfferStatus.Offered || result.HoodStatus == HoodOfferStatus.Imported) {
                    _this.disableAllControls();
                    //$('#btnFinishOffer').removeClass('hidden');
                }
                else if (result.HoodStatus == HoodOfferStatus.Draft) {
                    $('#btnFinishHoodOffer').removeClass('hidden');
                }
                else if (result.HoodStatus == HoodOfferStatus.New) {
                    $('#HoodOfferNumber').attr('disabled', true);
                }
                else if (result.HoodStatus == HoodOfferStatus.Finished) {
                    $('#btnOfferHoodOffer').removeClass('hidden');
                }
            },
        });
    };
    HoodSelectionOfferDetailsForm.prototype.saveHoodOffer = function () {
        var _this = this;
        //if (!this.areControlsDisabled) {
        $('#formSaveHoodOfferDetails, #formHoodOfferNumber').validate();
        if ($('#formSaveHoodOfferDetails').valid() && $('#formHoodOfferNumber').valid()) {
            return $.ajax({
                url: '/Api/ApiHoodOffers/SaveHoodOffer',
                data: JSON.stringify($.extend({
                    hoodOfferId: this.hoodOfferId,
                    hoodOfferNumber: $('#HoodOfferNumber').val()
                }, utility.getFormData($('#formSaveHoodOfferDetails')))),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
            }).then(function (result) {
                if ($('#ChBHoodAddNewInstallationObject').is(':checked')) {
                    return $.ajax({
                        url: '/Api/ApiInstallationObjects/GetInstallationObjectSelectListItems',
                        data: {},
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        type: 'GET',
                        success: function (result) {
                            if (result != null) {
                                _this.installationObjectList = result;
                                $('#HoodInstallationObjectId').html('');
                                $('#HoodInstallationObjectId').append('<option value="">Wybierz obiekt</option>');
                                for (var i = 0; i < result.length; i++) {
                                    $('#HoodInstallationObjectId').append('<option value="' + result[i].Id + '">' + result[i].Name + '</option>');
                                }
                                $('#HoodInstallationObjectId').selectpicker('refresh');
                            }
                        },
                    });
                }
                return $.when(null);
            }).then(function () {
                _this.loadHoodOfferData();
                utility.showSuccess();
            }).fail(function (xhr) {
                console.error(xhr);
                utility.showError(xhr.responseJSON != null ? xhr.responseJSON.Message : null);
            });
        }
        //}
        return $.when(null);
    };
    return HoodSelectionOfferDetailsForm;
}());
var hoodSelectionOfferDetailsForm = new HoodSelectionOfferDetailsForm();
$(document).ready(function () {
    hoodSelectionOfferDetailsForm.init();
});
//# sourceMappingURL=_HoodSelectionOfferDetailsForm.js.map