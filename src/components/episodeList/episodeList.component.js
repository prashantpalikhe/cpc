import angular from 'angular';

const EpisodeListComponent = {
    bindings: {
        src: '<'
    },
    template: `
        <div class="season" ng-repeat="season in $ctrl.src">
            <h2 class="season__title">Season {{ season.id }}</h2>

            <div class="episodes">
                <episode ng-repeat="episode in season.episodes" title="{{ episode.title }}" href="#/watch/{{ episode.id }}" img="/img/{{ episode.id }}.png"></episode>
            </div>
        </div>
    `
};

export default EpisodeListComponent;