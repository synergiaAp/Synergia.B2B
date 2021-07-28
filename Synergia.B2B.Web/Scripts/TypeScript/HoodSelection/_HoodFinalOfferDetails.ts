class HoodFinalOfferDetails {
    private list: DataTables.DataTable;
    private hoodFinalOfferId: number;
    private saveOfferElementQuantityTimeout;
    private saveOfferElementDiscountTimeout;
    private saveOfferElementPriceFactorTimeout;
    private areControlsDisabled: boolean = false;
    private arePriceControlsDisabled: boolean = false;
    private scrollOfferElementsTableToBottom: boolean = false;

    public init() {
        $("#HFOSearchProductsForOffer").autocomplete({
            source: function (request, response) {
                $.getJSON(
                    "/Api/ApiProducts/SearchProductsForOffer",
                    {
                        term: request.term,
                        groupId: $('#HFOSearchProductsForOfferGroupId').val()
                    },
                    response
                );
            },
            minLength: 0,
            select: (event, ui) => {
                hoodFinalOfferDetails.addOfferElement(ui.item.ProductId, 1, ui.item.PersonalProductId, false)
                    .then(() => {
                        $("#HFOSearchProductsForOffer").val("");
                        this.scrollOfferElementsTableToBottom = true;
                        this.loadList();
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
        }).focus(() => {
            $("#HFOSearchProductsForOffer").autocomplete('search', '');
        });

        $("#HFOSearchProductsForOffer").blur(() => {
            $("#HFOSearchProductsForOffer").val("");
        });

        $('#modalHFOOfferDetails').on('hide.bs.modal', () => {
            $('[href="#pillOffer"]').tab('show');
            $("#HFOSearchProductsForOffer").val("");
            $('#hfoOfferElementsTableWrapper').css('opacity', 0);
            this.saveOffer();
        });

        $('#modalHFOOfferDetails').on('shown.bs.modal', () => {
            $('#hfoOfferElementsTableWrapper').fadeTo(500, 1);
            if (this.list != null) {
                this.list.columns.adjust();
            }
        });

        $('#HFOOfferCompanyId').change(() => {
            this.loadOfferCompanyDetails();
            //this.loadInstallationObjectList();
        });
        $('#ChBAddNewHFOOfferCompany').change(() => {
            let isAddNewOfferCompany = $('#ChBAddNewHFOOfferCompany').is(':checked');
            if (isAddNewOfferCompany) {
                $('#ColHFOOfferCompaniesDropDown').addClass('hidden');
                $('#ColHFOOfferCompanyName').removeClass('hidden');
            }
            else {
                $('#ColHFOOfferCompaniesDropDown').removeClass('hidden');
                $('#ColHFOOfferCompanyName').addClass('hidden');
            }
            $('#HFOOfferCompanyId').val('').trigger('change');
            $('#HFOOfferSearchCompany').val('').trigger('change');
            $("#HFOOfferCompanyTempName").val('');
            this.loadOfferCompanyDetails();
        });

        $("#HFOOfferSearchCompany").autocomplete({
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
                $('#HFOOfferCompanyId').val(ui.item.OfferCompanyId).trigger('change');
                $('#HFOOfferCompanyTempName').val(ui.item.label);
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

        $("#HFOOfferSearchCompany").blur(() => {
            $("#HFOOfferSearchCompany").val($("#HFOOfferCompanyTempName").val());
        });

        $('#btnClearHFOOfferSearchCompany').click(() => {
            $("#HFOOfferSearchCompany").val('');
            $("#HFOOfferCompanyTempName").val('');
            $('#HFOOfferCompanyId').val('').trigger('change');
        });

        //$("#HFOOfferSearchInstallationObject").autocomplete({
        //    source: function (request, response) {
        //        if ($('#HFOOfferCompanyId').val() != '') {
        //            $.getJSON(
        //                "/Api/ApiInstallationObjects/SearchObject",
        //                {
        //                    term: request.term,
        //                    offerCompanyId: $('#HFOOfferCompanyId').val()
        //                },
        //                response
        //            );
        //        }
        //    },
        //    minLength: 0,
        //    select: (event, ui) => {
        //        $('#HFOInstallationObjectId').val(ui.item.InstallationObjectId).trigger('change');
        //        $('#HFOOfferInstallationObjectTempName').val(ui.item.label);
        //    },
        //    //pogrubienie tekstu
        //    open: function (e, ui) {
        //        var acData = $(this).data('ui-autocomplete');
        //        acData
        //            .menu
        //            .element
        //            .find('li')
        //            .each(function () {
        //                var me = $(this);
        //                var keywords = acData.term.split(' ').join('|');
        //                me.html('<div class="ui-menu-item-wrapper">' + me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<b>$1</b>') + '</div>');
        //            });
        //    },
        //    params: { "auto_dealer": "yes" }
        //});

        //$("#HFOOfferSearchInstallationObject").blur(() => {
        //    $("#HFOOfferSearchInstallationObject").val($("#HFOOfferInstallationObjectTempName").val());
        //});

        //$('#btnClearHFOOfferSearchInstallationObject').click(() => {
        //    $("#HFOOfferSearchInstallationObject").val('');
        //    $("#HFOOfferInstallationObjectTempName").val('');
        //    $('#HFOInstallationObjectId').val('').trigger('change');
        //});

        //$('#HFOInstallationObjectId').change(() => {
        //    this.loadInstallationObjectDetails();
        //});
        //$('#ChBAddNewHFOInstallationObject').change(() => {
        //    let isAddNewInstallationObject = $('#ChBAddNewHFOInstallationObject').is(':checked');
        //    if (isAddNewInstallationObject) {
        //        $('#ColHFOInstallationObjectsDropDown').addClass('hidden');
        //        $('#ColHFOInstallationObjectName').removeClass('hidden');
        //    }
        //    else {
        //        $('#ColHFOInstallationObjectsDropDown').removeClass('hidden');
        //        $('#ColHFOInstallationObjectName').addClass('hidden');
        //    }
        //    $('#HFOInstallationObjectId').val('').trigger('change');
        //    $('#HFOOfferSearchInstallationObject').val('').trigger('change');
        //    $("#HFOOfferInstallationObjectTempName").val('');
        //    this.loadInstallationObjectDetails();
        //});

        $('[href="#pillHFOOfferElements"]').on('shown.bs.tab', () => {
            if (this.list != null) {
                this.list.columns.adjust();
            }
        });

        $(window).resize(() => {
            setTimeout(() => {
                if (this.list != null && $('#modalHFOOfferDetails').is(':visible')) {
                    $('#pillHFOOfferElements div.dataTables_scrollBody').height(this.getOfferElementsTableHeight())
                        .css('max-height', this.getOfferElementsTableHeight() + 'px');
                    this.list.draw();
                }
            }, 1000);
        });

        $('#btnHFOFinishOffer').click(() => {
            this.finishOffer();
        });

        $('#btnHFOOrderOffer').click(() => {
            this.orderOffer();
        });

        $('#HFODiscount').change((e) => {
            this.saveOfferElementDiscount(null, $(e.currentTarget));
        });

        $('#HFOFixedValueAfterAllDiscounts').change(() => {
            $('#HFOFixedValueAfterAllDiscounts').val(utility.toDecimal($('#HFOFixedValueAfterAllDiscounts').val()));
            this.saveHoodFinalOfferFixedValueAfterAllDiscounts();
        });
    }

    //private loadInstallationObjectList() {
    //    $('#btnClearHFOOfferSearchInstallationObject').click();
    //}

    public finishOffer() {
        //if ($('#HFOOfferCompanyId').val() == "" && $('#HFOOfferCompanyName').val() == "") {
        //    utility.showError("Nabywca nie został wybrany");
        //}
        if ($('#HFOInstallationObjectName').val() == ''
            || $('#HFOInstallationObjectCity').val() == ''
            || ($('#HFOOfferSearchCompany').val() == '') && $('#HFOOfferCompanyName').val() == '') {
            utility.showError("Wypełnij obowiązkowe pola");
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
        if ((!$('HFOOfferCompanyName').is(':visible') || $('HFOOfferCompanyName').val()) && $('#HFOOfferCompanyAddress').val() && $('#HFOOfferCompanyAddress').val()
            && $('#HFOOfferCompanyPostalCode').val() && $('#HFOOfferCompanyNIP').val()) {
            utility.showQuestion('Czy na pewno chcesz złożyć zamówienie i podałeś wszystkie uwagi do zamówienia?', () => {
                this.setOfferStatus(OfferStatus.Ordered);
            });
        } else {
            utility.showError("Uzupełnij wszystkie dane klienta");
        }
    }

    private setOfferStatus(status: OfferStatus) {
        this.saveOffer()
            .then(() => {
                $.ajax({
                    url: '/Api/ApiHoodFinalOffers/SetHoodFinalOfferStatus',
                    data: JSON.stringify({
                        hoodFinalOfferId: this.hoodFinalOfferId,
                        status: <number>status
                    }),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    type: 'POST',
                    success: (result) => {
                        if (result) {
                            $('#modalHFOOfferDetails').modal('hide');
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

    public loadOfferCompanyDetails() {
        if ($('#HFOOfferCompanyId').val() != "") {
            $.ajax({
                url: '/Api/ApiCustomers/GetOfferCompanyData',
                data: { offerCompanyId: $('#HFOOfferCompanyId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: (result) => {
                    $('#HFOOfferCompanyAddress').val(result.Address).trigger('change');//.prop('disabled', true);
                    $('#HFOOfferCompanyName').val(result.Name).trigger('change');//.prop('disabled', true);
                    $('#HFOOfferCompanyNIP').val(result.NIP).trigger('change');//.prop('disabled', true);
                    $('#HFOOfferCompanyCity').val(result.City).trigger('change');//.prop('disabled', true);
                    $('#HFOOfferCompanyPostalCode').val(result.PostalCode).trigger('change');//.prop('disabled', true);
                    $('#HFOOfferCompanyTempName').val(result.Name).trigger('change');//.prop('disabled', true);
                    $('#HFOOfferSearchCompany').val(result.Name);
                },
            });
        }
        else {
            let isAddNewOfferCompany = $('#ChBAddNewHFOOfferCompany').is(':checked');
            $('#HFOOfferCompanyAddress').val('').trigger('change');//.prop('disabled', !isAddNewOfferCompany);
            $('#HFOOfferCompanyName').val('').trigger('change');//.prop('disabled', !isAddNewOfferCompany);
            $('#HFOOfferCompanyNIP').val('').trigger('change');//.prop('disabled', !isAddNewOfferCompany);
            $('#HFOOfferCompanyCity').val('').trigger('change');//.prop('disabled', !isAddNewOfferCompany);
            $('#HFOOfferCompanyPostalCode').val('').trigger('change');//.prop('disabled', !isAddNewOfferCompany);
            $('#HFOOfferCompanyTempName').val('').trigger('change');//.prop('disabled', !isAddNewOfferCompany);
        }
    }

    public loadInstallationObjectDetails() {
        if ($('#HFOInstallationObjectId').val()) {
            $.ajax({
                url: '/Api/ApiInstallationObjects/GetInstallationObjectData',
                data: { installationObjectId: $('#HFOInstallationObjectId').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: (result) => {
                    $('#HFOInstallationObjectAddress').val(result.Address).trigger('change');//.prop('disabled', true);
                    $('#HFOInstallationObjectName').val(result.Name).trigger('change');//.prop('disabled', true);
                    $('#HFOInstallationObjectCountry').val(result.Country).trigger('change');//.prop('disabled', true);
                    $('#HFOInstallationObjectCity').val(result.City).trigger('change');//.prop('disabled', true);
                    $('#HFOInstallationObjectPostalCode').val(result.PostalCode).trigger('change');//.prop('disabled', true);
                    $('#HFOInstallationObjectType').val(result.Type).trigger('change');//.prop('disabled', true);
                    //$('#HFOOfferInstallationObjectTempName').val(result.Name).trigger('change');//.prop('disabled', true);
                    //$('#HFOOfferSearchInstallationObject').val(result.Name);
                },
            });
        }
        else {
            //let isAddNewInstallationObject = $('#ChBAddNewHFOInstallationObject').is(':checked');

            $('#HFOInstallationObjectAddress').val('').trigger('change');//.prop('disabled', !isAddNewInstallationObject);
            $('#HFOnstallationObjectName').val('').trigger('change');//.prop('disabled', !isAddNewInstallationObject);
            $('#HFOInstallationObjectCountry').val('').trigger('change');//.prop('disabled', !isAddNewInstallationObject);
            $('#HFOInstallationObjectCity').val('').trigger('change');//.prop('disabled', !isAddNewInstallationObject);
            $('#HFOInstallationObjectPostalCode').val('').trigger('change');//.prop('disabled', !isAddNewInstallationObject);
            $('#HFOInstallationObjectType').val('').trigger('change');//.prop('disabled', !isAddNewInstallationObject);
            //$('#HFOOfferInstallationObjectTempName').val('').trigger('change');//.prop('disabled', !isAddNewInstallationObject);
        }
    }

    public showModal(offerIdParam?: number) {
        this.hoodFinalOfferId = offerIdParam;
        //if (this.hoodFinalOfferId == null) {
        //    this.saveNewOffer();
        //}
        //else {
        this.loadOfferData();
        //this.loadList();
        $('#modalHFOOfferDetails').modal();
        //}
    }

    public getOfferElementsTableHeight(): number {
        return ($(window).height() - 370);
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#hfoOfferElementsTable').DataTable({
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
                        filename: 'Elementy oferty okapów',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                            format: {
                                body: function (data, row, column, node) {
                                    if (column == 3 || column == 5 || column == 7) {
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
                    url: '/Api/ApiHoodFinalOffers/GridGetHoodFinalOfferElements',
                    data: (data: any) => {
                        data.HoodFinalOfferId = this.hoodFinalOfferId;
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
                        render: (data, type, row, meta) => {
                            if (row.ProductId || row.PersonalProductId) {
                                //if (row.PersonalProductId || row.ProductId) {
                                let maxLength = 50;
                                let productNameHref = '';
                                if (row.PersonalProductId == null) {
                                    productNameHref = '/Products/ProductDetails/' + row.ProductId;
                                } else {
                                    productNameHref = '/PersonalProducts';
                                }
                                return '<a target="_blank" title="' + row.ProductName.replaceAll('"', '')
                                    + '"data-toggle="tooltip" href="' + productNameHref + '">'
                                    + (row.ProductName.length > maxLength ? row.ProductName.substring(0, maxLength) + '...' : row.ProductName) + '</a>';
                            }
                            else {
                                return row.ProductName;
                            }
                        },
                        width: '330px',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="hoodFinalOfferDetails.saveOfferElementQuantity(' + row.Id
                                + ',this)" data-min="1" data-max="99" type= "text" value="'
                                + row.Quantity + '" class="touchSpin"'
                                + (this.areControlsDisabled || this.arePriceControlsDisabled ? 'disabled' : '')
                                + '></div>';
                        },
                        className: 'text-center',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.PurchasePriceNet);
                        },
                        className: 'text-right nowrap',
                        width: '70px',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return `<div style="width:60px;" class="touchSpinWrapper">
                                        <input data-onChange="hoodFinalOfferDetails.saveOfferElementPriceFactor(${row.Id}, this)" data-min="0" data-max="99" data-step="0.1" data-decimals="2" 
                                            data-forcestepdivisibility="none" type= "text" value="${row.PriceFactor}" class="touchSpin" ${this.areControlsDisabled || this.arePriceControlsDisabled ? 'disabled' : ''}>
                                    </div>`;
                        },
                        className: 'text-center',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.CatalogPriceNet);
                        },
                        className: 'text-right nowrap',
                        width: '70px',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + ' <input onChange="hoodFinalOfferDetails.saveOfferElementDiscount(' + row.Id
                                + ',this)" data-min="0" data-max="100" data-step="1" data-decimals="1" data-forcestepdivisibility="none" type= "text" value="'
                                + row.Discount + '" class="touchSpin"'
                                + (this.areControlsDisabled || this.arePriceControlsDisabled ? 'disabled' : '')
                                + ' ></div>';
                        },
                        className: 'text-right',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.PriceAfterDiscountNet);
                        },
                        className: 'text-right nowrap',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.FinalValueNet);
                        },
                        className: 'text-right nowrap',
                        width: '100px',
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.FileName != null) {
                                return '<img src="/Files/GetFile?fileName=' + row.FileName + '"/>';
                            } else {
                                let fileName = '';
                                if (row.Type == <number>HoodFinalOfferElementType.Hood) {
                                    fileName = this.getHoodFileName(row);
                                    if (fileName) {
                                        return '<img src="/Images/HoodOffer/Hoods/' + this.getHoodFileName(row) + '" />';
                                    }
                                } else {
                                    fileName = this.getHoodAccessoryFileName(row);
                                    if (fileName) {
                                        return '<img src="/Images/HoodOffer/Accessories/' + this.getHoodAccessoryFileName(row) + '" />';
                                    }
                                }
                                return '<img src="/Images/Products/empty_product.png"/>';
                            }
                        },
                        className: 'text-center',
                    },
                    {
                        width: '40px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            if (!this.areControlsDisabled && !this.arePriceControlsDisabled) {
                                return '<a href="javascript:hoodFinalOfferDetails.removeOfferElement(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            else {
                                return "";
                            }

                        },
                    },
                ],
                initComplete: () => {
                    $('#pillHFOOfferElements table').show();
                },
                drawCallback: () => {
                    $('#hfoOfferElementsTable [data-toggle="tooltip"]').tooltip();

                    $("#hfoOfferElementsTable .touchSpin").each(function () {
                        $(this).TouchSpin({
                            verticalbuttons: true,
                            //initval: 1,
                            min: parseInt($(this).attr('data-min')),
                            max: parseInt($(this).attr('data-max')),
                            step: $(this).attr('data-step') != null ? parseFloat($(this).attr('data-step')) : 1,
                            decimals: $(this).attr('data-decimals') != null ? parseInt($(this).attr('data-decimals')) : 0,
                            forcestepdivisibility: $(this).attr('data-forcestepdivisibility') ? $(this).attr('data-forcestepdivisibility') : 'round'
                        });

                        // problem z touchspin dla wartosci z przecinkami, od razu wywolywal change
                        if ($(this).attr('data-onChange')) {
                            $(this).attr('onChange', $(this).attr('data-onChange'));
                        }
                    });

                    setTimeout(function () {
                        $('#hfoOfferElementsTable .touchSpin').closest('.touchSpinWrapper').removeClass('invisible');
                    }, 100);

                    if (this.scrollOfferElementsTableToBottom) {
                        this.scrollOfferElementsTableToBottom = false;
                        $('#hfoOfferElementsTableWrapper .dataTables_scrollBody').scrollTop($('#hfoOfferElementsTableWrapper .dataTables_scrollBody')[0].scrollHeight);
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

    private getHoodAccessoryFileName(row: any): string {
        let accessoryName = row.ProductCode.toLowerCase();
        if (accessoryName.includes('ansul')) {
            return 'ANSUL.png';
        } else if (accessoryName.includes('junior')) {
            return 'SMOKI JUNIOR.jpg';
        } else if (accessoryName.includes('maxi')) {
            return 'SMOKI MAXI GRILL.jpg';
        } else if (accessoryName.includes('jrs')) {
            return 'Nawiewnik JRS.jpg';
        }
        return null;
    }

    private getHoodFileName(row: any): string {
        let imgFileName = "";
        if (row.ProductCode.startsWith("JSI-R")
            || row.ProductCode.startsWith("JSI-S")
            || row.ProductCode.startsWith("JSVI-S")
            || row.ProductCode.startsWith("JSVI-S-W")
            || row.ProductCode.startsWith("JSVI-R")
            || row.ProductCode.startsWith("JSVI-R-W")
        ) {
            imgFileName = "Synergia_JSI_filtr_";
        } else if (row.ProductCode.startsWith("JVI-R")
            || row.ProductCode.startsWith("JVI-R-W")
        ) {
            imgFileName = "Synergia_JVI_filtr_";
        } else if (row.ProductCode.startsWith("JLI-R")
            || row.ProductCode.startsWith("JLI-S")
        ) {
            imgFileName = "Synergia_JLI_filtr_";
        } else if (row.ProductCode.startsWith("JSKI")) {
            return "Synergia_JSKI_dol_pop.png";
        } else if (row.ProductCode.startsWith("JKI")) {
            return "Synergia_JKI_dol_pop.png";
        }
        if (!imgFileName) {
            return null;
        }

        if (row.ProductCode.includes('UV-Turbo')
            || row.ProductCode.includes('Turbo')) {
            imgFileName += "TURBOSWING";
        } else {
            imgFileName += "JFF";
        }
        imgFileName += "_dol_pop.png";
        return imgFileName;
    }

    public saveOfferElementQuantity(hoodFinalOfferElementId: number, touchSpinElement: JQuery) {
        if (this.saveOfferElementQuantityTimeout) {
            clearTimeout(this.saveOfferElementQuantityTimeout);
        }
        this.saveOfferElementQuantityTimeout = setTimeout(() => {
            $.ajax({
                url: '/Api/ApiHoodFinalOffers/SaveHoodFinalOfferElementQuantity',
                data: JSON.stringify({ hoodFinalofferElementId: hoodFinalOfferElementId, quantity: $(touchSpinElement).val() }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                this.loadList();
                this.loadOfferSummary();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
            clearTimeout(this.saveOfferElementQuantityTimeout);
        }, 1000);
    }

    public saveOfferElementDiscount(hoodFinalOfferElementId: number, touchSpinElement: JQuery) {
        if (this.saveOfferElementDiscountTimeout) {
            clearTimeout(this.saveOfferElementDiscountTimeout);
        }
        this.saveOfferElementDiscountTimeout = setTimeout(() => {
            $.ajax({
                url: '/Api/ApiHoodFinalOffers/SaveHoodFinalOfferElementDiscount',
                data: JSON.stringify({
                    hoodFinalOfferId: this.hoodFinalOfferId,
                    hoodFinalOfferElementId: hoodFinalOfferElementId,
                    discount: $(touchSpinElement).val()
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                this.loadList();
                this.loadOfferSummary();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
            clearTimeout(this.saveOfferElementDiscountTimeout);
        }, 1000);
    }

    public saveHoodFinalOfferFixedValueAfterAllDiscounts() {
        $.ajax({
            url: '/Api/ApiHoodFinalOffers/SaveHoodFinalOfferFixedValueAfterAllDiscounts',
            data: JSON.stringify({
                hoodFinalOfferId: this.hoodFinalOfferId,
                fixedValueAfterAllDiscounts: $('#HFOFixedValueAfterAllDiscounts').val()
                    ? utility.toApiDecimal($('#HFOFixedValueAfterAllDiscounts').val())
                    : ''
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST'
        }).then((result) => {
            this.loadOfferSummary().then(() => {
                this.loadList();
            });
        }).fail((xhr) => {
            $('#HFOFixedValueAfterAllDiscounts').val('');
            this.setUpArePriceControlsDisabled();

            console.error(xhr);
            utility.showError(xhr.responseJSON?.Message);
        });
    }

    private setUpArePriceControlsDisabled() {
        this.arePriceControlsDisabled = $('#HFOFixedValueAfterAllDiscounts').val() ? true : false;
        $('#HFODiscount, #pnlSearchProductsForOffer input, #pnlSearchProductsForOffer select').attr('disabled', this.arePriceControlsDisabled || this.areControlsDisabled);

        if (!this.areControlsDisabled && !this.arePriceControlsDisabled) {
            utility.enableSelectPickers($('#pnlSearchProductsForOffer select.selectpicker'));
        }

        if (this.arePriceControlsDisabled) {
            $('#divHFOFixedValueAfterAllDiscountsInfo').removeClass('hidden');
        } else {
            $('#divHFOFixedValueAfterAllDiscountsInfo').addClass('hidden');
        }
    }

    public saveOfferElementPriceFactor(hoodFinalOfferElementId: number, touchSpinElement: JQuery) {
        if (this.saveOfferElementPriceFactorTimeout) {
            clearTimeout(this.saveOfferElementPriceFactorTimeout);
        }
        this.saveOfferElementPriceFactorTimeout = setTimeout(() => {
            $.ajax({
                url: '/Api/ApiHoodFinalOffers/SaveHoodFinalOfferElementPriceFactor',
                data: JSON.stringify({
                    hoodFinalOfferElementId: hoodFinalOfferElementId,
                    priceFactor: $(touchSpinElement).val()
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                this.loadList();
                this.loadOfferSummary();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
            clearTimeout(this.saveOfferElementPriceFactorTimeout);
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
                url: '/Api/ApiHoodFinalOffers/DeleteHoodFinalOffer',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                hoodFinalOfferList.loadList();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
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
                url: '/Api/ApiHoodFinalOffers/DeleteHoodFinalOfferElement',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                this.loadList();
                this.loadOfferSummary();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        });
    }

    public loadOfferSummary(): JQueryPromise<any> {
        return $.ajax({
            url: '/Api/ApiHoodFinalOffers/GetHoodFinalOfferData',
            data: { hoodFinalOfferId: this.hoodFinalOfferId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET'
        }).then((result) => {
            $('#HFOCatalogValueNet').text(utility.toCurrency(result.HFOCatalogValueNet));
            $('#HFOValueAfterPrimatyDiscountNet').text(utility.toCurrency(result.HFOValueAfterPrimatyDiscountNet));
            $('#HFOFinalValueAfterAllDiscountsNet').text(utility.toCurrency(result.HFOFinalValueAfterAllDiscountsNet));
            $('#HFOCatalogValueGross').text(utility.toCurrency(result.HFOCatalogValueNet + result.HFOCatalogValueNet * 0.23));
            $('#HFOValueAfterPrimatyDiscountGross').text(utility.toCurrency(result.HFOValueAfterPrimatyDiscountNet + result.HFOValueAfterPrimatyDiscountNet * 0.23));
            $('#HFOFinalValueAfterAllDiscountsGross').text(utility.toCurrency(result.HFOFinalValueAfterAllDiscountsNet + result.HFOFinalValueAfterAllDiscountsNet * 0.23));
            $('#HFOCatalogValueVat').text(utility.toCurrency(result.HFOCatalogValueNet * 0.23));
            $('#HFOValueAfterPrimatyDiscountVat').text(utility.toCurrency(result.HFOValueAfterPrimatyDiscountNet * 0.23));
            $('#HFOFinalValueAfterAllDiscountsVat').text(utility.toCurrency(result.HFOFinalValueAfterAllDiscountsNet * 0.23));
            $('#HFODiscount').val(result.HFODiscount.toFixed(1));
            $('#HFOFixedValueAfterAllDiscounts').val(result.HFOFixedValueAfterAllDiscounts ? utility.toDecimal(result.HFOFixedValueAfterAllDiscounts) : '');
            this.setUpArePriceControlsDisabled();
        }).fail((xhr) => {
            console.error(xhr);
        });
    }

    public loadOfferData() {
        $('#ChBAddNewHFOOfferCompany').prop('checked', false).trigger('change');
        $('#ChBAddNewHFOInstallationObject').prop('checked', false).trigger('change');
        $.ajax({
            url: '/Api/ApiHoodFinalOffers/GetHoodFinalOfferData',
            data: { hoodFinalOfferId: this.hoodFinalOfferId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET'
        }).then((result) => {
            $('#btnHFOFinishOffer, #btnHFOOrderOffer').addClass('hidden');
            if (result.HFOStatus == <number>OfferStatus.Draft) {
                this.enableAllControls();
                $('#btnHFOFinishOffer').removeClass('hidden');
            } else if (result.HFOStatus == <number>OfferStatus.Finished) {
                $('#btnHFOOrderOffer').removeClass('hidden');
                this.disableAllControls(OfferStatus.Finished);
            } else if (result.HFOStatus == <number>OfferStatus.Ordered) {
                this.disableAllControls(OfferStatus.Ordered);
            }

            $('#HFOCity').val(result.HFOCity).trigger('change');
            $('#HFOOfferDate').val(result.HFOOfferDate).trigger('change');
            $('#HFOOfferNumber').val("JE/" + result.HFOOfferNumber).trigger('change');
            $('#HFOOfferId').val(result.HFOOfferId).trigger('change');
            $('#HFOOfferCompanyId').val(result.HFOOfferCompanyId).trigger('change');
            $('#HFOInstallationObjectId').val(result.HFOInstallationObjectId);
            this.loadInstallationObjectDetails();
            $('#HFOStatusText').val(result.HFOStatusText).trigger('change');
            $('#HFOPrepaymentPercent').val(result.HFOPrepaymentPercent).trigger('change');
            $('#HFOPaymentType').val(result.HFOPaymentType).selectpicker('refresh');//.trigger('change');
            $('#HFODeliveryTime').val(result.HFODeliveryTime);
            $('#HFOGuaranteeYearsHoods').val(result.HFOGuaranteeYearsHoods);
            $('#HFOGuaranteeYearsVentilators').val(result.HFOGuaranteeYearsVentilators);
            $('#HFOGuaranteeYearsCookAir').val(result.HFOGuaranteeYearsCookAir);
            $('#HFOGuaranteeYearsSmoki').val(result.HFOGuaranteeYearsSmoki);
            $('#HFOGuaranteeYearsAnsul').val(result.HFOGuaranteeYearsAnsul);
            $('#HFOGuaranteeYearsKES').val(result.HFOGuaranteeYearsKES);
            $('#HFOCatalogValueNet').text(utility.toCurrency(result.HFOCatalogValueNet));                                                       //text używany do wypełniania span, div itp.
            $('#HFOValueAfterPrimatyDiscountNet').text(utility.toCurrency(result.HFOValueAfterPrimatyDiscountNet));
            $('#HFOFinalValueAfterAllDiscountsNet').text(utility.toCurrency(result.HFOFinalValueAfterAllDiscountsNet));
            $('#HFOCatalogValueGross').text(utility.toCurrency(result.HFOCatalogValueNet + result.HFOCatalogValueNet * 0.23));
            $('#HFOValueAfterPrimatyDiscountGross').text(utility.toCurrency(result.HFOValueAfterPrimatyDiscountNet + result.HFOValueAfterPrimatyDiscountNet * 0.23));
            $('#HFOFinalValueAfterAllDiscountsGross').text(utility.toCurrency(result.HFOFinalValueAfterAllDiscountsNet + result.HFOFinalValueAfterAllDiscountsNet * 0.23));
            $('#HFOCatalogValueVat').text(utility.toCurrency(result.HFOCatalogValueNet * 0.23));
            $('#HFOValueAfterPrimatyDiscountVat').text(utility.toCurrency(result.HFOValueAfterPrimatyDiscountNet * 0.23));
            $('#HFOFinalValueAfterAllDiscountsVat').text(utility.toCurrency(result.HFOFinalValueAfterAllDiscountsNet * 0.23));
            $('#HFORegionId').val(result.HFORegionId).trigger('change');
            if (result.HFOLogo != null) {
                let imageUrl = '/Files/GetCRMFile?fileName=' + result.HFOLogo;
                $('#hfoOfferLogo').attr('src', imageUrl)
                    .removeClass('hidden');
            } else {
                $('#hfoOfferLogo').addClass('hidden');
            }
            $('#HFODiscount').val(result.HFODiscount.toFixed(1));
            $('#HFOContactPerson').val(result.HFOContactPerson).trigger('change');
            $('#HFOContactEmail').val(result.HFOContactEmail).trigger('change');
            $('#HFOContactPhone').val(result.HFOContactPhone).trigger('change');
            $('#HFOComment').val(result.HFOComment).trigger('change');
            $('#HFOFixedValueAfterAllDiscounts').val(result.HFOFixedValueAfterAllDiscounts ? utility.toDecimal(result.HFOFixedValueAfterAllDiscounts) : '');
            $('#HFOHideDiscountInPdfFile').prop('checked', result.HFOHideDiscountInPdfFile).trigger('change');

            this.setUpArePriceControlsDisabled();

            this.loadList();
        }).fail((xhr) => {
            console.error(xhr);
        });
    }

    private enableAllControls() {
        $('#modalHFOOfferDetails').find('select:not(.form-control-disabled), input:text:not(.form-control-disabled), input:checkbox:not(.form-control-disabled), #btnClearHFOOfferSearchCompany')
            .attr('disabled', false);

        utility.enableSelectPickers($('#modalHFOOfferDetails').find('select.selectpicker:not(.form-control-disabled)'));

        this.areControlsDisabled = false;
    }

    private disableAllControls(offerStatus: OfferStatus) {
        this.areControlsDisabled = true;
        $('#modalHFOOfferDetails').find('select, input:text, input:checkbox, #btnClearHFOOfferSearchCompany, textarea').attr('disabled', true);
        $('#hfoOfferElementsTableWrapper .remove').hide();
        if (offerStatus == OfferStatus.Finished) {
            $('#hfoOfferCompanyDetails').find('select, input:text, input:checkbox, #btnClearHFOOfferSearchCompany').attr('disabled', false);
            $('#HFOComment').attr('disabled', false);
        }
    }

    public saveOffer(): JQueryPromise<any> {
        //if (!this.areControlsDisabled) {
        $('#formSaveHFOOfferDetails').validate();
        if ($('#formSaveHFOOfferDetails').valid()) {
            let dataToSend: any = utility.getFormData($('#formSaveHFOOfferDetails'));
            dataToSend.HFOFixedValueAfterAllDiscounts = utility.toApiDecimal(dataToSend.HFOFixedValueAfterAllDiscounts);

            return $.ajax({
                url: '/Api/ApiHoodFinalOffers/SaveHoodFinalOffer',
                data: JSON.stringify(dataToSend),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
            }).then((result) => {
                if (typeof hoodFinalOfferList != 'undefined') {
                    hoodFinalOfferList.loadList();
                }
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        }
        //}
        return $.when(null);
    }

    //public saveNewOffer() {
    //    $.ajax({
    //        url: '/Api/ApiHoodFinalOffers/SaveOffer',
    //        data: JSON.stringify({}),
    //        dataType: 'json',
    //        contentType: 'application/json; charset=utf-8',
    //        type: 'POST',
    //        success: (result) => {
    //            if (result != null) {
    //                this.hoodFinalOfferId = result;
    //                $('#modalHFOOfferDetails').modal();    //Przed pokazanie pupupa pobieram dane
    //                this.loadList();
    //                this.loadOfferData();
    //            }
    //            else {
    //                utility.showError("Wystąpił błąd. Nie udało się stworzyć oferty");
    //            }
    //        },
    //    });
    //}

    public addOfferElement(productId, offerElementsCount: number = 1, personalProductId: number = null, showSuccess = true): JQueryPromise<any> {
        return $.ajax({
            url: '/Api/ApiHoodFinalOffers/AddHoodFinalOfferElement',
            data: JSON.stringify({
                hoodFinalOfferId: this.hoodFinalOfferId,
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
            this.loadOfferSummary();
        }).fail((xhr) => {
            console.error(xhr);
            utility.showError(xhr.responseJSON != null ? xhr.responseJSON.Message : null);
        });
    }
}
let hoodFinalOfferDetails = new HoodFinalOfferDetails();

$(document).ready(function () {
    hoodFinalOfferDetails.init();
});
