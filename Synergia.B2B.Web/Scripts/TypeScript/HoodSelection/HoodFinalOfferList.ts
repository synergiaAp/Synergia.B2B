class HoodFinalOfferList {
    private list: DataTables.DataTable;
    public init() {
        //$('#buttonAddOffer').click(() => {
        //    offerDetails.showModal();
        //});
        $('#modalHoodFinalOfferDetails').on('hide.bs.modal', () => {
            setTimeout(() => {
                this.loadList();
            }, 100);
        });
        $('#HoodFinalOfferStatusFilter').change(() => {
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
                url: '/Api/ApiHoodFinalOffers/CopyHoodFinalOffer',
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

    public loadList() {
        if (!this.list) {
            var urlParams = new URLSearchParams(window.location.search);
            let searchText = '';
            if (urlParams.has("search")) {
                searchText = urlParams.get('search');
            } 

            this.list = $('#hoodFinalOfferListTable').DataTable({
                order: [[0, 'desc']],
                stateSave: false, //problemy po dodaniu automatycznego uzupełniania pola search
                search: {
                    search: searchText
                },
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Oferty okapów',
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
                    url: '/Api/ApiHoodFinalOffers/GridGetHoodFinalOffers',
                    data: (data: any) => {
                        data.Status = $('#HoodFinalOfferStatusFilter').val();
                    }
                },
                columns: [
                    {
                        data: 'OfferNumber',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toDate(row.OfferDate);
                        },
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.CustomerName != null) {
                                let maxlength = 35;
                                return '<span title="' + row.CustomerName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.CustomerName.length > maxlength ? row.CustomerName.substring(0, maxlength) + '...' : row.CustomerName) + '</span>';
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
                            return row.RegionName;
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
                            let result = `<a href="/HoodSelection/HoodSelectionFinishedOfferList?search=${row.HoodOfferNumber}" title="Dobór ${row.HoodOfferNumber}" data-toggle="tooltip" class="btn btn-simple btn-warning btn-icon edit"><i class="material-icons">assignment</i><div class="ripple-container"></div></a>
                                <a href="javascript:hoodFinalOfferList.copyOffer(${row.Id});" title="Kopiuj" data-toggle="tooltip" class="btn btn-simple btn-success btn-icon edit"><i class="material-icons">content_copy</i><div class="ripple-container"></div></a>
                                <a href="javascript:hoodFinalOfferDetails.showModal(${row.Id});" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>`;
                            if (row.Status == <number>OfferStatus.Draft) {
                                result += '<a href="javascript:hoodFinalOfferDetails.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            } else {
                                result += `<a href="/Files/GetHoodFinalOfferPdfFile/${row.Id}/${row.FileUniqueGuid}/${row.OfferPdfOriginalFileName.replace('/', '_')}"
                                    target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="height:22px; width:auto" src="/Images/FilesIcons/pdf.png"/></a>`;
                            }
                            //if (row.OfferPdfGeneratedFileName != null) {
                            //    //result += '<a href="/Files/GetCRMFile/' + row.OfferPdfGeneratedFileName + '/' + row.OfferPdfOriginalFileName.replaceAll('/', '_')
                            //        result += '<a href="/Files/GetHoodFinalOfferPdfFile?hoodOfferId=' + row.Id + '&friendlyFileName=' + row.OfferPdfOriginalFileName.replace('/', '_')
                            //        + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="height:22px; width:auto" src="/Images/FilesIcons/pdf.png"/></a>';
                            //}
                            return result;
                        },
                        className: 'nowrap'
                    },
                ],
                //stateSaveParams: (settings, data: any) => {
                //    delete data.search.search;
                //},
                initComplete: () => {
                    $('#hoodFinalOfferListTable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();
                },
                //rowCallback: (row, data: any) => {
                //    let activeOfferId = offerDetails.getActiveOfferId();
                //    if (activeOfferId != null && data.Id == activeOfferId) {
                //        $(row).addClass('activeOffer');
                //    }
                //},
                responsive: true
            })
        }
        else {
            this.list.ajax.reload();
        }
    }
}
let hoodFinalOfferList = new HoodFinalOfferList();
$(document).ready(function () {
    hoodFinalOfferList.init();
});