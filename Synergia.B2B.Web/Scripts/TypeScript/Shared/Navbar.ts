class Navbar {
    public init() {
        $('#clearSearch').click(function () {
            $('#search').val('').trigger('keyup');
        });
    }
}

let navbar = new Navbar();
$(document).ready(function () {
    navbar.init();
});