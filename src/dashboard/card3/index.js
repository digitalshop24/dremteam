'use strict';

import angular from 'angular';
import Card3Ctrl from './controller.js';
import Card3Service from './service.js';


export default angular.module('dashboard.card3', [])
    .service('card3Service', Card3Service)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.card3', {
                template: require('./template.html'),
                url: '/card-step-3',
                controller: Card3Ctrl,
                controllerAs: 'ctrl',
                // resolve: {
                //     token: ($stateParams) => {
                //         return $stateParams.reset_password_token;
                //     }
                // }
            });
    });
