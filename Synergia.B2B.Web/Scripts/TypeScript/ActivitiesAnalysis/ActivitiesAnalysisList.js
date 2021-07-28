var ActivitiesAnalysisList = /** @class */ (function () {
    function ActivitiesAnalysisList() {
    }
    ActivitiesAnalysisList.prototype.init = function () {
        var _this = this;
        Chart.defaults.global.defaultFontColor = 'white';
        Chart.defaults.global.animation.easing = 'easeInOutCubic';
        $('#StartDateFilter').val(moment().add(-1, 'month').format(utility.monthFormat));
        $('#EndDateFilter').val(moment().add(-1, 'month').format(utility.monthFormat));
        $('#StartDateFilter, #EndDateFilter').on('dp.change', function () {
            _this.reloadAllData();
        });
        this.reloadAllData();
    };
    ActivitiesAnalysisList.prototype.reloadAllData = function () {
        this.loadList();
        this.loadMeetingsChartData();
        this.loadTechnicalSelectionsChartData();
        this.loadAgreementsChartData();
        this.loadOffersChartData();
        this.loadPlannedOrdersValueChartChartData();
        this.loadOrdersValueChartData();
    };
    ActivitiesAnalysisList.prototype.loadMeetingsChartData = function () {
        //let color = Chart.helpers.color;
        var _this = this;
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetMeetingsQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
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
                if (_this.meetingsChart == null) {
                    var ctx = document.getElementById('meetingsChart').getContext('2d');
                    _this.meetingsChart = new Chart(ctx, {
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
                    _this.meetingsChart.data = barChartData;
                    _this.meetingsChart.update();
                }
            },
        });
    };
    ActivitiesAnalysisList.prototype.loadTechnicalSelectionsChartData = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetTechnicalSelectionsQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
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
                if (_this.technicalSelectionsChart == null) {
                    var ctx = document.getElementById('technicalSelectionsChart').getContext('2d');
                    _this.technicalSelectionsChart = new Chart(ctx, {
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
                    _this.technicalSelectionsChart.data = barChartData;
                    _this.technicalSelectionsChart.update();
                }
            },
        });
    };
    ActivitiesAnalysisList.prototype.loadAgreementsChartData = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetAgreementsQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
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
                if (_this.agreementsChart == null) {
                    var ctx = document.getElementById('agreementsChart').getContext('2d');
                    _this.agreementsChart = new Chart(ctx, {
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
                    _this.agreementsChart.data = barChartData;
                    _this.agreementsChart.update();
                }
            },
        });
    };
    ActivitiesAnalysisList.prototype.loadOffersChartData = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetOffersQuantity',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
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
                if (_this.offersChart == null) {
                    var ctx = document.getElementById('offersChart').getContext('2d');
                    _this.offersChart = new Chart(ctx, {
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
                    _this.offersChart.data = barChartData;
                    _this.offersChart.update();
                }
            },
        });
    };
    ActivitiesAnalysisList.prototype.loadPlannedOrdersValueChartChartData = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetPlannedOrdersValueChartValues',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
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
                if (_this.plannedOrdersValueChart == null) {
                    var ctx = document.getElementById('plannedOrdersValueChart').getContext('2d');
                    _this.plannedOrdersValueChart = new Chart(ctx, {
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
                    _this.plannedOrdersValueChart.data = barChartData;
                    _this.plannedOrdersValueChart.update();
                }
            },
        });
    };
    ActivitiesAnalysisList.prototype.loadOrdersValueChartData = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiActivitiesAnalysis/ChartGetOrdersValueChartValues',
            data: {
                StartDate: moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
                EndDate: moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat),
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
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
                if (_this.ordersValueChart == null) {
                    var ctx = document.getElementById('ordersValueChart').getContext('2d');
                    _this.ordersValueChart = new Chart(ctx, {
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
                    _this.ordersValueChart.data = barChartData;
                    _this.ordersValueChart.update();
                }
            },
        });
    };
    ActivitiesAnalysisList.prototype.loadList = function () {
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
                        customize: function (doc) {
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
                    data: function (data) {
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
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.PlannedOrdersValueSum);
                        },
                    },
                    {
                        render: function (data, type, row, meta) {
                            return utility.toCurrency(row.OrdersValueSum);
                        },
                    },
                ],
                initComplete: function () {
                    $('#acitivitiesAnalysisTable').show();
                },
                responsive: true
            });
        }
        else {
            this.list.ajax.reload();
        }
    };
    return ActivitiesAnalysisList;
}());
var activitiesAnalysisList = new ActivitiesAnalysisList();
$(document).ready(function () {
    activitiesAnalysisList.init();
});
//# sourceMappingURL=ActivitiesAnalysisList.js.map