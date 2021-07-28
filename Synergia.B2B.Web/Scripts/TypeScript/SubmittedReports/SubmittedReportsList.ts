//class SubmittedReportsList {
//    private list: DataTables.DataTable;
//    private isEditDataLoading: boolean = false;
//    public init() {

//        $('.meetings').change(() => {
//            if (this.isEditDataLoading == false) {
//                var sum = 0;
//                $('.meetings').each(function () {
//                    sum += Number($(this).val());
//                });
//                $('#MeetingsQuantity').prop('value', sum).trigger('change');
//            }
//        });

//        $('.offers').change(() => {
//            if (this.isEditDataLoading == false) {
//                var sum = 0;
//                $('.offers').each(function () {
//                    sum += Number($(this).val());
//                });
//                $('#OffersSum').prop('value', sum).trigger('change');
//            }
//        });

//        $('.technicalSelections').change(() => {
//            if (this.isEditDataLoading == false) {
//                var sum = 0;
//                $('.technicalSelections').each(function () {
//                    sum += Number($(this).val());
//                });
//                $('#TechnicalSelectionsSum').prop('value', sum).trigger('change');
//            }
//        });

//        this.loadList();
//    }

//    public loadList() {
//        if (!this.list) {
//            this.list = $('#allMonthlyReportsTable').DataTable({
//                order: [[0, 'desc']],
//                ajax: {
//                    type: 'GET',
//                    dataType: 'json',
//                    contentType: 'application/json; charset=utf-8',
//                    url: '/Api/ApiMonthlyReports/GridGetAllMonthlyReports',
//                },
//                columns: [
//                    {
//                        //data: 'Date',
//                        render: (data, type, row, meta) => {
//                            return moment(row.Date).format('MMMM YYYY');
//                        },
//                    },
//                    {
//                        data: 'UserName',
//                    },
//                    {
//                        data: 'RegionCode',
//                    },
//                    {
//                        //data: 'OrdersValueSum',
//                        render: (data, type, row, meta) => {
//                            return utility.toCurrency(row.OrdersValueSum);
//                        },
//                    },
//                    {
//                        //data: 'PlannedOrdersValueSum',
//                        render: (data, type, row, meta) => {
//                            return utility.toCurrency(row.PlannedOrdersValueSum);
//                        },
//                    },
//                    {
//                        //data: 'ModifiedOn',
//                        render: (data, type, row, meta) => {
//                            return utility.toDate(row.ModifiedOn);
//                        },
//                    },
//                    {
//                        data: 'Status',
//                    },
//                    {
//                        width: '70px',
//                        orderable: false,
//                        render: (data, type, row, meta) => {
//                            return '<a href="javascript:submittedReportsList.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
//                                + '<a href="javascript:submittedReportsList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
//                        },
//                    },
//                ],
//                initComplete: function () {
//                    $('#allMonthlyReportsTable').show();
//                },
//                drawCallback: function () {
//                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa
//                },
//                responsive: true
//            })
//        }
//        else {
//            this.list.ajax.reload();
//        }
//    }

//    public remove(id: number) {
//        swal({
//            title: '',
//            text: 'Czy chcesz usunąć raport?',
//            type: 'warning',
//            showCancelButton: true,
//            confirmButtonText: 'Tak',
//            cancelButtonText: 'Nie',
//        }).then(function () {
//            $.ajax({
//                url: '/Api/ApiMonthlyReports/DeleteMonthlyReport',
//                data: JSON.stringify(id),
//                dataType: 'json',
//                contentType: 'application/json; charset=utf-8',
//                type: 'POST',
//                success: (result) => {
//                    monthlyReportsList.loadList();
//                },
//            });
//        });
//    }

