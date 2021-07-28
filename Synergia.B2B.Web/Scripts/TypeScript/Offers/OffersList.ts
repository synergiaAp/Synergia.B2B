class OffersList {
    private list: DataTables.DataTable;
    public init() {
        $('#buttonAddOffer').click(() => {
            offerDetails.showModal();
        });
        $('#modalOfferDetails').on('hide.bs.modal', () => {
            setTimeout(() => {
                this.loadList();
            }, 100);
        });
        $('#OfferStatusFilter').change(() => {
            this.loadList();
        });
        this.loadList();
    }

    public copyOffer(id: number) {
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
                success: (result) => {
                    if (result != null) {
                        offerDetails.setActiveOfferId(result)
                        offersList.loadList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        });
    }

    public loadList() {
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
                    data: (data: any) => {
                        data.Status = $('#OfferStatusFilter').val();
                    }
                },
                columns: [
                    {
                        render: (data, type, row, meta) => {
                            return "OFE/" + row.OfferNumber;
                        },
                    },
                    {
                        //data: 'OfferDate',
                        render: (data, type, row, meta) => {
                            return utility.toDate(row.OfferDate);
                        },
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.CustomerName != null) {
                                let maxlength = 35;
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
                        render: (data, type, row, meta) => {
                            if (row.InstallationObjectName != null) {
                                let maxlength = 35;
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
                        render: (data, type, row, meta) => {
                            if (row.SellerName != null) {
                                let maxlength = 35;
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
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.CatalogValue);
                        },
                        className: 'text-right',
                    },
                    {
                        //data: 'ValueAfterPrimatyDiscount',
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.ValueAfterPrimatyDiscount);
                        },
                        className: 'text-right',
                    },
                    {
                        //data: 'FinalValueAfterAllDiscounts',
                        render: (data, type, row, meta) => {
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
                        render: (data, type, row, meta) => {
                            let result = '<a href="javascript:offersList.copyOffer(' + row.Id + ');" title="Kopiuj" data-toggle="tooltip" class="btn btn-simple btn-success btn-icon edit"><i class="material-icons">content_copy</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:offerDetails.showModal(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                            if (row.Status == <number>OfferStatus.Draft) {
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
                initComplete: function () {                     // wyświetla tabelę gdy już jest wyrenderowana (nie ma efektu renderowania)
                    $('#offerstable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa
                },
                rowCallback: (row, data: any) => {                                      // ustawia kolor aktywnej oferty
                    let activeOfferId = offerDetails.getActiveOfferId();
                    if (activeOfferId != null && data.Id == activeOfferId) {
                        $(row).addClass('activeOffer');
                    }
                },

                responsive: true
            })
        }
        else {
            this.list.ajax.reload();
        }
    }
}
let offersList = new OffersList();
$(document).ready(function () {
    offersList.init();
});