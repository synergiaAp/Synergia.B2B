class ContactsList {
    private list: DataTables.DataTable;
    public init() {
        this.loadList();
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#contactstable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Kontakty',
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
                    url: '/Api/ApiContacts/GridGetContacts',
                },
                columns: [
                    {
                        data: 'FirstName',
                    },
                    {
                        data: 'Surname',
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
                        width: '300px',
                        className: 'text-left',
                    },
                    {
                        data: 'Position',
                    },
                    {
                        data: 'Attitude',
                    },
                    {
                        data: 'Email',
                    },
                    {
                        data: 'MobilePhone',
                    },
                    {
                        data: 'LandlinePhone',
                    },
                    {
                        width: '70px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            return '<a href="javascript:contactDetails.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:contactsList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#contactstable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa
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
            text: 'Czy chcesz usunąć kontakt?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiContacts/DeleteContact',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    contactsList.loadList();
                },
            });
        });
    }
}
let contactsList = new ContactsList();
$(document).ready(function () {
    contactsList.init();
});