import angular from 'angular';

const episode = angular
    .module('episode', [])
    .component('episode', {
        bindings: {
            img: '@',
            title: '@',
            href: '@'
        },
        template: `
            <div class="episode" ng-if="$ctrl.img">
                <a class="episode__link" ng-href="{{ ::$ctrl.href }}"></a>
                <img class="episode__img" ng-src="{{ ::$ctrl.img }}">
                <h2 class="episode__title">{{ ::$ctrl.title }}</h2>
            </div>
        `
    })
    .name;

export default episode;