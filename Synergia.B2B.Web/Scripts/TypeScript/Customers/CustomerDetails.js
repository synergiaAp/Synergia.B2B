var CustomerDetails = /** @class */ (function () {
    function CustomerDetails() {
        this.customerId = -2;
    }
    CustomerDetails.prototype.init = function () {
        //this.hoodOfferId = $('#HoodOfferId').val();
        this.customerId = $('#Id').val();
        //this.activeOfferId = offerDetails.getActiveOfferId();
        debugger;
        //User user = GetLoggedUser();
        this.reloadAllDataForLoggedUser();
        this.loadUserListForCustomer();
        setTimeout(function () {
            $('.touchSpin').closest('.touchSpinWrapper').removeClass('invisible');
        }, 100);
        $('#search').hide();
        $('#clearSearch').hide();
    };
    CustomerDetails.prototype.reloadAllDataForLoggedUser = function () {
        //gthis.productIdHistory.push(productId);
        //this.customerId = customerId;
        debugger;
        //if (this.customerId < 0) {
        //    this.loadCustomerDetailsForLoggedUser();
        //}
        //else {
        //    this.loadCustomerDetailsByCustomerId();
        //}
        debugger;
        this.loadCustomerDetailsForLoggedUser();
        //this.loadCustomerDetailsByCustomerId();
        //this.loadAccessories();
        $('a[href="#pillAccessories"]').tab('show');
    };
    //public loadProductDetails() {
    //    $.ajax({
    //        url: '/Api/ApiProducts/GetProductDetails',
    //        data: { productId: this.productId },  //id to parametr metody GetUser z Web servisu API
    //        dataType: 'json',
    //        contentType: 'application/json; charset=utf-8',
    //        type: 'GET',
    //        success: (result) => {
    //            $('#productName').text(result.Name);
    //            $('#productCode').text(result.Code);
    //            $('#productGroup').text(result.GroupCode);
    //            $('#productLine').text(result.Line);
    //            $('#productModel').text(result.Model);
    //            $('#productTerminal').text(result.Terminal);
    //            $('#productPowerGas').text(result.PowerGas);
    //            $('#productPowerElectricity').text(result.PowerElectricity);
    //            $('#productDimensions').text(result.Dimensions);
    //            $('#productMark').text(result.Mark);
    //            if (result.Photo1 != null) {
    //                $('#productPhoto').attr('src', '/Files/GetFile?fileName=' + result.Photo1);
    //            }
    //            this.groupId = result.GroupId;
    //        },
    //    });
    //}
    CustomerDetails.prototype.loadCustomerDetailsForLoggedUser = function () {
        $.ajax({
            url: '/Api/ApiCustomers/GetCustomerDetailsForLoggedUser',
            data: { customerId: this.customerId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Name').val(result.Name).trigger('change');
                $('#Address').val(result.Address).trigger('change');
                $('#City').val(result.City).trigger('change');
                $('#NIP').val(result.NIP).trigger('change');
                $('#Regon').val(result.REGON).trigger('change');
                $('#Email').val(result.Email).trigger('change');
                $('#OrderCurrency').val(result.OrderCurrency).trigger('change');
                $('#Currency1').val(result.OrderCurrency).trigger('change');
                $('#Currency2').val(result.OrderCurrency).trigger('change');
                $('#Currency3').val(result.OrderCurrency).trigger('change');
                $('#Currency4').val(result.OrderCurrency).trigger('change');
                $('#Currency5').val(result.OrderCurrency).trigger('change');
                //$('#TransportFree').val(utility.toDecimal(result.TransportFree)).trigger('change');
                //$('#TransportFree2').val(utility.toDecimal(result.TransportFree)).trigger('change');
                //$('#TransportCost').val(utility.toDecimal(result.TransportCost)).trigger('change');
                //$('#TransportMin').val(utility.toDecimal(result.TransportFree / 2)).trigger('change');
                //$('#TransportMin2').val(utility.toDecimal(result.TransportFree / 2)).trigger('change');
                //$('#LimitValue').val(result.LimitValue).trigger('change');
                $('#LimitValue').val(utility.toDecimal(result.LimitValue)).trigger('change');
                //$('#Receivables').val(result.Receivables).trigger('change');
                $('#ReceivablesPLN').val(utility.toDecimal(result.ReceivablesPLN)).trigger('change');
                $('#ReceivablesEUR').val(utility.toDecimal(result.ReceivablesWAL)).trigger('change');
                $('#PaymentFormName').val(result.PaymentFormName).trigger('change');
            },
        });
    };
    CustomerDetails.prototype.loadCustomerDetailsByCustomerId = function () {
        $.ajax({
            url: '/Api/ApiCustomers/GetCustomerDetailsByCustomerId',
            data: { customerId: this.customerId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Name').val(result.Name).trigger('change');
                $('#Address').val(result.Address).trigger('change');
                $('#City').val(result.City).trigger('change');
                $('#NIP').val(result.NIP).trigger('change');
                $('#Regon').val(result.REGON).trigger('change');
                $('#Email').val(result.Email).trigger('change');
                $('#OrderCurrency').val(result.OrderCurrency).trigger('change');
                $('#Currency1').val(result.OrderCurrency).trigger('change');
                $('#Currency2').val(result.OrderCurrency).trigger('change');
                $('#Currency3').val(result.OrderCurrency).trigger('change');
                $('#Currency4').val(result.OrderCurrency).trigger('change');
                $('#Currency5').val(result.OrderCurrency).trigger('change');
                //$('#TransportFree').val(utility.toDecimal(result.TransportFree)).trigger('change');
                //$('#TransportFree2').val(utility.toDecimal(result.TransportFree)).trigger('change');
                //$('#TransportCost').val(utility.toDecimal(result.TransportCost)).trigger('change');
                //$('#TransportMin').val(utility.toDecimal(result.TransportFree / 2)).trigger('change');
                //$('#TransportMin2').val(utility.toDecimal(result.TransportFree / 2)).trigger('change');
                //$('#LimitValue').val(result.LimitValue).trigger('change');
                $('#LimitValue').val(utility.toDecimal(result.LimitValue)).trigger('change');
                //$('#Receivables').val(result.Receivables).trigger('change');
                $('#ReceivablesPLN').val(utility.toDecimal(result.ReceivablesPLN)).trigger('change');
                $('#ReceivablesEUR').val(utility.toDecimal(result.ReceivablesWAL)).trigger('change');
                $('#PaymentFormName').val(result.PaymentFormName).trigger('change');
            },
        });
    };
    CustomerDetails.prototype.loadUserListForCustomer = function () {
        if (!this.list) {
            this.list = $('#userstable').DataTable({
                "scrollY": "190px",
                scrollCollapse: true,
                order: [[0, 'asc']],
                searching: false,
                //"paging": false,
                dom: 'Pfrt',
                ajax: {
                    type: 'GET',
                    data: { customerId: this.customerId },
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiUsers/GridGetUsersForCustomer',
                },
                columns: [
                    {
                        data: 'FirstName', // nazwy zwracane z procedury SQL
                    },
                    {
                        data: 'Surname',
                    },
                    //{
                    //    data: 'Login',
                    //},
                    //{
                    //    data: 'RoleText',
                    //},
                    //{
                    //    //data: 'WelcomeText',
                    //    render: (data, type, row, meta) => {
                    //        if (row.WelcomeText != null) {
                    //            let maxlength = 50;
                    //            return '<span title="' + row.WelcomeText.replaceAll('"', '') + '"data-toggle="tooltip">'
                    //                + (row.WelcomeText.length > maxlength ? row.WelcomeText.substring(0, maxlength) + '...' : row.WelcomeText) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                    //        }
                    //        else {
                    //            return '';
                    //        }
                    //    },
                    //},
                    //{
                    //    data: 'StatusText',
                    //},
                    //{
                    //    render: (data, type, row, meta) => {
                    //        return row.BirthdayDate != null ? moment(row.BirthdayDate, utility.apiDateTimeFormat).format(utility.dateFormat) : '';
                    //    },
                    //    className: 'text-center',
                    //},
                    //{
                    //    render: (data, type, row, meta) => {
                    //        if (row.CustomerName != null) {
                    //            let maxlength = 35;
                    //            return '<span title="' + row.CustomerName.replaceAll('"', '') + '"data-toggle="tooltip">'
                    //                + (row.CustomerName.length > maxlength ? row.CustomerName.substring(0, maxlength) + '...' : row.CustomerName) + '</span>'; // do zamieniania ciapków służy w Utility w TS ReplaceAll
                    //        }
                    //        else {
                    //            return '';
                    //        }
                    //    },
                    //    //data: 'CustomerName',
                    //    width: '200px',
                    //},
                ],
                initComplete: function () {
                    $('#userstable').show();
                },
                drawCallback: function () {
                    $('[data-toggle="tooltip"]').tooltip();
                },
                responsive: true
            });
        }
        else {
            this.list.ajax.reload();
        }
    };
    return CustomerDetails;
}());
var customerDetails = new CustomerDetails();
$(document).ready(function () {
    customerDetails.init();
});
//# sourceMappingURL=CustomerDetails.js.map