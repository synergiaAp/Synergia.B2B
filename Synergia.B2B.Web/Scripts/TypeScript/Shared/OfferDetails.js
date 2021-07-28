var OfferDetails = /** @class */ (function () {
    function OfferDetails() {
        this.areControlsDisabled = false;
        this.scrollOfferElementsTableToBottom = false;
        this.hasOnlyInnoSavaProducts = false;
    }
    OfferDetails.prototype.init = function () {
        var _this = this;
        $('#buttonCurrentOffer').click(function () {
            var activeOfferId = _this.getActiveOfferId();
            if (activeOfferId == null) {
                swal({
                    title: '',
                    text: 'Czy chcesz stworzyć nową ofertę?',
                    type: 'question',
                    cancelButtonClass: 'btn-success',
                    showCancelButton: true,
                    confirmButtonText: 'Tak',
                    cancelButtonText: 'Nie, chcę wybrać istniejącą',
                }).then(function (result) {
                    _this.showModal(null);
                }, function (dismiss) {
                    if (dismiss == 'cancel') {
                        location.href = "/Offers";
                    }
                });
            }
            else {
                $('[href="#pillOfferElements"]').tab('show');
                _this.showModal(activeOfferId);
            }
        });
        $("#SearchProductsForOffer").autocomplete({
            //source: "Api/ApiProducts/SearchProductsForOffer",
            source: function (request, response) {
                $.getJSON("/Api/ApiProducts/SearchProductsForOffer", {
                    term: request.term,
                    groupId: $('#SearchProductsForOfferGroupId').val()
                }, response);
            },
            minLength: 0,
            select: function (event, ui) {
                offerDetails.addOfferElement(ui.item.ProductId, 1, ui.item.PersonalProductId, false)
                    .then(function () {
                    $("#SearchProductsForOffer").val("");
                    _this.scrollOfferElementsTableToBottom = true;
                    _this.loadOfferSummary().then(function () {
                        _this.loadList();
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
        $("#SearchProductsForOffer").blur(function () {
            $("#SearchProductsForOffer").val("");
        });
        $('#modalOfferDetails').on('hide.bs.modal', function () {
            $('[href="#pillOffer"]').tab('show');
            $("#SearchProductsForOffer").val("");
            $('#offerElementsTableWrapper').css('opacity', 0);
            _this.saveOffer();
        });
        $('#modalOfferDetails').on('shown.bs.modal', function () {
            $('#offerElementsTableWrapper').fadeTo(500, 1);
            if (_this.list != null) {
                _this.list.columns.adjust();
            }
        });
        $('#OfferCompanyId').change(function () {
            _this.loadOfferCompanyDetails();
            _this.loadInstallationObjectList();
        });
        $('#ChBAddNewOfferCompany').change(function () {
            var isAddNewOfferCompany = $('#ChBAddNewOfferCompany').is(':checked');
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
            _this.loadOfferCompanyDetails();
        });
        $("#OfferSearchCompany").autocomplete({
            source: function (request, response) {
                $.getJSON("/Api/ApiOfferCompanies/SearchOfferCompany", {
                    term: request.term,
                }, response);
            },
            minLength: 0,
            select: function (event, ui) {
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
        $("#OfferSearchCompany").blur(function () {
            $("#OfferSearchCompany").val($("#OfferCompanyTempName").val());
        });
        $('#btnClearOfferSearchCompany').click(function () {
            $("#OfferSearchCompany").val('');
            $("#OfferCompanyTempName").val('');
            $('#OfferCompanyId').val('').trigger('change');
        });
        $("#OfferSearchInstallationObject").autocomplete({
            source: function (request, response) {
                if ($('#OfferCompanyId').val() != '') {
                    $.getJSON("/Api/ApiInstallationObjects/SearchObject", {
                        term: request.term,
                        offerCompanyId: $('#OfferCompanyId').val()
                    }, response);
                }
            },
            minLength: 0,
            select: function (event, ui) {
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
        $("#OfferSearchInstallationObject").blur(function () {
            $("#OfferSearchInstallationObject").val($("#OfferInstallationObjectTempName").val());
        });
        $('#btnClearOfferSearchInstallationObject').click(function () {
            $("#OfferSearchInstallationObject").val('');
            $("#OfferInstallationObjectTempName").val('');
            $('#InstallationObjectId').val('').trigger('change');
        });
        $('#InstallationObjectId').change(function () {
            _this.loadInstallationObjectDetails();
        });
        $('#ChBAddNewInstallationObject').change(function () {
            var isAddNewInstallationObject = $('#ChBAddNewInstallationObject').is(':checked');
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
            _this.loadInstallationObjectDetails();
        });
        $('[href="#pillOfferElements"]').on('shown.bs.tab', function () {
            if (_this.list != null) {
                _this.list.columns.adjust();
            }
        });
        $(window).resize(function () {
            setTimeout(function () {
                if (_this.list != null && $('#modalOfferDetails').is(':visible')) {
                    $('#pillOfferElements div.dataTables_scrollBody').height(_this.getOfferElementsTableHeight())
                        .css('max-height', _this.getOfferElementsTableHeight() + 'px');
                    _this.list.draw();
                }
            }, 1000);
        });
        this.initLogoDropzone();
        $('#btnFinishOffer').click(function () {
            _this.finishOffer();
        });
        $('#btnOrderOffer').click(function () {
            _this.orderOffer();
        });
        //$('#IsPrepayment').change(() => {
        //    this.setOfferIsPrepayment();
        //});
        $('#PaymentType').change(function () {
            _this.setOfferPaymentType();
        });
        $('#DeliveryTimeDays').change(function (e) {
            _this.saveOfferElementDeliveryTimeDays(null, $(e.target));
        });
        $('#WithEmptyInstallationObjectObiektyId').change(function () {
            _this.setUpWithEmptyInstallationObjectObiektyId();
        });
        $('#DeliveryType').change(function () {
            _this.setUpDeliveryType();
        });
    };
    OfferDetails.prototype.loadInstallationObjectList = function () {
        $('#btnClearOfferSearchInstallationObject').click();
    };
    OfferDetails.prototype.initLogoDropzone = function () {
        var _this = this;
        if (this.logoDropzone != null) {
            this.logoDropzone.off();
            this.logoDropzone.destroy();
        }
        this.logoDropzone = new Dropzone('#dropzoneOfferLogo', {
            acceptedFiles: 'image/*',
            uploadMultiple: false,
            url: '/Api/ApiOffers/SaveOfferLogo?offerId=' + this.offerId,
            maxFilesize: 1,
            //maxFiles: 1,
            addRemoveLinks: true,
            dictDefaultMessage: 'Kliknij aby dodać logo',
            success: function (file, response) {
                if (file != null) {
                    if (response != null && response.FileId != null) {
                        _this.loadOfferLogo(response.GeneratedFileName);
                    }
                    else {
                        if (file.previewElement != null) {
                            file.previewElement.remove();
                        }
                        utility.showError();
                    }
                }
            },
            removedfile: function (file) {
                if (file != null) {
                    $.ajax({
                        type: "DELETE",
                        url: '/Api/ApiOffers/DeleteOfferLogo?offerId=' + _this.offerId,
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            if (data) {
                                if (file.previewElement != null) {
                                    file.previewElement.remove();
                                }
                                _this.loadOfferLogo();
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
            error: function (file, message) {
                if (file.previewElement != null) {
                    file.previewElement.remove();
                }
                utility.showError(message);
            }
        });
    };
    OfferDetails.prototype.loadOfferLogo = function (logoFileName) {
        $('#dropzoneOfferLogo .dz-preview').remove();
        if (logoFileName != null) {
            var file = {
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
        }
        else {
            this.logoDropzone.enable();
            $('#dropzoneOfferLogo').removeClass('dz-started');
        }
    };
    OfferDetails.prototype.finishOffer = function () {
        var _this = this;
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
            }).then(function () {
                _this.setOfferStatus(OfferStatus.Finished);
            });
        }
    };
    OfferDetails.prototype.orderOffer = function () {
        var _this = this;
        swal({
            title: '',
            text: 'Czy na pewno chcesz złożyć zamówienie?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            _this.setOfferStatus(OfferStatus.Ordered);
        });
    };
    OfferDetails.prototype.setOfferStatus = function (status) {
        var _this = this;
        this.saveOffer()
            .then(function () {
            $.ajax({
                url: '/Api/ApiOffers/SetOfferStatus',
                data: JSON.stringify({ offerId: _this.offerId, status: status }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result) {
                        $('#modalOfferDetails').modal('hide');
                        if (status == OfferStatus.Finished) {
                            utility.showSuccess('Oferta została zakończona');
                        }
                        else {
                            utility.showSuccess('Zamówienie zostało wysłane');
                        }
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        });
    };
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
    OfferDetails.prototype.setOfferPaymentType = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiOffers/SetOfferPaymentType',
            data: JSON.stringify({ offerId: this.offerId, paymentType: $('#PaymentType').val() }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            success: function (result) {
                if (result) {
                    _this.loadOfferSummary();
                }
                else {
                    utility.showError();
                }
            },
        });
    };
    OfferDetails.prototype.loadOfferCompanyDetails = function () {
        if ($('#OfferCompanyId').val() != "") {
            $.ajax({
                url: '/Api/ApiCustomers/GetOfferCompanyData',
                data: { offerCompanyId: $('#OfferCompanyId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: function (result) {
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
            var isAddNewOfferCompany = $('#ChBAddNewOfferCompany').is(':checked');
            $('#OfferCompanyAddress').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyName').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyNIP').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyCity').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyPostalCode').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
            $('#OfferCompanyTempName').val('').trigger('change').prop('disabled', !isAddNewOfferCompany);
        }
    };
    OfferDetails.prototype.loadInstallationObjectDetails = function () {
        if ($('#InstallationObjectId').val() != "") {
            $.ajax({
                url: '/Api/ApiInstallationObjects/GetInstallationObjectData',
                data: { installationObjectId: $('#InstallationObjectId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: function (result) {
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
            var isAddNewInstallationObject = $('#ChBAddNewInstallationObject').is(':checked');
            $('#InstallationObjectAddress').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectCountry').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectCity').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectPostalCode').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#InstallationObjectType').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
            $('#OfferInstallationObjectTempName').val('').trigger('change').prop('disabled', !isAddNewInstallationObject);
        }
    };
    OfferDetails.prototype.setActiveOfferId = function (offerId) {
        if (offerId != null) {
            Cookies.set('ActiveOfferId', offerId);
        }
        else {
            Cookies.set('ActiveOfferId', this.offerId);
        }
    };
    OfferDetails.prototype.getActiveOfferId = function () {
        var activeOfferId = Cookies.get('ActiveOfferId');
        if (activeOfferId != undefined) {
            return parseInt(activeOfferId);
        }
        else {
            return null;
        }
    };
    OfferDetails.prototype.showModal = function (offerIdParam) {
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
    };
    OfferDetails.prototype.getOfferElementsTableHeight = function () {
        return ($(window).height() - 370);
    };
    OfferDetails.prototype.loadList = function () {
        var _this = this;
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
                    data: function (data) {
                        data.OfferId = _this.offerId;
                    }
                },
                columns: [
                    {
                        render: function (data, type, row, meta) {
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
                        render: function (data, type, row, meta) {
                            if (row.ProductName != null) {
                                var maxlength = 50;
                                var productNameHref = '';
                                if (row.PersonalProductId == null) {
                                    productNameHref = '/Products/ProductDetails/' + row.ProductId;
                                }
                                else {
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
                        render: function (data, type, row, meta) {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="offerDetails.saveOfferElementQuantity(' + row.Id
                                + ',this)" data-min="1" data-max="9999" type= "text" value="'
                                + row.Quantity + '" class="touchSpin"'
                                + (_this.areControlsDisabled ? 'disabled' : '')
                                + '></div>';
                        },
                        className: 'text-center',
                    },
                    {
                        render: function (data, type, row, meta) {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="offerDetails.saveOfferElementDeliveryTimeDays(' + row.Id
                                + ',this)" data-min="1" data-max="99" type= "text" value="'
                                + row.DeliveryTimeDays + '" class="touchSpin"'
                                + (_this.areControlsDisabled ? 'disabled' : '')
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
                        render: function (data, type, row, meta) {
                            return utility.toDecimal(row.ProductPowerGas);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'ProductPowerGasSum',
                        render: function (data, type, row, meta) {
                            return utility.toDecimal(row.ProductPowerGasSum);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'ProductPowerElectricity',
                        render: function (data, type, row, meta) {
                            return utility.toDecimal(row.ProductPowerElectricity);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'ProductPowerElectricitySum',
                        render: function (data, type, row, meta) {
                            return utility.toDecimal(row.ProductPowerElectricitySum);
                        },
                        className: 'text-center not-inno-sava-column',
                    },
                    {
                        //data: 'CatalogPriceNet',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.CatalogPriceNet);
                        },
                        className: 'text-right nowrap',
                        width: '70px',
                    },
                    {
                        //data: 'Discount',
                        render: function (data, type, row, meta) {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="offerDetails.saveOfferElementDiscount(' + row.Id
                                + ',this)" data-min="0" data-max="100" type= "text" value="'
                                + row.Discount + '" class="touchSpin"'
                                + (_this.areControlsDisabled ? 'disabled' : '')
                                + ' ></div>';
                        },
                        className: 'text-right',
                    },
                    {
                        //data: 'PriceAfterDiscountNet',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.PriceAfterDiscountNet);
                        },
                        className: 'text-right nowrap',
                        //width: '100px',
                    },
                    {
                        //data: 'FinalValueNet',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.FinalValueNet);
                        },
                        className: 'text-right nowrap',
                        width: '100px',
                    },
                    {
                        //data: 'FinalValueNet',
                        render: function (data, type, row, meta) {
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
                        render: function (data, type, row, meta) {
                            if (_this.areControlsDisabled == false) {
                                return '<a href="javascript:offerDetails.removeOfferElement(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            else {
                                return "";
                            }
                        },
                    },
                ],
                initComplete: function () {
                    $('#pillOfferElements table').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip(); // musi być do prawidłowego ładowanie tooltipa
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
                    if (_this.scrollOfferElementsTableToBottom) {
                        _this.scrollOfferElementsTableToBottom = false;
                        $('#offerElementsTableWrapper .dataTables_scrollBody').scrollTop($('#offerElementsTableWrapper .dataTables_scrollBody')[0].scrollHeight);
                    }
                },
                headerCallback: function (thead, data, start, end, display) {
                    if (_this.hasOnlyInnoSavaProducts) {
                        $(thead).find('.not-inno-sava-column').addClass('hidden');
                    }
                    else {
                        $(thead).find('.not-inno-sava-column').removeClass('hidden');
                    }
                },
                rowCallback: function (row, data) {
                    if (_this.hasOnlyInnoSavaProducts) {
                        $(row).find('.not-inno-sava-column').addClass('hidden');
                    }
                    else {
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
    };
    OfferDetails.prototype.saveOfferElementQuantity = function (offerElementId, touchSpinElement) {
        var _this = this;
        if (this.saveOfferElementQuantityTimeout) {
            clearTimeout(this.saveOfferElementQuantityTimeout);
        }
        this.saveOfferElementQuantityTimeout = setTimeout(function () {
            $.ajax({
                url: '/Api/ApiOffers/SaveOfferElementQuantity',
                data: JSON.stringify({ offerElementId: offerElementId, quantity: $(touchSpinElement).val() }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result != null) {
                        _this.loadOfferSummary().then(function () {
                            _this.loadList();
                        });
                    }
                    else {
                        utility.showError('Wystąpił błąd');
                    }
                },
            });
            clearTimeout(_this.saveOfferElementQuantityTimeout);
        }, 1000);
    };
    OfferDetails.prototype.saveOfferElementDiscount = function (offerElementId, touchSpinElement) {
        var _this = this;
        if (this.saveOfferElementDiscountTimeout) {
            clearTimeout(this.saveOfferElementDiscountTimeout);
        }
        this.saveOfferElementDiscountTimeout = setTimeout(function () {
            $.ajax({
                url: '/Api/ApiOffers/SaveOfferElementDiscount',
                data: JSON.stringify({ offerElementId: offerElementId, discount: $(touchSpinElement).val() }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result != null) {
                        _this.loadOfferSummary().then(function () {
                            _this.loadList();
                        });
                    }
                    else {
                        utility.showError('Wystąpił błąd');
                    }
                },
            });
            clearTimeout(_this.saveOfferElementQuantityTimeout);
        }, 1000);
    };
    OfferDetails.prototype.saveOfferElementDeliveryTimeDays = function (offerElementId, touchSpinElement) {
        var _this = this;
        if (this.saveOfferElementDeliveryTimeDaysTimeout) {
            clearTimeout(this.saveOfferElementDeliveryTimeDaysTimeout);
        }
        this.saveOfferElementDeliveryTimeDaysTimeout = setTimeout(function () {
            $.ajax({
                url: '/Api/ApiOffers/SaveOfferElementDeliveryTimeDays',
                data: JSON.stringify({ offerId: _this.offerId, offerElementId: offerElementId, deliveryTimeDays: $(touchSpinElement).val() }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result != null) {
                        _this.loadList();
                    }
                    else {
                        utility.showError('Wystąpił błąd');
                    }
                },
            });
            clearTimeout(_this.saveOfferElementDeliveryTimeDaysTimeout);
        }, 1000);
    };
    OfferDetails.prototype.remove = function (id) {
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
                success: function (result) {
                    offersList.loadList();
                },
            });
        });
    };
    OfferDetails.prototype.removeOfferElement = function (id) {
        var _this = this;
        swal({
            title: '',
            text: 'Czy chcesz usunąć produkt?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiOffers/DeleteOfferElement',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    _this.loadOfferSummary().then(function () {
                        _this.loadList();
                    });
                },
            });
        });
    };
    OfferDetails.prototype.loadOfferSummary = function () {
        var _this = this;
        return $.ajax({
            url: '/Api/ApiOffers/GetOfferData',
            data: { offerId: this.offerId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
        }).then(function (result) {
            $('#CatalogValueNet').text(utility.toCurrency(result.CatalogValueNet)); //text używany do wypełniania span, div itp.
            $('#ValueAfterPrimatyDiscountNet').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet));
            $('#FinalValueAfterAllDiscountsNet').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet));
            $('#CatalogValueGross').text(utility.toCurrency(result.CatalogValueNet + result.CatalogValueNet * 0.23));
            $('#ValueAfterPrimatyDiscountGross').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet + result.ValueAfterPrimatyDiscountNet * 0.23));
            $('#FinalValueAfterAllDiscountsGross').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet + result.FinalValueAfterAllDiscountsNet * 0.23));
            $('#CatalogValueVat').text(utility.toCurrency(result.CatalogValueNet * 0.23));
            $('#ValueAfterPrimatyDiscountVat').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet * 0.23));
            $('#FinalValueAfterAllDiscountsVat').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet * 0.23));
            _this.hasOnlyInnoSavaProducts = result.HasOnlyInnoSavaProducts;
        });
    };
    OfferDetails.prototype.loadOfferData = function () {
        var _this = this;
        $('#ChBAddNewOfferCompany').prop('checked', false).trigger('change');
        $('#ChBAddNewInstallationObject').prop('checked', false).trigger('change');
        $.ajax({
            url: '/Api/ApiOffers/GetOfferData',
            data: { offerId: this.offerId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#btnFinishOffer, #btnOrderOffer').addClass('hidden');
                if (result.Status == OfferStatus.Draft) {
                    _this.enableAllControls();
                    $('#btnFinishOffer').removeClass('hidden');
                }
                else if (result.Status == OfferStatus.Finished) {
                    $('#btnOrderOffer').removeClass('hidden');
                    _this.disableAllControls();
                }
                else if (result.Status == OfferStatus.Ordered) {
                    _this.disableAllControls();
                }
                $('#City').val(result.City).trigger('change');
                $('#OfferDate').val(result.OfferDate).trigger('change');
                $('#OfferNumber').val("OFE/" + result.OfferNumber).trigger('change');
                $('#SellerName').val(result.SellerName).trigger('change');
                $('#SellerFirmaId').val(result.SellerFirmaId).trigger('change');
                $('#OfferId').val(result.OfferId).trigger('change');
                $('#OfferCompanyId').val(result.OfferCompanyId).trigger('change');
                $('#InstallationObjectId').val(result.InstallationObjectId).trigger('change'); //val używane do kontrolek typu TextBox, DropDownList
                $('#StatusText').val(result.StatusText).trigger('change');
                $('#GuaranteeYears').val(result.GuaranteeYears).trigger('change');
                $('#PrepaymentPercent').val(result.PrepaymentPercent).trigger('change');
                $('#PaymentType').val(result.PaymentType).selectpicker('refresh'); //.trigger('change');
                $('#DeliveryTimeDays').val(result.DeliveryTimeDays);
                //$('#IsPrepayment').attr('checked', result.IsPrepayment)/*.trigger('change')*/;
                $('#CatalogValueNet').text(utility.toCurrency(result.CatalogValueNet)); //text używany do wypełniania span, div itp.
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
                _this.hasOnlyInnoSavaProducts = result.HasOnlyInnoSavaProducts;
                _this.initLogoDropzone();
                _this.loadOfferLogo(result.Logo);
                _this.setActiveOfferId();
                _this.loadList();
            },
        });
    };
    OfferDetails.prototype.enableAllControls = function () {
        $('#modalOfferDetails').find('select:not(.form-control-disabled), input:text:not(.form-control-disabled), input:checkbox:not(.form-control-disabled)').attr('disabled', false);
        this.logoDropzone.enable();
        $('#dropzoneOfferLogo .dz-remove').show();
        this.areControlsDisabled = false;
    };
    OfferDetails.prototype.disableAllControls = function () {
        this.areControlsDisabled = true;
        $('#modalOfferDetails').find('select, input:text, input:checkbox').attr('disabled', true);
        this.logoDropzone.disable();
        $('#dropzoneOfferLogo .dz-remove').hide();
        $('#offerElementsTableWrapper .remove').hide();
    };
    OfferDetails.prototype.saveOffer = function () {
        if (!this.areControlsDisabled) {
            $('#formSaveOfferDetails').validate();
            if ($('#formSaveOfferDetails').valid()) {
                var dataToSend = utility.getFormData($('#formSaveOfferDetails'));
                dataToSend.DeliveryCost = utility.toApiDecimal(dataToSend.DeliveryCost);
                return $.ajax({
                    url: '/Api/ApiOffers/SaveOffer',
                    data: JSON.stringify(dataToSend),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    type: 'POST',
                }).then(function (result) {
                    if (typeof offersList != 'undefined') {
                        offersList.loadList();
                    }
                }).fail(function (xhr) {
                    console.error(xhr);
                    utility.showError();
                });
            }
        }
        return $.when(null);
    };
    OfferDetails.prototype.saveNewOffer = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiOffers/SaveOffer',
            data: JSON.stringify({}),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            success: function (result) {
                if (result != null) {
                    _this.offerId = result;
                    $('#modalOfferDetails').modal(); //Przed pokazanie pupupa pobieram dane
                    _this.loadList();
                    _this.loadOfferData();
                }
                else {
                    utility.showError("Wystąpił błąd. Nie udało się stworzyć oferty");
                }
            },
        });
    };
    OfferDetails.prototype.addOfferElement = function (productId, offerElementsCount, personalProductId, showSuccess) {
        if (offerElementsCount === void 0) { offerElementsCount = 1; }
        if (personalProductId === void 0) { personalProductId = null; }
        if (showSuccess === void 0) { showSuccess = true; }
        var activeOfferId = this.getActiveOfferId();
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
            }).then(function (result) {
                if (showSuccess == true) {
                    utility.showSuccess('Wybrany produkt został dodany do oferty');
                }
            }).fail(function (xhr) {
                console.error(xhr);
                utility.showError(xhr.responseJSON != null ? xhr.responseJSON.Message : null);
            });
        }
        else {
            utility.showError('Brak aktywnej oferty');
        }
        return $.when(null);
    };
    OfferDetails.prototype.setUpWithEmptyInstallationObjectObiektyId = function () {
        if ($('#WithEmptyInstallationObjectObiektyId').is(':checked')) {
            $('#ChBAddNewInstallationObject').prop('checked', false).trigger('change').attr('disabled', true);
            $('#pnlInstallationObjectDetails').find('input:text, select').val('').trigger('change').attr('disabled', true);
        }
        else {
            $('#ChBAddNewInstallationObject').removeAttr('disabled');
            $('#OfferSearchInstallationObject').removeAttr('disabled');
        }
    };
    OfferDetails.prototype.setUpDeliveryType = function () {
        if ($('#DeliveryType').val() == OfferDeliveryType.NoDelivery) {
            $('#DeliveryCost').val(utility.toDecimal(0)).closest('.col-md-2').addClass('hidden');
        }
        else {
            $('#DeliveryCost').closest('.col-md-2').removeClass('hidden');
        }
    };
    return OfferDetails;
}());
var offerDetails = new OfferDetails();
$(document).ready(function () {
    offerDetails.init();
});
//# sourceMappingURL=OfferDetails.js.map