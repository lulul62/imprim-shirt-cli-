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
                if (Number.isInteger(parseInt(this.selectedItem.prix))) {
                    this.selectedItem.prix = this.selectedItem.prix + '.00';
                    console.log(this.selectedItem);
                }
                vm.instanciateObject();
                return vm.isLoaded = true;
            });
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
            this.selectedItem.visuel = computedVisual;
            vm.selectedItemKey = vm.selectedItem.key;
            vm.getNumberOfVisualInProduct(vm.selectedItem.visuel);
            vm.selectedItem.firstProductImg = vm.selectedItem.visuel[0].img;
            vm.productColor = vm.selectedItem.couleur[0];
            vm.userProduct.color = vm.selectedItem.couleur[0];
            console.log(vm.selectedItem);
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
                vm.userProduct.color = vm.selectedItem.couleur[0];
                vm.selectedItemKey = vm.selectedItem.key;
                vm.selectedItem.firstProductImg = vm.selectedItem.visuel[0];
                vm.visualIndex = 0;
                vm.getNumberOfVisualInProduct(vm.selectedItem.visuel);
                vm.productColor = vm.selectedItem.couleur[0];
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
            console.log(vm.indexOfImg, vm.visualIndex)
            if (vm.visualIndex > vm.indexOfImg) {
                vm.visualIndex = 0;
            }
            console.log(vm.visualIndex)
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
            vm.userProduct.visual.fullsizeimage = $("#blah")[0].src;
            var offset = 50;
            var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
            var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
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
                console.log(image);
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

