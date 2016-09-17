import angular from 'angular';
import NowPlayingComponent from './nowPlaying.component';

const nowPlaying = angular
    .module('nowPlaying', [])
    .component('nowPlaying', NowPlayingComponent)
    .name;

export default nowPlaying;