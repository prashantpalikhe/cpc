import angular from 'angular';
import EpisodeListComponent from './episodeList.component'

const episodeList = angular
    .module('episodeList', [])
    .component('episodeList', EpisodeListComponent)
    .name;

export default episodeList;