class CampaignsList {
    private campaignList: DataTables.DataTable;
    private campaignFilesList: DataTables.DataTable;
    private campaignContactList: DataTables.DataTable;
    private addCampaignContactList: DataTables.DataTable;
    private isAddCampaignContactsMode: boolean = false;
    private areControlsDisabled: boolean = false;

    public init() {
        $('#modalCampaignDetails').on('hide.bs.modal', () => {
            if (!this.isAddCampaignContactsMode) {
                $('#modalCampaignDetails').find('input:text, textarea, input:hidden').val('');
                tinymce.get('MessageContent').setContent('');
                $('#modalCampaignDetails').find('form').validate().resetForm();
                this.loadCampaignList();
            }
        })
            .on('shown.bs.modal', () => {
                this.campaignFilesList.columns.adjust();
                //    $('a[href="#pillCampaignDetails"]').tab('show');
            });

        $('#modalAddCampaignContacts').on('show.bs.modal', () => {
            this.isAddCampaignContactsMode = true;
            $('#modalCampaignDetails').modal('hide');
            this.loadAddCampaignContactList();
        }).on('hidden.bs.modal', () => {
            this.isAddCampaignContactsMode = false;
            $('#ContactTypeFilter').val('');
            $('#modalCampaignDetails').modal();
        });

        $('#ContactTypeFilter').change(() => {
            this.loadAddCampaignContactList();
        });

        $('#buttonAddCampaignFile').click(() => {
            $('#inputCampaignFile').click();
        });

        $('#inputCampaignFile').change(() => {
            if ($('#inputCampaignFile').val() != "") {
                let formData = new FormData();
                for (var i = 0; i < (<any>$('#inputCampaignFile')[0]).files.length; i++) {
                    formData.append('file', (<any>$('#inputCampaignFile')[0]).files[i]);
                }
                $.ajax({
                    url: '/Api/ApiCampaignFiles/AddFile?campaignId=' + $('#Id').val(),
                    data: formData,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    success: (result) => {
                        if (result) {
                            this.loadCampaignFilesList();
                        }
                        else {
                            utility.showError();
                        }
                    },
                });
            }
        });

        $('#btnRemoveAllCampaignContacts').click(() => {
            this.removeAllCampaignContacts();
        });

        $('#btnSendCampaign').click(() => {
            this.sendCampaign();
        });

        $('a[href="#pillCampaignDetails"]').on('shown.bs.tab', function (e) {
            $('.campaignContacts').addClass('hidden');
        });
        $('a[href="#pillCampaignContacts"]').on('shown.bs.tab', function (e) {
            $('.campaignContacts').removeClass('hidden');
        });

        this.calculateScrollableHeight();
        $(window).resize(() => {
            this.calculateScrollableHeight();
        });

        this.loadCampaignList();
    }

    private sendCampaign() {
        if ($('#formCampaignDetails').valid()) {
            if (this.campaignContactList.data().count() > 0) {
                swal({
                    title: '',
                    text: 'Czy na pewno chcesz wysłać mailing?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Tak',
                    cancelButtonText: 'Nie',
                }).then(() => {
                    return this.saveCampaign(false);
                }).then(() => {
                    $.ajax({
                        url: '/Api/ApiCampaigns/SendCampaign',
                        data: JSON.stringify($('#Id').val()),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        type: 'POST',
                        success: (result) => {
                            if (result) {
                                $('#modalCampaignDetails').modal('hide');
                                utility.showSuccess();
                                campaignsList.loadCampaignList();
                            } else {
                                utility.showError();
                            }
                        },
                    });
                });
            } else {
                utility.showError('Brak odbiorców');
            }
        } else {
            utility.showError('Szczegóły mailingu zawierają błędy');
        }
    }

