(function () {
    'use strict';

    angular
        .module('app', ['app.drawer', 'app.card', 'app.search'])
        .config(configureApp);

    function configureApp($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlBlacklist([
            'https://r5---sn-5hne6n7l.c.docs.google.com'
        ]);
    }
})();