class LayoutMain {
    public init() {
        $('.datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }

        });

        $('.datepicker').datetimepicker({
            format: utility.dateFormat,
            locale: 'pl',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });
        $('.datepicker').on('dp.change', function () {
            $(this).trigger('change');
        });

        $('.monthpicker').datetimepicker({
            format: utility.monthFormat,
            locale: 'pl',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });
        $('.monthpicker').on('dp.change', function () {
            $(this).trigger('change');
        });

        $('.timepicker').datetimepicker({
            //          format: 'H:mm',    // use this format if you want the 24hours timepicker
            format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

        $('.weekpicker').datetimepicker({
            format: utility.dateFormat,
            locale: 'pl',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

        $('.weekpicker').on('dp.change', function () {
            if ($(this).attr('data-canChange') == '1') {
                let value = moment($(this).val());
                let startWeekDate = moment(value).startOf('week');
                let endWeekDate = moment(startWeekDate).add('days', 7);

                if (value != startWeekDate) {
                    $(this).data("DateTimePicker").date(startWeekDate.toDate());
                }
                $(this).siblings('.weekpickerHidden').val(startWeekDate.format(utility.dateFormat));

                $(this).val(endWeekDate.year() + '-' + startWeekDate.week());
            } else {
                $(this).data("DateTimePicker").date(moment($(this).siblings('.weekpickerHidden').val()));
            }
        }).on('dp.show', function () {
            $(this).attr('data-canChange', '1');
            let value = $(this).siblings('.weekpickerHidden').val() != ''
                ? moment($(this).siblings('.weekpickerHidden').val())
                : moment().add('days', 7);
            let startWeekDate = moment(value).startOf('week');
            let endWeekDate = moment(startWeekDate).add('days', 7);

            $(this).data("DateTimePicker").date(startWeekDate.toDate());
            $(this).val(endWeekDate.year() + '-' + startWeekDate.week());
        }).on('dp.hide', function () {
            $(this).attr('data-canChange', '0');

            let self = this;
            setTimeout(function () {
                if ($(self).val().length > 7) {
                    $(self).attr('data-canChange', '1');
                    $(self).trigger('dp.change');
                    $(self).attr('data-canChange', '0');
                }
            }, 50);
        });

        numeral.locale('pl');
        moment.locale('pl');

        $('[data-toggle="tooltip"]').tooltip(); //włączenie tooltipu w bootstrapie, domyślnie są wyłączone

        $(".touchSpin").each(function () {
            $(this).TouchSpin({
                verticalbuttons: true,
                initval: $(this).attr('data-initVal') != null ? $(this).attr('data-initVal') : '1',
                min: $(this).attr('data-min') != null ? parseFloat($(this).attr('data-min')) : 1,
                max: $(this).attr('data-max') != null ? parseFloat($(this).attr('data-max')) : 99,
                step: $(this).attr('data-step') != null ? parseFloat($(this).attr('data-step')) : 1,
                decimals: $(this).attr('data-decimals') != null ? parseInt($(this).attr('data-decimals')) : 0,
                forcestepdivisibility: $(this).attr('data-forcestepdivisibility') ? $(this).attr('data-forcestepdivisibility') : 'round'
            });
        });

        Dropzone.prototype.defaultOptions.dictCancelUpload = 'Anuluj';
        Dropzone.prototype.defaultOptions.dictRemoveFile = 'Usuń';
        Dropzone.prototype.defaultOptions.dictCancelUploadConfirmation = 'Anuluj';
        Dropzone.prototype.defaultOptions.dictDefaultMessage = 'Kliknij aby dodać';
        Dropzone.prototype.defaultOptions.dictFileTooBig = 'Plik ma zbyt duży rozmiar';
        Dropzone.prototype.defaultOptions.dictRemoveFileConfirmation = 'Czy na pewno chcesz usunąć ten plik?';
        Dropzone.prototype.defaultOptions.dictInvalidFileType = 'Błędny format pliku';
        Dropzone.prototype.defaultOptions.dictResponseError = 'Wystąpił nieoczekiwany błąd';

        tinymce.init({
            //encoding: "xml",
            selector: ".richTextBox",
            //theme: "modern",
            //plugins: [
            //    "advlist autolink lists link charmap preview hr",
            //    "searchreplace visualblocks code textcolor",
            //    "insertdatetime nonbreaking save table contextmenu directionality"
            //],
            valid_elements: '*[*]',
            //toolbar1: "undo redo | styleselect | bold italic | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | forecolor backcolor | preview",
            //menu: {
            //    edit: { title: 'Edit', items: 'undo redo  | selectall | searchreplace' },
            //    insert: { title: 'Insert', items: 'link | charmap hr insertdatetime nonbreaking' },
            //    view: { title: 'View', items: 'visualblocks visualaids | preview' },
            //    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
            //    table: { title: 'Table', items: 'inserttable tableprops deletetable | cell row column' },
            //    tools: { title: 'Tools', items: 'code' }
            //},
            resize: false,
            plugins: [
                " advlist anchor autolink colorpicker contextmenu fullscreen help image imagetools",
                " lists link media noneditable preview",
                " searchreplace table textcolor visualblocks wordcount"
            ],
            browser_spellcheck: true,
            toolbar:
                "insertfile a11ycheck undo redo | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
            nonbreaking_force_tab: true,
            file_picker_types: 'image',
            statusbar: false,
            height: 400,
            visual: true,
            language: 'pl',
            setup: function (ed) {
                ed.on('change', function (e) {
                    $('.richTextBox').each(function () {
                        var ed = tinymce.get($(this).attr('id'));
                        if (ed != null) {
                            $(this).val(ed.getContent());
                        }
                    });
                });
                ed.on('init', function (ed) {
                    $('.richTextBox').each(function () {
                        var ed = tinymce.get($(this).attr('id'));
                        if (ed != null && $(this).attr('dir')) {
                            ed.getBody().dir = $(this).attr('dir');
                        }
                    });
                });
            },
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');

                // Note: In modern browsers input[type="file"] is functional without 
                // even adding it to the DOM, but that might not be the case in some older
                // or quirky browsers like IE, so you might want to add it to the DOM
                // just in case, and visually hide it. And do not forget do remove it
                // once you do not need it anymore.

                input.onchange = function () {
                    var file = (<any>(this)).files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                        // Note: Now we need to register the blob in TinyMCEs image blob
                        // registry. In the next release this part hopefully won't be
                        // necessary, as we are looking to handle it internally.
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = (<any>reader.result).split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);

                        // call the callback and populate the Title field with the file name
                        cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };

                input.click();
            }
        });

        $(document).on('focusin', function (e) {
            if ($(e.target).closest(".mce-window").length) {
                e.stopImmediatePropagation();
            }
        });

        $('.autocompleteSearch, #SearchProductsForOffer').focus(function () {
            $(this).autocomplete("search", $(this).val());
        });
    }
}

let layoutMain = new LayoutMain();

$(document).ready(function () {
    layoutMain.init();
});
