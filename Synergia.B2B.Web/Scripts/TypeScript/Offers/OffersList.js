var OffersList = /** @class */ (function () {
    function OffersList() {
    }
    OffersList.prototype.init = function () {
        var _this = this;
        $('#buttonAddOffer').click(function () {
            offerDetails.showModal();
        });
        $('#modalOfferDetails').on('hide.bs.modal', function () {
            setTimeout(function () {
                _this.loadList();
            }, 100);
        });
        $('#OfferStatusFilter').change(function () {
            _this.loadList();
        });
        this.loadList();
    };
    OffersList.prototype.copyOffer = function (id) {
        swal({
            title: '',
            text: 'Czy chcesz skopiować ofertę?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiOffers/CopyOffer',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result != null) {
                        offerDetails.setActiveOfferId(result);
                        offersList.loadList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        });
    };
    OffersList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#offerstable').DataTable({
                order: [[0, 'desc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Oferty',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiOffers/GridGetOffers',
                    data: function (data) {
                        data.Status = $('#OfferStatusFilter').val();
                    }
                },
                columns: [
                    {
                        render: function (data, type, row, meta) {
                            return "OFE/" + row.OfferNumber;
                        },
                    },
                    {
                        //data: 'OfferDate',
                        render: function (data, type, row, meta) {
                            return utility.toDate(row.OfferDate);
                        },
                    },
                    {
                        render: function (data, type, row, meta) {
                            if (row.CustomerName != null) {
                                var maxlength = 35;
                                return '<span title="' + row.CustomerName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.CustomerName.length > maxlength ? row.CustomerName.substring(0, maxlength) + '...' : row.CustomerName) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                        width: '200px',
                        className: 'text-left',
                    },
                    {
                        render: function (data, type, row, meta) {
                            if (row.InstallationObjectName != null) {
                                var maxlength = 35;
                                return '<span title="' + row.InstallationObjectName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.InstallationObjectName.length > maxlength ? row.InstallationObjectName.substring(0, maxlength) + '...' : row.InstallationObjectName) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                        width: '200px',
                        className: 'text-left',
                    },
                    {
                        render: function (data, type, row, meta) {
                            if (row.SellerName != null) {
                                var maxlength = 35;
                                return '<span title="' + row.SellerName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.SellerName.length > maxlength ? row.SellerName.substring(0, maxlength) + '...' : row.SellerName) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                        width: '200px',
                        className: 'text-left',
                    },
                    {
                        //data: 'CatalogValue',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.CatalogValue);
                        },
                        className: 'text-right',
                    },
                    {
                        //data: 'ValueAfterPrimatyDiscount',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.ValueAfterPrimatyDiscount);
                        },
                        className: 'text-right',
                    },
                    {
                        //data: 'FinalValueAfterAllDiscounts',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.FinalValueAfterAllDiscounts);
                        },
                        className: 'text-right',
                    },
                    {
                        data: 'StatusText',
                        className: 'nowrap'
                    },
                    {
                        width: '140px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            var result = '<a href="javascript:offersList.copyOffer(' + row.Id + ');" title="Kopiuj" data-toggle="tooltip" class="btn btn-simple btn-success btn-icon edit"><i class="material-icons">content_copy</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:offerDetails.showModal(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                            if (row.Status == OfferStatus.Draft) {
                                result += '<a href="javascript:offerDetails.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            if (row.OfferPdfGeneratedFileName != null) {
                                result += '<a href="/Files/GetCRMFile/' + row.OfferPdfGeneratedFileName + '/' + row.OfferPdfOriginalFileName.replace('/', '_')
                                    + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="height:22px; width:auto" src="/Images/FilesIcons/pdf.png"/></a>';
                                if (row.DokExists) {
                                    result += '<a href="/Files/GetOfferElementsZipFile/' + row.FileUniqueGuid + '/' + row.Id
                                        + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="height:22px; width:auto" src="/Images/FilesIcons/zip.png"/></a>';
                                }
                            }
                            return result;
                        },
                        className: 'nowrap'
                    },
                ],
                initComplete: function () {
                    $('#offerstable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip(); // musi być do prawidłowego ładowanie tooltipa
                },
                rowCallback: function (row, data) {
                    var activeOfferId = offerDetails.getActiveOfferId();
                    if (activeOfferId != null && data.Id == activeOfferId) {
                        $(row).addClass('activeOffer');
                    }
                },
                responsive: true
            });
        }
        else {
            this.list.ajax.reload();
        }
    };
    return OffersList;
}());
var offersList = new OffersList();
$(document).ready(function () {
    offersList.init();
});
//# sourceMappingURL=OffersList.js.map