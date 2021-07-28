var HoodSelectionHoodPartsPriceList = /** @class */ (function () {
    function HoodSelectionHoodPartsPriceList() {
    }
    HoodSelectionHoodPartsPriceList.prototype.init = function () {
        $('#modalAddHoodPartsPriceList').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input:hidden').val('');
            $(this).find('form').validate().resetForm();
        });
        this.loadList();
    };
    HoodSelectionHoodPartsPriceList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#hoodPartsPriceListTable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Cennik elementów',
                        title: null,
                        exportOptions: {
                            columns: [0, 1]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiHoodPartsPriceList/GridGetHoodPartsPriceList',
                },
                columns: [
                    {
                        data: 'Name',
                    },
                    {
                        //data: 'PriceNet',
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.PriceNet);
                        },
                        className: 'text-right',
                    },
                    {
                        width: '70px',
                        orderable: false,
                        className: 'text-center',
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:hoodSelectionHoodPartsPriceList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#hoodPartsPriceListTable').show();
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
    HoodSelectionHoodPartsPriceList.prototype.edit = function (hoodPartsPriceListId) {
        $.ajax({
            url: '/Api/ApiHoodPartsPriceList/GetHoodPartsPriceListData',
            data: { Id: hoodPartsPriceListId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Name').val(result.Name).trigger('change');
                $('#PriceNet').val(utility.toDecimal(result.PriceNet)).trigger('change');
                $('#Id').val(result.Id);
                $('#modalAddHoodPartsPriceList').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    HoodSelectionHoodPartsPriceList.prototype.save = function () {
        $('#formAddAddHoodPartsPriceList').validate();
        if ($('#formAddAddHoodPartsPriceList').valid()) {
            var dataToSend = utility.getFormData($('#formAddAddHoodPartsPriceList'));
            dataToSend.PriceNet = utility.toApiDecimal(dataToSend.PriceNet);
            $.ajax({
                url: '/Api/ApiHoodPartsPriceList/SaveHoodPartsPriceList',
                data: JSON.stringify(dataToSend),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    $('#modalAddHoodPartsPriceList').modal('hide'); //spodowoduje, że modal się ukryje
                    hoodSelectionHoodPartsPriceList.loadList();
                },
            });
        }
    };
    return HoodSelectionHoodPartsPriceList;
}());
var hoodSelectionHoodPartsPriceList = new HoodSelectionHoodPartsPriceList();
$(document).ready(function () {
    hoodSelectionHoodPartsPriceList.init();
});
//# sourceMappingURL=HoodSelectionHoodPartsPriceList.js.map