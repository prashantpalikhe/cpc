import angular from 'angular';
import AppComponent from './app.component';

const app = angular
    .module('app', [])
    .component('app', AppComponent)
    .name;

export default app;