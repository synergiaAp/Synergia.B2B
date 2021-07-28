class HoodSelectionOfferDetailsHoodList {
    private list: DataTables.DataTable;
    private saveHoodOfferElementQuantityTimeout: any;
    private saveHoodOfferAccessoryQuantityTimeout: any;
    private isAfterReorder: boolean = false;

    public init() {
        this.assignControlEvents();

        this.loadList();
    }

    public assignControlEvents() {
        $('[href="#pillHoodOfferElements"]').on('shown.bs.tab', () => {
            if (this.list != null) {
                this.list.columns.adjust();
            }
        });
        $('#btnAddVentilatorAccessory').click(() => {
            this.addVentilatorAccessory();
        });
        $('#btnAddSmokiAccessory').click(() => {
            this.addSmokiAccessory();
        });
    }

    private addVentilatorAccessory() {
        let item = {
            Name: $('#AdditionalAccessoryNawiewnikiType').val(),
            Type: <number>HoodOfferAccessoryType.Ventilator,
            HoodOfferId: $('#HoodOfferId').val()
        };
        this.addHoodOfferAccessoryAjax(item);
    }

    private addSmokiAccessory() {
        let item = {
            Name: $('#AdditionalAccessorySmokiType').val(),
            Type: <number>HoodOfferAccessoryType.Smoki,
            HoodOfferId: $('#HoodOfferId').val()
        };
        this.addHoodOfferAccessoryAjax(item);
    }

    private addHoodOfferAccessoryAjax(item) {
        if (item.Name != null && item.Name != '') {
            $.ajax({
                url: '/Api/ApiHoodOfferAccessories/Add',
                data: JSON.stringify(item),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                this.loadList();
                if (item.Type == <number>HoodOfferAccessoryType.Ventilator) {
                    $('#AdditionalAccessoryNawiewnikiType').val('').selectpicker('refresh');
                } else if (item.Type == <number>HoodOfferAccessoryType.Smoki) {
                    $('#AdditionalAccessorySmokiType').val('').selectpicker('refresh');
                }
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        }
    }

    public getListItemsCount(): number {
        return this.list.data().count();
    }

    public loadList() {
        if (!this.list) {
            this.list = $('#hoodOfferElementsTable').DataTable({
                order: [[0, 'asc']],
                rowReorder: {
                    selector: '.btnMove',
                    update: false
                },
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: () => {
                            return $('#HoodOfferNumber').val() + ' lista okapów';
                        },
                        title: null,
                        exportOptions: {
                            columns: [0, 2, 3, 4, 5, 6, 7],
                            format: {
                                body: function (data, row, column, node) {
                                    if (column == 3) {
                                        return $(data).find('.touchSpin').val();
                                    }
                                    return String(data).replace(/(&nbsp;|<([^>]+)>)/ig, "");
                                }
                            }
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'PDF',
                        filename: () => {
                            return $('#HoodOfferNumber').val() + ' lista okapów';
                        },
                        //orientation: 'landscape',
                        title: null,
                        exportOptions: {
                            columns: [0, 2, 3, 4, 5],
                            format: {
                                body: function (data, row, column, node) {
                                    if (column == 3) {
                                        return $(data).find('.touchSpin').val();
                                    }
                                    return String(data).replace(/(&nbsp;|<([^>]+)>)/ig, "");
                                }
                            }
                        },
                        customize: function (doc: any) {
                            //doc.content[0].table.widths =
                            //    Array(doc.content[0].table.body[0].length + 1).join('*').split('');
                            doc.styles.tableHeader.alignment = 'left';
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiHoodOfferElements/GridGetHoodOfferElements',
                    data: (data: any) => {
                        data.HoodOfferId = $('#HoodOfferId').val();
                    }
                },
                columns: [
                    {
                        render: (data, type, row, meta) => {
                            return '<div class="text-center">' + row.OrderNo + '</div>';
                        },
                        width: '100px',
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.HoodOfferAccessoryType == null) {
                                return '<img src="/Images/HoodOffer/Hoods/' + this.getHoodFileName(row) + '" style="width: 100%; height: auto;"/>';
                            } else {
                                return '<img src="/Images/HoodOffer/Accessories/' + this.getHoodAccessoryFileName(row) + '" style="width: 100%; height: auto;"/>';
                            }
                        },
                        width: '100px',
                        orderable: false
                    },
                    {
                        data: 'HoodNr',
                        width: '500px',
                        className: 'breakAll',
                        orderable: false,
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.Price);
                        },
                        className: 'text-left',
                        width: '200px',
                        orderable: false,
                    },
                    {
                        render: (data, type, row, meta) => {
                            return '<div style="width:45px;" class="touchSpinWrapper">'
                                + (row.HoodOfferAccessoryType == null
                                    ? ' <input onChange="hoodSelectionOfferDetailsHoodList.saveHoodOfferElementQuantity('
                                    : ' <input onChange="hoodSelectionOfferDetailsHoodList.saveHoodOfferAccessoryQuantity(')
                                + row.Id
                                + ',this)" data-min="1" data-max="99" type= "text" value="'
                                + row.Quantity + '" class="touchSpin"'
                                + (hoodSelectionOfferDetailsForm.areControlsDisabled || row.HoodOfferAccessoryType == <number>HoodOfferAccessoryType.Ansul ? 'disabled' : '')
                                + '></div>';
                        },
                        className: 'text-center',
                        width: '50px',
                        orderable: false,

                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toCurrency(row.FinalPrice);
                        },
                        className: 'text-left',
                        width: '200px',
                        orderable: false,
                    },
                    {
                        render: (data, type, row, meta) => {
                            let catalogPrice = row.FinalPrice;
                            if (row.HoodOfferAccessoryType == null) {
                                catalogPrice = row.FinalPrice * 3.5;
                            } else if (row.HoodOfferAccessoryType == <number>HoodOfferAccessoryType.Ansul) {
                                catalogPrice = row.FinalPrice * 2.5;
                            } 
                            if (row.HoodOfferAccessoryType == null || row.HoodOfferAccessoryType != <number>HoodOfferAccessoryType.Ventilator) {
                                catalogPrice = Math.ceil(catalogPrice / 100.0) * 100;
                            }
                            return utility.toCurrency(catalogPrice);
                        },
                        width: '200px',
                        orderable: false,
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toDate(row.CreatedOn);
                        },
                        orderable: false,
                    },
                    {
                        width: '60px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            let result = '';
                            if (row.HoodOfferAccessoryType == null) {
                                result += '<a href="javascript:hoodSelectionOfferDetails.edit(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                                if (hoodSelectionOfferDetailsForm.areControlsDisabled == false) {
                                    result += '<a href="javascript:hoodSelectionOfferDetailsHoodList.remove(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                                    result += '<a href="javascript:" title="Przenieś" data-toggle="tooltip" class="btn btn-simple btn-success btn-icon btnMove"><i class="material-icons">unfold_more</i><div class="ripple-container"></div></a>';
                                }
                            } else {
                                if (hoodSelectionOfferDetailsForm.areControlsDisabled == false) {
                                    if (row.HoodOfferAccessoryType == <number>HoodOfferAccessoryType.Smoki || row.HoodOfferAccessoryType == <number>HoodOfferAccessoryType.Ventilator) {
                                        result += '<a href="javascript:hoodSelectionOfferDetailsHoodList.removeAccessory(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                                    } else if (row.HoodOfferAccessoryType == <number>HoodOfferAccessoryType.Ansul) {
                                        result += '<a href="javascript:hoodSelectionOfferDetails.edit(' + row.HoodOfferAccessoryHoodOfferElementId + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>';
                                    }
                                }
                            }
                            return result;
                        },
                        className: 'nowrap'
                    },
                ],
                initComplete: function () {
                    $('#hoodOfferElementsTable').show();
                },
                drawCallback: () => {
                    $('[data-toggle="tooltip"]').tooltip();

                    $('#hoodOfferElementsTable').find(".touchSpin").each(function () {
                        $(this).TouchSpin({
                            verticalbuttons: true,
                            initval: $(this).attr('data-initVal') != null ? $(this).attr('data-initVal') : '1',
                            min: $(this).attr('data-min') != null ? parseFloat($(this).attr('data-min')) : 1,
                            max: $(this).attr('data-max') != null ? parseFloat($(this).attr('data-max')) : 99,
                            step: $(this).attr('data-step') != null ? parseFloat($(this).attr('data-step')) : 1,
                            decimals: $(this).attr('data-decimals') != null ? parseInt($(this).attr('data-decimals')) : 0
                        });
                    });

                    if (this.isAfterReorder) {
                        $(window).scrollTop($(window).scrollTop() + 1);// fix in datatables row reorder
                        this.isAfterReorder = false;
                    }
                },
                responsive: true
            });
            this.list.on('row-reorder', (e, diff, edit) => {
                let triggerRowData = edit.triggerRow.data();
                let orderNo = -1;

                for (let i = 0; i < diff.length; i++) {
                    let rowData: any = this.list.row(diff[i].node).data();

                    if (rowData.Id == triggerRowData.Id) {
                        orderNo = diff[i].newPosition + 1;
                        break;
                    }
                }

                if (orderNo > 0) {
                    $.ajax({
                        url: '/Api/ApiHoodOfferElements/SetHoodOfferElementOrderNo',
                        data: JSON.stringify({
                            HoodOfferElementId: triggerRowData.Id,
                            OrderNo: orderNo
                        }),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        type: 'POST'
                    }).then((result) => {
                        this.isAfterReorder = true;
                        this.loadList();
                    }).fail((xhr) => {
                        console.error(xhr);
                        utility.showError();
                    });
                }
            });
        }
        else {
            this.list.ajax.reload();
        }
    }

    private getHoodAccessoryFileName(row: any): string {
        let accessoryName = row.HoodNr.toLowerCase();
        if (accessoryName.includes('ansul')) {
            return 'ANSUL.png';
        } else if (accessoryName.includes('junior')) {
            return 'SMOKI JUNIOR.jpg';
        } else if (accessoryName.includes('maxi')) {
            return 'SMOKI MAXI GRILL.jpg';
        } else if (accessoryName.includes('jrs')) {
            return 'Nawiewnik JRS.jpg';
        }
        return '';
    }

    private getHoodFileName(row: any): string {
        let imgFileName = "";
        switch (row.Type) {
            case "JSI-R":
            case "JSI-S":
            case "JSVI-S":
            case "JSVI-S-W":
            case "JSVI-R":
            case "JSVI-R-W":
                imgFileName = "Synergia_JSI_filtr_";
                break;
            case "JVI-R":
            case "JVI-R-W":
                imgFileName = "Synergia_JVI_filtr_";
                break;
            case "JLI-R":
            case "JLI-S":
                imgFileName = "Synergia_JLI_filtr_";
                break;
            case "JSKI":
                return "Synergia_JSKI_dol_pop.png";
            case "JKI":
                return "Synergia_JKI_dol_pop.png";
        }

        switch (row.FilterType) {
            case "Turbo":
            case "UV-Turbo":
                imgFileName += "TURBOSWING";
                break;
            default:
                imgFileName += "JFF";
                break;
        }
        imgFileName += "_dol_pop.png";
        return imgFileName;
    }

    public remove(id: number) {
        swal({
            title: '',
            text: 'Czy na pewno chcesz usunąć wybrany okap?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            $.ajax({
                url: '/Api/ApiHoodOfferElements/DeleteHoodOfferElement',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                if (result) {
                    this.loadList();
                } else {
                    utility.showError();
                }
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        });
    }

    public removeAccessory(id: number) {
        swal({
            title: '',
            text: 'Czy na pewno chcesz usunąć wybrany element?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            $.ajax({
                url: '/Api/ApiHoodOfferAccessories/Delete?id=' + id,
                //data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'DELETE'
            }).then((result) => {
                this.loadList();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        });
    }

    public saveHoodOfferElementQuantity(hoodOfferElementId: number, touchSpinElement: JQuery) {
        if (this.saveHoodOfferElementQuantityTimeout) {
            clearTimeout(this.saveHoodOfferElementQuantityTimeout);
        }
        this.saveHoodOfferElementQuantityTimeout = setTimeout(() => {
            clearTimeout(this.saveHoodOfferElementQuantityTimeout);
            this.saveHoodOfferElementQuantityTimeout = null;

            $.ajax({
                url: '/Api/ApiHoodOfferElements/SaveHoodOfferElementQuantity',
                data: JSON.stringify(
                    {
                        hoodOfferElementId: hoodOfferElementId,
                        quantity: $(touchSpinElement).val()
                    }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                this.loadList();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        }, 1000);
    }

    public saveHoodOfferAccessoryQuantity(id: number, touchSpinElement: JQuery) {
        if (this.saveHoodOfferAccessoryQuantityTimeout) {
            clearTimeout(this.saveHoodOfferAccessoryQuantityTimeout);
        }
        this.saveHoodOfferAccessoryQuantityTimeout = setTimeout(() => {
            clearTimeout(this.saveHoodOfferAccessoryQuantityTimeout);
            this.saveHoodOfferAccessoryQuantityTimeout = null;

            $.ajax({
                url: '/Api/ApiHoodOfferAccessories/SaveQuantity',
                data: JSON.stringify(
                    {
                        id: id,
                        quantity: $(touchSpinElement).val()
                    }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST'
            }).then((result) => {
                this.loadList();
            }).fail((xhr) => {
                console.error(xhr);
                utility.showError();
            });
        }, 1000);
    }
}

let hoodSelectionOfferDetailsHoodList = new HoodSelectionOfferDetailsHoodList();
$(document).ready(function () {
    hoodSelectionOfferDetailsHoodList.init();
});