    private removeAllCampaignContacts() {
        swal({
            title: '',
            text: 'Czy na pewno chcesz usunąć wszystkich odbiorców?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiCampaignContacts/DeleteAllCampaignContacts',
                data: JSON.stringify($('#Id').val()),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result) {
                        utility.showSuccess();
                        campaignsList.loadCampaignContactList();
                    } else {
                        utility.showError();
                    }
                },
            });
        });
    }

    public removeCampaign(id: number) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć mailing?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiCampaigns/DeleteCampaign',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    campaignsList.loadCampaignList();
                },
            });
        });
    }

    public editCampaign(campaignId?: number) {
        this.enableAllControls();
        if (campaignId != null) {
            $.ajax({
                url: '/Api/ApiCampaigns/GetCampaign',
                data: { id: campaignId },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: (result) => {
                    $('a[href="#pillCampaignContacts"]').closest('li').removeClass('disabled')
                        .removeAttr('title')
                        .removeAttr('data-toggle')
                        .removeAttr('data-original-title');
                    $('#buttonAddCampaignFile').removeAttr('disabled')
                        .removeAttr('title')
                        .removeAttr('data-toggle')
                        .removeAttr('data-original-title');
                    $('#Name').val(result.Name).trigger('change');
                    $('#MessageSubject').val(result.MessageSubject).trigger('change');
                    $('#MessageContent').val(result.MessageContent).trigger('change');
                    tinymce.get('MessageContent').setContent(result.MessageContent);
                    $('#Id').val(result.Id);
                    this.loadCampaignContactList();
                    this.loadCampaignFilesList();
                    $('#btnSendCampaign').removeClass('hidden');

                    if (result.Status == <number>CampaignStatus.Sent) {
                        this.disableAllControls();
                    }
                    $('#modalCampaignDetails').modal();
                    $('a[href="#pillCampaignDetails"]').tab('show');
                },
            });
        } else {
            $('#btnSendCampaign').addClass('hidden');
            $('#modalCampaignDetails').modal();
            $('a[href="#pillCampaignContacts"]').closest('li').addClass('disabled')
                .attr('title', 'Aby dodać odbiorców najpierw zapisz kampanię')
                .attr('data-toggle', 'tooltip');
            $('#buttonAddCampaignFile').attr('disabled', true)
                .attr('title', 'Aby dodać załączniki najpierw zapisz kampanię')
                .attr('data-toggle', 'tooltip');
            $('[data-toggle="tooltip"]').tooltip();
            $('a[href="#pillCampaignDetails"]').tab('show');
            this.loadCampaignFilesList();
        }
    }

    private enableAllControls() {
        $('#pillCampaignDetails').find('select:not(.form-control-disabled), input:text:not(.form-control-disabled), input:checkbox:not(.form-control-disabled)').attr('disabled', false);
        this.areControlsDisabled = false;
        tinymce.activeEditor.setMode('design');
        $('#btnSendCampaign, #btnSaveCampaign, #btnAddCampaignContacts, #btnRemoveAllCampaignContacts, #buttonAddCampaignFile').removeClass('hidden');
    }

    private disableAllControls() {
        this.areControlsDisabled = true;
        $('#pillCampaignDetails').find('select, input:text, input:checkbox').attr('disabled', true);
        $('#modalCampaignDetails .remove').hide();
        tinymce.activeEditor.setMode('readonly');
        $('#btnSendCampaign, #btnSaveCampaign, #btnAddCampaignContacts, #btnRemoveAllCampaignContacts, #buttonAddCampaignFile').addClass('hidden');
    }

    public saveCampaign(showInfo: boolean = true): JQueryPromise<any> {
        if ($('#formCampaignDetails').valid()) {
            return $.ajax({
                url: '/Api/ApiCampaigns/SaveCampaign',
                data: JSON.stringify(utility.getFormData($('#formCampaignDetails'))),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result != null) {
                        if (showInfo) {
                            utility.showSuccess();
                            this.editCampaign(result);
                        }
                    } else {
                        utility.showError();
                    }
                },
            });
        }
        return $.when(null);
    }

    public loadCampaignList() {
        if (!this.campaignList) {
            this.campaignList = $('#campaignsTable').DataTable({
                order: [[0, 'asc']],
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        filename: 'Mailingi',
                        title: null,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    }
                ],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiCampaigns/GridGetCampaigns',
                },
                columns: [
                    {
                        data: 'Name',
                    },
                    {
                        data: 'StatusText',
                    },
                    {
                        render: (data, type, row, meta) => {
                            return utility.toDate(row.SendDate);
                        },
                    },
                    {
                        data: 'RecipientsCount',
                        className: 'text-right',
                    },
                    {
                        data: 'MessageSubject',
                    },
                    {
                        width: '110px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            return '<a href="javascript:campaignsList.copyCampaign(' + row.Id + ');" title="Kopiuj" data-toggle="tooltip" class="btn btn-simple btn-success btn-icon edit"><i class="material-icons">content_copy</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:campaignsList.editCampaign(' + row.Id + ');" title="Edytuj" data-toggle="tooltip" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>'
                                + '<a href="javascript:campaignsList.removeCampaign(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#campaignsTable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa
                },
                responsive: true
            })
        }
        else {
            this.campaignList.ajax.reload();
        }
    }

    public loadCampaignFilesList() {
        if (!this.campaignFilesList) {
            this.campaignFilesList = $('#campaignFilesTable').DataTable({
                searching: false,
                ordering: false,
                lengthChange: false,
                paging: false,
                info: false,
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiCampaignFiles/GridGetCampaignFiles',
                    data: (data: any) => {
                        data.CampaignId = $('#Id').val();
                    }
                },
                columns: [
                    {
                        render: (data, type, row, meta) => {
                            return '<a href="/Files/GetCRMFile/' + row.GeneratedFileName + '/' + row.OriginalFileName.replace('/', '_')
                                + '" target="_blank">' + row.OriginalFileName + '</a>';
                        },
                        className: "nowrap"
                    },
                    {
                        //data: 'FileSize',
                        width: '60px',
                        render: (data, type, row, meta) => {
                            return utility.toDecimal(row.FileSize / 1024 / 1024) + " MB";
                        },
                    },
                    {
                        width: '10px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            if (!this.areControlsDisabled) {
                                return '<a href="javascript:campaignsList.removeCampaignFile(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            else {
                                return '';
                            }
                        },
                    },
                ],
                initComplete: () => {
                    $('#campaignFilesTable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa
                },
                responsive: true
            })
        }
        else {
            this.campaignFilesList.ajax.reload();
        }
    }

    public copyCampaign(id: number) {
        swal({
            title: '',
            text: 'Czy chcesz skopiować kampanię?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiCampaigns/CopyCampaign',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result != null) {
                        campaignsList.loadCampaignList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        });
    }

    public removeCampaignContact(id: number) {
        swal({
            title: '',
            text: 'Czy chcesz usunąć kontakt z kampanii?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            $.ajax({
                url: '/Api/ApiCampaignContacts/DeleteCampaignContact',
                data: JSON.stringify(id),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    campaignsList.loadCampaignContactList();
                },
            });
        });
    }

    public removeCampaignFile(id: number) {

        $.ajax({
            url: '/Api/ApiCampaignFiles/DeleteCampaignFile',
            data: JSON.stringify(id),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            success: (result) => {
                campaignsList.loadCampaignFilesList();
            },
        });

    }

    public loadCampaignContactList() {
        if (!this.campaignContactList) {
            this.campaignContactList = $('#campaignContactsTable').DataTable({
                order: [[0, 'asc']],
                //buttons: [
                //    {
                //        extend: 'excelHtml5',
                //        text: 'Excel',
                //        filename: 'Mailingi',
                //        title: null,
                //        exportOptions: {
                //            columns: [0, 1, 2, 3, 4]
                //        }
                //    }
                //],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiCampaignContacts/GridGetCampaignContacts',
                    data: (data: any) => {
                        data.CampaignId = $('#Id').val();
                    }
                },
                columns: [
                    {
                        data: 'FirstName',
                    },
                    {
                        data: 'Surname',
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.CustomerName != null) {
                                let maxlength = 35;
                                return '<span title="' + row.CustomerName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.CustomerName.length > maxlength ? row.CustomerName.substring(0, maxlength) + '...' : row.CustomerName) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                        width: '300px',
                        className: 'text-left',
                    },
                    {
                        data: 'Position',
                    },
                    {
                        data: 'CustomerType',
                    },
                    {
                        data: 'Email',
                    },
                    {
                        width: '70px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            if (!this.areControlsDisabled) {
                                return '<a href="javascript:campaignsList.removeCampaignContact(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            } else {
                                return '';
                            }
                        },
                    },
                ],
                initComplete: function () {
                    $('#campaignContactsTable').show();
                },
                drawCallback: () => {
                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa
                    if (this.campaignContactList.data().count() && !this.areControlsDisabled) {
                        $('#btnRemoveAllCampaignContacts').removeClass('hidden');
                    } else {
                        $('#btnRemoveAllCampaignContacts').addClass('hidden');
                    }
                },
                responsive: true
            })
        }
        else {
            this.campaignContactList.ajax.reload();
        }
    }

    public loadAddCampaignContactList() {
        $('#selectAllContacts').prop('checked', false);

        if (!this.addCampaignContactList) {
            this.addCampaignContactList = $('#addCampaignContactsTable').DataTable({
                order: [[1, 'asc']],
                paging: false,
                //buttons: [
                //    {
                //        extend: 'excelHtml5',
                //        text: 'Excel',
                //        filename: 'Mailingi',
                //        title: null,
                //        exportOptions: {
                //            columns: [0, 1, 2, 3, 4]
                //        }
                //    }
                //],
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiCampaignContacts/GridGetAvailableContacts',
                    data: (data: any) => {
                        data.CampaignId = $('#Id').val();
                        data.ContactType = $('#ContactTypeFilter').val();
                    }
                },
                columns: [
                    {
                        width: '30px',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            return '<input type="checkbox" class="addCampaignContact" value=' + row.Id + ' onchange="campaignsList.singleAddCampaignContactChanged()">';
                        },
                        className: 'text-center'
                    },
                    {
                        data: 'FirstName',
                    },
                    {
                        data: 'Surname',
                    },
                    {
                        render: (data, type, row, meta) => {
                            if (row.CustomerName != null) {
                                let maxlength = 35;
                                return '<span title="' + row.CustomerName.replaceAll('"', '') + '"data-toggle="tooltip">'
                                    + (row.CustomerName.length > maxlength ? row.CustomerName.substring(0, maxlength) + '...' : row.CustomerName) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                            }
                            else {
                                return '';
                            }
                        },
                        width: '300px',
                        className: 'text-left',
                    },
                    {
                        data: 'Position',
                    },
                    {
                        data: 'CustomerType',
                    },
                    {
                        data: 'Email',
                    }
                ],
                initComplete: function () {
                    $('#addCampaignContactsTable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();  // musi być do prawidłowego ładowanie tooltipa
                },
                responsive: true
            })
        }
        else {
            this.addCampaignContactList.ajax.reload();
        }
    }

    public singleAddCampaignContactChanged() {
        $('#selectAllContacts').prop('checked', $('.addCampaignContact:not(:checked)').length == 0);
    }

    public selectAllContactsChanged() {
        $('.addCampaignContact').prop('checked', $('#selectAllContacts').is(':checked'));
    }

    public addCampaignContacts() {
        if ($('.addCampaignContact:checked').length > 0) {

            let selectedContactIds = [];
            $('.addCampaignContact:checked').each(function () {
                selectedContactIds.push($(this).val());
            });
            $.ajax({
                url: '/Api/ApiCampaignContacts/AddCampaignContacts',
                data: JSON.stringify({ campaignId: $('#Id').val(), contactIds: selectedContactIds }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result) {
                        $('#modalAddCampaignContacts').modal('hide');
                        this.loadCampaignContactList();
                    } else {
                        utility.showError();
                    }
                },
            });
        } else {
            utility.showError('Nie zaznaczono żadnych odbiorców');
        }
    }

    private calculateScrollableHeight() {
        let height = ($(window).height() - 250);
        $('#modalCampaignDetailsScrollableContent').height(height)
            .css('max-height', height + 'px');
    }
}

let campaignsList = new CampaignsList();
$(document).ready(function () {
    campaignsList.init();
});