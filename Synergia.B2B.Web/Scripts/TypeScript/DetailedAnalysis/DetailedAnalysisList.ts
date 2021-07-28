﻿class DetailedAnalysisList {
    private list: DataTables.DataTable;

    public init() {
        $('#StartDateFilter').val(moment().add(-1, 'month').format(utility.monthFormat));
        $('#EndDateFilter').val(moment().add(-1, 'month').format(utility.monthFormat));

        $('#StartDateFilter, #EndDateFilter, #UserFilter, #ColumnFilter').on('dp.change', () => {
            this.loadList();
        });
        $('#UserFilter, #ColumnFilter').change(() => {
            this.loadList();
        });

        this.loadList();
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#detailedAnalysisTable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Analiza szczegolowa',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2],
                            stripNewlines: false,
                            format: {
                                body: function (data, row, column, node) {
                                    if (column == 2) {
                                        data = data.replaceAll('<br/>', '\n');
                                    }
                                    return String(data).replace(/(&nbsp;|<([^>]+)>)/ig, "");
                                }
                            }
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'PDF',
                        filename: 'Analiza szczegolowa',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2],
                            stripNewlines: false,
                            format: {
                                body: function (data, row, column, node) {
                                    if (column == 2) {
                                        data = data.replaceAll('<br/>', '\n');
                                    }
                                    return String(data).replace(/(&nbsp;|<([^>]+)>)/ig, "");
                                }
                            }
                        },
                        customize: function (doc: any) {
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
                    url: '/Api/ApiDetailedAnalysis/GridGetDetailedAnalysis',
                    data: (data: any) => {
                        data.StartDate = moment($('#StartDateFilter').val(), utility.monthFormat).format(utility.dateFormat);
                        data.EndDate = moment($('#EndDateFilter').val(), utility.monthFormat).format(utility.dateFormat);
                        data.UserId = $('#UserFilter').val();
                        data.Column = $('#ColumnFilter').val();
                    }
                },
                columns: [
                    {
                        data: 'UserName',
                        width: "200px",
                        className: "verticalAlignTop",
                    },
                    {
                        render: (data, type, row, meta) => {
                            return moment(row.Date).format('MMMM YYYY');
                        },
                        width: "200px",
                        className: "verticalAlignTop",
                    },
                    {
                        data: 'ColumnValue',
                    },
                ],
                initComplete: function () {
                    $('#detailedAnalysisTable').show();
                },
                responsive: true
            })
        }
        else {
            this.list.ajax.reload();
        }
    }
}
let detailedAnalysisList = new DetailedAnalysisList();
$(document).ready(function () {
    detailedAnalysisList.init();
});