//    public edit(monthlyReportId: number) {
//        $.ajax({
//            url: '/Api/ApiMonthlyReports/GetMonthlyReport',
//            data: { id: monthlyReportId },  //id to parametr metody GetInstallationObject z Web servisu API
//            dataType: 'json',
//            contentType: 'application/json; charset=utf-8',
//            type: 'GET',
//            success: (result) => {
//                this.isEditDataLoading = true;
//                $('#Date').val(moment(result.Date).format(utility.monthFormat)).trigger('change');
//                $('#WorkerId').val(result.WorkerId).trigger('change');
//                $('#WorkerName').val(result.WorkerName).trigger('change');
//                $('#RegionId').val(result.RegionId).trigger('change');
//                $('#RegionName').val(result.RegionName).trigger('change');
//                $('#RegionCode').val(result.RegionCode).trigger('change');
//                $('#Boss').val(result.Boss).trigger('change');
//                $('#Holidays').val(result.Holidays).trigger('change');
//                $('#OrdersValueSum').val(utility.toDecimal(result.OrdersValueSum)).trigger('change');
//                $('#PlannedOrdersValueSum').val(utility.toDecimal(result.PlannedOrdersValueSum)).trigger('change');
//                $('#ModifiedOn').val(result.ModifiedOn).trigger('change');
//                $('#Summary').val(result.Summary).trigger('change');
//                $('#MarketingActivities').val(result.MarketingActivities).trigger('change');
//                $('#MarketingPlans').val(result.MarketingPlans).trigger('change');
//                $('#Troubles').val(result.Troubles).trigger('change');
//                $('#NewContacts').val(result.NewContacts).trigger('change');
//                $('#Provinces').val(result.Provinces).trigger('change');
//                $('#MeetingsQuantity').val(result.MeetingsQuantity).trigger('change');
//                $('#HoodOffers').val(result.HoodOffers).trigger('change');
//                $('#CentralOffers').val(result.CentralOffers).trigger('change');
//                $('#SmokiOffers').val(result.SmokiOffers).trigger('change');
//                $('#AnsulOffers').val(result.AnsulOffers).trigger('change');
//                $('#MarenoOffers').val(result.MarenoOffers).trigger('change');
//                $('#VentilatorOffers').val(result.VentilatorOffers).trigger('change');
//                $('#KesOffers').val(result.KesOffers).trigger('change');
//                $('#CentralTechnicalSelections').val(result.CentralTechnicalSelections).trigger('change');
//                $('#SmokiTechnicalSelections').val(result.SmokiTechnicalSelections).trigger('change');
//                $('#HoodTechnicalSelections').val(result.HoodTechnicalSelections).trigger('change');
//                $('#Agreements').val(result.Agreements).trigger('change');
//                $('#MeetingsKitchenTechnologist').val(result.MeetingsKitchenTechnologist).trigger('change');
//                $('#MeetingsConsultingCompany').val(result.MeetingsConsultingCompany).trigger('change');
//                $('#MeetingsGastronomyCompany').val(result.MeetingsGastronomyCompany).trigger('change');
//                $('#MeetingsGeneralContractor').val(result.MeetingsGeneralContractor).trigger('change');
//                $('#MeetingsInstallationContractor').val(result.MeetingsInstallationContractor).trigger('change');
//                $('#MeetingsSynergiaDealer').val(result.MeetingsSynergiaDealer).trigger('change');
//                $('#MeetingsMarenoDealer').val(result.MeetingsMarenoDealer).trigger('change');
//                $('#MeetingsNetworkInvestor').val(result.MeetingsNetworkInvestor).trigger('change');
//                $('#MeetingsSingleInvestor').val(result.MeetingsSingleInvestor).trigger('change');
//                $('#MeetingsVentilationDesigner').val(result.MeetingsVentilationDesigner).trigger('change');
//                $('#MeetingsVentilationWholesaler').val(result.MeetingsVentilationWholesaler).trigger('change');
//                $('#MeetingsKitchentChef').val(result.MeetingsKitchentChef).trigger('change');
//                $('#MeetingsSupervisionInspector').val(result.MeetingsSupervisionInspector).trigger('change');
//                $('#MeetingsSanepid').val(result.MeetingsSanepid).trigger('change');
//                $('#MeetingsArchitect').val(result.MeetingsArchitect).trigger('change');
//                $('#OffersSum').val(result.OffersSum).trigger('change');
//                $('#TechnicalSelectionsSum').val(result.TechnicalSelectionsSum).trigger('change');
//                $('#Id').val(result.Id);
//                //$('#provincesTable tbody').empty();
//                //for (let i = 0; i < result.ProvincesList.length; i++) {
//                //    $('#provincesTable tbody').append('<tr><td>'+ "- " + result.ProvincesList[i].Name + '</td></tr>');
//                //}

//                $('#modalAddMonthlyReport').modal();     //spodowoduje, że modal się wyświetli
//                this.isEditDataLoading = false;
//            },
//        });
//    }

//    public newMonthlyReportData() {
//        $.ajax({
//            url: '/Api/ApiMonthlyReports/NewMonthlyReport',
//            dataType: 'json',
//            contentType: 'application/json; charset=utf-8',
//            type: 'GET',
//            success: (result) => {
//                $('#WorkerId').val(result.WorkerId).trigger('change');
//                $('#WorkerName').val(result.WorkerName).trigger('change');
//                $('#RegionId').val(result.RegionId).trigger('change');
//                $('#RegionName').val(result.RegionName).trigger('change');
//                $('#RegionCode').val(result.RegionCode).trigger('change');
//                $('#Boss').val(result.Boss).trigger('change');
//                $('#Provinces').val(result.Provinces).trigger('change');
//                $('#Date').val(moment(result.Date).format(utility.monthFormat)).trigger('change');

//                $('#modalAddMonthlyReport').modal();     //spodowoduje, że modal się wyświetli

//            },
//        });
//    }

//    public save() {
//        $('#formAddMonthlyReport').validate();
//        if ($('#formAddMonthlyReport').valid()) {
//            let dataToSend: any = utility.getFormData($('#formAddMonthlyReport'));
//            dataToSend.PlannedOrdersValueSum = utility.toApiDecimal(dataToSend.PlannedOrdersValueSum);
//            dataToSend.OrdersValueSum = utility.toApiDecimal(dataToSend.OrdersValueSum);
//            dataToSend.Date = moment(dataToSend.Date, utility.monthFormat).format(utility.dateFormat);
//            dataToSend.MeetingsQuantity = $('#MeetingsQuantity').val();
//            dataToSend.TechnicalSelectionsSum = $('#TechnicalSelectionsSum').val();
//            dataToSend.OffersSum = $('#OffersSum').val();
//            $.ajax({
//                url: '/Api/ApiMonthlyReports/SaveMonthlyReport',
//                data: JSON.stringify(dataToSend),
//                dataType: 'json',
//                contentType: 'application/json; charset=utf-8',
//                type: 'POST',
//                success: (result) => {
//                    if (result > 0) {
//                        $('#modalAddMonthlyReport').modal('hide');     //spodowoduje, że modal się ukryje
//                        monthlyReportsList.loadList();
//                    } else if (result == -1) {
//                        utility.showError("Istnieje już raport dla danego miesiąca");
//                    } else {
//                        utility.showError();
//                    }

//                },
//            });
//        }
//    }
//}
//let submittedReportsList = new SubmittedReportsList();
//$(document).ready(function () {
//    submittedReportsList.init();
//});