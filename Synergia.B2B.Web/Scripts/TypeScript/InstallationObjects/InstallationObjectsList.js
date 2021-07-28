var InstallationObjectsList = /** @class */ (function () {
    function InstallationObjectsList() {
    }
    InstallationObjectsList.prototype.init = function () {
        $('#modalAddInstallationObject').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input:hidden').val('');
            $(this).find('form').validate().resetForm();
        });
        this.initAutocomplete();
        this.loadList();
    };
    InstallationObjectsList.prototype.initAutocomplete = function () {
        $("#IOOfferCompanyName").autocomplete({
            source: function (request, response) {
                $.getJSON("/Api/ApiOfferCompanies/SearchOfferCompany", {
                    term: request.term
                }, response);
            },
            minLength: 0,
            select: function (event, ui) {
                $('#IOOfferCompanyId').val(ui.item.OfferCompanyId).trigger('change');
                $("#IOOfferCompanyName").attr('data-tempValue', ui.item.label);
            },
            //pogrubienie tekstu
            open: function (e, ui) {
                var acData = $(this).data('ui-autocomplete');
                acData
                    .menu
                    .element
                    .find('li')
                    .each(function () {
                    var me = $(this);
                    var keywords = acData.term.split(' ').join('|');
                    me.html('<div class="ui-menu-item-wrapper">' + me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<b>$1</b>') + '</div>');
                });
            },
            params: { "auto_dealer": "yes" }
        });
        $("#IOOfferCompanyName").blur(function () {
            $("#IOOfferCompanyName").val($("#IOOfferCompanyName").attr('data-tempValue')).trigger('change');
        });
    };
    InstallationObjectsList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#installationobjectstable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Obiekty',
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
                    url: '/Api/ApiInstallationObjects/GridGetInstallationObjects',
                },
                columns: [
                    {
                        data: 'Type',
                    },
                    {
                        data: 'Code', // nazwy zwracane z procedury SQL
                    },
                    {
                        render: function (data, type, row, meta) {
                            if (row.Name != null) {
                                var maxlength = 35;
                                return '<span title="' + row.Name.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.Name.length > maxlength ? row.Name.substring(0, maxlength) + '...' : row.Name) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                        width: '300px',
                        className: 'text-left',
                    },
                    {
                        data: 'Address',
                    },
                    {
                        data: 'PostalCode',
                    },
                    {
                        data: 'City',
                    },
                    {
                        data: 'Country',
                    },
                    {
                        render: function (data, type, row, meta) {
                            if (row.OfferCompanyName != null) {
                                var maxlength = 35;
                                return '<span title="' + row.OfferCompanyName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.OfferCompanyName.length > maxlength ? row.OfferCompanyName.substring(0, maxlength) + '...' : row.OfferCompanyName) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                        width: '150px',
                    },
                    {
                        width: '70px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:installationObjectsList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:installationObjectsList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#installationobjectstable').show();
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
    InstallationObjectsList.prototype.remove = function (id) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć obiekt?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiInstallationObjects/DeleteInstallationObject',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    installationObjectsList.loadList();
                },
            });
        });
    };
    InstallationObjectsList.prototype.edit = function (installationObjectId) {
        $.ajax({
            url: '/Api/ApiInstallationObjects/GetInstallationObject',
            data: { id: installationObjectId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Code').val(result.Code).trigger('change');
                $('#Name').val(result.Name).trigger('change');
                $('#Address').val(result.Address).trigger('change');
                $('#PostalCode').val(result.PostalCode).trigger('change');
                $('#City').val(result.City).trigger('change');
                $('#Country').val(result.Country).trigger('change');
                $('#Type').val(result.Type).trigger('change');
                $('#Note').val(result.Note).trigger('change');
                $('#IOOfferCompanyName').val(result.IOOfferCompanyName).attr('data-tempValue', result.IOOfferCompanyName).trigger('change');
                $('#IOOfferCompanyId').val(result.IOOfferCompanyId).trigger('change');
                $('#Id').val(result.Id);
                $('#modalAddInstallationObject').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    InstallationObjectsList.prototype.save = function () {
        $('#formAddInstallationObject').validate();
        if ($('#formAddInstallationObject').valid()) {
            $.ajax({
                url: '/Api/ApiInstallationObjects/SaveInstallationObject',
                data: JSON.stringify(utility.getFormData($('#formAddInstallationObject'))),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    $('#modalAddInstallationObject').modal('hide'); //spodowoduje, że modal się ukryje
                    installationObjectsList.loadList();
                },
            });
        }
    };
    return InstallationObjectsList;
}());
var installationObjectsList = new InstallationObjectsList();
$(document).ready(function () {
    installationObjectsList.init();
});
//# sourceMappingURL=InstallationObjectsList.js.map