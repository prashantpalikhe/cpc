(function () {
    'use strict';

    angular
        .module('app')
        .component('episode', episodeComponent());

    function episodeComponent() {
        return {
            bindings: {
                img: '@',
                title: '@',
                href: '@'
            },
            template: `
                <div class="episode">
                    <a class="episode__link" ng-href="{{ ::$ctrl.href }}"></a>
                    <img class="episode__img" ng-src="{{ ::$ctrl.img }}">
                    <h2 class="episode__title">{{ ::$ctrl.title }}</h2>
                </div>
            `
        };
    }
})();