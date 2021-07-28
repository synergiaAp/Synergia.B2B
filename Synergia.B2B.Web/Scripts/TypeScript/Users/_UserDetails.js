var UserDetails = /** @class */ (function () {
    function UserDetails() {
    }
    UserDetails.prototype.init = function () {
        this.assignEvents();
        this.initAutocomplete();
        $('#Role').multiselect({
            nonSelectedText: 'Wybierz uprawnienia',
            numberDisplayed: 1
        });
        setTimeout(function () {
            $('#Password, #Login').val('');
        }, 1000);
    };
    UserDetails.prototype.assignEvents = function () {
        $('#modalAddUser').on('hide.bs.modal', function () {
            $(this).find('input:text, textarea, input:password, input[type="hidden"]').val('');
            $('#Role').val('').multiselect("refresh");
            $(this).find('form').validate().resetForm();
            $('#Password').rules('add', 'required');
            $('#ConfirmPassword').rules('add', 'required');
            $('#IsActive').attr('checked', true);
        });
    };
    UserDetails.prototype.initAutocomplete = function () {
        $("#CustomerName").autocomplete({
            source: function (request, response) {
                $.getJSON("/Api/ApiCustomers/SearchCustomer", {
                    term: request.term
                }, response);
            },
            minLength: 0,
            select: function (event, ui) {
                $('#CustomerId').val(ui.item.CustomerId).trigger('change');
                $("#CustomerName").attr('data-tempValue', ui.item.label);
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
        $("#CustomerName").blur(function () {
            $("#CustomerName").val($("#CustomerName").attr('data-tempValue')).trigger('change');
        });
    };
    UserDetails.prototype.edit = function (userId) {
        $.ajax({
            url: '/Api/ApiUsers/GetUser',
            data: { id: userId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#FirstName').val(result.FirstName).trigger('change');
                $('#Surname').val(result.Surname).trigger('change');
                $('#Login').val(result.Login).trigger('change');
                $('#WelcomeText').val(result.WelcomeText).trigger('change');
                $('#Position').val(result.Position).trigger('change');
                $('#Boss').val(result.Boss).trigger('change');
                $('#Phone').val(result.Phone).trigger('change');
                $('#Region').val(result.Region).trigger('change');
                $('#Role').val(result.Role).trigger('change').multiselect('refresh');
                $('#CustomerName').val(result.CustomerName).attr('data-tempValue', result.CustomerName).trigger('change');
                $('#CustomerId').val(result.CustomerId).trigger('change');
                $('#RegionId').val(result.RegionId).trigger('change');
                $('#IsActive').prop('checked', result.IsActive);
                $('#BirthdayDate').val(result.BirthdayDate != null ? moment(result.BirthdayDate, utility.apiDateTimeFormat).format(utility.dateFormat) : '').trigger('change');
                $('#Id').val(result.Id);
                $('#Password').rules('remove', 'required');
                $('#ConfirmPassword').rules('remove', 'required');
                $('#Password').val('');
                $('#modalAddUser').modal();
            },
        });
    };
    UserDetails.prototype.save = function () {
        $('#formAddUser').validate();
        if ($('#formAddUser').valid()) {
            $.ajax({
                url: '/Api/ApiUsers/SaveUser',
                data: JSON.stringify($.extend(utility.getFormData($('#formAddUser')), {
                    Role: $('#Role').val()
                })),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (result) {
                    $('#modalAddUser').modal('hide');
                    usersList.loadList();
                },
            });
        }
    };
    return UserDetails;
}());
var userDetails = new UserDetails();
$(document).ready(function () {
    userDetails.init();
});
//# sourceMappingURL=_UserDetails.js.map