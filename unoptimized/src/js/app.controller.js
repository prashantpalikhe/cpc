(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController($element, kittyService) {
        var vm = this;

        var drawer;

        vm.showMenu = showMenu;
        vm.hideMenu = hideMenu;
        vm.$postLink = postLink;

        activate();

        function activate() {
            getKitties();
        }

        function getKitties() {
            kittyService
                .getKitties()
                .then(function onKittiesReceived(kitties) {
                    vm.kitties = kitties;
                });
        }

        function postLink() {
            drawer = $element.find('drawer').controller('drawer');
        }

        function showMenu() {
            drawer.showDrawer();
        }

        function hideMenu() {
            drawer.hideDrawer();
        }
    }
})();