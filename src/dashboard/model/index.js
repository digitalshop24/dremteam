'use strict';

import angular from 'angular';
import ModelCtrl from './controller.js';
import ModelService from './service.js';


export default angular.module('dashboard.model', [])
    .service('modelService', ModelService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.model', {
                template: require('./template.html'),
                url: '/model',
                controller: ModelCtrl,
                controllerAs: 'ctrl',
                // resolve: {
                //     token: ($stateParams) => {
                //         return $stateParams.reset_password_token;
                //     }
                // }
            });
    });
