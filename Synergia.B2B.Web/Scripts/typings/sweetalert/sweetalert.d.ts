// Type definitions for SweetAlert 1.1.3
// Project: https://github.com/t4t5/sweetalert/
// Definitions by: Markus Peloso <https://github.com/ToastHawaii/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare var sweetAlert: SweetAlert.SweetAlertStatic;
declare var swal: SweetAlert.SweetAlertStatic;

declare module "sweetalert" {
    export = swal;
}

declare namespace SweetAlert {
    type AlertType = "warning" | "error" | "success" | "info" | "question";

    type PromtType = "input" | "prompt";
type SweetAlertType = 'success' | 'error' | 'warning' | 'info' | 'question' | undefined;

    type SweetAlertInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'url' | undefined;

   type SweetAlertInputOptions = { [inputValue: string]: string };

    type SweetAlertInputAttributes = { [attribute: string]: string };


    interface SettingsBase {
        /**
         * The title of the modal, as HTML.
         * It can either be added to the object under the key "title" or passed as the first parameter of the function.
         *
         * @default null
         */
        title?: string;

        /**
         * The title of the modal, as text. Useful to avoid HTML injection.
         *
         * @default null
         */
        titleText?: string;

        /**
         * A description for the modal.
         * It can either be added to the object under the key "text" or passed as the second parameter of the function.
         *
         * @default null
         */
        text?: string;

        /**
         * A HTML description for the modal.
         * If "text" and "html" parameters are provided in the same time, "text" will be used.
         *
         * @default null
         */
        html?: string | JQuery;

        /**
         * The type of the modal.
         * SweetAlert2 comes with 5 built-in types which will show a corresponding icon animation: warning, error, success, info and question.
         * It can either be put in the array under the key "type" or passed as the third parameter of the function.
         *
         * @default null
         */
        type?: SweetAlertType;

        /**
         * The container element for adding modal into (query selector only).
         *
         * @default 'body'
         */
        target?: string;

        /**
         * Input field type, can be text, email, password, number, tel, range, textarea, select, radio, checkbox, file and url.
         *
         * @default null
         */
        input?: SweetAlertInputType;

        /**
         * Modal window width, including paddings (box-sizing: border-box). Can be in px or %.
         *
         * @default '500px'
         */
        width?: number | string;

        /**
         * Modal window padding.
         *
         * @default 20
         */
        padding?: number;

        /**
         * Modal window background (CSS background property).
         *
         * @default '#fff'
         */
        background?: string;

        /**
         * A custom CSS class for the modal.
         *
         * @default null
         */
        customClass?: string;

        /**
         * Auto close timer of the modal. Set in ms (milliseconds).
         *
         * @default null
         */
        timer?: number;

        /**
         * If set to false, modal CSS animation will be disabled.
         *
         * @default true
         */
        animation?: boolean;

        /**
         * If set to false, the user can't dismiss the modal by clicking outside it.
         *
         * @default true
         */
        allowOutsideClick?: boolean;

        /**
         * If set to false, the user can't dismiss the modal by pressing the Escape key.
         *
         * @default true
         */
        allowEscapeKey?: boolean

        /**
         * If set to false, the user can't confirm the modal by pressing the Enter or Space keys,
         * unless they manually focus the confirm button.
         *
         * @default true
         */
        allowEnterKey?: boolean;

        /**
         * If set to false, a "Confirm"-button will not be shown.
         * It can be useful when you're using custom HTML description.
         *
         * @default true
         */
        showConfirmButton?: boolean;

        /**
         * If set to true, a "Cancel"-button will be shown, which the user can click on to dismiss the modal.
         *
         * @default false
         */
        showCancelButton?: boolean;

        /**
         * Use this to change the text on the "Confirm"-button.
         *
         * @default 'OK'
         */
        confirmButtonText?: string;

        /**
         * Use this to change the text on the "Cancel"-button.
         *
         * @default 'Cancel'
         */
        cancelButtonText?: string;

        /**
         * Use this to change the background color of the "Confirm"-button (must be a HEX value).
         *
         * @default '#3085d6'
         */
        confirmButtonColor?: string;

        /**
         * Use this to change the background color of the "Cancel"-button (must be a HEX value).
         *
         * @default '#aaa'
         */
        cancelButtonColor?: string;

        /**
         * A custom CSS class for the "Confirm"-button.
         *
         * @default null
         */
        confirmButtonClass?: string;

        /**
         * A custom CSS class for the "Cancel"-button.
         *
         * @default null
         */
        cancelButtonClass?: string;

