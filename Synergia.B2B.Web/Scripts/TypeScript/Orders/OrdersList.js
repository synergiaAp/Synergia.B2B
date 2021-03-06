var OrdersList = /** @class */ (function () {
    function OrdersList() {
    }
    OrdersList.prototype.init = function () {
        var _this = this;
        $('#modalOfferDetails').on('hide.bs.modal', function () {
            setTimeout(function () {
                _this.loadList();
            }, 100);
        });
        this.loadList();
    };
    OrdersList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#orderstable').DataTable({
                order: [[0, 'desc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Zamówienia',
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
                    url: '/Api/ApiOrders/GridGetOrders',
                },
                columns: [
                    {
                        render: function (data, type, row, meta) {
                            return "ZAM/" + row.OrderNumber;
                        },
                    },
                    {
                        //data: 'OfferDate',
                        render: function (data, type, row, meta) {
                            return utility.toDate(row.OrderDate);
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
                    //{
                    //    render: (data, type, row, meta) => {
                    //        return utility.toCurrency(row.ValueAfterPrimatyDiscount);
                    //    },
                    //    className: 'text-right',
                    //},
                    {
                        //data: 'FinalValueAfterAllDiscounts',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.FinalValueAfterAllDiscounts);
                        },
                        className: 'text-right',
                    },
                    {
                        render: function (data, type, row, meta) {
                            return "OFE/" + row.OfferNumber;
                        },
                        className: 'text-center',
                        width: '150px',
                    },
                    {
                        data: 'StatusText',
                        className: 'text-center',
                    },
                    {
                        width: '40px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            //let result = '<a href="javascript:orderDetails.showModal(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                            //    + '<a href="javascript:orderList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            if (row.OrderPdfGeneratedFileName != null) {
                                var result = '<a href="/Files/GetCRMFile/' + row.OrderPdfGeneratedFileName + '/' + row.OrderPdfOriginalFileName.replace('/', '_')
                                    + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="height:22px; width:auto" src="/Images/FilesIcons/pdf.png"/></a>';
                                return result;
                            }
                            else {
                                return "";
                            }
                        },
                        className: 'nowrap'
                    },
                ],
                initComplete: function () {
                    $('#orderstable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip(); // musi być do prawidłowego ładowanie tooltipa
                },
                responsive: true
            });
        }
        else {
            this.list.ajax.reload();
        }
    };
    return OrdersList;
}());
var ordersList = new OrdersList();
$(document).ready(function () {
    ordersList.init();
});
//# sourceMappingURL=OrdersList.js.map