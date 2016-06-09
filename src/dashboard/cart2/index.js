'use strict';

import angular from 'angular';
import Cart2Ctrl from './controller.js';
import Cart2Service from './service.js';


export default angular.module('dashboard.cart2', [])
    .service('cart2Service', Cart2Service)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.cart2', {
                template: require('./template.html'),
                url: '/cart-step-2',
                controller: Cart2Ctrl,
                controllerAs: 'ctrl',
                // resolve: {
                //     token: ($stateParams) => {
                //         return $stateParams.reset_password_token;
                //     }
                // }
            });
    });
