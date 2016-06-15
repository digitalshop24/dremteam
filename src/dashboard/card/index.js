'use strict';

import angular from 'angular';
import CardCtrl from './controller.js';
import CardService from './service.js';
import CartStorage from './storage.js';


export default angular.module('dashboard.card', [])
    .service('cartService', CardService)
    .service('cardStorage', CartStorage)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.card', {
                template: require('./template.html'),
                url: '/card',
                controller: CardCtrl,
                controllerAs: 'ctrl'
            });
    });
