let vm = new Vue({
    el: "#app",
    data() {
        return {
            baseUrlProduct: "https://transfertprod-668c2.firebaseio.com/produitList.json",
            baseurlcolor: "https://transfertprod-668c2.firebaseio.com/couleurList.json",
            productList: [],
            selectedItem: {},
            userProduct: {
                color: "",
                price: "",
                visual: {
                    shape: "",
                    design: "",
                    fullsizeimage: ""
                },
                text: "",
                size: "",
                gender: "",
                quantity: "1"
            },
            showAdvertisement: true,
            selectedItemKey: "",
            productColor: "",
            isLoaded: false,
            colorList: [],
            visualIndex: 0,
            indexOfImg: 0,
            baseUrlFilterProduct: "https://transfertprod-668c2.firebaseio.com/produitList",
            tailles: [],
            gamme: [],
            style: [],
            color: [],
            couleurToShow: []
        }
    },
    mounted() {
        this.getAllColor();
        this.getAllProduct();

    },
    methods: {
        /**
         * Recupere l'ensemble des produits.
         * @returns {Promise.<TResult>}
         */
        getAllProduct: function () {
            this.productList = [];
            return this.$http.get(this.baseUrlProduct).then(product => {
                Object.keys(product.body).forEach((key) => {
                    this.productList.push(product.body[key]);
                });
                this.selectedItem = this.productList[0];
                this.showCurrentColorOfProduct()
                this.instanciateObject();
                return this.isLoaded = true;
            });
        },


        /**
         * Get all product color
         */
        getAllColor() {
            this.$http.get(this.baseurlcolor).then(resp => {
                Object.keys(resp.data).forEach(key => {
                    this.colorList.push(resp.data[key]);
                });
            })
        },
        /**
         * Notify the user that he is responsible for his act
         */
        legalMention() {
            if (this.showAdvertisement) {
                swal('Informations', 'En important une image, vous confirmez qu\'elle ne va ni à l\'encontre de la loi ni des droits de tiers', 'info')
            }
            this.showAdvertisement = false
        },
        /**
         * Instancie le premier produit sur l'IHM
         */
        instanciateObject: function () {
            let computedVisual = [];
            vm.selectedItem.visuel.forEach(visual => {
                computedVisual.push({
                    img: visual,
                    canvas: ""
                })
            })
            console.log(vm.selectedItem)
            this.showCurrentColorOfProduct()
            "use strict";
            this.userProduct.color = this.couleurToShow[0].color;
            this.productColor = this.couleurToShow[0].color;
            this.selectedItem.visuel = computedVisual;
            vm.selectedItemKey = vm.selectedItem.key;
            vm.getNumberOfVisualInProduct(vm.selectedItem.visuel);
            vm.selectedItem.firstProductImg = vm.selectedItem.visuel[0].img;
            if (this.selectedItem.activateDiscount === true) {
                return this.selectedItem.prix = parseFloat(this.selectedItem.prixpromotion).toFixed(2)
            }
            this.selectedItem.prix = parseFloat(this.selectedItem.prix).toFixed(2);
        },

        /**
         * Edit la couleur d'un produit
         * @param $event
         * @param color
         */
        setProductColor: function ($event, color) {
            vm.userProduct.color = color;
        },

        /**
         * Change le produit en fonction du select
         * @param $event
         * @returns {Promise.<TResult>}
         */
        changeProduct: function ($event) {
            vm.isLoaded = false;
            let url = encodeURI(vm.baseUrlProduct + "?orderBy=" + '"key"' + "&equalTo=" + JSON.stringify(vm.selectedItemKey) + '&print="pretty"');
            return this.$http.get(url).then(product => {
                Object.keys(product.body).forEach(function (key) {
                    vm.selectedItem = product.body[key];
                });
                let computedVisual = [];
                vm.selectedItem.visuel.forEach(visual => {
                    computedVisual.push({
                        img: visual,
                        canvas: ""
                    })
                })
                console.log(vm.selectedItem)
                if (vm.selectedItem.color !== undefined) {
                    this.showCurrentColorOfProduct()
                    this.userProduct.color = this.couleurToShow[0].color;
                    this.productColor = this.couleurToShow[0].color;
                }
                vm.selectedItemKey = vm.selectedItem.key;
                vm.selectedItem.firstProductImg = vm.selectedItem.visuel[0];
                vm.visualIndex = 0;
                vm.getNumberOfVisualInProduct(vm.selectedItem.visuel);
                this.selectedItem.prix = parseFloat(this.selectedItem.prix).toFixed(2);
                if (this.selectedItem.activateDiscount === true) {
                    return this.selectedItem.prix = parseFloat(this.selectedItem.prixpromotion).toFixed(2)
                }
                this.selectedItem.visuel = computedVisual;
                vm.userProduct.name = vm.selectedItem.nom;
                return vm.isLoaded = true;
            })
        },

        /**
         * Recupere le nombre de visuel dispoonible pour le produit
         * @param product
         */
        getNumberOfVisualInProduct: function (product) {
            vm.indexOfImg = 0;
            product.forEach((img, index) => {
                vm.indexOfImg++
            })
            vm.indexOfImg = vm.indexOfImg - 1;
        },

        saveVisual() {
            var canvas = document.getElementById("tcanvas");
            var img = canvas.toDataURL("image/png");
            return img;
        },

        /**
         * Ajuste la vue de l'utilisateur sur le visuel suivant
         */
        showOtherSideOfProduct: function () {
            vm.selectedItem.visuel[vm.visualIndex].canvas = JSON.stringify(canvas);
            vm.selectedItem.visuel[vm.visualIndex].computedCanvas = this.saveVisual();
            canvas.clear();
            vm.visualIndex++;
            if (vm.visualIndex > vm.indexOfImg) {
                vm.visualIndex = 0;
            }
            $("#tshirtFacing").attr("src", vm.selectedItem.visuel[vm.visualIndex].img);
            console.log(vm.selectedItem);
            try {
                var json = JSON.parse(vm.selectedItem.visuel[vm.visualIndex].canvas);
                canvas.loadFromJSON(vm.selectedItem.visuel[vm.visualIndex].canvas);
            }
            catch (e) {
            }
            canvas.renderAll();
            setTimeout(function () {
                canvas.calcOffset();
            }, 200);
        },

        /**
         * Permet l'ajout d'un visuel personnalisé
         */
        addPersonnalVisual: function () {
            this.legalMention()
            vm.userProduct.visual.fullsizeimage = $("#blah")[0].src;
            var offset = 50;
            var left = fabric.util.getRandomInt(0 + offset, 150 - offset);
            var top = fabric.util.getRandomInt(0 + offset, 150 - offset);
            var angle = fabric.util.getRandomInt(-20, 40);
            var width = fabric.util.getRandomInt(30, 50);
            var opacity = (function (min, max) {
                return Math.random() * (max - min) + min;
            })(0.5, 1);
            fabric.Image.fromURL(vm.userProduct.visual.fullsizeimage, function (image) {
                image.set({
                    left: left,
                    top: top,
                    angle: 0,
                    width: width,
                    padding: 10,
                    scaleY: canvas.height / image.height,
                    scaleX: canvas.width / image.width,
                    cornersize: 10,
                    hasRotatingPoint: true
                });
                swal('', 'Si la résolution de votre image nous semble trop faible. Nos techniciens s\'occuperont de la remettre à l\'échelle', 'info')
                canvas.add(image);
            });
        },


        checkBeforeAddToCart: function () {
            vm.errorCart = [];
            if (vm.userProduct.size === "") {
                vm.errorCart.push(' Taille')
            }
        },

        /**
         * Ajoute un produit au panier.
         * @param $event
         * @returns {*}
         */
        addProductToCart: function ($event) {
            vm.userProduct.price = $("#price").text();
            vm.userProduct.size = $("#size")[0].value;
            vm.userProduct.gamme = vm.selectedItem.gamme;
            vm.userProduct.visual = vm.selectedItem.visuel;
            vm.userProduct.visual[vm.visualIndex].computedCanvas = this.saveVisual();
            vm.userProduct.gender = vm.selectedItem.genre;
            console.log(vm.userProduct);
            this.checkBeforeAddToCart();
            if (vm.errorCart.length > 0) {
                return swal('Oups :-(', 'Les informations suivantes sont manquantes : ' + vm.errorCart.toString(), 'error');
            }
            else {
                vm.currentCart = [];
                if (localStorage.getItem('cart') !== null) {
                    vm.currentCart = localStorage.getItem('cart');
                    vm.currentCart = JSON.parse(vm.currentCart);
                }
                vm.currentCart.push(vm.userProduct);
                console.log(vm.currentCart);
                localStorage.setItem('cart', JSON.stringify(vm.currentCart));
                swal({
                    title: '',
                    text: "Votre produit à été ajouté au panier",
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Voir mon panier',
                    cancelButtonText: 'Continuer mes achats',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-info',
                    buttonsStyling: false
                }).then(function () {
                    return window.top.location.href = "/cart";
                }, function (dismiss) {
                    if (dismiss === 'cancel') {
                        return window.top.location.href = "/product";
                    }
                })
            }
        },
        /**
         * Affiche la liste des couleurs du produit selectionné par l'utilisateur
         */
        async showCurrentColorOfProduct() {
            this.couleurToShow = [];
            await this.selectedItem.couleur.forEach(colorName => {
                let index = _.findIndex(this.colorList, {'nom': colorName});
                if (index !== -1) {
                    this.couleurToShow.push({color: this.colorList[index].value})
                }
            });
            return this.couleurToShow
        }
    }
});


/**
 * Affiche l'image personnalisé dans le conteneur HTML
 * @param input
 */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(150);
        };

        reader.readAsDataURL(input.files[0]);
    }
}



