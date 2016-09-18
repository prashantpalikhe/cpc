import angular from 'angular';
import EpisodePlayerComponent from './episodePlayer.component';

const episodePlayer = angular
    .module('episodePlayer', [])
    .component('episodePlayer', EpisodePlayerComponent)
    .name;

export default episodePlayer;