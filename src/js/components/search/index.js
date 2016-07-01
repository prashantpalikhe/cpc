import angular from 'angular';
import SearchComponent from './search.component';

const search = angular
    .module('search', [])
    .component('search', SearchComponent)
    .name;

export default search;