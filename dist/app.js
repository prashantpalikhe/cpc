webpackJsonp([0,3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _angularRoute = __webpack_require__(3);
	
	var _angularRoute2 = _interopRequireDefault(_angularRoute);
	
	var _app = __webpack_require__(5);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _services = __webpack_require__(6);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _components = __webpack_require__(9);
	
	var _components2 = _interopRequireDefault(_components);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_angular2.default.module('friendsflix', ['ngRoute', _services2.default, _components2.default]).config(_app2.default);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = routing;
	routing.$inject = ['$routeProvider'];
	
	function routing($routeProvider) {
	    $routeProvider.when('/watch/:episodeId', {
	        template: '\n                <main class="main">\n                    <episode-player ng-if="singleEpisode.episode" episode="singleEpisode.episode"></episode-player>\n                </main>\n            ',
	        controller: function SingleEpisodeController($routeParams, friendsService) {
	            var vm = this;
	
	            vm.episode = null;
	
	            activate();
	
	            function activate() {
	                getEpisode();
	            }
	
	            function getEpisode() {
	                friendsService.findEpisode($routeParams.episodeId).then(function (episode) {
	                    vm.episode = episode;
	                });
	            }
	        },
	        controllerAs: 'singleEpisode'
	    }).when('/', {
	        template: '\n                <main class="main main--list">\n                    <search on-query-changed="$ctrl.search(query)"></search>\n                \n                    <now-playing ng-if="$ctrl.nowPlayingEpisode" episode="$ctrl.nowPlayingEpisode"></now-playing>\n                \n                    <episode-list src="$ctrl.episodesData"></episode-list>\n                </main>\n            '
	    });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _friends = __webpack_require__(7);
	
	var _friends2 = _interopRequireDefault(_friends);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var services = _angular2.default.module('app.services', [_friends2.default]).name;
	
	exports.default = services;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _friendsService = __webpack_require__(8);
	
	var _friendsService2 = _interopRequireDefault(_friendsService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var friends = _angular2.default.module('friends', []).service('friendsService', _friendsService2.default).name;
	
	exports.default = friends;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	friendsService.$inject = ['$q', '$http', '$window'];
	
	function friendsService($q, $http, $window) {
	    var STORAGE_KEY = 'NOW_PLAYING_EPISODE';
	    var cachedEpisodesData = null;
	
	    var service = {
	        findEpisode: findEpisode,
	        searchByTitle: searchByTitle,
	        getAllEpisodes: getAllEpisodes,
	        getEpisodesData: getEpisodesData,
	        getNowPlayingEpisode: getNowPlayingEpisode,
	        saveNowPlayingEpisode: saveNowPlayingEpisode
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
	                $http.get('/data/episodes.json').then(function onEpisodesDataReceived(response) {
	                    cachedEpisodesData = response.data;
	
	                    resolve(cachedEpisodesData);
	                }).catch(reject);
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
	            getAllEpisodes().then(function (allEpisodes) {
	                var episode = allEpisodes.find(function (episode) {
	                    return episode.id === episodeId;
	                });
	
	                if (episode) {
	                    resolve(episode);
	                } else {
	                    reject('No episode found by ID ' + episodeId);
	                }
	            }).catch(reject);
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
	            getEpisodesData().then(function (episodesData) {
	                var allEpisodes = [];
	
	                episodesData.forEach(function (season) {
	                    return Array.prototype.push.apply(allEpisodes, season.episodes);
	                });
	
	                resolve(allEpisodes);
	            }).catch(reject);
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
	        var nowPlayingEpisode = $window.localStorage.getItem(STORAGE_KEY);
	
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
	
	exports.default = friendsService;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _app = __webpack_require__(10);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _drawer = __webpack_require__(17);
	
	var _drawer2 = _interopRequireDefault(_drawer);
	
	var _episode = __webpack_require__(22);
	
	var _episode2 = _interopRequireDefault(_episode);
	
	var _episodeList = __webpack_require__(26);
	
	var _episodeList2 = _interopRequireDefault(_episodeList);
	
	var _navigation = __webpack_require__(28);
	
	var _navigation2 = _interopRequireDefault(_navigation);
	
	var _search = __webpack_require__(33);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _nowPlaying = __webpack_require__(37);
	
	var _nowPlaying2 = _interopRequireDefault(_nowPlaying);
	
	var _episodePlayer = __webpack_require__(42);
	
	var _episodePlayer2 = _interopRequireDefault(_episodePlayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var components = _angular2.default.module('app.components', [_app2.default, _drawer2.default, _episode2.default, _episodeList2.default, _navigation2.default, _search2.default, _nowPlaying2.default, _episodePlayer2.default]).name;
	
	exports.default = components;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _app = __webpack_require__(11);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = _angular2.default.module('app', []).component('app', _app2.default).name;
	
	exports.default = app;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(12);
	
	var _app = __webpack_require__(16);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AppComponent = {
	    transclude: true,
	    controller: _app2.default,
	    template: '\n        <header class="header">\n            <button ng-click="$ctrl.showMenu()" class="header__btn material-icons">menu</button>\n        \n            <a class="header__logo" href="#/" title="Go to episodes list">\n                <img class="header__logo__img" src="/img/logo.jpg" alt="Friends logo">\n            </a>\n        </header>\n        \n        <ng-view></ng-view>\n        \n        <drawer>\n            <nav class="nav">\n                <div class="nav-header">\n                    <button ng-click="$ctrl.hideMenu()" class="nav__hide-drawer material-icons">close</button>\n                </div>\n        \n                <div class="nav-body">\n                    <navigation></navigation>\n                </div>\n            </nav>\n        </drawer>\n    '
	};
	
	exports.default = AppComponent;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./app.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, "*, *:before, *:after {\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n}\n\nhtml, body {\n    padding: 0;\n    margin: 0;\n    background: #FAFAFA;\n    font-family: Arial, sans-serif;\n    height: 100%;\n    width: 100%;\n}\n\nbody {\n    color: white;\n    background: #000;\n    overflow: hidden;\n    -webkit-font-smoothing: antialiased;\n}\n\nmain {\n    position: absolute;\n    top: 56px;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n    background: #000;\n    /*background: #222;*/\n    -webkit-overflow-scrolling: touch;\n}\n\n.main--list {\n    top: 112px;\n}\n\n[ng\\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {\n    display: none !important;\n}\n\n.material-icons {\n    font-family: 'Material Icons';\n    font-weight: normal;\n    font-style: normal;\n    font-size: 24px;\n    line-height: 1;\n    letter-spacing: normal;\n    text-transform: none;\n    display: inline-block;\n    white-space: nowrap;\n    word-wrap: normal;\n    direction: ltr;\n    -webkit-font-feature-settings: 'liga';\n    -webkit-font-smoothing: antialiased;\n}\n\n.header {\n    position: fixed;\n    top: 0;\n    width: 100%;\n    height: 56px;\n    background: #000;\n    color: #FFF;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding: 0 16px;\n}\n\n.header__show-drawer, .nav__hide-drawer {\n    background: none;\n    border: none;\n    width: 24px;\n    height: 24px;\n    padding: 0;\n    margin: 0;\n    color: #FFF;\n}\n\n.nav-header {\n    padding: 16px;\n    height: 100px;\n    background: #000;\n}\n\n.header__btn {\n    margin: 0;\n    padding: 0;\n    background: none;\n    outline: none;\n    border: none;\n    color: white;\n}\n\n.header__logo {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n}\n\n.header__logo__img {\n    display: block;\n    height: 35px;\n    width: auto;\n}\n", ""]);
	
	// exports


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AppController = function () {
	    function AppController($element, $scope, friendsService) {
	        var _this = this;
	
	        _classCallCheck(this, AppController);
	
	        this.$element = $element;
	        this.friendsService = friendsService;
	
	        this.episodesData = [];
	        this.nowPlayingEpisode = null;
	
	        this.activate();
	
	        $scope.$on('$locationChangeSuccess', function () {
	            _this.hideMenu();
	            _this.activate();
	        });
	    }
	
	    _createClass(AppController, [{
	        key: 'activate',
	        value: function activate() {
	            this.getNowPlayingEpisode();
	            this.getFriendsEpisodesData();
	        }
	    }, {
	        key: 'showMenu',
	        value: function showMenu() {
	            this.drawer.showDrawer();
	        }
	    }, {
	        key: 'hideMenu',
	        value: function hideMenu() {
	            this.drawer.hideDrawer();
	        }
	    }, {
	        key: 'search',
	        value: function search(query) {
	            var _this2 = this;
	
	            this.friendsService.searchByTitle(query).then(function (filteredEpisodesData) {
	                return _this2.episodesData = filteredEpisodesData;
	            });
	        }
	    }, {
	        key: '$postLink',
	        value: function $postLink() {
	            this.drawer = this.$element.find('drawer').controller('drawer');
	        }
	    }, {
	        key: 'getNowPlayingEpisode',
	        value: function getNowPlayingEpisode() {
	            this.nowPlayingEpisode = this.friendsService.getNowPlayingEpisode();
	        }
	    }, {
	        key: 'getFriendsEpisodesData',
	        value: function getFriendsEpisodesData() {
	            var _this3 = this;
	
	            this.friendsService.getEpisodesData().then(function (result) {
	                return _this3.episodesData = result;
	            });
	        }
	    }]);
	
	    return AppController;
	}();
	
	AppController.$inject = ['$element', '$scope', 'friendsService'];
	
	exports.default = AppController;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _drawer = __webpack_require__(18);
	
	var _drawer2 = _interopRequireDefault(_drawer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var drawer = _angular2.default.module('drawer', []).component('drawer', _drawer2.default).name;
	
	exports.default = drawer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(19);
	
	var _drawer = __webpack_require__(21);
	
	var _drawer2 = _interopRequireDefault(_drawer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DrawerComponent = {
	    transclude: true,
	    controller: _drawer2.default,
	    template: '\n        <div class="drawer-backdrop"></div>\n        <div class="drawer-edge"></div>\n        <aside class="drawer" ng-transclude></aside>\n    '
	};
	
	exports.default = DrawerComponent;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./drawer.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./drawer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".drawer {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 80%;\n    max-width: 280px;\n    height: 100%;\n    background: white;\n    -webkit-transform: translate3d(-104%, 0, 0);\n            transform: translate3d(-104%, 0, 0);\n    will-change: transform;\n    z-index: 1;\n    box-shadow: 0px 19px 19px 0px rgba(0, 0, 0, 0.3), 0px 15px 6px 0px rgba(0, 0, 0, 0.22);\n}\n\n.drawer.is-animatable {\n    -webkit-transition: 0.13s -webkit-transform cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.13s -webkit-transform cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.13s transform cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.13s transform cubic-bezier(0, 0, 0.3, 1), 0.13s -webkit-transform cubic-bezier(0, 0, 0.3, 1);\n}\n\n.drawer.is-visible.is-animatable {\n    -webkit-transition: 0.35s -webkit-transform cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.35s -webkit-transform cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.35s transform cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.35s transform cubic-bezier(0, 0, 0.3, 1), 0.35s -webkit-transform cubic-bezier(0, 0, 0.3, 1);\n}\n\n.drawer.is-visible {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n}\n\n.drawer-backdrop {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.55);\n    opacity: 0;\n    pointer-events: none;\n    -webkit-transform: translateZ(0);\n            transform: translateZ(0);\n    will-change: transform;\n}\n\n.drawer-backdrop.is-animatable {\n    -webkit-transition: 0.13s opacity cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.13s opacity cubic-bezier(0, 0, 0.3, 1);;\n}\n\n.drawer-backdrop.is-visible.is-animatable {\n    -webkit-transition: 0.35s opacity cubic-bezier(0, 0, 0.3, 1);\n    transition: 0.35s opacity cubic-bezier(0, 0, 0.3, 1);\n}\n\n.drawer-backdrop.is-visible {\n    opacity: 1;\n    pointer-events: auto;\n}\n\n.drawer-edge {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 20px;\n    height: 100%;\n}", ""]);
	
	// exports


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function DrawerController($element, $rootScope, $$rAF) {
	    var vm = this;
	
	    var element = $element[0];
	
	    var $drawer = angular.element(element.querySelector('aside'));
	    var $backdrop = angular.element(element.querySelector('.drawer-backdrop'));
	    var $edge = angular.element(element.querySelector('.drawer-edge'));
	
	    var drawerWidth = $drawer[0].offsetWidth;
	
	    var startTouch;
	    var previousTouch;
	    var currentTouch;
	    var translateX;
	    var deltaX;
	    var direction;
	    var startOffset;
	
	    var animatableClass = 'is-animatable';
	    var visibilityClass = 'is-visible';
	    var DIRECTIONS = {
	        LEFT: 'left',
	        RIGHT: 'right',
	        UP: 'up',
	        DOWN: 'down'
	    };
	
	    var EVENTS = {
	        DRAWER_SHOWN: 'drawer.shown',
	        DRAWER_HIDDEN: 'drawer.hidden'
	    };
	
	    vm.showDrawer = showDrawer;
	    vm.hideDrawer = hideDrawer;
	    vm.$onDestroy = onDestroy;
	
	    activate();
	
	    /**
	     * @private
	     *
	     * @description Activation logic of the component. Binds event handlers on
	     * component elements.
	     */
	    function activate() {
	        $drawer.on('touchstart', onTouchStart);
	        $drawer.on('touchmove', onTouchMove);
	        $drawer.on('touchend', onTouchEnd);
	
	        $backdrop.on('touchstart', onTouchStart);
	        $backdrop.on('touchmove', onTouchMove);
	        $backdrop.on('touchend', onTouchEnd);
	        $backdrop.on('click', hideDrawer);
	
	        $edge.on('touchstart', onTouchStart);
	        $edge.on('touchmove', onTouchMove);
	        $edge.on('touchend', onTouchEnd);
	    }
	
	    /**
	     * @ngdoc method
	     * @name showDrawer
	     * @methodOf DrawerController
	     *
	     * @description Shows the drawer by animating the drawer in.
	     */
	    function showDrawer() {
	        enableAnimation();
	
	        $drawer.addClass(visibilityClass);
	        $backdrop.addClass(visibilityClass);
	
	        $rootScope.$broadcast(EVENTS.DRAWER_SHOWN);
	    }
	
	    /**
	     * @ngdoc method
	     * @name hideDrawer
	     * @methodOf DrawerController
	     *
	     * @description Hides the drawer by animating the drawer out.
	     */
	    function hideDrawer() {
	        enableAnimation();
	
	        $drawer.removeClass(visibilityClass);
	        $backdrop.removeClass(visibilityClass);
	
	        $rootScope.$broadcast(EVENTS.DRAWER_HIDDEN);
	    }
	
	    function onTouchStart(event) {
	        disableAnimation();
	
	        startTouch = event.touches[0];
	        previousTouch = startTouch;
	
	        startOffset = $drawer[0].getBoundingClientRect().left;
	    }
	
	    function onTouchMove(event) {
	        event.stopPropagation();
	
	        currentTouch = event.touches[0];
	        deltaX = currentTouch.pageX - startTouch.pageX;
	        direction = getSwipeDirection(previousTouch, currentTouch);
	
	        previousTouch = currentTouch;
	
	        $$rAF(update);
	    }
	
	    function onTouchEnd() {
	        $drawer[0].style.transform = '';
	        $backdrop[0].style.opacity = '';
	
	        if (translateX <= 0) {
	            if (Math.abs(translateX) > Math.floor(drawerWidth / 2)) {
	                hideDrawer();
	            } else {
	                showDrawer();
	            }
	        }
	
	        deltaX = 0;
	    }
	
	    /**
	     * Prepares another frame
	     */
	    function update() {
	        if (!deltaX) {
	            return;
	        }
	
	        translateX = Math.min(startOffset + deltaX, 0);
	        //             translateX = startOffset + deltaX;
	
	        if (direction === 'left' || direction === 'right') {
	
	            $drawer[0].style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
	            $backdrop[0].style.opacity = (drawerWidth + translateX) / drawerWidth;
	
	            $$rAF(update);
	        }
	    }
	
	    /**
	     * @private
	     * @description Enables animating of drawer and backdrop's style values.
	     */
	    function enableAnimation() {
	        $drawer.addClass(animatableClass);
	        $backdrop.addClass(animatableClass);
	
	        $drawer.on('transitionend', onTransitionEnd);
	    }
	
	    /**
	     * @private
	     * @description Disables animating of drawer and backdrop's style values.
	     */
	    function disableAnimation() {
	        $drawer.removeClass(animatableClass);
	        $backdrop.removeClass(animatableClass);
	
	        $drawer.on('transitionend', onTransitionEnd);
	    }
	
	    function onTransitionEnd() {
	        $drawer.removeClass(animatableClass);
	        $backdrop.removeClass(animatableClass);
	
	        $drawer.off('transitionend', onTransitionEnd);
	    }
	
	    /**
	     * @private
	     * @description Determines how the user is swiping based on two touch points.
	     *
	     * @param previousTouch
	     * @param currentTouch
	     * @returns {string}
	     */
	    function getSwipeDirection(previousTouch, currentTouch) {
	        var x = Math.abs(previousTouch.pageX - currentTouch.pageX);
	        var y = Math.abs(previousTouch.pageY - currentTouch.pageY);
	
	        if (x >= y) {
	            return currentTouch.pageX > previousTouch.pageX ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT;
	        } else {
	            return currentTouch.pageY > previousTouch.pageY ? DIRECTIONS.DOWN : DIRECTIONS.UP;
	        }
	    }
	
	    /**
	     * @ngdoc method
	     * @name onDestroy
	     * @methodOf DrawerController
	     *
	     * @description Cleanup routine when the component is destroyed.
	     */
	    function onDestroy() {
	        $drawer.off('touchstart', onTouchStart);
	        $drawer.off('touchmove', onTouchMove);
	        $drawer.off('touchend', onTouchEnd);
	
	        $backdrop.off('touchstart', onTouchStart);
	        $backdrop.off('touchmove', onTouchMove);
	        $backdrop.off('touchend', onTouchEnd);
	        $backdrop.off('click', hideDrawer);
	
	        $edge.off('touchstart', onTouchStart);
	        $edge.off('touchmove', onTouchMove);
	        $edge.off('touchend', onTouchEnd);
	    }
	}
	
	DrawerController.$inject = ['$element', '$rootScope', '$$rAF'];
	
	exports.default = DrawerController;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _episode = __webpack_require__(23);
	
	var _episode2 = _interopRequireDefault(_episode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var episode = _angular2.default.module('episode', []).component('episode', _episode2.default).name;
	
	exports.default = episode;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(24);
	
	var EpisodeComponent = {
	    bindings: {
	        img: '@',
	        title: '@',
	        href: '@'
	    },
	    template: '\n        <div class="episode" ng-if="$ctrl.img">\n            <a class="episode__link" ng-href="{{ ::$ctrl.href }}"></a>\n            <img class="episode__img" ng-src="{{ ::$ctrl.img }}">\n            <h2 class="episode__title">{{ ::$ctrl.title }}</h2>\n        </div>\n    '
	};
	
	exports.default = EpisodeComponent;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./episode.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./episode.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".episodes {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-flow: row wrap;\n        flex-flow: row wrap;\n}\n\n.episodes::after {\n    content: \"\";\n    display: table;\n    clear: both;\n}\n\n.episode {\n    position: relative;\n    height: 260px;\n    padding: 10px;\n    max-width: 120px;\n}\n\n.episode__link {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n}\n\n.episode__title {\n    margin: 0;\n    padding: 15px 0px;\n    color: white;\n    font-size: 12px;\n    font-weight: normal;\n    height: 80px;\n    overflow: hidden;\n}\n\n.episode__img {\n    width: 100%;\n    display: block;\n    height: 180px;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.episode-player video {\n    width: 100%;\n    height: auto;\n}\n\n.season__title {\n    padding: 20px;\n    margin: 0;\n    font-size: 16px;\n}", ""]);
	
	// exports


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _episodeList = __webpack_require__(27);
	
	var _episodeList2 = _interopRequireDefault(_episodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var episodeList = _angular2.default.module('episodeList', []).component('episodeList', _episodeList2.default).name;
	
	exports.default = episodeList;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var EpisodeListComponent = {
	    bindings: {
	        src: '<'
	    },
	    template: '\n        <div class="season" ng-repeat="season in $ctrl.src">\n            <h2 class="season__title">Season {{ season.id }}</h2>\n\n            <div class="episodes">\n                <episode ng-repeat="episode in season.episodes" title="{{ episode.title }}" href="#/watch/{{ episode.id }}" img="/img/{{ episode.id }}.png"></episode>\n            </div>\n        </div>\n    '
	};
	
	exports.default = EpisodeListComponent;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _navigation = __webpack_require__(29);
	
	var _navigation2 = _interopRequireDefault(_navigation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var navigation = _angular2.default.module('navigation', []).component('navigation', _navigation2.default).name;
	
	exports.default = navigation;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(30);
	
	var _navigation = __webpack_require__(32);
	
	var _navigation2 = _interopRequireDefault(_navigation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NavigationComponent = {
	    template: '\n            <div class="friends-nav">\n                <div ng-repeat="season in $ctrl.episodesData" ng-if="$ctrl.episodesData">\n                    <h2 class="friends-nav__title">Season {{ season.id }}</h2>\n\n                    <ul class="friends-nav__items">\n                        <li class="friends-nav__item" ng-repeat="episode in season.episodes">\n                            <a class="friends-nav__item__link" ng-href="#/watch/{{ episode.id }}">{{ episode.title }}</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        ',
	    controller: _navigation2.default
	};
	
	exports.default = NavigationComponent;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./navigation.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./navigation.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".friends-nav__title {\n    color: black;\n    padding: 10px;\n    margin: 0;\n    font-size: 12px;\n    background: #e5e5e5;\n}\n\n.friends-nav__items {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}\n\n.friends-nav__item__link {\n    text-decoration: none;\n    padding: 10px;\n    color: black;\n    font-size: 12px;\n    display: block;\n    white-space: nowrap;\n    width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}", ""]);
	
	// exports


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NavigationController = function NavigationController(friendsService) {
	    var _this = this;
	
	    _classCallCheck(this, NavigationController);
	
	    friendsService.getEpisodesData().then(function (episodesData) {
	        return _this.episodesData = episodesData;
	    });
	};
	
	NavigationController.$inject = ['friendsService'];
	
	exports.default = NavigationController;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _search = __webpack_require__(34);
	
	var _search2 = _interopRequireDefault(_search);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var search = _angular2.default.module('search', []).component('search', _search2.default).name;
	
	exports.default = search;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(35);
	
	var SearchComponent = {
	    bindings: {
	        onQueryChanged: '&'
	    },
	    template: '\n        <div class="search">\n            <input class="search__input" type="search" placeholder="Search by title..." ng-model="$ctrl.query" ng-change="$ctrl.onQueryChanged({query: $ctrl.query})" />\n        </div>\n    '
	};
	
	exports.default = SearchComponent;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./search.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./search.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".search {\n    position: fixed;\n    top: 56px;\n    width: 100%;\n}\n\n.search__input {\n    border: none;\n    width: 100%;\n    padding: 15px;\n    height: 56px;\n    font-size: 12px;\n    line-height: 28px;\n}\n\n.search__input:focus {\n    outline: none;\n}", ""]);
	
	// exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _nowPlaying = __webpack_require__(38);
	
	var _nowPlaying2 = _interopRequireDefault(_nowPlaying);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var nowPlaying = _angular2.default.module('nowPlaying', []).component('nowPlaying', _nowPlaying2.default).name;
	
	exports.default = nowPlaying;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(39);
	
	var _nowPlaying = __webpack_require__(41);
	
	var _nowPlaying2 = _interopRequireDefault(_nowPlaying);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NowPlayingComponent = {
	    bindings: {
	        episode: '<'
	    },
	    controller: _nowPlaying2.default,
	    template: '\n        <div class="current">\n            <button class="current__trigger" ng-click="$ctrl.startWatching()">\n                Continue watching "{{ $ctrl.episode.title }}"\n            </button>\n        </div>\n    '
	};
	
	exports.default = NowPlayingComponent;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./nowPlaying.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./nowPlaying.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".current {\n    margin: 30px 0 10px;\n    text-align: center;\n}\n\n.current__trigger {\n    -moz-appearance: none;\n         appearance: none;\n    -webkit-appearance: none;\n    border: none;\n    color: white;\n    text-decoration: none;\n    background: #F14B38;\n    padding: 10px;\n    border-radius: 5px;\n    font-weight: bold;\n    font-size: 12px;\n    max-width: 85vw;\n    display: block;\n    margin: 0 auto;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n}", ""]);
	
	// exports


/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NowPlayingController = function () {
	    function NowPlayingController($location) {
	        _classCallCheck(this, NowPlayingController);
	
	        this.$location = $location;
	    }
	
	    _createClass(NowPlayingController, [{
	        key: 'startWatching',
	        value: function startWatching() {
	            this.$location.path('/watch/' + this.episode.id);
	        }
	    }]);
	
	    return NowPlayingController;
	}();
	
	NowPlayingController.$inject = ['$location'];
	
	exports.default = NowPlayingController;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _episodePlayer = __webpack_require__(43);
	
	var _episodePlayer2 = _interopRequireDefault(_episodePlayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var episodePlayer = _angular2.default.module('episodePlayer', []).component('episodePlayer', _episodePlayer2.default).name;
	
	exports.default = episodePlayer;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _episodePlayer = __webpack_require__(44);
	
	var _episodePlayer2 = _interopRequireDefault(_episodePlayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EpisodePlayerComponent = {
	    bindings: {
	        episode: '<'
	    },
	    controller: _episodePlayer2.default,
	    template: '\n        <div class="episode-player">\n            <video controls>\n                <source type="video/mp4" />\n            </video>\n        </div>\n    '
	};
	
	exports.default = EpisodePlayerComponent;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EpisodePlayerController = function () {
	    function EpisodePlayerController($window, $element, friendsService) {
	        _classCallCheck(this, EpisodePlayerController);
	
	        this.$window = $window;
	        this.$element = $element;
	        this.friendsService = friendsService;
	
	        this.video = null;
	        this.isAutoPaused = false;
	
	        this.onOrientationChanged = this.onOrientationChanged.bind(this);
	    }
	
	    _createClass(EpisodePlayerController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            this.video = this.$element.find('video')[0];
	
	            this.bindEvents();
	            this.playVideo();
	        }
	    }, {
	        key: '$onDestroy',
	        value: function $onDestroy() {
	            this.video = null;
	            this.$window.removeEventListener('deviceorientation', this.onOrientationChanged, false);
	        }
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            this.$window.addEventListener('deviceorientation', this.onOrientationChanged, false);
	        }
	    }, {
	        key: 'playVideo',
	        value: function playVideo() {
	            this.video.setAttribute('src', '/video/' + this.episode.id + '.mp4');
	            this.video.play();
	
	            this.friendsService.saveNowPlayingEpisode(this.episode);
	        }
	    }, {
	        key: 'onOrientationChanged',
	        value: function onOrientationChanged(event) {
	            var isFacingDown = event.alpha === 0 && event.beta === 180 && event.gamma === 0;
	            var isFacingUp = event.alpha === 0 && event.beta === 0 && event.gamma === 0;
	
	            if (isFacingDown && !this.video.paused) {
	                this.isAutoPaused = true;
	                this.video.pause();
	            }
	
	            if (isFacingUp && this.video.paused && this.isAutoPaused) {
	                this.isAutoPaused = false;
	                this.video.play();
	            }
	        }
	    }]);
	
	    return EpisodePlayerController;
	}();
	
	EpisodePlayerController.$inject = ['$window', '$element', 'friendsService'];
	
	exports.default = EpisodePlayerController;

/***/ }
]);
//# sourceMappingURL=app.js.map