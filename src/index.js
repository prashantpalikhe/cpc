import angular from 'angular';
import angularRouter from 'angular-route';
import routes from './app.routes';
import Services from './services';
import Components from './components';

angular
    .module('friendsflix', [
        'ngRoute',
        Services,
        Components
    ])
    .config(routes);

