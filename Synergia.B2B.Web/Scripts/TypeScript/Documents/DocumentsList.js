var DocumentsList = /** @class */ (function () {
    function DocumentsList() {
    }
    DocumentsList.prototype.init = function () {
        this.loadList();
    };
    DocumentsList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#invoicestable').DataTable({
                order: [[0, 'asc']],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiDocuments/GridGetInvoices',
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
    DocumentsList.prototype.getFormData = function (form) {
        var unindexed_array = form.serializeArray();
        var indexed_array = {};
        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    };
    return DocumentsList;
}());
var documentsList = new DocumentsList();
$(document).ready(function () {
    documentsList.init();
});
//# sourceMappingURL=DocumentsList.js.map