class HoodOrdersList {
    private list: DataTables.DataTable;
    public init() {
        $('#modalHoodOrderDetails').on('hide.bs.modal', () => {
            setTimeout(() => {
                this.loadList();
            }, 100);
        });

        $('#HoodOrderTypeFilter').change(() => {
            this.loadList();
        });

        this.loadList();
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#hoodOrderstable').DataTable({
                order: [[1, 'desc']],
                //buttons: [
                //    {
                //        extend: 'excelHtml5',
                //        text: 'Excel',
                //        filename: 'Zamówienia',
                //        title: null,
                //        exportOptions: {
                //            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                //        }
                //    }
                //],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiHoodOrders/GridGetHoodOrders',
                    data: (data: any) => {
                        data.Type = $('#HoodOrderTypeFilter').val();
                    }
                },
                columns: [
                    {
                        data: 'OrderNumber'
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toDate(row.OrderDate);
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
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.CatalogValue);
                        },
                        className: 'text-right',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.FinalValueAfterAllDiscounts);
                        },
                        className: 'text-right',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return "JE/" + row.OfferNumber;
                        },
                        className: 'text-center',
                        width: '150px',
                    },
                    {
                        data: 'StatusText',
                        className: 'text-center',
                    },
                    {
                        render: (data, type, row, meta) => {
                            //return row.TotalModuleCount ?? '' ;
                            return row.TotalModuleCount != null ? row.TotalModuleCount : '' ;
                        },
                        className: 'text-right'
                    },
                    {
                        width: '40px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            if (row.OrderPdfGeneratedFileName != null) {
                                let result = '<a href="/Files/GetCRMFile/' + row.OrderPdfGeneratedFileName + '/' + row.OrderPdfOriginalFileName.replaceAll('/', '_')
                                //let result = '<a href="/Files/GetHoodOrderPdfFile?hoodOrderId=' + row.Id + '&friendlyFileName=' + row.OrderPdfGeneratedFileName.replace('/', '_')
                                    + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="height:22px; width:auto" src="/Images/FilesIcons/pdf.png"/></a>';
                                return result;
                            }
                            return '';
                        },
                        className: 'nowrap'
                    },
                ],
                initComplete: function () {
                    $('#hoodOrderstable').show();
                },
                drawCallback: function () {
                    $('#hoodOrderstable [data-toggle="tooltip"]').tooltip();
                },

                responsive: true
            })
        }
        else {
            this.list.ajax.reload();
        }
    }
}
let hoodOrdersList = new HoodOrdersList();
$(document).ready(function () {
    hoodOrdersList.init();
});