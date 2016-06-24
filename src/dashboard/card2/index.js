'use strict';

import angular from 'angular';
import Card2Ctrl from './controller.js';
import Card2Service from './service.js';


export default angular.module('dashboard.card2', [])
    .service('cart2Service', Card2Service)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.card2', {
                template: require('./template.html'),
                url: '/card-step-2',
                controller: Card2Ctrl,
                controllerAs: 'ctrl',
                // resolve: {
                //     token: ($stateParams) => {
                //         return $stateParams.reset_password_token;
                //     }
                // }
            });
    });
