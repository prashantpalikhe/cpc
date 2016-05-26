(function () {
    'use strict';

    angular
        .module('app')
        .factory('friendsService', friendsService);

    function friendsService($q, $http, $window) {
        var cachedEpisodesData = null;

        var service = {
            getEpisodesData: getEpisodesData,
            findEpisode: findEpisode,
            searchByTitle: searchByTitle,
            saveNowPlayingEpisode: saveNowPlayingEpisode,
            getNowPlayingEpisode: getNowPlayingEpisode
        };

        return service;

        function getEpisodesData() {
            return $q(function (resolve, reject) {
                if (angular.isObject(cachedEpisodesData)) {
                    resolve(cachedEpisodesData);
                } else {
                    $http
                        .get('./src/data/episodes.json')
                        .then(function onEpisodesDataReceived(response) {
                            cachedEpisodesData = response.data;

                            resolve(cachedEpisodesData);
                        })
                        .catch(reject);
                }
            });
        }

        function findEpisode(seasonId, episodeId) {
            return $q(function (resolve, reject) {
                getEpisodesData()
                    .then(function (episodesData) {
                        var season;
                        var episode;

                        season = episodesData.find(function (season) {
                             return season.id === seasonId;
                        });

                        if (season) {
                            episode = season.episodes.find(function (episode) {
                                return episode.id === episodeId;
                            });

                            if (episode) {
                                return resolve(episode);
                            }
                        }

                        reject(`No episode found for season ${seasonId} and episode ${episodeId}`);
                    })
                    .catch(reject)
            });
        }

        function saveNowPlayingEpisode(nowPlayingEpisodeData) {
            if (angular.isObject(nowPlayingEpisodeData)) {
                $window.localStorage.setItem('nowPlayingEpisode', JSON.stringify(nowPlayingEpisodeData));
            } else {
                $window.localStorage.removeItem('nowPlayingEpisode');
            }
        }

        function getNowPlayingEpisode() {
            var nowPlayingEpisode = $window.localStorage.getItem('nowPlayingEpisode');

            if (angular.isString(nowPlayingEpisode)) {
                return JSON.parse(nowPlayingEpisode);
            } else {
                return null;
            }
        }
        
        function searchByTitle(query) {
            return $q(function (resolve) {
                service.getEpisodesData().then(function (episodesData) {
                    var filteredEpisodesData = [];

                    if (angular.isString(query) && query !== '') {
                        episodesData.forEach(function (season) {
                            var filteredSeason = {
                                id: season.id,
                                episodes: season.episodes.filter(function (episode) {
                                    return ~episode.title.toLowerCase().indexOf(query.toLowerCase());
                                })
                            };

                            if (filteredSeason.episodes.length) {
                                filteredEpisodesData.push(filteredSeason);
                            }
                        });

                        resolve(filteredEpisodesData);
                    } else {
                        resolve(episodesData);
                    }
                });
            });
        }
    }
})();