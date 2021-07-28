var ConfigurationList = /** @class */ (function () {
    function ConfigurationList() {
    }
    ConfigurationList.prototype.init = function () {
        configurationList.loadConfiguration();
    };
    ConfigurationList.prototype.loadConfiguration = function () {
        $.ajax({
            url: '/Api/ApiConfiguration/GetConfiguration',
            data: {},
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
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
    };
    ConfigurationList.prototype.save = function () {
        $('#configurationSave').validate();
        if ($('#configurationSave').valid()) {
            $.ajax({
                url: '/Api/ApiConfiguration/SaveConfiguration',
                data: JSON.stringify(utility.getFormData($('#configurationSave'))),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    if (result > 0) {
                        utility.showSuccess();
                        configurationList.loadConfiguration();
                    }
                    else {
                        utility.showError();
                    }
                },
            });
        }
    };
    return ConfigurationList;
}());
var configurationList = new ConfigurationList();
$(document).ready(function () {
    configurationList.init();
});
//# sourceMappingURL=ConfigurationList.js.map