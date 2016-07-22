'use strict';

import angular from 'angular';
import СontactsCtrl from './controller.js';
import СontactsService from './service.js';


export default angular.module('dashboard.сontacts', [])
    .service('сontactsService', СontactsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.сontacts', {
                template: require('./template.html'),
                url: '/сontacts',
                controller: СontactsCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    $title: () => { return 'Контакты'; },
                }
            });
    });
