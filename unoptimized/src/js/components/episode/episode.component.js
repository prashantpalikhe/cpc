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

(function () {
    'use strict';

    angular
        .module('app')
        .component('friendsNav', friendsNavComponent());

    function friendsNavComponent() {
        return {
            template: `
                <div class="friends-nav">
                    <div ng-repeat="season in $ctrl.episodesData" ng-if="$ctrl.episodesData">
                        <h2 class="friends-nav__title">Season {{ season.id }}</h2>

                        <ul class="friends-nav__items">
                            <li class="friends-nav__item" ng-repeat="episode in season.episodes">
                                <a class="friends-nav__item__link" ng-href="#/season/{{ season.id }}/episode/{{ episode.id }}">{{ episode.title }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            `,
            controller: function (friendsService) {
                var vm = this;

                vm.episodesData = null;

                friendsService.getEpisodesData().then(function (episodesData) {
                    vm.episodesData = episodesData;
                });
            }
        };
    }
})();