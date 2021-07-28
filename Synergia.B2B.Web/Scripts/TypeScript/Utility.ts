class Utility {
    public apiDateTimeFormat: string = 'YYYY-MM-DD HH:mm:ss';
    public dateFormat: string = 'YYYY-MM-DD';
    public monthFormat: string = 'YYYY MMMM';
    public showNotification(from, align, message, type, timerValue: number = 7000) {
        //let type =['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

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
    }

    public showBirthdayNotification(birthdayTextSmall: string, birthdayTextBig: string) {
        swal({
            title: birthdayTextBig,
            text: birthdayTextSmall,
            imageUrl: '/Images/birthday.png',
            imageWidth: 300,
            imageHeight: 300,
            confirmButtonText: 'Zamknij'

        });
        Cookies.set('BirthdayMessageShown', '', { expires: 1 }) // Dodaje cookies z BirthdayMessage, że został pokazany
    }

    public toCurrency(value: string | number): string {
        return numeral(value).format('0,0.00') + ' zł';
    }

    public toDate(value: string): string {
        if (value != null && value != "") {
            return moment(value).format('L');
        }
        else {
            return "";
        }
    }

    public toDateTime(value: string): string {
        if (value != null && value != "") {
            return moment(value).format('L LT');
        }
        else {
            return "";
        }
    }

    public toDecimal(value: string | number): string {
        if (value != null && value !== '') {
            return numeral(value).format('0,0.00');
        }
        return '';
    }

    public toApiDecimal(value: string | number): string {
        return numeral(value).format('0.00').replace(',', '.');
    }

    public toInt(value: string | number): string {
        if (value != null && value != '') {
            return numeral(value).format('0,0');
        }
        return '';
    }

    public showSuccess(message: string = 'Operacja zakończona sukcesem') {
        swal({
            title: '',
            text: message,
            showConfirmButton: false,
            type: 'success',
            timer: 1500,
        });
    }

    public showError(message: string = "Wystąpił nieoczekiwany błąd") {
        if (message == null || message == '') {
            message = "Wystąpił nieoczekiwany błąd";
        }

        swal({
            title: '',
            text: message,
            type: 'error',
            confirmButtonText: 'Zamknij',
        });
    }

    public showQuestion(message: string, okFunction?: Function) {
        swal({
            title: '',
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tak',
            cancelButtonText: 'Nie',
        }).then(() => {
            if (okFunction) {
                okFunction();
            }
        });
    }

    public getFormData(form) {
        form.find(':disabled').addClass('disabled').removeAttr('disabled');

        var unindexed_array = form.serializeArray();
        var indexed_array = {};

        form.find('.disabled').removeClass('disabled').attr('disabled', true);

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    public enableSelectPickers(elements: JQuery) {
        elements.each(function () {
            $(this).parent().removeAttr('disabled');
            $(this).parent().children('button').removeAttr('disabled');
        });
    }
}

let utility = new Utility();
let tinymce: any;


interface String {
    replaceAll: (search: string, replacement: string) => string;
}


String.prototype.replaceAll = function (search: string, replacement: string) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

