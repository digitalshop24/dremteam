'use strict';

import angular from 'angular';
import CartCtrl from './controller.js';
import CartService from './service.js';
import CartStorage from './storage.js';


export default angular.module('dashboard.cart', [])
    .service('cartService', CartService)
    .service('cardStorage', CartStorage)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.cart', {
                template: require('./template.html'),
                url: '/cart',
                controller: CartCtrl,
                controllerAs: 'ctrl'
            });
    });
