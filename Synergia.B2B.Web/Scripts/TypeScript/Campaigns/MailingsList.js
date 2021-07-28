var MailingsList = /** @class */ (function () {
    function MailingsList() {
    }
    MailingsList.prototype.init = function () {
        this.loadList();
    };
    MailingsList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#mailingsTable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Mailingi',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiCampaign/GridGetCampaigns',
                },
                columns: [
                    {
                        data: 'Name',
                    },
                    {
                        data: 'StatusText',
                    },
                    {
                        render: function (data, type, row, meta) {
                            return utility.toDate(row.SendDate);
                        },
                    },
                    {
                        data: 'RecipientsCount',
                        className: 'text-right',
                    },
                    {
                        width: '70px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:contactsList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:contactsList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#mailingsTable').show();
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
    return MailingsList;
}());
var mailingsList = new MailingsList();
$(document).ready(function () {
    mailingsList.init();
});
//# sourceMappingURL=MailingsList.js.map