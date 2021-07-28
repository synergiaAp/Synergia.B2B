class ConfigurationList {
    public init() {
        configurationList.loadConfiguration();
    }

    public loadConfiguration() {
        $.ajax({
            url: '/Api/ApiConfiguration/GetConfiguration',
            data: { },  
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                $('#configurationId').val(result.Id);
                $('#welcomeText').val(result.WelcomeText).trigger('change');
                if (result.OverrideUserWelcomeText) {
                    $('#overrideUserWelcomeText').attr('checked', true);
                }
                else {
                    $('#overrideUserWelcomeText').removeAttr('checked');
                }
                $('#bigBirthdayText').val(result.BigBirthdayText).trigger('change');
                $('#smallBirthdayText').val(result.SmallBirthdayText).trigger('change');
                $('#OrderEmailRecipients').val(result.OrderEmailRecipients).trigger('change');
                $('#HoodOrderEmailRecipients').val(result.HoodOrderEmailRecipients).trigger('change');
                $('#SubmittedMonthlyReportEmailRecipients').val(result.SubmittedMonthlyReportEmailRecipients).trigger('change');
            },
        });
    }

    public save() {
        $('#configurationSave').validate();
        if ($('#configurationSave').valid()) {
            $.ajax({
                url: '/Api/ApiConfiguration/SaveConfiguration',
                data: JSON.stringify(utility.getFormData($('#configurationSave'))),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    if (result > 0) {
                        utility.showSuccess();
                        configurationList.loadConfiguration();
                    } else {
                        utility.showError();
                    }
                },
            });
        }
    }
}

let configurationList = new ConfigurationList();
$(document).ready(function () {
    configurationList.init();
});

