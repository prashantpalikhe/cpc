import angular from 'angular';

const navigation = angular
    .module('navigation', [])
    .component('navigation', {
        template: `
            <div class="friends-nav">
                <div ng-repeat="season in $ctrl.episodesData" ng-if="$ctrl.episodesData">
                    <h2 class="friends-nav__title">Season {{ season.id }}</h2>

                    <ul class="friends-nav__items">
                        <li class="friends-nav__item" ng-repeat="episode in season.episodes">
                            <a class="friends-nav__item__link" ng-href="#/watch/{{ episode.id }}">{{ episode.title }}</a>
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
    })
    .name;

export default navigation;