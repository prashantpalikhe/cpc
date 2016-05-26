(function () {
    'use strict';

    angular
        .module('app')
        .component('friendsApp', friendsAppComponent());

    function friendsAppComponent() {
        return {
            controller: 'FriendsAppController',
            controllerAs: 'friendsApp',
            templateUrl: '/cpc/src/views/friendsApp.html',
            transclude: true
        };
    }
})();