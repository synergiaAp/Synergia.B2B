var UsersList = /** @class */ (function () {
    function UsersList() {
    }
    UsersList.prototype.init = function () {
        this.loadList();
    };
    UsersList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#userstable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Użytkownicy',
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
                    url: '/Api/ApiUsers/GridGetUsers',
                },
                columns: [
                    {
                        data: 'FirstName',
                    },
                    {
                        data: 'Surname',
                    },
                    {
                        data: 'Login',
                    },
                    {
                        data: 'Role',
                    },
                    {
                        render: function (data, type, row, meta) {
                            if (row.WelcomeText != null) {
                                var maxlength = 50;
                                return '<span title="' + row.WelcomeText.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.WelcomeText.length > maxlength ? row.WelcomeText.substring(0, maxlength) + '...' : row.WelcomeText) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                    },
                    {
                        data: 'StatusText',
                    },
                    {
                        render: function (data, type, row, meta) {
                            return row.BirthdayDate != null ? moment(row.BirthdayDate, utility.apiDateTimeFormat).format(utility.dateFormat) : '';
                        },
                        className: 'text-center',
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
                    },
                    {
                        width: '70px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:userDetails.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:usersList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                        },
                    }
                ],
                initComplete: function () {
                    $('#userstable').show();
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
    UsersList.prototype.remove = function (id) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć użytkownika?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiUsers/DeleteUser',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    usersList.loadList();
                },
            });
        });
    };
    return UsersList;
}());
var usersList = new UsersList();
$(document).ready(function () {
    usersList.init();
});
//# sourceMappingURL=UsersList.js.map