import angular from 'angular';
import NavigationComponent from './navigation.component';

const navigation = angular
    .module('navigation', [])
    .component('navigation', NavigationComponent)
    .name;

export default navigation;