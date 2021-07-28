var Navbar = /** @class */ (function () {
    function Navbar() {
    }
    Navbar.prototype.init = function () {
        $('#clearSearch').click(function () {
            $('#search').val('').trigger('keyup');
        });
    };
    return Navbar;
}());
var navbar = new Navbar();
$(document).ready(function () {
    navbar.init();
});
//# sourceMappingURL=Navbar.js.map