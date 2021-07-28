var WeaklyPlansList = /** @class */ (function () {
    function WeaklyPlansList() {
    }
    WeaklyPlansList.prototype.init = function () {
        $('#modalAddWeaklyPlan').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input:hidden').val('');
            $(this).find('form').validate().resetForm();
        });
        this.loadList();
    };
    WeaklyPlansList.prototype.enableAllControls = function () {
        $('#formAddWeaklyPlan').find('select:not(.form-control-disabled), input:text:not(.form-control-disabled), input:checkbox:not(.form-control-disabled), textarea:not(.form-control-disabled)').attr('disabled', false);
    };
    WeaklyPlansList.prototype.disableAllControls = function () {
        $('#formAddWeaklyPlan').find('select, input:text, input:checkbox, textarea').attr('disabled', true);
    };
    WeaklyPlansList.prototype.enableButtons = function () {
        $('#btnMakeSubmitted').removeClass('hidden');
        $('#btnSavePlan').removeClass('hidden');
    };
    WeaklyPlansList.prototype.disableButtons = function () {
        $('#btnMakeSubmitted').addClass('hidden');
        $('#btnSavePlan').addClass('hidden');
    };
    WeaklyPlansList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#weaklyPlansTable').DataTable({
                order: [[0, 'desc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Raporty',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'PDF',
                        filename: 'Raporty',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4],
                            format: {
                                body: function (data, row, column, node) {
                                    if (column == 2) {
                                        data = data.replaceAll('<br/>', '\n');
                                    }
                                    return String(data).replace(/(&nbsp;|<([^>]+)>)/ig, "");
                                }
                            }
                        },
                        customize: function (doc) {
                            doc.content[0].table.widths =
                                Array(doc.content[0].table.body[0].length + 1).join('*').split('');
                            doc.styles.tableHeader.alignment = 'left';
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: $('#ShowAllReports').val() == "true" ? '/Api/ApiWeaklyPlans/GridGetAllWeaklyPlans' : '/Api/ApiWeaklyPlans/GridGetWeaklyPlans',
                },
                columns: [
                    {
                        //data: 'Date',
                        render: function (data, type, row, meta) {
                            return utility.toDate(row.CreatedOn);
                        },
                    },
                    {
                        data: 'UserName',
                    },
                    {
                        data: 'RegionCode',
                    },
                    {
                        //data: 'ModifiedOn',
                        render: function (data, type, row, meta) {
                            return utility.toDate(row.ModifiedOn);
                        },
                    },
                    {
                        data: 'StatusText',
                    },
                    {
                        width: '70px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            var result = '<a href="javascript:weaklyPlansList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                            if (row.Status == WeaklyPlanStatus.Draft) {
                                result += '<a href="javascript:weaklyPlansList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            return result;
                        },
                    },
                ],
                initComplete: function () {
                    $('#weaklyPlansTable').show();
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
    WeaklyPlansList.prototype.remove = function (id) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć plan?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiWeaklyPlans/DeleteWeaklyPlan',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    weaklyPlansList.loadList();
                },
            });
        });
    };
    WeaklyPlansList.prototype.edit = function (weaklyPlanId) {
        var _this = this;
        $.ajax({
            url: '/Api/ApiWeaklyPlans/GetWeaklyPlan',
            data: { id: weaklyPlanId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                if (result.Status == WeaklyPlanStatus.Draft) {
                    _this.enableAllControls();
                    _this.enableButtons();
                }
                else if (result.Status == WeaklyPlanStatus.Submitted) {
                    _this.disableButtons();
                    _this.disableAllControls();
                }
                $('#CreatedOn').val(utility.toDate(result.CreatedOn)).trigger('change');
                $('#WorkerId').val(result.WorkerId).trigger('change');
                $('#WorkerName').val(result.WorkerName).trigger('change');
                $('#RegionId').val(result.RegionId).trigger('change');
                $('#RegionName').val(result.RegionName).trigger('change');
                $('#RegionCode').val(result.RegionCode).trigger('change');
                $('#Boss').val(result.Boss).trigger('change');
                $('#Monday').val(result.Monday).trigger('change');
                $('#Tuesday').val(result.Tuesday).trigger('change');
                $('#Wednesday').val(result.Wednesday).trigger('change');
                $('#Thursday').val(result.Thursday).trigger('change');
                $('#Friday').val(result.Friday).trigger('change');
                $('#ModifiedOn').val(result.ModifiedOn).trigger('change');
                $('#Provinces').val(result.Provinces).trigger('change');
                $('#Id').val(result.Id);
                //$('#provincesTable tbody').empty();
                //for (let i = 0; i < result.ProvincesList.length; i++) {
                //    $('#provincesTable tbody').append('<tr><td>'+ "- " + result.ProvincesList[i].Name + '</td></tr>');
                //}
                $('#modalAddWeaklyPlan').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    WeaklyPlansList.prototype.newWeaklyPlanData = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiWeaklyPlans/NewWeaklyPlan',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                _this.enableAllControls();
                _this.enableButtons();
                $('#WorkerId').val(result.WorkerId).trigger('change');
                $('#WorkerName').val(result.WorkerName).trigger('change');
                $('#RegionId').val(result.RegionId).trigger('change');
                $('#RegionName').val(result.RegionName).trigger('change');
                $('#RegionCode').val(result.RegionCode).trigger('change');
                $('#Boss').val(result.Boss).trigger('change');
                $('#Provinces').val(result.Provinces).trigger('change');
                $('#CreatedOn').val(utility.toDate(result.CreatedOn)).trigger('change');
                $('#modalAddWeaklyPlan').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    WeaklyPlansList.prototype.save = function () {
        $('#formAddWeaklyPlan').validate();
        if ($('#formAddWeaklyPlan').valid()) {
            var dataToSend = utility.getFormData($('#formAddWeaklyPlan'));
            $.ajax({
                url: '/Api/ApiWeaklyPlans/SaveWeaklyPlan',
                data: JSON.stringify(dataToSend),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result > 0) {
                        $('#modalAddWeaklyPlan').modal('hide'); //spodowoduje, że modal się ukryje
                        weaklyPlansList.loadList();
                    }
                    else if (result == -1) {
                        utility.showError("Istnieje już plan dla danego miesiąca");
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        }
    };
    WeaklyPlansList.prototype.makeSubmitted = function () {
        var _this = this;
        swal({
            title: '',
            text: 'Czy na pewno chcesz zakończyć i wysłać plan?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            _this.setWeaklyPlanStatusSubmitted();
        });
    };
    WeaklyPlansList.prototype.setWeaklyPlanStatusSubmitted = function () {
        var _this = this;
        $('#formAddWeaklyPlan').validate();
        if ($('#formAddWeaklyPlan').valid()) {
            var dataToSend = utility.getFormData($('#formAddWeaklyPlan'));
            $.ajax({
                url: '/Api/ApiWeaklyPlans/SetWeaklyPlanStatusSubmitted',
                //data: JSON.stringify($('#Id').val()),
                data: JSON.stringify(dataToSend),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result) {
                        $('#modalAddWeaklyPlan').modal('hide');
                        utility.showSuccess('Plan został zakończony');
                        _this.loadList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        }
    };
    return WeaklyPlansList;
}());
var weaklyPlansList = new WeaklyPlansList();
$(document).ready(function () {
    weaklyPlansList.init();
});
//# sourceMappingURL=WeaklyPlansList.js.map