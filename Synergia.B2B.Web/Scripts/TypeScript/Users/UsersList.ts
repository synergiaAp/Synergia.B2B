class UsersList {
    private list: DataTables.DataTable;
    public init() {
        this.loadList();
    }

    public loadList() {
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
                        render: (data, type, row, meta) => {
                            if (row.WelcomeText != null) {
                                let maxlength = 50;
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
                        render: (data, type, row, meta) => {
                            return row.BirthdayDate != null ? moment(row.BirthdayDate, utility.apiDateTimeFormat).format(utility.dateFormat) : '';
                        },
                        className: 'text-center',
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.CustomerName != null) {
                                let maxlength = 35;
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
                        render: (data, type, row, meta) => {
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
            })
        }
        else {
            this.list.ajax.reload();
        }
    }
    public remove(id: number) {
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
                success: (result) => {
                    usersList.loadList();
                },
            });
        });
    }
}
let usersList = new UsersList();
$(document).ready(function () {
    usersList.init();
});