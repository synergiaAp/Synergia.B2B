class ActivitiesAnalysisList {
    private list: DataTables.DataTable;
    private meetingsChart: Chart;
    private technicalSelectionsChart: Chart;
    private agreementsChart: Chart;
    private offersChart: Chart;
    private plannedOrdersValueChart: Chart;
    private ordersValueChart: Chart;

    public init() {
        Chart.defaults.global.defaultFontColor = 'white';
        Chart.defaults.global.animation.easing = 'easeInOutCubic';
        $('#StartDateFilter').val(moment().add(-1, 'month').format(utility.monthFormat));
        $('#EndDateFilter').val(moment().add(-1, 'month').format(utility.monthFormat));

        $('#StartDateFilter, #EndDateFilter').on('dp.change', () => {
            this.reloadAllData();
        });

        this.reloadAllData();
    }

    private reloadAllData() {
        this.loadList();
        this.loadMeetingsChartData();
        this.loadTechnicalSelectionsChartData();
        this.loadAgreementsChartData();
        this.loadOffersChartData();
        this.loadPlannedOrdersValueChartChartData();
        this.loadOrdersValueChartData();
    }

    public loadMeetingsChartData() {
        //let color = Chart.helpers.color;

        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetMeetingsQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                var barChartData = {
                    labels: result.Labels,
                    datasets: [{
                        label: 'Liczba spotkań',
                        backgroundColor: 'rgba(255, 255, 255,0.9)',
                        borderColor: 'rgba(255, 255, 255,0.9)',
                        borderWidth: 1,
                        data: result.Data
                    }
                    ]
                };
                
                if (this.meetingsChart == null) {
                    var ctx = (<HTMLCanvasElement>document.getElementById('meetingsChart')).getContext('2d');
                    this.meetingsChart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            responsive: true,
                            legend: {
                                position: 'top',
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    barThickness: 40
                                }],
                            },
                            title: {
                                display: true,
                                text: 'Liczba spotkań',
                            }
                        }
                    });
                }
                else {
                    this.meetingsChart.data = barChartData;
                    this.meetingsChart.update();
                }
            },
        });
    }

    public loadTechnicalSelectionsChartData() {
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetTechnicalSelectionsQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                var barChartData = {
                    labels: result.Labels,
                    datasets: [{
                        label: 'Liczba doborów',
                        backgroundColor: 'rgba(255, 255, 255,0.9)',
                        borderColor: 'rgba(255, 255, 255,0.9)',
                        borderWidth: 1,
                        data: result.Data
                    }
                    ]
                };

                if (this.technicalSelectionsChart == null) {
                    var ctx = (<HTMLCanvasElement>document.getElementById('technicalSelectionsChart')).getContext('2d');
                    this.technicalSelectionsChart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            responsive: true,
                            legend: {
                                position: 'top',
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    barThickness: 40
                                }],
                            },
                            title: {
                                display: true,
                                text: 'Liczba doborów',
                            }
                        }
                    });
                }
                else {
                    this.technicalSelectionsChart.data = barChartData;
                    this.technicalSelectionsChart.update();
                }
            },
        });
    }

    public loadAgreementsChartData() {
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetAgreementsQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                var barChartData = {
                    labels: result.Labels,
                    datasets: [{
                        label: 'Liczba umów handlowych',
                        backgroundColor: 'rgba(255, 255, 255,0.9)',
                        borderColor: 'rgba(255, 255, 255,0.9)',
                        borderWidth: 1,
                        data: result.Data
                    }
                    ]
                };

                if (this.agreementsChart == null) {
                    var ctx = (<HTMLCanvasElement>document.getElementById('agreementsChart')).getContext('2d');
                    this.agreementsChart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            responsive: true,
                            legend: {
                                position: 'top',
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    barThickness: 40
                                }],
                            },
                            title: {
                                display: true,
                                text: 'Liczba umów handlowych',
                            }
                        }
                    });
                }
                else {
                    this.agreementsChart.data = barChartData;
                    this.agreementsChart.update();
                }
            },
        });
    }




    public loadOffersChartData() {

        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetOffersQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                var barChartData = {
                    labels: result.Labels,
                    datasets: [{
                        label: 'Liczba ofert cenowych',
                        backgroundColor: 'rgba(255, 255, 255,0.9)',
                        borderColor: 'rgba(255, 255, 255,0.9)',
                        borderWidth: 1,
                        data: result.Data
                    }
                    ]
                };

                if (this.offersChart == null) {
                    var ctx = (<HTMLCanvasElement>document.getElementById('offersChart')).getContext('2d');
                    this.offersChart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            responsive: true,
                            legend: {
                                position: 'top',
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    barThickness: 40
                                }],
                            },
                            title: {
                                display: true,
                                text: 'Liczba ofert cenowych',
                            }
                        }
                    });
                }
                else {
                    this.offersChart.data = barChartData;
                    this.offersChart.update();
                }
            },
        });
    }

    public loadPlannedOrdersValueChartChartData() {
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetPlannedOrdersValueChartValues',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                var barChartData = {
                    labels: result.Labels,
                    datasets: [{
                        label: 'Wartość planowanych zamówień',
                        backgroundColor: 'rgba(255, 255, 255,0.9)',
                        borderColor: 'rgba(255, 255, 255,0.9)',
                        borderWidth: 1,
                        data: result.Data
                    }
                    ]
                };

                if (this.plannedOrdersValueChart == null) {
                    var ctx = (<HTMLCanvasElement>document.getElementById('plannedOrdersValueChart')).getContext('2d');
                    this.plannedOrdersValueChart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            responsive: true,
                            legend: {
                                position: 'top',
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    barThickness: 40
                                }],
                            },
                            title: {
                                display: true,
                                text: 'Wartość planowanych zamówień',
                            }
                        }
                    });
                }
                else {
                    this.plannedOrdersValueChart.data = barChartData;
                    this.plannedOrdersValueChart.update();
                }
            },
        });
    }

    public loadOrdersValueChartData() {
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetOrdersValueChartValues',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                var barChartData = {
                    labels: result.Labels,
                    datasets: [{
                        label: 'Wartość zamówień',
                        backgroundColor: 'rgba(255, 255, 255,0.9)',
                        borderColor: 'rgba(255, 255, 255,0.9)',
                        borderWidth: 1,
                        data: result.Data
                    }
                    ]
                };

                if (this.ordersValueChart == null) {
                    var ctx = (<HTMLCanvasElement>document.getElementById('ordersValueChart')).getContext('2d');
                    this.ordersValueChart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            responsive: true,
                            legend: {
                                position: 'top',
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    barThickness: 40
                                }],
                            },
                            title: {
                                display: true,
                                text: 'Wartość zamówień',
                            }
                        }
                    });
                }
                else {
                    this.ordersValueChart.data = barChartData;
                    this.ordersValueChart.update();
                }
            },
        });
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#acitivitiesAnalysisTable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Analiza aktywnosci',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'PDF',
                        filename: 'Analiza aktywności',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6],
                        },
                        customize: function (doc: any) {
                            doc.content[0].table.widths =
                                Array(doc.content[0].table.body[0].length + 1).join('*').split('');
                            doc.styles.tableHeader.alignment = 'left';
                            doc.defaultStyle.fontSize = 8;
                            doc.styles.tableHeader.fontSize = 10;
                        }
                    }

                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiActivitiesAnalysis/GridGetActivityAnalysis',
                    data: (data: any) => {
                        data.StartDate = moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat);
                        data.EndDate = moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat);
                    }
                },
                columns: [
                    {
                        data: 'UserName',
                    },
                    {
                        data: 'MeetingsQuantity',
                    },
                    {
                        data: 'TechnicalSelectionsSum',
                    },
                    {
                        data: 'Agreements',
                    },
                    {
                        data: 'OffersSum',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.PlannedOrdersValueSum);
                        },
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.OrdersValueSum);
                        },
                    },
                ],
                initComplete: function () {
                    $('#acitivitiesAnalysisTable').show();
                },
                responsive: true
            })
        }
        else {
            this.list.ajax.reload();
        }
    }
}
let activitiesAnalysisList = new ActivitiesAnalysisList();
$(document).ready(function () {
    activitiesAnalysisList.init();
});