        /**
         * Use this to change the aria-label for the "Confirm"-button.
         *
         * @default ''
         */
        confirmButtonAriaLabel?: string;

        /**
         * Use this to change the aria-label for the "Cancel"-button.
         *
         * @default ''
         */
        cancelButtonAriaLabel?: string;

        /**
         * Whether to apply the default swal2 styling to buttons.
         * If you want to use your own classes (e.g. Bootstrap classes) set this parameter to false.
         *
         * @default true
         */
        buttonsStyling?: boolean;

        /**
         * Set to true if you want to invert default buttons positions.
         *
         * @default false
         */
        reverseButtons?: boolean;

        /**
         * Set to false if you want to focus the first element in tab order instead of "Confirm"-button by default.
         *
         * @default true
         */
        focusConfirm?: boolean;

        /**
         * Set to true if you want to focus the "Cancel"-button by default.
         *
         * @default false
         */
        focusCancel?: boolean;

        /**
         * Set to true to show close button in top right corner of the modal.
         *
         * @default false
         */
        showCloseButton?: boolean;

        /**
         * Use this to change the `aria-label` for the close button.
         *
         * @default 'Close this dialog'
         */
        closeButtonAriaLabel?: string;

        /**
         * Set to true to disable buttons and show that something is loading. Useful for AJAX requests.
         *
         * @default false
         */
        showLoaderOnConfirm?: boolean;

        /**
         * Function to execute before confirm, should return Promise.
         *
         * ex.
         *   swal({
         *    title: 'Multiple inputs',
         *    html:
         *      '<input id="swal-input1" class="swal2-input">' +
         *      '<input id="swal-input2" class="swal2-input">',
         *    focusConfirm: false,
         *    preConfirm: () => Promise.resolve([$('#swal-input1').val(), $('#swal-input2').val()])
         *  }).then(result => swal(JSON.stringify(result));
         *
         * @default null
         */
        preConfirm?: (inputValue: any) => Promise<any>;

        /**
         * Add a customized icon for the modal. Should contain a string with the path or URL to the image.
         *
         * @default null
         */
        imageUrl?: string;

        /**
         * If imageUrl is set, you can specify imageWidth to describes image width in px.
         *
         * @default null
         */
        imageWidth?: number;

        /**
         * If imageUrl is set, you can specify imageHeight to describes image height in px.
         *
         * @default null
         */
        imageHeight?: number;

        /**
         * An alternative text for the custom image icon.
         *
         * @default ''
         */
        imageAlt?: string;

        /**
         * A custom CSS class for the customized icon.
         *
         * @default null
         */
        imageClass?: string;

        /**
         * Input field placeholder.
         *
         * @default ''
         */
        inputPlaceholder?: string;

        /**
         * Input field initial value.
         *
         * @default ''
         */
        inputValue?: any;

        /**
         * If input parameter is set to "select" or "radio", you can provide options.
         * Object keys will represent options values, object values will represent options text values.
         */
        inputOptions?: SweetAlertInputOptions | Promise<SweetAlertInputOptions>;

        /**
         * Automatically remove whitespaces from both ends of a result string.
         * Set this parameter to false to disable auto-trimming.
         *
         * @default true
         */
        inputAutoTrim?: boolean;

        /**
         * HTML input attributes (e.g. min, max, step, accept...), that are added to the input field.
         *
         * ex.
         *   swal({
         *     title: 'Select a file',
         *     input: 'file',
         *     inputAttributes: {
         *       accept: 'image/*'
         *     }
         *   })
         *
         * @default null
         */
        inputAttributes?: SweetAlertInputAttributes;

        /**
         * Validator for input field, should return a Promise.
         *
         * ex.
         *   swal({
         *     title: 'Select color',
         *     input: 'radio',
         *     inputValidator: result => new Promise((resolve, reject) => {
         *       result ? resolve() : reject('You need to select something!');
         *     })
         *   })
         *
         * @default null
         */
        inputValidator?: (result: any) => Promise<void>;

        /**
         * A custom CSS class for the input field.
         *
         * @default null
         */
        inputClass?: string;

        /**
         * Progress steps, useful for modal queues, see usage example.
         *
         * @default []
         */
        progressSteps?: string[];

        /**
         * Current active progress step.
         *
         * @default swal.getQueueStep()
         */
        currentProgressStep?: string;

        /**
         * Distance between progress steps.
         *
         * @default '40px'
         */
        progressStepsDistance?: string;

        /**
         * Function to run when modal built, but not shown yet. Provides modal DOM element as the first argument.
         *
         * @default null
         */
        onBeforeOpen?: (modalElement: HTMLElement) => void;

