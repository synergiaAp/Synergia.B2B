class InstallationObjectDetails {
    public installationObjectId: number;
   
    public init() {
        $('#btnBack').removeClass('invisible');
        $('#btnBack').click(() => {
            this.back();
        });
        this.loadAllData();
    }
    public loadAllData() {
       // this.loadInstallationObjectDetails();
        this.edit();
    }

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

    public edit() {
        $.ajax({
            url: '/Api/ApiInstallationObjects/GetInstallationObjectDetails',
            data: { installationObjectId: this.installationObjectId },  //id to parametr metody GetInstallationObject z Web servisu API
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
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
    }

    public back() {
        location.href = '/InstallationObjects/Index';
    }
}

let installationObjectDetails = new InstallationObjectDetails();
$(document).ready(function () {
    installationObjectDetails.init();
});

