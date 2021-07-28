class OfferDetails {
    private list: DataTables.DataTable;
    private offerId: number;
    private saveOfferElementQuantityTimeout;
    private saveOfferElementDiscountTimeout;
    private saveOfferElementDeliveryTimeDaysTimeout;
    private logoDropzone: Dropzone;
    private areControlsDisabled: boolean = false;
    private scrollOfferElementsTableToBottom: boolean = false;
    private hasOnlyInnoSavaProducts: boolean = false;

    public init() {
        $('#buttonCurrentOffer').click(() => {
            let activeOfferId = this.getActiveOfferId();
            if (activeOfferId == null) {
                swal({
                    title: '',
                    text: 'Czy chcesz stworzyć nową ofertę?',
                    type: 'question',
                    cancelButtonClass: 'btn-success',
                    showCancelButton: true,
                    confirmButtonText: 'Tak',
                    cancelButtonText: 'Nie, chcę wybrać istniejącą',
                }).then((result) => {
                    this.showModal(null);
                }, (dismiss) => {
                    if (dismiss == 'cancel') {
                        location.href = "/Offers";
                    }
                });
            }
            else {
                $('[href="#pillOfferElements"]').tab('show');
                this.showModal(activeOfferId);
            }
        });

        $("#SearchProductsForOffer").autocomplete({
            //source: "Api/ApiProducts/SearchProductsForOffer",
            source: function (request, response) {
                $.getJSON(
                    "/Api/ApiProducts/SearchProductsForOffer",
                    {
                        term: request.term,
                        groupId: $('#SearchProductsForOfferGroupId').val()
                    },
                    response
                );
            },
            minLength: 0,
            select: (event, ui) => {
                offerDetails.addOfferElement(ui.item.ProductId, 1, ui.item.PersonalProductId, false)
                    .then(() => {
                        $("#SearchProductsForOffer").val("");
                        this.scrollOfferElementsTableToBottom = true;
                        this.loadOfferSummary().then(() => {
                            this.loadList();
                        });
                    });
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

        $("#SearchProductsForOffer").blur(() => {
            $("#SearchProductsForOffer").val("");
        });

        $('#modalOfferDetails').on('hide.bs.modal', () => {
            $('[href="#pillOffer"]').tab('show');
            $("#SearchProductsForOffer").val("");
            $('#offerElementsTableWrapper').css('opacity', 0);
            this.saveOffer();
        });

        $('#modalOfferDetails').on('shown.bs.modal', () => {
            $('#offerElementsTableWrapper').fadeTo(500, 1);
            if (this.list != null) {
                this.list.columns.adjust();
            }
        });

        $('#OfferCompanyId').change(() => {
            this.loadOfferCompanyDetails();
            this.loadInstallationObjectList();
        });
        $('#ChBAddNewOfferCompany').change(() => {
            let isAddNewOfferCompany = $('#ChBAddNewOfferCompany').is(':checked');
            if (isAddNewOfferCompany) {
                $('#ColOfferCompaniesDropDown').addClass('hidden');
                $('#ColOfferCompanyName').removeClass('hidden');
            }
            else {
                $('#ColOfferCompaniesDropDown').removeClass('hidden');
                $('#ColOfferCompanyName').addClass('hidden');
            }
            $('#OfferCompanyId').val('').trigger('change');
            $('#OfferSearchCompany').val('').trigger('change');
            $("#OfferCompanyTempName").val('');
            this.loadOfferCompanyDetails();
        });

        $("#OfferSearchCompany").autocomplete({
            source: function (request, response) {
                $.getJSON(
                    "/Api/ApiOfferCompanies/SearchOfferCompany",
                    {
                        term: request.term,
                    },
                    response
                );
            },
            minLength: 0,
            select: (event, ui) => {
                $('#OfferCompanyId').val(ui.item.OfferCompanyId).trigger('change');
                $('#OfferCompanyTempName').val(ui.item.label);
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

        $("#OfferSearchCompany").blur(() => {
            $("#OfferSearchCompany").val($("#OfferCompanyTempName").val());
        });

        $('#btnClearOfferSearchCompany').click(() => {
            $("#OfferSearchCompany").val('');
            $("#OfferCompanyTempName").val('');
            $('#OfferCompanyId').val('').trigger('change');
        });

        $("#OfferSearchInstallationObject").autocomplete({
            source: function (request, response) {
                if ($('#OfferCompanyId').val() != '') {
                    $.getJSON(
                        "/Api/ApiInstallationObjects/SearchObject",
                        {
                            term: request.term,
                            offerCompanyId: $('#OfferCompanyId').val()
                        },
                        response
                    );
                }
            },
            minLength: 0,
            select: (event, ui) => {
                $('#InstallationObjectId').val(ui.item.InstallationObjectId).trigger('change');
                $('#OfferInstallationObjectTempName').val(ui.item.label);
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

        $("#OfferSearchInstallationObject").blur(() => {
            $("#OfferSearchInstallationObject").val($("#OfferInstallationObjectTempName").val());
        });

        $('#btnClearOfferSearchInstallationObject').click(() => {
            $("#OfferSearchInstallationObject").val('');
            $("#OfferInstallationObjectTempName").val('');
            $('#InstallationObjectId').val('').trigger('change');
        });

        $('#InstallationObjectId').change(() => {
            this.loadInstallationObjectDetails();
        });
        $('#ChBAddNewInstallationObject').change(() => {
            let isAddNewInstallationObject = $('#ChBAddNewInstallationObject').is(':checked');
            if (isAddNewInstallationObject) {
                $('#ColInstallationObjectsDropDown').addClass('hidden');
                $('#ColInstallationObjectName').removeClass('hidden');
            }
            else {
                $('#ColInstallationObjectsDropDown').removeClass('hidden');
                $('#ColInstallationObjectName').addClass('hidden');
            }
            $('#InstallationObjectId').val('').trigger('change');
            $('#OfferSearchInstallationObject').val('').trigger('change');
            $("#OfferInstallationObjectTempName").val('');
            this.loadInstallationObjectDetails();
        });

        $('[href="#pillOfferElements"]').on('shown.bs.tab', () => {
            if (this.list != null) {
                this.list.columns.adjust();
            }
        });

        $(window).resize(() => {
            setTimeout(() => {
                if (this.list != null && $('#modalOfferDetails').is(':visible')) {
                    $('#pillOfferElements div.dataTables_scrollBody').height(this.getOfferElementsTableHeight())
                        .css('max-height', this.getOfferElementsTableHeight() + 'px');
                    this.list.draw();
                }
            }, 1000);
        });

        this.initLogoDropzone();

        $('#btnFinishOffer').click(() => {
            this.finishOffer();
        });

        $('#btnOrderOffer').click(() => {
            this.orderOffer();
        });

        //$('#IsPrepayment').change(() => {
        //    this.setOfferIsPrepayment();
        //});
        $('#PaymentType').change(() => {
            this.setOfferPaymentType();
        });

        $('#DeliveryTimeDays').change((e) => {
            this.saveOfferElementDeliveryTimeDays(null, $(e.target));
        });

        $('#WithEmptyInstallationObjectObiektyId').change(() => {
            this.setUpWithEmptyInstallationObjectObiektyId();
        });

        $('#DeliveryType').change(() => {
            this.setUpDeliveryType();
        });
    }

    private loadInstallationObjectList() {
        $('#btnClearOfferSearchInstallationObject').click();
    }

    public initLogoDropzone() {
        if (this.logoDropzone != null) {
            this.logoDropzone.off();
            this.logoDropzone.destroy();
        }

        this.logoDropzone = new Dropzone('#dropzoneOfferLogo', {
            acceptedFiles: 'image/*',
            uploadMultiple: false,
            url: '/Api/ApiOffers/SaveOfferLogo?offerId=' + this.offerId,
            maxFilesize: 1, /*MB*/
            //maxFiles: 1,
            addRemoveLinks: true,
            dictDefaultMessage: 'Kliknij aby dodać logo',
            success: (file, response: any) => {
                if (file != null) {
                    if (response != null && response.FileId != null) {
                        this.loadOfferLogo(response.GeneratedFileName);
                    } else {
                        if (file.previewElement != null) {
                            file.previewElement.remove();
                        }
                        utility.showError();
                    }
                }
            },
            removedfile: (file) => {
                if (file != null) {
                    $.ajax({
                        type: "DELETE",
                        url: '/Api/ApiOffers/DeleteOfferLogo?offerId=' + this.offerId,
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: (data) => {
                            if (data) {
                                if (file.previewElement != null) {
                                    file.previewElement.remove();
                                }
                                this.loadOfferLogo();
                            }
                            else {
                                utility.showError();
                            }
                        },
                        error: function () {
                            utility.showError();
                        }
                    });
                }
            },
            error: function (file, message: string) {
                if (file.previewElement != null) {
                    file.previewElement.remove();
                }
                utility.showError(message);
            }
        });
    }

    public loadOfferLogo(logoFileName?: string) {
        $('#dropzoneOfferLogo .dz-preview').remove();
        if (logoFileName != null) {

            let file = {
                name: logoFileName,
                accepted: true,
            };

            var imageUrl = '/Files/GetCRMFile?fileName=' + logoFileName;

            //this.logoDropzone.removeAllFiles();
            this.logoDropzone.emit("addedfile", file);
            this.logoDropzone.emit("thumbnail", file, imageUrl);
            this.logoDropzone.emit("complete", file);
            this.logoDropzone.emit("success");
            this.logoDropzone.files.push(file);
            this.logoDropzone.disable();
        } else {
            this.logoDropzone.enable();
            $('#dropzoneOfferLogo').removeClass('dz-started');
        }
    }

    public finishOffer() {
        if ($('#OfferCompanyId').val() == "" && $('#OfferCompanyName').val() == "") {
            utility.showError("Nabywca nie został wybrany");
        }
        else if (!$('#WithEmptyInstallationObjectObiektyId').is(':checked')
            && ($('#InstallationObjectId').val() == "" || $('#InstallationObjectName').val() == "")) {
            utility.showError("Obiekt nie został wybrany");
        }
        else {
            swal({
                title: '',
                text: 'Czy na pewno chcesz zakończyć ofertę?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Tak',
                cancelButtonText: 'Nie',
            }).then(() => {
                this.setOfferStatus(OfferStatus.Finished);
            });
        }
    }

    public orderOffer() {
        swal({
            title: '',
            text: 'Czy na pewno chcesz złożyć zamówienie?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            this.setOfferStatus(OfferStatus.Ordered);
        });
    }

    private setOfferStatus(status: OfferStatus) {
        this.saveOffer()
            .then(() => {
                $.ajax({
                    url: '/Api/ApiOffers/SetOfferStatus',
                    data: JSON.stringify({ offerId: this.offerId, status: <number>status }),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    type: 'POST',
                    success: (result) => {
                        if (result) {
                            $('#modalOfferDetails').modal('hide');
                            if (status == OfferStatus.Finished) {
                                utility.showSuccess('Oferta została zakończona');
                            } else {
                                utility.showSuccess('Zamówienie zostało wysłane');
                            }
                        }
                        else {
                            utility.showError();
                        }
                    },
                });
            });
    }

    //private setOfferIsPrepayment() {
    //    $.ajax({
    //        url: '/Api/ApiOffers/SetOfferIsPrepayment',
    //        data: JSON.stringify({ offerId: this.offerId, isPrepayment: $('#IsPrepayment').is(':checked')}),
    //        dataType: 'json',
    //        contentType: 'application/json; charset=utf-8',
    //        type: 'POST',
    //        success: (result) => {
    //            if (result) {
    //                this.loadOfferSummary();
    //            }
    //            else {
    //                utility.showError();
    //            }
    //        },
    //    });
    //}

    private setOfferPaymentType() {
        $.ajax({
            url: '/Api/ApiOffers/SetOfferPaymentType',
            data: JSON.stringify({ offerId: this.offerId, paymentType: $('#PaymentType').val() }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            success: (result) => {
                if (result) {
                    this.loadOfferSummary();
                }
                else {
                    utility.showError();
                }
            },
        });
    }

    public loadOfferCompanyDetails() {
        if ($('#OfferCompanyId').val() != "") {
            $.ajax({
                url: '/Api/ApiCustomers/GetOfferCompanyData',
                data: { offerCompanyId: $('#OfferCompanyId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: (result) => {
                    $('#OfferCompanyAddress').val(result.Address).trigger('change').prop('disabled', true);
                    $('#OfferCompanyName').val(result.Name).trigger('change').prop('disabled', true);
                    $('#OfferCompanyNIP').val(result.NIP).trigger('change').prop('disabled', true);
                    $('#OfferCompanyCity').val(result.City).trigger('change').prop('disabled', true);
                    $('#OfferCompanyPostalCode').val(result.PostalCode).trigger('change').prop('disabled', true);
                    $('#OfferCompanyTempName').val(result.Name).trigger('change').prop('disabled', true);
                    $('#OfferSearchCompany').val(result.Name);
                },
            });
        }
        else {
            let isAddNewOfferCompany = $('#ChBAddNewOfferCompany').is(':checked');
            $('#OfferCompanyAddress').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyName').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyNIP').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyCity').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyPostalCode').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyTempName').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
        }
    }

    public loadInstallationObjectDetails() {
        if ($('#InstallationObjectId').val() != "") {
            $.ajax({
                url: '/Api/ApiInstallationObjects/GetInstallationObjectData',
                data: { installationObjectId: $('#InstallationObjectId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: (result) => {
                    $('#InstallationObjectAddress').val(result.Address).trigger('change').prop('disabled', true);
                    $('#InstallationObjectName').val(result.Name).trigger('change').prop('disabled', true);
                    $('#InstallationObjectCountry').val(result.Country).trigger('change').prop('disabled', true);
                    $('#InstallationObjectCity').val(result.City).trigger('change').prop('disabled', true);
                    $('#InstallationObjectPostalCode').val(result.PostalCode).trigger('change').prop('disabled', true);
                    $('#InstallationObjectType').val(result.Type).trigger('change').prop('disabled', true);
                    $('#OfferInstallationObjectTempName').val(result.Name).trigger('change').prop('disabled', true);
                    $('#OfferSearchInstallationObject').val(result.Name);
                },
            });
        }
        else {
            let isAddNewInstallationObject = $('#ChBAddNewInstallationObject').is(':checked');

            $('#InstallationObjectAddress').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectCountry').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectCity').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectPostalCode').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectType').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#OfferInstallationObjectTempName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
        }
    }

    public setActiveOfferId(offerId?: number) {
        if (offerId != null) {
            Cookies.set('ActiveOfferId', offerId);
        }
        else {
            Cookies.set('ActiveOfferId', this.offerId);
        }
    }

    public getActiveOfferId(): number {
        let activeOfferId = Cookies.get('ActiveOfferId');
        if (activeOfferId != undefined) {
            return parseInt(activeOfferId);
        }
        else {
            return null;
        }
    }

    public showModal(offerIdParam?: number) {
        this.offerId = offerIdParam;
        if (this.offerId == null) {
            this.saveNewOffer();
        }
        else {
            //Przed pokazanie pupupa pobieram dane
            //this.loadList();
            this.loadOfferData();
            $('#modalOfferDetails').modal();
        }
    }

    public getOfferElementsTableHeight(): number {
        return ($(window).height() - 370);
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#offerElementsTable').DataTable({
                ordering: false,
                searching: false,
                paging: false,
                info: false,
                scrollY: this.getOfferElementsTableHeight() + 'px',
                scrollCollapse: true,
                processing: false,
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Elementy oferty',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                            format: {
                                body: function (data, row, column, node) {
                                    if (column == 4 || column == 11) {
                                        return $(data).find('.touchSpin').val();
                                    }
                                    return String(data).replace(/(&nbsp;|<([^>]+)>)/ig, "");
                                }
                            }
                        },
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiOffers/GridGetOfferElements',
                    data: (data: any) => {
                        data.OfferId = this.offerId;
                    }
                },
                columns: [
                    {
                        render: (data, type, row, meta) => {
                            return meta.row + 1;
                        },
                        className: 'text-center',
                    },
                    {
                        data: 'ProductCode',
                    },
                    {
                        //data: 'ProductName',
                        //render: (data, type, row, meta) => {
                        //    return '<a href="/Products/ProductDetails/' + row.ProductId + '">' + row.ProductName + '</a>';
                        //},
                        render: (data, type, row, meta) => {
                            if (row.ProductName != null) {
                                let maxlength = 50;
                                let productNameHref = '';
                                if (row.PersonalProductId == null) {
                                    productNameHref = '/Products/ProductDetails/' + row.ProductId;
                                } else {
                                    productNameHref = '/PersonalProducts';
                                }
                                return '<a target="_blank" title="' + row.ProductName.replaceAll('"', '')
                                    + '"data-toggle="tooltip" href="' + productNameHref + '">'
                                    + (row.ProductName.length > maxlength ? row.ProductName.substring(0, maxlength) + '...' : row.ProductName) + '</a>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },

                        width: '330px',
                    },
                    {
                        data: 'ProductDimensions',
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'Quantity',
                        render: (data, type, row, meta) => {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="offerDetails.saveOfferElementQuantity(' + row.Id
                                + ',this)" data-min="1" data-max="9999" type= "text" value="'
                                + row.Quantity + '" class="touchSpin"'
                                + (this.areControlsDisabled ? 'disabled' : '')
                                + '></div>';
                        },
                        className: 'text-center',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="offerDetails.saveOfferElementDeliveryTimeDays(' + row.Id
                                + ',this)" data-min="1" data-max="99" type= "text" value="'
                                + row.DeliveryTimeDays + '" class="touchSpin"'
                                + (this.areControlsDisabled ? 'disabled' : '')
                                + '></div>';
                        },
                        className: 'text-center',
                    },
                    {
                        data: 'ProductTerminal',
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'ProductPowerGas',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerGas);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'ProductPowerGasSum',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerGasSum);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'ProductPowerElectricity',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerElectricity);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'ProductPowerElectricitySum',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerElectricitySum);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'CatalogPriceNet',
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.CatalogPriceNet);
                        },
                        className: 'text-right nowrap',
                        width: '70px',
                    },
                    {
                        //data: 'Discount',
                        render: (data, type, row, meta) => {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="offerDetails.saveOfferElementDiscount(' + row.Id
                                + ',this)" data-min="0" data-max="100" type= "text" value="'
                                + row.Discount + '" class="touchSpin"'
                                + (this.areControlsDisabled ? 'disabled' : '')
                                + ' ></div>';
                        },
                        className: 'text-right',
                    },
                    {
                        //data: 'PriceAfterDiscountNet',
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.PriceAfterDiscountNet);
                        },
                        className: 'text-right nowrap',
                        //width: '100px',
                    },
                    {
                        //data: 'FinalValueNet',
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.FinalValueNet);
                        },
                        className: 'text-right nowrap',
                        width: '100px',
                    },
                    {
                        //data: 'FinalValueNet',
                        render: (data, type, row, meta) => {
                            if (row.FileName != null) {
                                return '<img src="/Files/GetFile?fileName=' + row.FileName + '"/>';
                            }
                            else {
                                return '<img src="/Images/Products/empty_product.png"/>';
                            }
                        },
                        className: 'text-right',
                    },
                    {
                        width: '40px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            if (this.areControlsDisabled == false) {
                                return '<a href="javascript:offerDetails.removeOfferElement(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            else {
                                return "";
                            }

                        },
                    },
                ],
                initComplete: () => {
                    $('#pillOfferElements table').show();
                },
                drawCallback: () => {
                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa

                    $(".touchSpin").each(function () {
                        $(this).TouchSpin({
                            verticalbuttons: true,
                            //initval: 1,
                            min: parseInt($(this).attr('data-min')),
                            max: parseInt($(this).attr('data-max')),
                        });
                    });

                    setTimeout(function () {
                        $('.touchSpin').closest('.touchSpinWrapper').removeClass('invisible');
                    }, 100);

                    if (this.scrollOfferElementsTableToBottom) {
                        this.scrollOfferElementsTableToBottom = false;
                        $('#offerElementsTableWrapper .dataTables_scrollBody').scrollTop($('#offerElementsTableWrapper .dataTables_scrollBody')[0].scrollHeight);
                    }
                },
                headerCallback: (thead, data, start, end, display) => {
                    if (this.hasOnlyInnoSavaProducts) {
                        $(thead).find('.not-inno-sava-column').addClass('hidden');
                    } else {
                        $(thead).find('.not-inno-sava-column').removeClass('hidden');
                    }
                },
                rowCallback: (row, data: any) => {
                    if (this.hasOnlyInnoSavaProducts) {
                        $(row).find('.not-inno-sava-column').addClass('hidden');
                    } else {
                        $(row).find('.not-inno-sava-column').removeClass('hidden');
                    }
                },
                responsive: true,
                autoWidth: false
            });
        }
        else {
            this.list.ajax.reload();
        }
    }

    public saveOfferElementQuantity(offerElementId: number, touchSpinElement: JQuery) {
        if (this.saveOfferElementQuantityTimeout) {
            clearTimeout(this.saveOfferElementQuantityTimeout);
        }
        this.saveOfferElementQuantityTimeout = setTimeout(() => {
            $.ajax({
                url: '/Api/ApiOffers/SaveOfferElementQuantity',
                data: JSON.stringify({ offerElementId: offerElementId, quantity: $(touchSpinElement).val() }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result != null) {
                        this.loadOfferSummary().then(() => {
                            this.loadList();
                        });
                    }
                    else {
                        utility.showError('Wystąpił błąd');
                    }
                },
            });
            clearTimeout(this.saveOfferElementQuantityTimeout);
        }, 1000);
    }

    public saveOfferElementDiscount(offerElementId: number, touchSpinElement: JQuery) {
        if (this.saveOfferElementDiscountTimeout) {
            clearTimeout(this.saveOfferElementDiscountTimeout);
        }
        this.saveOfferElementDiscountTimeout = setTimeout(() => {
            $.ajax({
                url: '/Api/ApiOffers/SaveOfferElementDiscount',
                data: JSON.stringify({ offerElementId: offerElementId, discount: $(touchSpinElement).val() }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result != null) {
                        this.loadOfferSummary().then(() => {
                            this.loadList();
                        });
                    }
                    else {
                        utility.showError('Wystąpił błąd');
                    }
                },
            });
            clearTimeout(this.saveOfferElementQuantityTimeout);
        }, 1000);
    }

    public saveOfferElementDeliveryTimeDays(offerElementId: number, touchSpinElement: JQuery) {
        if (this.saveOfferElementDeliveryTimeDaysTimeout) {
            clearTimeout(this.saveOfferElementDeliveryTimeDaysTimeout);
        }
        this.saveOfferElementDeliveryTimeDaysTimeout = setTimeout(() => {
            $.ajax({
                url: '/Api/ApiOffers/SaveOfferElementDeliveryTimeDays',
                data: JSON.stringify({ offerId: this.offerId, offerElementId: offerElementId, deliveryTimeDays: $(touchSpinElement).val() }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result != null) {
                        this.loadList();
                    }
                    else {
                        utility.showError('Wystąpił błąd');
                    }
                },
            });
            clearTimeout(this.saveOfferElementDeliveryTimeDaysTimeout);
        }, 1000);
    }

    public remove(id: number) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć ofertę?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiOffers/DeleteOffer',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    offersList.loadList();
                },
            });
        });
    }

    public removeOfferElement(id: number) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć produkt?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            $.ajax({
                url: '/Api/ApiOffers/DeleteOfferElement',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    this.loadOfferSummary().then(() => {
                        this.loadList();
                    });
                },
            });
        });
    }

    public loadOfferSummary(): JQueryPromise<any> {
        return $.ajax({
            url: '/Api/ApiOffers/GetOfferData',
            data: { offerId: this.offerId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
        }).then((result) => {
            $('#CatalogValueNet').text(utility.toCurrency(result.CatalogValueNet));                                                       //text używany do wypełniania span, div itp.
            $('#ValueAfterPrimatyDiscountNet').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet));
            $('#FinalValueAfterAllDiscountsNet').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet));
            $('#CatalogValueGross').text(utility.toCurrency(result.CatalogValueNet + result.CatalogValueNet * 0.23));
            $('#ValueAfterPrimatyDiscountGross').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet + result.ValueAfterPrimatyDiscountNet * 0.23));
            $('#FinalValueAfterAllDiscountsGross').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet + result.FinalValueAfterAllDiscountsNet * 0.23));
            $('#CatalogValueVat').text(utility.toCurrency(result.CatalogValueNet * 0.23));
            $('#ValueAfterPrimatyDiscountVat').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet * 0.23));
            $('#FinalValueAfterAllDiscountsVat').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet * 0.23));
            this.hasOnlyInnoSavaProducts = result.HasOnlyInnoSavaProducts;
        });
    }

    public loadOfferData() {
        $('#ChBAddNewOfferCompany').prop('checked', false).trigger('change');
        $('#ChBAddNewInstallationObject').prop('checked', false).trigger('change');
        $.ajax({
            url: '/Api/ApiOffers/GetOfferData',
            data: { offerId: this.offerId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                $('#btnFinishOffer, #btnOrderOffer').addClass('hidden');
                if (result.Status == <number>OfferStatus.Draft) {
                    this.enableAllControls();
                    $('#btnFinishOffer').removeClass('hidden');
                } else if (result.Status == <number>OfferStatus.Finished) {
                    $('#btnOrderOffer').removeClass('hidden');
                    this.disableAllControls();
                } else if (result.Status == <number>OfferStatus.Ordered) {
                    this.disableAllControls();
                }

                $('#City').val(result.City).trigger('change');
                $('#OfferDate').val(result.OfferDate).trigger('change');
                $('#OfferNumber').val("OFE/" + result.OfferNumber).trigger('change');
                $('#SellerName').val(result.SellerName).trigger('change');
                $('#SellerFirmaId').val(result.SellerFirmaId).trigger('change');
                $('#OfferId').val(result.OfferId).trigger('change');
                $('#OfferCompanyId').val(result.OfferCompanyId).trigger('change');
                $('#InstallationObjectId').val(result.InstallationObjectId).trigger('change');                                                //val używane do kontrolek typu TextBox, DropDownList
                $('#StatusText').val(result.StatusText).trigger('change');
                $('#GuaranteeYears').val(result.GuaranteeYears).trigger('change');
                $('#PrepaymentPercent').val(result.PrepaymentPercent).trigger('change');
                $('#PaymentType').val(result.PaymentType).selectpicker('refresh');//.trigger('change');
                $('#DeliveryTimeDays').val(result.DeliveryTimeDays);
                //$('#IsPrepayment').attr('checked', result.IsPrepayment)/*.trigger('change')*/;
                $('#CatalogValueNet').text(utility.toCurrency(result.CatalogValueNet));                                                       //text używany do wypełniania span, div itp.
                $('#ValueAfterPrimatyDiscountNet').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet));
                $('#FinalValueAfterAllDiscountsNet').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet));
                $('#CatalogValueGross').text(utility.toCurrency(result.CatalogValueNet + result.CatalogValueNet * 0.23));
                $('#ValueAfterPrimatyDiscountGross').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet + result.ValueAfterPrimatyDiscountNet * 0.23));
                $('#FinalValueAfterAllDiscountsGross').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet + result.FinalValueAfterAllDiscountsNet * 0.23));
                $('#CatalogValueVat').text(utility.toCurrency(result.CatalogValueNet * 0.23));
                $('#ValueAfterPrimatyDiscountVat').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet * 0.23));
                $('#FinalValueAfterAllDiscountsVat').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet * 0.23));
                $('#WithEmptyInstallationObjectObiektyId').prop('checked', result.WithEmptyInstallationObjectObiektyId).trigger('change');
                $('#DeliveryType').val(result.DeliveryType).trigger('change');
                $('#DeliveryCost').val(utility.toDecimal(result.DeliveryCost)).trigger('change');

                this.hasOnlyInnoSavaProducts = result.HasOnlyInnoSavaProducts;
                this.initLogoDropzone();
                this.loadOfferLogo(result.Logo);

                this.setActiveOfferId();
                this.loadList();
            },
        });
    }

    private enableAllControls() {
        $('#modalOfferDetails').find('select:not(.form-control-disabled), input:text:not(.form-control-disabled), input:checkbox:not(.form-control-disabled)').attr('disabled', false);
        this.logoDropzone.enable();
        $('#dropzoneOfferLogo .dz-remove').show();

        this.areControlsDisabled = false;
    }

    private disableAllControls() {
        this.areControlsDisabled = true;
        $('#modalOfferDetails').find('select, input:text, input:checkbox').attr('disabled', true);
        this.logoDropzone.disable();
        $('#dropzoneOfferLogo .dz-remove').hide();
        $('#offerElementsTableWrapper .remove').hide();
    }

    public saveOffer(): JQueryPromise<any> {
        if (!this.areControlsDisabled) {
            $('#formSaveOfferDetails').validate();
            if ($('#formSaveOfferDetails').valid()) {
                let dataToSend: any = utility.getFormData($('#formSaveOfferDetails'));
                dataToSend.DeliveryCost = utility.toApiDecimal(dataToSend.DeliveryCost);

                return $.ajax({
                    url: '/Api/ApiOffers/SaveOffer',
                    data: JSON.stringify(dataToSend),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    type: 'POST',
                }).then((result) => {
                    if (typeof offersList != 'undefined') {
                        offersList.loadList();
                    }
                }).fail((xhr) => {
                    console.error(xhr);
                    utility.showError();
                });
            }
        }
        return $.when(null);
    }

    public saveNewOffer() {                             //tworzy nową ofertę tylko z numerem oferty
        $.ajax({
            url: '/Api/ApiOffers/SaveOffer',
            data: JSON.stringify({}),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            success: (result) => {
                if (result != null) {
                    this.offerId = result;
                    $('#modalOfferDetails').modal();    //Przed pokazanie pupupa pobieram dane
                    this.loadList();
                    this.loadOfferData();
                }
                else {
                    utility.showError("Wystąpił błąd. Nie udało się stworzyć oferty");
                }
            },
        });
    }

    public addOfferElement(productId, offerElementsCount: number = 1, personalProductId: number = null, showSuccess = true): JQueryPromise<any> {
        let activeOfferId = this.getActiveOfferId();
        if (activeOfferId != null) {
            return $.ajax({
                url: '/Api/ApiOffers/AddOfferElement',
                data: JSON.stringify({
                    offerId: activeOfferId,
                    productId: productId,
                    quantity: offerElementsCount,
                    personalProductId: personalProductId
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                if (showSuccess == true) {
                    utility.showSuccess('Wybrany produkt został dodany do oferty');
                }
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError(xhr.responseJSON != null ? xhr.responseJSON.Message : null);
            });
        }
        else {
            utility.showError('Brak aktywnej oferty');
        }
        return $.when(null);
    }

    private setUpWithEmptyInstallationObjectObiektyId() {
        if ($('#WithEmptyInstallationObjectObiektyId').is(':checked')) {
            $('#ChBAddNewInstallationObject').prop('checked', false).trigger('change').attr('disabled', true);
            $('#pnlInstallationObjectDetails').find('input:text, select').val('').trigger('change').attr('disabled', true);
        } else {
            $('#ChBAddNewInstallationObject').removeAttr('disabled');
            $('#OfferSearchInstallationObject').removeAttr('disabled');
        }
    }

    private setUpDeliveryType() {
        if ($('#DeliveryType').val() == <number>OfferDeliveryType.NoDelivery) {
            $('#DeliveryCost').val(utility.toDecimal(0)).closest('.col-md-2').addClass('hidden');
        } else {
            $('#DeliveryCost').closest('.col-md-2').removeClass('hidden');
        }
    }
}
let offerDetails = new OfferDetails();

$(document).ready(function () {
    offerDetails.init();
});
