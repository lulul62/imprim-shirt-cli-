
let vm = new Vue({
    el: '#login',
    data: {
        newUser: {
            email: "",
            name: "",
            password: ""
        },
        userToConnect: {
            email: "",
            password: ""
        },
        baseUrlNewUser: "https://transfertprod-668c2.firebaseio.com/user.json",
        baseUrlEditUser: "https://transfertprod-668c2.firebaseio.com/user/",
        samePassword: false,
        passwordComparator: "",
        y: 'top',
        x: null,
        mode: '',
        isConnect: "",
        userPassword: [],
        userKey: [],
        incorrectLogin: false,
        errorArrayString: "",
        errorArray: [],
        timeout: 4000,
        showEmptyFormNotification: false,
        showSamePasswordNotification: false,
        showSuccessCreateAccountNotification: false,
    },
    methods: {
        /**
         * Crée un nouvel utilisateur
         */
        createNewUser: function () {
            let isConnect = false;
            vm.checkForm(isConnect);
            if (vm.errorArray.length > 0) {
                vm.errorArrayString = vm.errorArray.toString();
                return vm.showEmptyFormNotification = true;
            }
            vm.comparePassword();
            if (vm.samePassword === false) {
                return vm.showSamePasswordNotification = true;
            }
            else {
                return this.$http.post(vm.baseUrlNewUser, vm.newUser).then(newUser => {
                    vm.newUser.userkey = newUser.body.name;
                    return this.$http.put(vm.baseUrlEditUser + vm.newUser.userkey + ".json", vm.newUser).then(resp => {
                        vm.showSuccessCreateAccountNotification = true;
                        vm.samePassword = false;
                        sessionStorage.setItem("dataKey", vm.newUser.userkey);
                        vm.newUser = {};
                        return setTimeout(() => {
                            window.location.href = "gestionProfil.html"
                        }, 4000)
                    })
                })
            }
        },
        /**
         * Compare le mot de passe avec le mot de passe courant
         */
        comparePassword: function () {
            if (vm.newUser.password === vm.passwordComparator) {
                return vm.samePassword = true;
            }
        },
        /**
         * Check des informations du formulaire
         */
        checkForm: function (isConnect) {
            vm.errorArray = [];
            if (isConnect === false) {
                if (vm.newUser.email === "") {
                    vm.errorArray.push("Email");
                }

                if (vm.newUser.name === "") {
                    vm.errorArray.push("Nom");

                }
                if (vm.newUser.password === "") {
                    vm.errorArray.push("Mot de passe");
                }
            }
            if (isConnect === true) {
                if (vm.userToConnect.password === "") {
                    vm.errorArray.push("Mot de passe");
                }
                if (vm.userToConnect.email === "") {
                    vm.errorArray.push("Email");
                }
            }

        },
        /**
         * Connecte un utilisateur à l'application
         */
        connectUser: function () {
            vm.userPassword = [];
            let isConnect = true;
            vm.checkForm(isConnect);
            if (vm.errorArray.length > 0) {
                vm.errorArrayString = vm.errorArray.toString();
                console.log(vm.errorArrayString);
                return vm.showEmptyFormNotification = true;
            }
            let url = encodeURI(vm.baseUrlNewUser + "?orderBy=" + '"email"' + "&equalTo=" + JSON.stringify(vm.userToConnect.email) + '&print="pretty"');
            return this.$http.get(url).then((user) => {
                Object.keys(user.body).forEach(function (key) {
                    vm.userPassword.push(user.body[key].password);
                    vm.userKey.push(user.body[key].userkey);
                });
                if (vm.userPassword[0] === vm.userToConnect.password) {
                    console.log("c'est les meme");
                    sessionStorage.setItem("dataKey", vm.userKey[0]);
                    return window.location.href = "/gestionProfil";
                }
                else {
                    return vm.incorrectLogin = true;
                }

            }, err => {
                return vm.incorrectLogin = true;
            })
        }
    }
});