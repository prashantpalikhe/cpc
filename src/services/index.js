import angular from 'angular';
import friends from './friends';

const services = angular
    .module('app.services', [
        friends
    ])
    .name;

export default services;