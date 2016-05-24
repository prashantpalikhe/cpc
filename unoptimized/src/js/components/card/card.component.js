(function () {
    'use strict';

    angular
        .module('app.card')
        .component('card', cardComponent());

    function cardComponent() {
        return {
            bindings: {
                img: '@',
                title: '@',
                href: '@'
            },
            template: `
                <div class="card">
                    <a class="card__link" ng-href="{{ ::$ctrl.href }}"></a>
                    <img class="card__img" ng-src="{{ ::$ctrl.img }}">
                    <h2 class="card__title">{{ ::$ctrl.title }}</h2>
                </div>
            `
        };
    }
})();