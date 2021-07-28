var ProductDetails = /** @class */ (function () {
    function ProductDetails() {
        this.productIdHistory = [];
    }
    ProductDetails.prototype.init = function () {
        var _this = this;
        $('a[href="#pillAccessories"]').on('shown.bs.tab', function (e) {
            productDetails.accessoriesList.columns.adjust();
        });
        $('a[href="#pillParts"]').on('shown.bs.tab', function (e) {
            productDetails.partsList.columns.adjust();
        });
        $('#btnBack').removeClass('invisible');
        $('#btnBack').click(function () {
            _this.back();
        });
        $('.addOfferElement').click(function () {
            offerDetails.addOfferElement(_this.productId, parseInt($('#offerElementsCount').val()));
        });
        this.reloadAllData(this.productId);
        setTimeout(function () {
            $('.touchSpin').closest('.touchSpinWrapper').removeClass('invisible');
        }, 100);
    };
    ProductDetails.prototype.reloadAllData = function (productId) {
        this.productIdHistory.push(productId);
        this.productId = productId;
        this.loadProductDetails();
        //moje---
        this.loadProductDetailsPrice();
        this.loadProductDetailsCurrency();
        //this.loadProductDetails3();
        //---
        this.loadAccessories();
        this.loadParts();
        this.loadDocuments();
        $('a[href="#pillDocuments"]').tab('show');
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
    ProductDetails.prototype.loadProductDetails = function () {
        var _this = this;
        $.ajax({
            url: '/Api/ApiProducts/GetProductDetails',
            data: { productId: this.productId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#Name').val(result.Name).trigger('change');
                $('#Code').val(result.Code).trigger('change');
                $('#Group').val(result.GroupCode).trigger('change');
                //$('#Line').val(result.Line).trigger('change');
                //$('#Model').val(result.Model).trigger('change');
                //$('#Terminal').val(result.Terminal).trigger('change');
                //$('#PowerGas').val(result.PowerGas).trigger('change');
                //$('#PowerElectricity').val(result.PowerElectricity).trigger('change');
                $('#Currency').val(result.Currencu).trigger('change');
                $('#Um').val(result.Um).trigger('change');
                $('#Weight').val(result.Weight).trigger('change');
                $('#ProdPack').val(result.ProdPack).trigger('change');
                $('#ProdQuantityDesc').val(result.ProdQuantityDesc).trigger('change');
                $('#Dimensions').val(result.Dimensions).trigger('change');
                //$('#PriceNet').val(utility.toCurrency(result.PriceNet)).trigger('change');
                if (result.Photo1 != null) {
                    $('#productPhoto').attr('src', '/Files/GetFile?fileName=' + result.Photo1);
                }
                _this.groupId = result.GroupId;
            },
        });
    };
    //moje
    ProductDetails.prototype.loadProductDetailsPrice = function () {
        $.ajax({
            url: '/Api/ApiProducts/GetProductDetailsPrice',
            data: { productId: this.productId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                $('#PriceNet').val(utility.toDecimal(result)).trigger('change');
                //$('#Name').val(result.Name).trigger('change');
                //$('#Code').val(result.Code).trigger('change');
                //$('#PriceNet').val(utility.toCurrency(result.PriceNet)).trigger('change');
                //$('#PriceNet').val(utility.toCurrency("22")).trigger('change');
                //$('#PriceNet').val(utility.toCurrency(result)).trigger('change');
                //var res1 = utility.toDecimal(result);
                //var temp = result.replace(/[^0-9.-]+/g, ""); 
                //var temp = result.replace(",", "."); 
                //var temp = result;
                //var res1 = parseFloat(temp);
                //var res2 = Math.round(res1); //res1.toFixed(2);
                //var res3 = temp*2;
                //var res3 = res1 + (res1 * 10/100);//this.percSurcharge;
                //var res2 = res1 * 2;
                //if ($('#Unpacking').is(':checked')) {
                //result = parseFloat(result).toString();// * 2;
                //result = this.percSurcharge*result.float();
                //result = "5"
                //result = res1
                //$('#PriceNet').val(utility.toDecimal(result)).trigger('change');
                //$('#PriceNet').val(utility.toDecimal(result)).trigger('change');
                //}
                //else {
                //result = "10"
                //    $('#PriceNet').val(utility.toDecimal(result)).trigger('change');
                // }
                //$('#PriceNet').val(utility.toDecimal(result)).trigger('change');
                //this.groupId = result2.GroupId;
            },
        });
    };
    ProductDetails.prototype.loadProductDetailsCurrency = function () {
        $.ajax({
            url: '/Api/ApiProducts/GetProductDetailsCurrency',
            data: { productId: this.productId },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            success: function (result) {
                //$('#Name').val(result.Name).trigger('change');
                //$('#Code').val(result.Code).trigger('change');
                //$('#PriceNet').val(utility.toCurrency(result.PriceNet)).trigger('change');
                //$('#PriceNet').val(utility.toCurrency("22")).trigger('change');
                //$('#PriceNet').val(utility.toCurrency(result)).trigger('change');
                $('#Currency').val(result).trigger('change');
                //this.groupId = result2.GroupId;
            },
        });
    };
    //------------ koniec moje
    ProductDetails.prototype.back = function () {
        if (this.productIdHistory.length > 1) {
            this.productIdHistory.pop();
            var productId = this.productIdHistory.pop();
            this.reloadAllData(productId);
        }
        else {
            location.href = '/Products/Index?groupId=' + this.groupId;
        }
    };
    ProductDetails.prototype.loadAccessories = function () {
        var _this = this;
        if (!this.accessoriesList) {
            this.accessoriesList = $('#accessoriesTable').DataTable({
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiProducts/GridGetProducts',
                    data: function (data) {
                        data.ParentProductId = _this.productId;
                        data.PairType = 2;
                    }
                },
                columns: [
                    {
                        data: 'Code', // nazwy zwracane z procedury SQL
                        //orderable: false aby wyłaczyć sortowanie
                    },
                    {
                        //data: 'Name',
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:productDetails.reloadAllData(' + row.Id + ');">' + row.Name + '</a>';
                        },
                        width: '650px',
                    },
                    {
                        data: 'GroupCode',
                        width: '250px',
                    },
                    {
                        data: 'Um',
                    },
                    {
                        data: 'ProdPack',
                    },
                    {
                        data: 'Dimensions',
                        width: '150px',
                    },
                ],
                initComplete: function () {
                    $('#accessoriesTable').show();
                },
                drawCallback: function (settings) {
                    if (settings.fnRecordsTotal() == 0) {
                        $('a[href="#pillAccessories"]').closest('li').addClass('disabled');
                    }
                    else {
                        $('a[href="#pillAccessories"]').closest('li').removeClass('disabled');
                    }
                },
                responsive: true,
                ordering: false
            });
        }
        else {
            this.accessoriesList.ajax.reload();
        }
    };
    ProductDetails.prototype.loadParts = function () {
        var _this = this;
        if (!this.partsList) {
            this.partsList = $('#partsTable').DataTable({
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiProducts/GridGetProducts',
                    data: function (data) {
                        data.ParentProductId = _this.productId;
                        data.PairType = 3;
                    }
                },
                columns: [
                    {
                        data: 'Code', // nazwy zwracane z procedury SQL
                        //orderable: false aby wyłaczyć sortowanie
                    },
                    {
                        //data: 'Name',
                        render: function (data, type, row, meta) {
                            return '<a href="javascript:productDetails.reloadAllData(' + row.Id + ');">' + row.Name + '</a>';
                        },
                        width: '650px',
                    },
                    {
                        data: 'GroupCode',
                    },
                    {
                        data: 'Um',
                    },
                    {
                        data: 'ProdPack',
                    },
                    {
                        data: 'Dimensions',
                    },
                ],
                initComplete: function () {
                    $('#partsTable').show();
                },
                drawCallback: function (settings) {
                    if (settings.fnRecordsTotal() == 0) {
                        $('a[href="#pillParts"]').closest('li').addClass('disabled');
                    }
                    else {
                        $('a[href="#pillParts"]').closest('li').removeClass('disabled');
                    }
                },
                responsive: true,
                ordering: false
            });
        }
        else {
            this.partsList.ajax.reload();
        }
    };
    ProductDetails.prototype.loadDocuments = function () {
        var _this = this;
        if (!this.documentsList) {
            this.documentsList = $('#documentsTable').DataTable({
                ajax: {
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/Api/ApiProducts/GridGetProductDocuments',
                    data: function (data) {
                        data.ProductId = _this.productId;
                    }
                },
                columns: [
                    {
                        width: '70px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<img style="width:auto" src="/Images/FilesIcons/' + row.IconFileName + '"/>';
                        },
                    },
                    {
                        //data: 'MainFileName',
                        render: function (data, type, row, meta) {
                            return '<a href="/Files/GetDocument/' + row.FileName + '" target="_blank">' + row.MainFileName + '</a>';
                        },
                    },
                    //{
                    //    width: '140px',
                    //    data: 'TypeName', // nazwy zwracane z procedury SQL
                    //},
                    {
                        width: '70px',
                        orderable: false,
                        render: function (data, type, row, meta) {
                            return '<a href="/Files/GetDocument/' + row.FileName + '" target="_blank" class="btn btn-simple btn-info btn-icon edit"><i class="material-icons" style="font-size:20pt">file_download</i><div class="ripple-container"></div></a>';
                        },
                    },
                ],
                initComplete: function () {
                    $('#documentsTable').show();
                },
                drawCallback: function (settings) {
                    if (settings.fnRecordsTotal() == 0) {
                        $('a[href="#pillDocuments"]').closest('li').addClass('disabled');
                    }
                    else {
                        $('a[href="#pillDocuments"]').closest('li').removeClass('disabled');
                    }
                },
                responsive: true,
                ordering: false
            });
        }
        else {
            this.documentsList.ajax.reload();
        }
    };
    return ProductDetails;
}());
var productDetails = new ProductDetails();
$(document).ready(function () {
    productDetails.init();
});
//# sourceMappingURL=ProductDetails.js.map