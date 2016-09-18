(function () {
    'use strict';

    angular
        .module('app')
        .component('friendsApp', friendsAppComponent());

    function friendsAppComponent() {
        return {
            controller: 'FriendsAppController',
            controllerAs: 'friendsApp',
            templateUrl: '/src/views/friendsApp.html',
            transclude: true
        };
    }
})();