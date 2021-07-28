var SalesDocumentsList = /** @class */ (function () {
    function SalesDocumentsList() {
    }
    SalesDocumentsList.prototype.init = function () {
        this.loadList();
    };
    SalesDocumentsList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#invoicestable').DataTable({
                order: [[0, 'asc']],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiSalesDocuments/GridGetInvoices',
                },
                columns: [
                    {
                        data: 'Number',
                    },
                    {
                        data: 'Date',
                    },
                    {
                        data: 'ValueNet',
                    },
                    {
                        data: 'valueGross',
                    },
                    {
                        data: 'ValueToPay',
                    },
                    {
                        data: 'DocumentName',
                    },
                ],
                initComplete: function () {
                    $('#invoicestable').show();
                },
                responsive: true
            });
        }
        else {
            this.list.ajax.reload();
        }
    };
    SalesDocumentsList.prototype.getFormData = function (form) {
        var unindexed_array = form.serializeArray();
        var indexed_array = {};
        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    };
    return SalesDocumentsList;
}());
var salesDocumentsList = new SalesDocumentsList();
$(document).ready(function () {
    salesDocumentsList.init();
});
//# sourceMappingURL=SalesDocumentsList.js.map