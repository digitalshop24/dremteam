'use strict';

import angular from 'angular';
import CatalogCtrl from './controller.js';
import CatalogService from './service.js';


export default angular.module('dashboard.catalog', [])
    .service('catalogService', CatalogService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.catalog', {
                template: require('./template.html'),
                url: '/catalog',
                controller: CatalogCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    staff: staffService => {
                        return staffService.getStaff();
                    },

                    sets: staffService => {
                        return staffService.getSets();
                    }
                }
            });
    });
