'use strict';

import angular from 'angular';
import Cart3Ctrl from './controller.js';
import Cart3Service from './service.js';


export default angular.module('dashboard.cart3', [])
    .service('cart3Service', Cart3Service)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.cart3', {
                template: require('./template.html'),
                url: '/cart-step-3',
                controller: Cart3Ctrl,
                controllerAs: 'ctrl',
                // resolve: {
                //     token: ($stateParams) => {
                //         return $stateParams.reset_password_token;
                //     }
                // }
            });
    });
