class HoodSelectionOfferDetailsForm {
    private hoodOfferId: number;
    public areControlsDisabled: boolean = false;
    public installationObjectList: Array<any>;

    public init() {
        this.hoodOfferId = $('#HoodOfferId').val();

        this.assignControlsEvents();
        this.loadHoodOfferData();
    }

    private disableAllControls() {
        $('#formSaveHoodOfferDetails, #formHoodOfferNumber').find('select, input:text, input:checkbox').attr('disabled', true);
        //$('#btnSaveHoodOffer').hide();
        $('#btnAddNewHood').hide();
        this.areControlsDisabled = true;
        $('#hoodOfferElementsTable_wrapper .remove').hide();
        hoodSelectionOfferDetails.areControlsDisabled = true;
    }

    public assignControlsEvents() {
        $('#HoodInstallationObjectId').change(() => {
            this.loadInstallationObjectDetails();
        });
        $('#ChBHoodAddNewInstallationObject').change(() => {
            let isAddNewInstallationObject = $('#ChBHoodAddNewInstallationObject').is(':checked');
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
            this.loadInstallationObjectDetails();
        });

        $('#btnSaveHoodOffer').click(() => {
            this.saveHoodOffer();
        });

        $("#HoodOfferSearchObject").autocomplete({
            source: function (request, response) {
                $.getJSON(
                    "/Api/ApiInstallationObjects/SearchObject",
                    {
                        term: request.term,
                        //groupId: $('#SearchProductsForOfferGroupId').val()
                    },
                    response
                );
            },
            minLength: 0,
            select: (event, ui) => {
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

        $("#HoodOfferSearchObject").blur(() => {
            $("#HoodOfferSearchObject").val($("#HoodInstallationObjectTempName").val());
        });

        $('#btnClearSearchObject').click(() => {
            $("#HoodOfferSearchObject").val('');
            $("#HoodInstallationObjectTempName").val('');
            $('#HoodInstallationObjectId').val('').trigger('change');
        });
        $('#btnFinishHoodOffer').click(() => {
            this.finishHoodOffer();
        });
        $('#btnOfferHoodOffer').click(() => {
            this.offerHoodOffer();
        });
    }

    public offerHoodOffer() {
        swal({
            title: '',
            text: 'Czy na pewno chcesz stworzyć ofertę?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            this.createHoodFinalOfferFromHoodOffer();
            //this.setHoodOfferStatus(HoodOfferStatus.Offered);
        });
    }

    public finishHoodOffer() {
            swal({
                title: '',
                text: 'Czy na pewno chcesz zakończyć dobór?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Tak',
                cancelButtonText: 'Nie',
            }).then(() => {
                this.setHoodOfferStatus(HoodOfferStatus.Finished);
            });
    }

    private createHoodFinalOfferFromHoodOffer() {
        $.ajax({
            url: '/Api/ApiHoodOffers/CreateHoodFinalOfferFromHoodOffer',
            data: JSON.stringify(this.hoodOfferId),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST'
        }).then((result) => {
            utility.showSuccess('Oferta została stworzona');
            this.loadHoodOfferData();
            hoodSelectionOfferDetailsHoodList.loadList();
        }).fail((xhr) => {
            console.error(xhr);
            utility.showError(xhr.responseJSON != null ? xhr.responseJSON.Message : null);
        });
    }

    private setHoodOfferStatus(status: HoodOfferStatus) {
        this.saveHoodOffer()
            .then(() => {
                $.ajax({
                    url: '/Api/ApiHoodOffers/SetHoodOfferStatus',
                    data: JSON.stringify({ hoodOfferId: this.hoodOfferId, status: <number>status }),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    type: 'POST',
                    success: (result) => {
                        if (result) {
                            utility.showSuccess('Oferta doboru została zakończona');
                            this.loadHoodOfferData();
                            hoodSelectionOfferDetailsHoodList.loadList();
                        }
                        else {
                            utility.showError();
                        }
                    },
                });
            });
    }

    public loadInstallationObjectDetails() {
        if ($('#HoodInstallationObjectId').val() != "") {
            $.ajax({
                url: '/Api/ApiInstallationObjects/GetInstallationObjectData',
                data: { installationObjectId: $('#HoodInstallationObjectId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: (result) => {
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
            let isAddNewInstallationObject = $('#ChBHoodAddNewInstallationObject').is(':checked');

            $('#HoodInstallationObjectAddress').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectTempName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectCountry').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectCity').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectPostalCode').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#HoodInstallationObjectType').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
        }
    }

    public loadHoodOfferData() {
        $('#ChBHoodAddNewInstallationObject').prop('checked', false).trigger('change');
        $.ajax({
            url: '/Api/ApiHoodOffers/GetHoodOfferData',
            data: { hoodOfferId: this.hoodOfferId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
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

                let hoodOfferNumber = result.HoodOfferNumber;
                if (hoodOfferNumber == '') {
                    hoodOfferNumber = '-';
                }

                $('#HoodOfferNumber').val(hoodOfferNumber).trigger('change');
                $('#HoodStatusText').val(result.HoodStatusText).trigger('change');
                $('#HoodInstallationObjectId').val(result.HoodInstallationObjectId).trigger('change');                                                //val używane do kontrolek typu TextBox, DropDownList

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
                if (result.HoodStatus == <number>HoodOfferStatus.Offered || result.HoodStatus == <number>HoodOfferStatus.Imported) {
                    this.disableAllControls();
                    //$('#btnFinishOffer').removeClass('hidden');
                } else if (result.HoodStatus == <number>HoodOfferStatus.Draft) {
                    $('#btnFinishHoodOffer').removeClass('hidden');
                } else if (result.HoodStatus == <number>HoodOfferStatus.New) {
                    $('#HoodOfferNumber').attr('disabled', true);
                } else if (result.HoodStatus == <number>HoodOfferStatus.Finished) {
                    $('#btnOfferHoodOffer').removeClass('hidden');
                }
            },
        });
    }

    public saveHoodOffer(): JQueryPromise<any> {
        //if (!this.areControlsDisabled) {
        $('#formSaveHoodOfferDetails, #formHoodOfferNumber').validate();
        if ($('#formSaveHoodOfferDetails').valid() && $('#formHoodOfferNumber').valid()) {
                return $.ajax({
                    url: '/Api/ApiHoodOffers/SaveHoodOffer',
                    data: JSON.stringify($.extend({
                        hoodOfferId: this.hoodOfferId,
                        hoodOfferNumber: $('#HoodOfferNumber').val()
                    },utility.getFormData($('#formSaveHoodOfferDetails')))),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    type: 'POST',
                }).then((result) => {
                    if ($('#ChBHoodAddNewInstallationObject').is(':checked')) {
                        return $.ajax({
                            url: '/Api/ApiInstallationObjects/GetInstallationObjectSelectListItems',
                            data: {},
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            type: 'GET',
                            success: (result) => {
                                if (result != null) {
                                    this.installationObjectList = result;

                                    $('#HoodInstallationObjectId').html('');
                                    $('#HoodInstallationObjectId').append('<option value="">Wybierz obiekt</option>');
                                    for (let i = 0; i < result.length; i++) {
                                        $('#HoodInstallationObjectId').append('<option value="' + result[i].Id + '">' + result[i].Name + '</option>');
                                    }
                                    $('#HoodInstallationObjectId').selectpicker('refresh');
                                }
                            },
                        });
                    }
                    return $.when(null);
                }).then(() => {
                    this.loadHoodOfferData();
                    utility.showSuccess();
                }).fail((xhr) => {
                    console.error(xhr);
                    utility.showError(xhr.responseJSON != null ? xhr.responseJSON.Message : null);
                });
            }
        //}
        return $.when(null);
    }
}

let hoodSelectionOfferDetailsForm = new HoodSelectionOfferDetailsForm();
$(document).ready(function () {
    hoodSelectionOfferDetailsForm.init();
});