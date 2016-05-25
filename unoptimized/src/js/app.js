(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'app.drawer', 'app.search'])
        .config(function ($sceProvider) {
            $sceProvider.enabled(false);
        });
})();