class OrderDetails {
    private list: DataTables.DataTable;
    private orderId: number;
    private saveOrderElementQuantityTimeout;
    private saveOrderElementDiscountTimeout;
    private logoDropzone: Dropzone;

    public init() {
        $('#modalOrderDetails').on('hide.bs.modal', () => {
            $('[href="#pillOffer"]').tab('show');
            $('#orderElementsTableWrapper').css('opacity', 0);
        });

        $('#modalOrderDetails').on('shown.bs.modal', () => {
            $('#orderElementsTableWrapper').fadeTo(500, 1);
            if (this.list != null) {
                this.list.columns.adjust();
            }
        });

        $('[href="#pillOrderrElements"]').on('shown.bs.tab', () => {
            if (this.list != null) {
                this.list.columns.adjust();
            }
        });

        $(window).resize(() => {
            setTimeout(() => {
                if (this.list != null && $('#modalOrderDetails').is(':visible')) {
                    $('#pillOrderElements div.dataTables_scrollBody').height(this.getOrderElementsTableHeight())
                        .css('max-height', this.getOrderElementsTableHeight() + 'px');
                    this.list.draw();
                }
            }, 1000);
        });

        this.initLogoDropzone();
    }

    public initLogoDropzone() {
        if (this.logoDropzone != null) {
            this.logoDropzone.off();
            this.logoDropzone.destroy();
        }

        this.logoDropzone = new Dropzone('#dropzoneOfferLogo', {
            acceptedFiles: 'image/*',
            uploadMultiple: false,
            url: '/Api/ApiOffers/SaveOfferLogo?offerId=' + this.orderId,
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
        }
    }

    public showModal(orderIdParam?: number) {
        this.orderId = orderIdParam;
       
        //Przed pokazanie pupupa pobieram dane
        this.loadList();
        this.loadOrderData();
        $('#modalOrderDetails').modal();
        
    }

    public getOrderElementsTableHeight(): number {
        return ($(window).height() - 370);
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#orderElementsTable').DataTable({
                ordering: false,
                searching: false,
                paging: false,
                info: false,
                scrollY: this.getOrderElementsTableHeight() + 'px',
                scrollCollapse: true,
                processing: false,
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiOrders/GridGetOrderElements',
                    data: (data: any) => {
                        data.OrderId = this.orderId;
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
                                return '<a title="' + row.ProductName.replaceAll('"', '')
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
                        className: 'text-center',
                    },
                    {
                        data: 'Quantity',
                        //render: (data, type, row, meta) => {
                        //    return '<div style="width:45px;" touchSpinWrapper">'
                        //        + ' <input onChange="offerDetails.saveOfferElementQuantity(' + row.Id + ',this)" data-min="1" data-max="99" type= "text" value="' + row.Quantity + '" class="touchSpin" ></div>';
                        //},
                        className: 'text-center',
                    },
                    {
                        data: 'ProductTerminal',
                        className: 'text-center',
                    },
                    {
                        //data: 'ProductPowerGas',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerGas);
                        },
                        className: 'text-center',
                    },
                    {
                        //data: 'ProductPowerGasSum',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerGasSum);
                        },
                        className: 'text-center',
                    },
                    {
                        //data: 'ProductPowerElectricity',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerElectricity);
                        },
                        className: 'text-center',
                    },
                    {
                        //data: 'ProductPowerElectricitySum',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.ProductPowerElectricitySum);
                        },
                        className: 'text-center',
                    },
                    {
                        //data: 'CatalogPriceNet',
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.CatalogPriceNet);
                        },
                        className: 'text-right',
                        width: '70px',
                    },
                    {
                        data: 'Discount',
                        //render: (data, type, row, meta) => {
                        //    return '<div style="width:45px;" touchSpinWrapper">'
                        //        + ' <input onChange="offerDetails.saveOfferElementDiscount(' + row.Id + ',this)" data-min="0" data-max="100" type= "text" value="' + row.Discount + '" class="touchSpin" ></div>';
                        //},
                        className: 'text-right',
                    },
                    {
                        //data: 'PriceAfterDiscountNet',
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.PriceAfterDiscountNet);
                        },
                        className: 'text-right',
                        //width: '100px',
                    },
                    {
                        //data: 'FinalValueNet',
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.FinalValueNet);
                        },
                        className: 'text-right',
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
                ],
                initComplete: () => {
                    $('#pillOrderElements table').show();
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
                },
                responsive: true,
                autoWidth: false
            });
        }
        else {
            this.list.ajax.reload();
        }
    }

    public remove(id: number) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć zamówienie?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiOrders/DeleteOrder',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    ordersList.loadList();
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
                    this.loadList();
                    this.loadOrderData();
                },
            });
        });
    }

    public loadOrderData() {
        $('#ChBAddNewOfferCompany').prop('checked', false).trigger('change');
        $('#ChBAddNewInstallationObject').prop('checked', false).trigger('change');
        $.ajax({
            url: '/Api/ApiOrders/GetOrderData',
            data: { orderId: this.orderId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                //$('#Logo').val(result.Logo).trigger('change');
                $('#City').val(result.City).trigger('change');
                $('#OrderDate').val(result.OrderDate).trigger('change');
                $('#OrderNumber').val("ZAM/" + result.OrderNumber).trigger('change');
                $('#SellerName').val(result.SellerName).trigger('change');
                $('#SellerFirmaId').val(result.SellerFirmaId).trigger('change');
                $('#OrderId').val(result.OrderId).trigger('change');
                $('#OfferCompanyId').val(result.OfferCompanyId).trigger('change');
                $('#InstallationObjectId').val(result.InstallationObjectId).trigger('change');                                                //val używane do kontrolek typu TextBox, DropDownList
                $('#StatusText').val(result.StatusText).trigger('change');
                $('#CatalogValueNet').text(utility.toCurrency(result.CatalogValueNet));                                                       //text używany do wypełniania span, div itp.
                $('#ValueAfterPrimatyDiscountNet').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet));
                $('#FinalValueAfterAllDiscountsNet').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet));
                $('#CatalogValueGross').text(utility.toCurrency(result.CatalogValueNet + result.CatalogValueNet * 0.23));
                $('#ValueAfterPrimatyDiscountGross').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet + result.ValueAfterPrimatyDiscountNet * 0.23));
                $('#FinalValueAfterAllDiscountsGross').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet + result.FinalValueAfterAllDiscountsNet * 0.23));
                $('#CatalogValueVat').text(utility.toCurrency(result.CatalogValueNet * 0.23));
                $('#ValueAfterPrimatyDiscountVat').text(utility.toCurrency(result.ValueAfterPrimatyDiscountNet * 0.23));
                $('#FinalValueAfterAllDiscountsVat').text(utility.toCurrency(result.FinalValueAfterAllDiscountsNet * 0.23));

                this.initLogoDropzone();
                this.loadOfferLogo(result.Logo);
            },
        });
    }

    private disableAllControls() {
        $('#modalOrderDetails').find('select, input:text, input:checkbox').attr('disabled', true);
       
    }
}
let orderDetails = new OrderDetails();

$(document).ready(function () {
    orderDetails.init();
});
