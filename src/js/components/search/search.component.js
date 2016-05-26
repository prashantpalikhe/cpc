(function () {
    'use strict';

    angular
        .module('app')
        .component('search', searchComponent());

    function searchComponent() {
        return {
            bindings: {
                onQueryChanged: '&'
            },
            template: `
                <div class="search">
                    <input class="search__input" type="search" placeholder="Search by title..." ng-model="$ctrl.query" ng-change="$ctrl.onQueryChanged({query: $ctrl.query})" />
                </div>
            `
        };
    }
})();