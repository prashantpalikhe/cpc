(function () {
    'use strict';

    angular
        .module('app')
        .controller(FriendsAppController.name, FriendsAppController);

    function FriendsAppController($element, $scope) {
        var vm = this;

        var drawer;

        vm.showMenu = showMenu;
        vm.hideMenu = hideMenu;

        vm.$postLink = postLink;

        function postLink() {
            drawer = $element.find('drawer').controller('drawer');
        }

        function showMenu() {
            drawer.showDrawer();
        }

        function hideMenu() {
            drawer.hideDrawer();
        }

        $scope.$on('$locationChangeSuccess', function () {
            hideMenu();
        });
    }
})();