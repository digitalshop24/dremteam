'use strict';

import angular from 'angular';
import CartCtrl from './controller.js';
import CartService from './service.js';


export default angular.module('dashboard.cart', [])
    .service('cartService', CartService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.cart', {
                template: require('./template.html'),
                url: '/cart',
                controller: CartCtrl,
                controllerAs: 'ctrl',
                // resolve: {
                //     token: ($stateParams) => {
                //         return $stateParams.reset_password_token;
                //     }
                // }
            });
    });
