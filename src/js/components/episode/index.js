import angular from 'angular';
import EpisodeComponent from './episode.component';

const episode = angular
    .module('episode', [])
    .component('episode', EpisodeComponent)
    .name;

export default episode;
