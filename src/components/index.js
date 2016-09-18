import angular from 'angular';
import App from './app';
import Drawer from './drawer';
import Episode from './episode';
import EpisodeList from  './episodeList';
import Navigation from './navigation';
import Search from './search';
import NowPlayingEpisode from './nowPlaying';
import EpisodePlayer from './episodePlayer';

const components = angular
    .module('app.components', [
        App,
        Drawer,
        Episode,
        EpisodeList,
        Navigation,
        Search,
        NowPlayingEpisode,
        EpisodePlayer
    ])
    .name;

export default components;
