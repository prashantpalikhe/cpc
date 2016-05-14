(function () {
    'use strict';

    angular
        .module('app.drawer')
        .component('drawer', drawerComponent());

    function drawerComponent() {
        return {
            controller: 'DrawerController',
            controllerAs: 'drawer',
            transclude: true,
            bindings: {
                position: '@'
            },
            template: `
                <div class="drawer-backdrop"></div>
                <div class="drawer-edge"></div>
                <aside class="drawer" ng-transclude></aside>
            `
        };
    }
})();