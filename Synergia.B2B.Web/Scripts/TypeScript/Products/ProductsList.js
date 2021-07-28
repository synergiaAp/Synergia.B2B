var ProductsList = /** @class */ (function () {
    function ProductsList() {
        this.selectedGroupId = 2200;
    }
    ProductsList.prototype.init = function () {
        var _this = this;
        var urlParams = new URLSearchParams(window.location.search);
        if (localStorage.getItem('productSearch') != null && urlParams.has("groupId")) {
            $('#search').val(localStorage.getItem('productSearch'));
        }
        $('#btnBack').click(function () {
            _this.back();
        });
        this.loadList();
        $('#search').keyup(function () {
            clearTimeout(_this.searchTimeout);
            _this.searchTimeout = setTimeout(function () { return _this.loadList(); }, 300);
        });
        $('#productList').delegate('.addOfferElement', 'click', function () {
            offerDetails.addOfferElement($(this).attr('data-productId'));
        });
    };
    ProductsList.prototype.loadList = function () {
        var _this = this;
        localStorage.setItem('productSearch', $('#search').val());
        $.ajax({
            url: '/Api/ApiProducts/GetProducts',
            data: { groupId: this.selectedGroupId, search: $('#search').val() },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#productList').empty();
                for (var i = 0; i < result.length; i++) {
                    var templateProductItem = null;
                    if (result[i].IsGroup) {
                        templateProductItem = $($('#templateGroupItem').html());
                        $(templateProductItem).find('.card-title a, .card-image a').attr('href', 'javascript:productsList.changeSelectedGroup(' + result[i].Id + ');');
                    }
                    else {
                        templateProductItem = $($('#templateProductItem').html());
                        $(templateProductItem).find('.card-description').text(result[i].Name);
                        $(templateProductItem).find('.card-title a, .card-image a').attr('href', '/Products/ProductDetails/' + result[i].Id);
                        $(templateProductItem).find('.addOfferElement').attr('data-productId', result[i].Id);
                    }
                    $(templateProductItem).find('.card-title a').text(result[i].Code);
                    //let maxlength = 28;
                    //let code = result[i].Code.length > maxlength ? result[i].Code.substring(0, maxlength) + '...' : result[i].Code;
                    //$(templateProductItem).find('.card-title a').text(code);
                    if (result[i].FileName != null) {
                        $(templateProductItem).find('img').attr('src', '/Files/GetFile?fileName=' + result[i].FileName);
                    }
                    $(templateProductItem).appendTo('#productList');
                    if ($('#search').val() == '') {
                        _this.prevGroupId = result[i].ParentParentId;
                    }
                }
                if (_this.selectedGroupId == 2200) {
                    $('#btnBack').addClass('invisible');
                }
                else {
                    $('#btnBack').removeClass('invisible');
                }
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
    };
    ProductsList.prototype.changeSelectedGroup = function (groupId) {
        this.prevGroupId = this.selectedGroupId;
        this.selectedGroupId = groupId;
        window.history.pushState(null, null, '?groupId=' + this.selectedGroupId.toString());
        this.loadList();
    };
    ProductsList.prototype.back = function () {
        if ($('#search').val() != '') {
            $('#search').val('');
            this.selectedGroupId = 2200;
        }
        else {
            this.selectedGroupId = this.prevGroupId;
        }
        window.history.pushState(null, null, '?groupId=' + this.selectedGroupId.toString());
        this.loadList();
    };
    return ProductsList;
}());
var productsList = new ProductsList();
$(document).ready(function () {
    productsList.init();
});
//# sourceMappingURL=ProductsList.js.map