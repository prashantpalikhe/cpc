(function () {
    'use strict';

    angular
        .module('app.card')
        .component('card', cardComponent());

    function cardComponent() {
        return {
            controller: 'CardController',
            controllerAs: 'card',
            bindings: {
                img: '@',
                title: '@',
                href: '@'
            },
            template: `
                <div class="card">
                    <a class="card-link" ng-href="{{ ::card.href }}"></a>
                    <img class="card-img" ng-src="{{ ::card.img }}">
                    <h2 class="card-title">{{ ::card.title }}</h2>
                </div>
            `
        };
    }
})();