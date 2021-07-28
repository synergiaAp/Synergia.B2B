var Utility = /** @class */ (function () {
    function Utility() {
        this.apiDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
        this.dateFormat = 'YYYY-MM-DD';
        this.monthFormat = 'YYYY MMMM';
    }
    Utility.prototype.showNotification = function (from, align, message, type, timerValue) {
        //let type =['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
        if (timerValue === void 0) { timerValue = 7000; }
        //let color = Math.floor((Math.random() * 6) + 1);
        $.notify({
            icon: "notifications",
            message: message
        }, {
            type: type,
            timer: timerValue,
            placement: {
                from: from,
                align: align
            }
        });
    };
    Utility.prototype.showBirthdayNotification = function (birthdayTextSmall, birthdayTextBig) {
        swal({
            title: birthdayTextBig,
            text: birthdayTextSmall,
            imageUrl: '/Images/birthday.png',
            imageWidth: 300,
            imageHeight: 300,
            confirmButtonText: 'Zamknij'
        });
        Cookies.set('BirthdayMessageShown', '', { expires: 1 }); // Dodaje cookies z BirthdayMessage, że został pokazany
    };
    Utility.prototype.toCurrency = function (value) {
        return numeral(value).format('0,0.00') + ' zł';
    };
    Utility.prototype.toDate = function (value) {
        if (value != null && value != "") {
            return moment(value).format('L');
        }
        else {
            return "";
        }
    };
    Utility.prototype.toDateTime = function (value) {
        if (value != null && value != "") {
            return moment(value).format('L LT');
        }
        else {
            return "";
        }
    };
    Utility.prototype.toDecimal = function (value) {
        if (value != null && value !== '') {
            return numeral(value).format('0,0.00');
        }
        return '';
    };
    Utility.prototype.toApiDecimal = function (value) {
        return numeral(value).format('0.00').replace(',', '.');
    };
    Utility.prototype.toInt = function (value) {
        if (value != null && value != '') {
            return numeral(value).format('0,0');
        }
        return '';
    };
    Utility.prototype.showSuccess = function (message) {
        if (message === void 0) { message = 'Operacja zakończona sukcesem'; }
        swal({
            title: '',
            text: message,
            showConfirmButton: false,
            type: 'success',
            timer: 1500,
        });
    };
    Utility.prototype.showError = function (message) {
        if (message === void 0) { message = "Wystąpił nieoczekiwany błąd"; }
        if (message == null || message == '') {
            message = "Wystąpił nieoczekiwany błąd";
        }
        swal({
            title: '',
            text: message,
            type: 'error',
            confirmButtonText: 'Zamknij',
        });
    };
    Utility.prototype.showQuestion = function (message, okFunction) {
        swal({
            title: '',
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(function () {
            if (okFunction) {
                okFunction();
            }
        });
    };
    Utility.prototype.getFormData = function (form) {
        form.find(':disabled').addClass('disabled').removeAttr('disabled');
        var unindexed_array = form.serializeArray();
        var indexed_array = {};
        form.find('.disabled').removeClass('disabled').attr('disabled', true);
        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    };
    Utility.prototype.enableSelectPickers = function (elements) {
        elements.each(function () {
            $(this).parent().removeAttr('disabled');
            $(this).parent().children('button').removeAttr('disabled');
        });
    };
    return Utility;
}());
var utility = new Utility();
var tinymce;
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
//# sourceMappingURL=Utility.js.map