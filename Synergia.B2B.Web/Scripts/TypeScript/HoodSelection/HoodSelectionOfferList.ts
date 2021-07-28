class HoodSelectionOfferList {
    private list: DataTables.DataTable;

    public init() {
        this.assignControlEvents();
        this.loadList();
    }

    private assignControlEvents() {
        $('#HoodOfferStatusFilter').change(() => {
            this.loadList();
        });

        $('#btnAddNewHoodOffer').click(() => {
            this.saveNewHoodOffer();
        });
    }

    private loadList() {
        if (!this.list) {
            this.list = $('#hoodOffersTable').DataTable({
                order: [[1, 'desc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Oferty doborów',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiHoodOffers/GridGetHoodOffers',
                    data: (data: any) => {
                        data.Status = $('#HoodOfferStatusFilter').val();
                    }
                },
                columns: [
                    {
                        render: (data, type, row, meta) => {
                            return row.OfferNumber;
                        },
                        width: '80px'
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toDate(row.CreatedOn);
                        },
                        width: '80px',
                    },
                    {
                        data: 'City',
                        width: '140px'
                    },
                    {
                        data: 'Address',
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.InstallationObjectName != null) {
                                let maxlength = 35;
                                return '<span title="' + row.InstallationObjectName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.InstallationObjectName.length > maxlength ? row.InstallationObjectName.substring(0, maxlength) + '...' : row.InstallationObjectName) + '</span>';
                            }
                            return '';
                        },
                        width: '140px',
                        className: 'text-left',
                    },
                    {
                        data: 'RegionCode',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.FinalValue);
                        },
                        className: 'text-right',
                        width: '100px'
                    },
                    {
                        //data: 'StatusText',
                        render: (data, type, row, meta) => {
                            if (row.HoodFinalOfferNumber) {
                                return `<a href="/HoodSelection/HoodSelectionFinalOfferList?search=${row.HoodFinalOfferNumber}" title="Lista stworzonych ofert" data-toggle="tooltip">${row.StatusText}</a>`;
                            } else {
                                return row.StatusText;
                            }
                        },
                        className: 'nowrap text-center',
                        width: '200px',
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.Comment != null) {
                                let maxlength = 30;
                                return '<span title="' + row.Comment.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.Comment.length > maxlength ? row.Comment.substring(0, maxlength) + '...' : row.Comment) + '</span>';
                            }
                            return '';
                        },
                        width: '200px',
                        className: 'text-left',
                    },
                    {
                        width: '140px',
                        className: 'text-right nowrap',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            let result = '<a href="javascript:hoodSelectionOfferList.copyHoodOffer(' + row.Id + ');" title="Kopiuj" data-toggle="tooltip" class="btn btn-simple btn-success btn-icon edit"><i class="material-icons">content_copy</i><div class="ripple-container"></div></a>'
                                + '<a href="/HoodSelection/HoodSelectionOfferDetails/' + row.Id + '" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                            if (row.Status == <number>HoodOfferStatus.Draft) {
                                result += '<a href="javascript:hoodSelectionOfferList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            var pdfFileName = encodeURIComponent(row.PdfFileName.replace('/', '').replace('%', '').replace('  ', ' ').trim());
                            result += `<a href="/Files/GetHoodOfferPdfFile/${row.Id}/${row.FileUniqueGuid}/${pdfFileName}" target="_blank" 
                                class="btn btn-simple btn-info btn-icon edit"><img style="height:22px; width: auto" src="/Images/FilesIcons/pdf.png"/></a>`;
                            return result;
                        },
                    },
                ],
                initComplete: function () {
                    $('#hoodOffersTable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();
                },
                responsive: true
            })
        }
        else {
            this.list.ajax.reload();
        }
    }

    public remove(id: number) {
        swal({
            title: '',
            text: 'Czy na pewno chcesz usunąć ofertę doborów?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            $.ajax({
                url: '/Api/ApiHoodOffers/DeleteHoodOffer',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                if (result) {
                    this.loadList();
                } else {
                    utility.showError();
                }
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        });
    }

    public saveNewHoodOffer() {
        $.ajax({
            url: '/Api/ApiHoodOffers/SaveHoodOffer',
            data: JSON.stringify({}),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST'
        }).then((result) => {
            if (result != null) {
                location.href = '/HoodSelection/HoodSelectionOfferDetails/' + result;
            }
            else {
                utility.showError();
            }
        }).fail((xhr) => {
            console.error(xhr);
            utility.showError();
        });
    }

    public copyHoodOffer(id: number) {
        swal({
            title: '',
            text: 'Czy chcesz skopiować ofertę doborów?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            $.ajax({
                url: '/Api/ApiHoodOffers/CopyHoodOffer',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then(() => {
                this.loadList();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        });
    }
}

let hoodSelectionOfferList = new HoodSelectionOfferList();
$(document).ready(function () {
    hoodSelectionOfferList.init();
});