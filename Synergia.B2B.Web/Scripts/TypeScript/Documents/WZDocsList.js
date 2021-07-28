var WZDocsList = /** @class */ (function () {
    function WZDocsList() {
    }
    WZDocsList.prototype.init = function () {
        this.loadList();
    };
    WZDocsList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#wzdocstable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Dokumenty WZ',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiDocuments/GridGetWZDocs',
                },
                columns: [
                    {
                        data: 'Number',
                        width: '100px'
                    },
                    {
                        data: 'DocumentName',
                        width: '200px',
                    },
                    {
                        //data: 'Date',
                        render: function (data, type, row, meta) {
                            return utility.toDate(row.Date);
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
                        width: '300px',
                    },
                    {
                        width: '100px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="/Files/GetKHDocs/' + row.FileUniqueGuid + '/' + row.FileName + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="width:auto" src="/Images/FilesIcons/pdf.png"/></a>';
                            //return '<a href="/Files/GetKHDocs/' + row.FileName + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><img style="width:auto" src="/Images/FilesIcons/pdf.png"/></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#wzdocstable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();
                },
                responsive: true
            });
        }
        else {
            this.list.ajax.reload();
        }
    };
    return WZDocsList;
}());
var wZDocsList = new WZDocsList();
$(document).ready(function () {
    wZDocsList.init();
});
//# sourceMappingURL=WZDocsList.js.map