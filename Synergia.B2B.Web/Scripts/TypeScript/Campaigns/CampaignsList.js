var CampaignsList = /** @class */ (function () {
    function CampaignsList() {
        this.isAddCampaignContactsMode = false;
        this.areControlsDisabled = false;
    }
    CampaignsList.prototype.init = function () {
        var _this = this;
        $('#modalCampaignDetails').on('hide.bs.modal', function () {
            if (!_this.isAddCampaignContactsMode) {
                $('#modalCampaignDetails').find('input:text, textarea, input:hidden').val('');
                tinymce.get('MessageContent').setContent('');
                $('#modalCampaignDetails').find('form').validate().resetForm();
                _this.loadCampaignList();
            }
        })
            .on('shown.bs.modal', function () {
            _this.campaignFilesList.columns.adjust();
            //    $('a[href="#pillCampaignDetails"]').tab('show');
        });
        $('#modalAddCampaignContacts').on('show.bs.modal', function () {
            _this.isAddCampaignContactsMode = true;
            $('#modalCampaignDetails').modal('hide');
            _this.loadAddCampaignContactList();
        }).on('hidden.bs.modal', function () {
            _this.isAddCampaignContactsMode = false;
            $('#ContactTypeFilter').val('');
            $('#modalCampaignDetails').modal();
        });
        $('#ContactTypeFilter').change(function () {
            _this.loadAddCampaignContactList();
        });
        $('#buttonAddCampaignFile').click(function () {
            $('#inputCampaignFile').click();
        });
        $('#inputCampaignFile').change(function () {
            if ($('#inputCampaignFile').val() != "") {
                var formData = new FormData();
                for (var i = 0; i < $('#inputCampaignFile')[0].files.length; i++) {
                    formData.append('file', $('#inputCampaignFile')[0].files[i]);
                }
                $.ajax({
                    url: '/Api/ApiCampaignFiles/AddFile?campaignId=' + $('#Id').val(),
                    data: formData,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        if (result) {
                            _this.loadCampaignFilesList();
                        }
                        else {
                            utility.showError();
                        }
                    },
                });
            }
        });
        $('#btnRemoveAllCampaignContacts').click(function () {
            _this.removeAllCampaignContacts();
        });
        $('#btnSendCampaign').click(function () {
            _this.sendCampaign();
        });
        $('a[href="#pillCampaignDetails"]').on('shown.bs.tab', function (e) {
            $('.campaignContacts').addClass('hidden');
        });
        $('a[href="#pillCampaignContacts"]').on('shown.bs.tab', function (e) {
            $('.campaignContacts').removeClass('hidden');
        });
        this.calculateScrollableHeight();
        $(window).resize(function () {
            _this.calculateScrollableHeight();
        });
        this.loadCampaignList();
    };
    CampaignsList.prototype.sendCampaign = function () {
        var _this = this;
        if ($('#formCampaignDetails').valid()) {
            if (this.campaignContactList.data().count() > 0) {
                swal({
                    title: '',
                    text: 'Czy na pewno chcesz wysłać mailing?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Tak',
                    cancelButtonText: 'Nie',
                }).then(function () {
                    return _this.saveCampaign(false);
                }).then(function () {
                    $.ajax({
                        url: '/Api/ApiCampaigns/SendCampaign',
                        data: JSON.stringify($('#Id').val()),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        type: 'POST',
                        success: function (result) {
                            if (result) {
                                $('#modalCampaignDetails').modal('hide');
                                utility.showSuccess();
                                campaignsList.loadCampaignList();
                            }
                            else {
                                utility.showError();
                            }
                        },
                    });
                });
            }
            else {
                utility.showError('Brak odbiorców');
            }
        }
        else {
            utility.showError('Szczegóły mailingu zawierają błędy');
        }
    };
    CampaignsList.prototype.removeAllCampaignContacts = function () {
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
                success: function (result) {
                    if (result) {
                        utility.showSuccess();
                        campaignsList.loadCampaignContactList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        });
    };
    CampaignsList.prototype.removeCampaign = function (id) {
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
                success: function (result) {
                    campaignsList.loadCampaignList();
                },
            });
        });
    };
    CampaignsList.prototype.editCampaign = function (campaignId) {
        var _this = this;
        this.enableAllControls();
        if (campaignId != null) {
            $.ajax({
                url: '/Api/ApiCampaigns/GetCampaign',
                data: { id: campaignId },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: function (result) {
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
                    _this.loadCampaignContactList();
                    _this.loadCampaignFilesList();
                    $('#btnSendCampaign').removeClass('hidden');
                    if (result.Status == CampaignStatus.Sent) {
                        _this.disableAllControls();
                    }
                    $('#modalCampaignDetails').modal();
                    $('a[href="#pillCampaignDetails"]').tab('show');
                },
            });
        }
        else {
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
    };
    CampaignsList.prototype.enableAllControls = function () {
        $('#pillCampaignDetails').find('select:not(.form-control-disabled), input:text:not(.form-control-disabled), input:checkbox:not(.form-control-disabled)').attr('disabled', false);
        this.areControlsDisabled = false;
        tinymce.activeEditor.setMode('design');
        $('#btnSendCampaign, #btnSaveCampaign, #btnAddCampaignContacts, #btnRemoveAllCampaignContacts, #buttonAddCampaignFile').removeClass('hidden');
    };
    CampaignsList.prototype.disableAllControls = function () {
        this.areControlsDisabled = true;
        $('#pillCampaignDetails').find('select, input:text, input:checkbox').attr('disabled', true);
        $('#modalCampaignDetails .remove').hide();
        tinymce.activeEditor.setMode('readonly');
        $('#btnSendCampaign, #btnSaveCampaign, #btnAddCampaignContacts, #btnRemoveAllCampaignContacts, #buttonAddCampaignFile').addClass('hidden');
    };
    CampaignsList.prototype.saveCampaign = function (showInfo) {
        var _this = this;
        if (showInfo === void 0) { showInfo = true; }
        if ($('#formCampaignDetails').valid()) {
            return $.ajax({
                url: '/Api/ApiCampaigns/SaveCampaign',
                data: JSON.stringify(utility.getFormData($('#formCampaignDetails'))),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result != null) {
                        if (showInfo) {
                            utility.showSuccess();
                            _this.editCampaign(result);
                        }
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        }
        return $.when(null);
    };
    CampaignsList.prototype.loadCampaignList = function () {
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
                        render: function (data, type, row, meta) {
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
                        render: function (data, type, row, meta) {
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
                    $('[data-toggle="tooltip"]').tooltip(); // musi być do prawidłowego ładowanie tooltipa
                },
                responsive: true
            });
        }
        else {
            this.campaignList.ajax.reload();
        }
    };
    CampaignsList.prototype.loadCampaignFilesList = function () {
        var _this = this;
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
                    data: function (data) {
                        data.CampaignId = $('#Id').val();
                    }
                },
                columns: [
                    {
                        render: function (data, type, row, meta) {
                            return '<a href="/Files/GetCRMFile/' + row.GeneratedFileName + '/' + row.OriginalFileName.replace('/', '_')
                                + '" target="_blank">' + row.OriginalFileName + '</a>';
                        },
                        className: "nowrap"
                    },
                    {
                        //data: 'FileSize',
                        width: '60px',
                        render: function (data, type, row, meta) {
                            return utility.toDecimal(row.FileSize / 1024 / 1024) + " MB";
                        },
                    },
                    {
                        width: '10px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            if (!_this.areControlsDisabled) {
                                return '<a href="javascript:campaignsList.removeCampaignFile(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            else {
                                return '';
                            }
                        },
                    },
                ],
                initComplete: function () {
                    $('#campaignFilesTable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip(); // musi być do prawidłowego ładowanie tooltipa
                },
                responsive: true
            });
        }
        else {
            this.campaignFilesList.ajax.reload();
        }
    };
    CampaignsList.prototype.copyCampaign = function (id) {
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
                success: function (result) {
                    if (result != null) {
                        campaignsList.loadCampaignList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        });
    };
    CampaignsList.prototype.removeCampaignContact = function (id) {
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
                success: function (result) {
                    campaignsList.loadCampaignContactList();
                },
            });
        });
    };
    CampaignsList.prototype.removeCampaignFile = function (id) {
        $.ajax({
            url: '/Api/ApiCampaignFiles/DeleteCampaignFile',
            data: JSON.stringify(id),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            success: function (result) {
                campaignsList.loadCampaignFilesList();
            },
        });
    };
    CampaignsList.prototype.loadCampaignContactList = function () {
        var _this = this;
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
                    data: function (data) {
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
                        render: function (data, type, row, meta) {
                            if (row.CustomerName != null) {
                                var maxlength = 35;
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
                        render: function (data, type, row, meta) {
                            if (!_this.areControlsDisabled) {
                                return '<a href="javascript:campaignsList.removeCampaignContact(' + row.Id + ');" title="Usuń" data-toggle="tooltip" class="btn btn-simple btn-danger btn-icon remove"><i class="material-icons">close</i><div class="ripple-container"></div></a>';
                            }
                            else {
                                return '';
                            }
                        },
                    },
                ],
                initComplete: function () {
                    $('#campaignContactsTable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip(); // musi być do prawidłowego ładowanie tooltipa
                    if (_this.campaignContactList.data().count() && !_this.areControlsDisabled) {
                        $('#btnRemoveAllCampaignContacts').removeClass('hidden');
                    }
                    else {
                        $('#btnRemoveAllCampaignContacts').addClass('hidden');
                    }
                },
                responsive: true
            });
        }
        else {
            this.campaignContactList.ajax.reload();
        }
    };
    CampaignsList.prototype.loadAddCampaignContactList = function () {
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
                    data: function (data) {
                        data.CampaignId = $('#Id').val();
                        data.ContactType = $('#ContactTypeFilter').val();
                    }
                },
                columns: [
                    {
                        width: '30px',
                        orderable: false,
                        render: function (data, type, row, meta) {
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
                        render: function (data, type, row, meta) {
                            if (row.CustomerName != null) {
                                var maxlength = 35;
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
                    $('[data-toggle="tooltip"]').tooltip(); // musi być do prawidłowego ładowanie tooltipa
                },
                responsive: true
            });
        }
        else {
            this.addCampaignContactList.ajax.reload();
        }
    };
    CampaignsList.prototype.singleAddCampaignContactChanged = function () {
        $('#selectAllContacts').prop('checked', $('.addCampaignContact:not(:checked)').length == 0);
    };
    CampaignsList.prototype.selectAllContactsChanged = function () {
        $('.addCampaignContact').prop('checked', $('#selectAllContacts').is(':checked'));
    };
    CampaignsList.prototype.addCampaignContacts = function () {
        var _this = this;
        if ($('.addCampaignContact:checked').length > 0) {
            var selectedContactIds_1 = [];
            $('.addCampaignContact:checked').each(function () {
                selectedContactIds_1.push($(this).val());
            });
            $.ajax({
                url: '/Api/ApiCampaignContacts/AddCampaignContacts',
                data: JSON.stringify({ campaignId: $('#Id').val(), contactIds: selectedContactIds_1 }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result) {
                        $('#modalAddCampaignContacts').modal('hide');
                        _this.loadCampaignContactList();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        }
        else {
            utility.showError('Nie zaznaczono żadnych odbiorców');
        }
    };
    CampaignsList.prototype.calculateScrollableHeight = function () {
        var height = ($(window).height() - 250);
        $('#modalCampaignDetailsScrollableContent').height(height)
            .css('max-height', height + 'px');
    };
    return CampaignsList;
}());
var campaignsList = new CampaignsList();
$(document).ready(function () {
    campaignsList.init();
});
//# sourceMappingURL=CampaignsList.js.map