var WeeklyPlansList = /** @class */ (function () {
    function WeeklyPlansList() {
    }
    WeeklyPlansList.prototype.init = function () {
        $('#modalAddWeeklyPlan').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input:hidden').val('');
            $(this).find('form').validate().resetForm();
        });
        this.loadList();
    };
    WeeklyPlansList.prototype.enableAllControls = function () {
        $('#formAddWeeklyPlan').find('select:not(.form-control-disabled), input:text:not(.form-control-disabled), input:checkbox:not(.form-control-disabled), textarea:not(.form-control-disabled)').attr('disabled', false);
    };
    WeeklyPlansList.prototype.disableAllControls = function () {
        $('#formAddWeeklyPlan').find('select, input:text, input:checkbox, textarea').attr('disabled', true);
    };
    WeeklyPlansList.prototype.enableButtons = function () {
        $('#btnMakeSubmitted').removeClass('hidden');
        $('#btnSavePlan').removeClass('hidden');
    };
    WeeklyPlansList.prototype.disableButtons = function () {
        $('#btnMakeSubmitted').addClass('hidden');
        $('#btnSavePlan').addClass('hidden');
    };
    WeeklyPlansList.prototype.loadList = function () {
        if (!this.list) {
            this.list = $('#weeklyPlansTable').DataTable({
                order: [[0, 'desc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Plany',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'PDF',
                        filename: 'Plany',
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
                    url: $('#ShowAllReports').val() == "true" ? '/Api/ApiWeeklyPlans/GridGetAllWeeklyPlans' : '/Api/ApiWeeklyPlans/GridGetWeeklyPlans',
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
                        render: function (data, type, row, meta) {
                            if (row.WeekValue != null) {
                                return row.YearValue + '-' + row.WeekValue;
                            }
                            else {
                                return '';
                            }
                        },
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
                            var result = '<a href="javascript:weeklyPlansList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                            if (row.Status == WeeklyPlanStatus.Draft) {
                                result += '<a href="javascript:weeklyPlansList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            return result;
                        },
                    },
                ],
                initComplete: function () {
                    $('#weeklyPlansTable').show();
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
    WeeklyPlansList.prototype.remove = function (id) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć plan?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiWeeklyPlans/DeleteWeeklyPlan',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    weeklyPlansList.loadList();
                },
            });
        });
    };
    WeeklyPlansList.prototype.edit = function (weeklyPlanId) {
        var _this = this;
        $.ajax({
            url: '/Api/ApiWeeklyPlans/GetWeeklyPlan',
            data: { id: weeklyPlanId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                if (result.Status == WeeklyPlanStatus.Draft) {
                    _this.enableAllControls();
                    _this.enableButtons();
                }
                else if (result.Status == WeeklyPlanStatus.Submitted) {
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
                $('#Saturday').val(result.Saturday).trigger('change');
                $('#Sunday').val(result.Sunday).trigger('change');
                $('#ModifiedOn').val(result.ModifiedOn).trigger('change');
                $('#Provinces').val(result.Provinces).trigger('change');
                $('#Id').val(result.Id);
                $('#WeekValue').val(result.WeekValue);
                $('#WeekValueDate').val(result.WeekValueDate);
                //$('#provincesTable tbody').empty();
                //for (let i = 0; i < result.ProvincesList.length; i++) {
                //    $('#provincesTable tbody').append('<tr><td>'+ "- " + result.ProvincesList[i].Name + '</td></tr>');
                //}
                $('#modalAddWeeklyPlan').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    WeeklyPlansList.prototype.newWeeklyPlanData = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiWeeklyPlans/NewWeeklyPlan',
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
                $('#WeekValue').val(result.WeekValue);
                $('#WeekValueDate').val(result.WeekValueDate);
                $('#modalAddWeeklyPlan').modal(); //spodowoduje, że modal się wyświetli
            },
        });
    };
    WeeklyPlansList.prototype.save = function () {
        $('#formAddWeeklyPlan').validate();
        if ($('#formAddWeeklyPlan').valid()) {
            var dataToSend = utility.getFormData($('#formAddWeeklyPlan'));
            $.ajax({
                url: '/Api/ApiWeeklyPlans/SaveWeeklyPlan',
                data: JSON.stringify(dataToSend),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result > 0) {
                        $('#modalAddWeeklyPlan').modal('hide'); //spodowoduje, że modal się ukryje
                        weeklyPlansList.loadList();
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
    WeeklyPlansList.prototype.makeSubmitted = function () {
        var _this = this;
        swal({
            title: '',
            text: 'Czy na pewno chcesz zakończyć i wysłać plan?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            _this.setWeeklyPlanStatusSubmitted();
        });
    };
    WeeklyPlansList.prototype.setWeeklyPlanStatusSubmitted = function () {
        var _this = this;
        $('#formAddWeeklyPlan').validate();
        if ($('#formAddWeeklyPlan').valid()) {
            var dataToSend = utility.getFormData($('#formAddWeeklyPlan'));
            $.ajax({
                url: '/Api/ApiWeeklyPlans/SetWeeklyPlanStatusSubmitted',
                //data: JSON.stringify($('#Id').val()),
                data: JSON.stringify(dataToSend),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result) {
                        $('#modalAddWeeklyPlan').modal('hide');
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
    return WeeklyPlansList;
}());
var weeklyPlansList = new WeeklyPlansList();
$(document).ready(function () {
    weeklyPlansList.init();
});
//# sourceMappingURL=WeeklyPlansList.js.map