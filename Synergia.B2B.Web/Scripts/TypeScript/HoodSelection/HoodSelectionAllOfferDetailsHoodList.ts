class HoodSelectionAllOfferDetailsHoodList {
    private list: DataTables.DataTable;

    public init() {
        this.loadList();
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#allHoodOfferDetailsTable').DataTable({
                order: [[1, 'desc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Lista okapów',
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
                    url: '/Api/ApiHoodOfferElements/GridGetAllHoodOfferElements',
                },
                columns: [
                    {
                        render: (data, type, row, meta) => {
                            return row.HoodNr;
                        },
                        width: '400px'
                    },
                    {
                        render: (data, type, row, meta) => {
                            return row.HoodOfferNr;
                        },
                        width: '120px'
                    },
                    {
                        render: (data, type, row, meta) => {
                            return row.City;
                        },
                        width: '80px',
                        className: 'text-center',

                    },
                    {
                        data: 'Address',
                        width: '100px'
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.Price);
                        },
                        className: 'text-right',
                        width: '130px'
                    },
                    {
                        render: (data, type, row, meta) => {
                            return row.Quantity;
                        },
                        width: '80px',
                        className: 'text-center',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.FinalPrice);
                        },
                        className: 'text-right',
                        width: '70px'
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.ObjectName != null) {
                                let maxlength = 35;
                                return '<span title="' + row.ObjectName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.ObjectName.length > maxlength ? row.ObjectName.substring(0, maxlength) + '...' : row.ObjectName) + '</span>';
                            }
                            return '';
                        },
                        width: '200px',
                        className: 'text-center',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toDate(row.CreatedOn);
                        },
                        width: '50px',
                    },
                    {
                        data: 'RegionCode',
                        width: '100px',
                    },
                    {
                        width: '30px',
                        className: 'text-center nowrap',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            //let result = '<a href="/HoodSelection/HoodSelectionOfferDetails/' + row.Id + '" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                            let result = '<a href="javascript:hoodSelectionOfferDetails.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                            return result;
                        },
                    },
                ],
                initComplete: function () {
                    $('#allHoodOfferDetailsTable').show();
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
}
let hoodSelectionAllOfferDetailsHoodList = new HoodSelectionAllOfferDetailsHoodList();
$(document).ready(function () {
    hoodSelectionAllOfferDetailsHoodList.init();
});