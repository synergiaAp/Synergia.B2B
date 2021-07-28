class ContactDetails {
    public init() {
        this.assignEvents();
        this.initAutocomplete();
    }

    private assignEvents() {
        $('#modalAddContact').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input:hidden').val('');
            $(this).find('form').validate().resetForm();
            $('#BirthdayReminder').prop('checked', false);
        });

    }

    private initAutocomplete() {
        $("#OffersCompanyName").autocomplete({
            source: function (request, response) {
                $.getJSON(
                    "/Api/ApiOfferCompanies/SearchOfferCompany",
                    {
                        term: request.term
                    },
                    response
                );
            },
            minLength: 0,
            select: (event, ui) => {
                $('#OffersCompanyId').val(ui.item.OfferCompanyId).trigger('change');
                $("#OffersCompanyName").attr('data-tempValue', ui.item.label);
            },
            //pogrubienie tekstu
            open: function (e, ui) {
                var acData = $(this).data('ui-autocomplete');
                acData
                    .menu
                    .element
                    .find('li')
                    .each(function () {
                        var me = $(this);
                        var keywords = acData.term.split(' ').join('|');
                        me.html('<div class="ui-menu-item-wrapper">' + me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<b>$1</b>') + '</div>');
                    });
            },
            params: { "auto_dealer": "yes" }
        });

        $("#OffersCompanyName").blur(() => {
            $("#OffersCompanyName").val($("#OffersCompanyName").attr('data-tempValue')).trigger('change');
        });
    }

    public edit(installationObjectId: number) {
        $.ajax({
            url: '/Api/ApiContacts/GetContact',
            data: { id: installationObjectId },  //id to parametr metody GetInstallationObject z Web servisu API
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: (result) => {
                $('#FirstName').val(result.FirstName).trigger('change');
                $('#Surname').val(result.Surname).trigger('change');
                $('#MobilePhone').val(result.MobilePhone).trigger('change');
                $('#LandlinePhone').val(result.LandlinePhone).trigger('change');
                $('#Email').val(result.Email).trigger('change');
                $('#BirthDate').val(result.BirthDate).trigger('change');
                $('#ContactType').val(result.ContactType).trigger('change');
                $('#Position').val(result.Position).trigger('change');
                $('#Interests').val(result.Interests).trigger('change');
                $('#Attitude').val(result.Attitude).trigger('change');
                $('#Comment').val(result.Comment).trigger('change');
                $('#LastContact').val(result.LastContact).trigger('change');
                $('#Status').val(result.Status).trigger('change');
                $('#OffersCompanyName').val(result.OffersCompanyName).attr('data-tempValue', result.OffersCompanyName).trigger('change');
                $('#OffersCompanyId').val(result.OffersCompanyId).trigger('change');
                $('#BirthdayReminder').prop('checked', result.BirthdayReminder);
                $('#Id').val(result.Id);
                $('#modalAddContact').modal();     //spodowoduje, że modal się wyświetli
            },
        });
    }

    public save() {
        $('#formAddContact').validate();
        if ($('#formAddContact').valid()) {
            $.ajax({
                url: '/Api/ApiContacts/SaveContact',
                data: JSON.stringify(utility.getFormData($('#formAddContact'))),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: (result) => {
                    $('#modalAddContact').modal('hide');     //spodowoduje, że modal się ukryje
                    contactsList.loadList();
                },
            });
        }
    }
}

let contactDetails = new ContactDetails();
$(document).ready(function () {
    contactDetails.init();
});