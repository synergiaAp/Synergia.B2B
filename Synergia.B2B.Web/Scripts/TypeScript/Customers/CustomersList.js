var CustomersList = /** @class */ (function () {
    function CustomersList() {
    }
    CustomersList.prototype.init = function () {
        var _this = this;
        $('#modalAddCustomer').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input[type="hidden"]').val('');
            $('#CustomerType').val('').multiselect('refresh');
            $(this).find('form').validate().resetForm();
        });
        $('#ShowOfferCompanies, #ShowSymfoniaCompanies').change(function () {
            _this.loadList();
        });
        $('#CustomerType').multiselect({
            //enableFiltering: true,
            //enableCaseInsensitiveFiltering: true,
            //includeSelectAllOption: true,
            //nSelectedText: 'wybrane elementy',
            nonSelectedText: 'Wybierz typ klienta',
            //allSelectedText: 'Wszystko',
            //selectAllText: '<%=Resources.Common.AllSelect%>',
        });
        this.loadList();
    };
    CustomersList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#customerstable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Firmy',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiCustomers/GridGetCustomers',
                    data: function (data) {
                        data.ShowOfferCompanies = $('#ShowOfferCompanies').is(':checked');
                        data.ShowSymfoniaCompanies = $('#ShowSymfoniaCompanies').is(':checked');
                    }
                },
                columns: [
                    //{
                    //    data: 'Code', // nazwy zwracane z procedury SQL
                    //},
                    {
                        data: 'Type',
                        width: '150px',
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
                        data: 'NIP',
                    },
                    {
                        //data: 'Street',
                        render: function (data, type, row, meta) {
                            var address = row.Street + " " + row.House;
                            if (row.Apartment != null && row.Apartment != "") {
                                address += "/" + row.Apartment;
                            }
                            return address;
                        },
                    },
                    //{
                    //    data: 'House',
                    //},
                    //{
                    //    data: 'Apartment',
                    //},
                    {
                        data: 'PostalCode',
                    },
                    {
                        data: 'City',
                    },
                    {
                        width: '70px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            if (row.IsOfferCompany) {
                                return '<a href="javascript:customersList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                                    + '<a href="javascript:customersList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            else {
                                return '';
                            }
                        },
                    },
                ],
                initComplete: function () {
                    $('#customerstable').show();
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
    CustomersList.prototype.remove = function (id) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć klienta?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiCustomers/DeleteOfferCompany',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result > 0) {
                        customersList.loadList();
                    }
                    else if (result == 0) {
                        utility.showError('Nie można usunąć klienta, gdyż jest już dla niego stworzona oferta.');
                    }
                    else {
                        utility.showError('Wystąpił błąd');
                    }
                },
            });
        });
    };
    CustomersList.prototype.edit = function (customerId) {
        $.ajax({
            url: '/Api/ApiCustomers/GetOfferCompanyData',
            data: { offerCompanyId: customerId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Address').val(result.Address).trigger('change');
                $('#Challenge').val(result.Challenge).trigger('change');
                $('#City').val(result.City).trigger('change');
                $('#CustomerType').val(result.CustomerType).trigger('change').multiselect('refresh');
                $('#DeliveredMaterials').val(result.DeliveredMaterials).trigger('change');
                $('#Discription').val(result.Discription).trigger('change');
                $('#LastContact').val(result.LastContact).trigger('change');
                $('#LastContact').val(result.LastContact).trigger('change');
                $('#Name').val(result.Name).trigger('change');
                $('#NIP').val(result.NIP).trigger('change');
                $('#NIP').val(result.NIP).trigger('change');
                $('#PostalCode').val(result.PostalCode).trigger('change');
                $('#StartYear').val(result.StartYear).trigger('change');
                $('#Status').val(result.Status).trigger('change');
                $('#StartYear').val(result.StartYear).trigger('change');
                $('#Id').val(result.Id);
                $('#modalAddCustomer').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    CustomersList.prototype.save = function () {
        $('#formAddCustomer').validate();
        if ($('#formAddCustomer').valid()) {
            $.ajax({
                url: '/Api/ApiCustomers/SaveOfferCompany',
                data: JSON.stringify($.extend(utility.getFormData($('#formAddCustomer')), {
                    CustomerType: $('#CustomerType').val()
                })),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    $('#modalAddCustomer').modal('hide'); //spodowoduje, że modal się ukryje
                    customersList.loadList();
                },
            });
        }
    };
    return CustomersList;
}());
var customersList = new CustomersList();
$(document).ready(function () {
    customersList.init();
});
//# sourceMappingURL=CustomersList.js.map