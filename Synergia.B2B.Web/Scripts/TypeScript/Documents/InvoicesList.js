var InvoicesList = /** @class */ (function () {
    function InvoicesList() {
    }
    InvoicesList.prototype.init = function () {
        this.loadList();
    };
    InvoicesList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#invoicestable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Faktury',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiDocuments/GridGetInvoices',
                },
                columns: [
                    {
                        data: 'Number',
                        className: 'text-left',
                        width: '140px'
                    },
                    {
                        data: 'DocumentName',
                        className: 'text-left',
                        width: '200px',
                    },
                    {
                        //data: 'Date',
                        render: function (data, type, row, meta) {
                            return utility.toDate(row.Date);
                        },
                        className: 'text-left'
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
                        width: '300px',
                        className: 'text-left',
                    },
                    {
                        //data: 'ValueNet',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.ValueNet);
                        },
                        className: 'text-right',
                        width: '70px',
                    },
                    {
                        //data: 'ValueGross',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.ValueGross);
                        },
                        className: 'text-right',
                        width: '120px',
                    },
                    {
                        //data: 'ValueToPay',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.ValueToPay);
                        },
                        className: 'text-right',
                        width: '120px',
                    },
                    {
                        width: '140px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="/Files/GetKHDocs/' + row.FileUniqueGuid + '/' + row.FileName + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="width:auto" src="/Images/FilesIcons/pdf.png"/></a>';
                        },
                        className: 'text-center'
                    },
                ],
                initComplete: function () {
                    $('#invoicestable').show();
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
    return InvoicesList;
}());
var invoicesList = new InvoicesList();
$(document).ready(function () {
    invoicesList.init();
});
//# sourceMappingURL=InvoicesList.js.map