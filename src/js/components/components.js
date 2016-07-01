import angular from 'angular';
import Drawer from './drawer';
import Episode from './episode';
import Episodes from  './episodes';
import Navigation from './navigation';
import Search from './search';
import NowPlayingEpisode from './nowPlaying';
import EpisodePlayer from './episodePlayer';

const components = angular
    .module('app.components', [
        Drawer,
        Episode,
        Episodes,
        Navigation,
        Search,
        NowPlayingEpisode,
        EpisodePlayer
    ])
    .name;

export default components;
