import angular from 'angular';
import DrawerComponent from './drawer.component';

const drawer = angular
    .module('drawer', [])
    .component('drawer', DrawerComponent)
    .name;

export default drawer;