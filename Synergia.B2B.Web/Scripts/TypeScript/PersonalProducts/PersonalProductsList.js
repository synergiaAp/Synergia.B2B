var PersonalProductsList = /** @class */ (function () {
    function PersonalProductsList() {
    }
    PersonalProductsList.prototype.init = function () {
        $('#modalAddPersonalProduct').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input:hidden').val('');
            $(this).find('form').validate().resetForm();
        });
        this.loadList();
    };
    PersonalProductsList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#personalProductsTable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Produkty własne',
                        title: null,
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6, 7]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiPersonalProducts/GridGetPersonalProducts',
                },
                columns: [
                    {
                        width: '50px',
                        className: 'text-center',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:personalProductsList.addToOffer(' + row.Id + ');" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons" style="font-size:20pt; color:#01A4E7 !important;">local_grocery_store</i><div class="ripple-container"></div></a>';
                        },
                    },
                    {
                        data: 'Code',
                        width: '100px',
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
                        data: 'Dimensions',
                    },
                    {
                        data: 'Terminal',
                    },
                    {
                        data: 'PowerGas',
                    },
                    {
                        data: 'PowerElectricity',
                        width: '80px',
                    },
                    {
                        //data: 'PriceNet',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.PriceNet);
                        },
                        className: 'text-right',
                        width: '80px',
                    },
                    {
                        width: '100px',
                        className: 'text-center',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:personalProductsList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:personalProductsList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#personalProductsTable').show();
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
    PersonalProductsList.prototype.remove = function (id) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć produkt?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiPersonalProducts/DeletePersonalProduct',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    personalProductsList.loadList();
                },
            });
        });
    };
    PersonalProductsList.prototype.edit = function (personalProductId) {
        $.ajax({
            url: '/Api/ApiPersonalProducts/GetPersonalProduct',
            data: { id: personalProductId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Code').val(result.Code).trigger('change');
                $('#Name').val(result.Name).trigger('change');
                $('#Dimensions').val(result.Dimensions).trigger('change');
                $('#Terminal').val(result.Terminal).trigger('change');
                $('#PowerGas').val(result.PowerGas).trigger('change');
                $('#PowerElectricity').val(result.PowerElectricity).trigger('change');
                $('#PriceNet').val(utility.toDecimal(result.PriceNet)).trigger('change');
                $('#Description').val(result.Description).trigger('change');
                $('#Id').val(result.Id);
                $('#modalAddPersonalProduct').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    PersonalProductsList.prototype.save = function () {
        $('#formAddPersonalProduct').validate();
        if ($('#formAddPersonalProduct').valid()) {
            var dataToSend = utility.getFormData($('#formAddPersonalProduct'));
            dataToSend.PriceNet = utility.toApiDecimal(dataToSend.PriceNet);
            $.ajax({
                url: '/Api/ApiPersonalProducts/SavePersonalProduct',
                data: JSON.stringify(dataToSend),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    $('#modalAddPersonalProduct').modal('hide'); //spodowoduje, że modal się ukryje
                    personalProductsList.loadList();
                },
            });
        }
    };
    PersonalProductsList.prototype.addToOffer = function (personalProductId) {
        offerDetails.addOfferElement(null, 1, personalProductId);
    };
    return PersonalProductsList;
}());
var personalProductsList = new PersonalProductsList();
$(document).ready(function () {
    personalProductsList.init();
});
//# sourceMappingURL=PersonalProductsList.js.map