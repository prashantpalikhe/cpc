import angular from 'angular';
import friendsService from './friends.service.js';

const friends = angular
    .module('friends', [])
    .service('friendsService', friendsService)
    .name;

export default friends;