let vm = new Vue({
    el: "#app",
    data() {
        return {
            baseUrlProduct: "https://transfertprod-668c2.firebaseio.com/produitList.json",
            productList: [],
            selectedItem: {},
            userProduct: {
                color: "",
                price: "",
                visual: "",
                design: "",
                text: "",
                size: "",
                gender: "",
                style: "",
                quantity: "1"
            },
            selectedItemKey: "",
            productColor: "",
            isLoaded: false,
            visualIndex: 0,
            indexOfImg: 0,
            baseUrlFilterProduct: "https://transfertprod-668c2.firebaseio.com/produitList",
            tailles: [],
            gamme: [],
            style: [],
            color: [],
        }
    },
    methods: {
        /**
         * Recupere l'ensemble des produits.
         * @returns {Promise.<TResult>}
         */
        getAllProduct: function () {
            vm.productList = [];
            return this.$http.get(vm.baseUrlProduct).then(product => {
                Object.keys(product.body).forEach((key) => {
                    vm.productList.push(product.body[key]);
                });
                vm.selectedItem = vm.productList[0];
                vm.instanciateObject();
                return vm.isLoaded = true;
            });
        },

        /**
         * Instancie le premier produit sur l'IHM
         */
        instanciateObject: function () {
            vm.selectedItemKey = vm.selectedItem.key;
            vm.selectedItem.firstProductImg = vm.selectedItem.visuel[0];
            vm.productColor = vm.selectedItem.couleur[0];
            vm.userProduct.color = vm.selectedItem.couleur[0];
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
                vm.userProduct.color = vm.selectedItem.couleur[0];
                vm.selectedItemKey = vm.selectedItem.key;
                vm.selectedItem.firstProductImg = vm.selectedItem.visuel[0].base64;
                vm.visualIndex = 0;
                vm.getNumberOfVisualInProduct(vm.selectedItem.visuel);
                vm.productColor = vm.selectedItem.couleur[0];
                vm.userProduct.name = vm.selectedItem.nom;
                return vm.isLoaded = true;

            })
        },

        /**
         * Recupere le nombre de visuel dispoonible pour le produit
         * @param product
         */
        getNumberOfVisualInProduct: function (product) {
            product.forEach((img, index) => {
                vm.indexOfImg = vm.indexOfImg + index;
            })
        },

        /**
         * Ajuste la vue de l'utilisateur sur le visuel suivant
         */
        showOtherSideOfProduct: function () {
            if (vm.visualIndex > vm.indexOfImg) {
                vm.visualIndex = 0;
            }
            else {
                vm.visualIndex = vm.visualIndex + 1;
            }

            $(this).attr('data-original-title', 'Show Front View');
            $("#tshirtFacing").attr("src", vm.selectedItem.visuel[vm.visualIndex]);
            a = JSON.stringify(canvas);
            canvas.clear();
            try {
                var json = JSON.parse(b);
                canvas.loadFromJSON(b);
            }
            catch (e) {
            }

        },

        /**
         * Permet l'ajout d'un visuel personnalisé
         */
        addPersonnalVisual: function () {
            vm.userProduct.design = $("#blah")[0].src;
            var offset = 50;
            var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
            var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
            var angle = fabric.util.getRandomInt(-20, 40);
            var width = fabric.util.getRandomInt(30, 50);
            var opacity = (function (min, max) {
                return Math.random() * (max - min) + min;
            })(0.5, 1);
            fabric.Image.fromURL(vm.userProduct.design, function (image) {
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
                canvas.add(image);
            });
        },


        checkBeforeAddToCart: function () {
            vm.errorCart = [];
            if (vm.userProduct.gender === "") {
                vm.errorCart.push('Genre');
            }
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
            vm.userProduct.visual = $("#tshirtFacing").attr('src');
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
                    }
                })
            }
        }
    }
});


vm.getAllProduct();

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
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

