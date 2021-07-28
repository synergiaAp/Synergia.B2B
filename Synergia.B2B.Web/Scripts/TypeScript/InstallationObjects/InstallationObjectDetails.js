var InstallationObjectDetails = /** @class */ (function () {
    function InstallationObjectDetails() {
    }
    InstallationObjectDetails.prototype.init = function () {
        var _this = this;
        $('#btnBack').removeClass('invisible');
        $('#btnBack').click(function () {
            _this.back();
        });
        this.loadAllData();
    };
    InstallationObjectDetails.prototype.loadAllData = function () {
        // this.loadInstallationObjectDetails();
        this.edit();
    };
    //public loadInstallationObjectDetails() {
    //    $.ajax({
    //        url: '/Api/ApiInstallationObjects/GetInstallationObjectDetails',
    //        data: { installationObjectId: this.installationObjectId },  //id to parametr metody GetUser z Web servisu API
    //        dataType: 'json',
    //        contentType: 'application/json; charset=utf-8',
    //        type: 'GET',
    //        success: (result) => {
    //            $('#installationObjectName').text(result.Name);
    //            $('#installationObjectCode').text(result.Code);
    //            $('#installationObjectAddress').text(result.Address);
    //            $('#installationObjectPostalCode').text(result.PostalCode);
    //            $('#installationObjectCity').text(result.City);
    //            $('#installationObjectCountry').text(result.Country);
    //            $('#installationObjectType').text(result.Type);
    //            $('#installationObjectNote').text(result.Note);
    //        },
    //    });
    //}
    InstallationObjectDetails.prototype.edit = function () {
        $.ajax({
            url: '/Api/ApiInstallationObjects/GetInstallationObjectDetails',
            data: { installationObjectId: this.installationObjectId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Code').val(result.Code).trigger('change');
                $('#Name').val(result.Name).trigger('change');
                $('#Address').val(result.Address).trigger('change');
                $('#PostalCode').val(result.PostalCode).trigger('change');
                $('#City').val(result.City).trigger('change');
                $('#Country').val(result.Country).trigger('change');
                $('#Type').val(result.Type).trigger('change');
                $('#Note').val(result.Note).trigger('change');
                $('#Id').val(result.Id);
            },
        });
    };
    InstallationObjectDetails.prototype.back = function () {
        location.href = '/InstallationObjects/Index';
    };
    return InstallationObjectDetails;
}());
var installationObjectDetails = new InstallationObjectDetails();
$(document).ready(function () {
    installationObjectDetails.init();
});
//# sourceMappingURL=InstallationObjectDetails.js.map