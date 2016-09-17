import './navigation.css';
import controller from './navigation.controller'

const NavigationComponent = {
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
    controller
};

export default NavigationComponent;