        /**
         * Function to run when modal opens, provides modal DOM element as the first argument.
         *
         * @default null
         */
        onOpen?: (modalElement: HTMLElement) => void;

        /**
         * Function to run when modal closes, provides modal DOM element as the first argument.
         *
         * @default null
         */
        onClose?: (modalElement: HTMLElement) => void;

        /**
         * Determines whether dismissals (outside click, cancel button, close button, esc key) should reject, or resolve with an object of the format `{ dismiss: reason }`.
         * Set it to `false` to get a cleaner control flow when using `await`, as explained here: https://github.com/limonte/sweetalert2/issues/485
         *
         * @default true
         */
        useRejections?: boolean;
    }

    interface AlertModalSettings extends SettingsBase {
        /**
         * The type of the modal. SweetAlert comes with 4 built-in types which will show a corresponding icon animation: "warning", "error", "success" and "info". You can also set it as "input" to get a prompt modal.
         * Default: null
         */
        type?: AlertType;
    }

    interface PromtModalSettings extends SettingsBase {
        /**
         * The type of the modal.
         * SweetAlert2 comes with 5 built-in types which will show a corresponding icon animation: warning, error, success, info and question.
         * It can either be put in the array under the key "type" or passed as the third parameter of the function.
         *
         * @default null
         */
        type?: SweetAlertType;

        /**
         * Change the type of the input field when using type: "input" (this can be useful if you want users to type in their password for example).
         * Default: "text"
         */
        inputType?: string;

        /**
         * When using the input-type, you can specify a placeholder to help the user.
         * Default: null
         */
        inputPlaceholder?: string;

        /**
         * Specify a default text value that you want your input to show when using type: "input"
         * Default: null
         */
        inputValue?: string;
    }

    interface Settings {
        /**
         * The title of the modal.
         */
        title: string;
    }

    interface SetDefaultsSettings {
        /**
         * The title of the modal.
         * Default: null
         */
        title?: string;
    }

    interface SweetAlertStatic {
        /**
         * SweetAlert automatically centers itself on the page and looks great no matter if you're using a desktop computer, mobile or tablet. An awesome replacement for JavaScript's alert.
         * @param title The title of the modal.
         */
        (title: string): Promise<any>;

        /**
         * SweetAlert automatically centers itself on the page and looks great no matter if you're using a desktop computer, mobile or tablet. An awesome replacement for JavaScript's alert.
         * @param title The title of the modal.
         * @param text A description for the modal.
         */
        (title: string, text: string): Promise<any>;

        /**
         * SweetAlert automatically centers itself on the page and looks great no matter if you're using a desktop computer, mobile or tablet. An awesome replacement for JavaScript's alert.
         * @param title The title of the modal.
         * @param text A description for the modal.
         * @param type The type of the modal. SweetAlert comes with 4 built-in types which will show a corresponding icon animation: "warning", "error", "success" and "info". You can also set it as "input" to get a prompt modal.
         */
        (title: string, text: string, type: AlertType | PromtType): Promise<any>;

        /**
         * SweetAlert automatically centers itself on the page and looks great no matter if you're using a desktop computer, mobile or tablet. An awesome replacement for JavaScript's alert.
         * @param callback The callback from the users action. The value is true or false if the user confirms or cancels the alert.
         */
        (settings: Settings & AlertModalSettings, callback?: (isConfirm: boolean) => any): Promise<any>;

        /**
         * SweetAlert automatically centers itself on the page and looks great no matter if you're using a desktop computer, mobile or tablet. An awesome replacement for JavaScript's alert.
         * @param callback The callback from the users action. When the user confirms the prompt, the argument contains the value of the input element. When the user cancels the prompt, the argument is false.
         */
        (settings: Settings & PromtModalSettings, callback?: (isConfirmOrInputValue: boolean | string) => any): Promise<any>;

        /**
         * If you end up using a lot of the same settings when calling SweetAlert, you can use setDefaults at the start of your program to set them once and for all!
         */
        setDefaults(settings: SetDefaultsSettings & AlertModalSettings & PromtModalSettings): void;

        /**
         * Close the currently open SweetAlert programmatically.
         */
        close(): void;

        /**
         * Show an error message after validating the input field, if the user's data is bad.
         */
        showInputError(errorMessage: string): void;

        /**
         * Enable the user to click on the cancel and confirm buttons.
         */
        enableButtons(): void;

        /**
         * Disable the user to click on the cancel and confirm buttons.
         */
        disableButtons(): void;
    }
}
