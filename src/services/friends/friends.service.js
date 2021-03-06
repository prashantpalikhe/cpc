friendsService.$inject = [
    '$q',
    '$http',
    '$window'
];

function friendsService($q, $http, $window) {
    const STORAGE_KEY = 'NOW_PLAYING_EPISODE';
    let cachedEpisodesData = null;

    let service = {
        findEpisode,
        searchByTitle,
        getAllEpisodes,
        getEpisodesData,
        getNowPlayingEpisode,
        saveNowPlayingEpisode
    };

    return service;

    /**
     * @ngdoc method
     * @name getEpisodesData
     * @methodOf friendsService
     *
     * @description
     * Returns a promise for all episodes data. Immediately resolves
     * with cached data if available, otherwise fetches the data from
     * the server.
     *
     * @returns {Promise}
     */
    function getEpisodesData() {
        return $q(function (resolve, reject) {
            if (angular.isObject(cachedEpisodesData)) {
                resolve(cachedEpisodesData);

            } else {
                $http
                    .get('/data/episodes.json')
                    .then(function onEpisodesDataReceived(response) {
                        cachedEpisodesData = response.data;

                        resolve(cachedEpisodesData);
                    })
                    .catch(reject);
            }
        });
    }

    /**
     * @ngdoc method
     * @name findEpisode
     * @methodOf friendsService
     *
     * @description
     * Returns a promise for an episode for the given ID.
     *
     * @param episodeId
     *
     * @returns {Promise}
     */
    function findEpisode(episodeId) {
        return $q(function (resolve, reject) {
            getAllEpisodes()
                .then(function (allEpisodes) {
                    let episode = allEpisodes.find((episode) => episode.id === episodeId);

                    if (episode) {
                        resolve(episode);

                    } else {
                        reject(`No episode found by ID ${episodeId}`);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * @ngdoc method
     * @name getAllEpisodes
     * @methodOf friendsService
     *
     * @description
     * Returns a promise for all the episodes data in one array.
     *
     * @returns {Promise}
     */
    function getAllEpisodes() {
        return $q(function (resolve, reject) {
            getEpisodesData()
                .then(function (episodesData) {
                    let allEpisodes = [];

                    episodesData.forEach((season) => Array.prototype.push.apply(allEpisodes, season.episodes));

                    resolve(allEpisodes);
                })
                .catch(reject);
        });
    }

    /**
     * @ngdoc method
     * @name saveNowPlayingEpisode
     * @methodOf friendsService
     *
     * @description
     * Saves now playing episode to local storage.
     *
     * @param nowPlayingEpisode
     */
    function saveNowPlayingEpisode(nowPlayingEpisode) {
        if (angular.isObject(nowPlayingEpisode)) {
            $window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nowPlayingEpisode));

        } else {
            $window.localStorage.removeItem(STORAGE_KEY);
        }
    }

    /**
     * @ngdoc method
     * @name getNowPlayingEpisode
     * @methodOf friendsService
     *
     * @description
     * Gets now playing episode from the local storage.
     *
     * @returns {Object|null}
     */
    function getNowPlayingEpisode() {
        let nowPlayingEpisode = $window.localStorage.getItem(STORAGE_KEY);

        if (angular.isString(nowPlayingEpisode)) {
            return JSON.parse(nowPlayingEpisode);

        } else {
            return null;
        }
    }

    /**
     * @ngdoc method
     * @name searchByTitle
     * @methodOf friendsService
     *
     * @description
     * Returns a promise for all episodes whose title matches the given query.
     *
     * @param query
     *
     * @returns {Promise}
     */
    function searchByTitle(query) {
        return $q(function (resolve) {
            service.getEpisodesData().then(function (episodesData) {
                let filteredEpisodesData = [];

                if (angular.isString(query) && query !== '') {
                    episodesData.forEach(function (season) {
                        let filteredSeason = {
                            id: season.id,
                            episodes: season.episodes.filter((episode) => ~episode.title.toLowerCase().indexOf(query.toLowerCase()))
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

export default friendsService;