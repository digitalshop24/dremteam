'use strict';

import angular from 'angular';
import ModelCtrl from './controller.js';


export default angular.module('dashboard.model', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.model', {
                template: require('./template.html'),
                url: '/person/:id',
                controller: ModelCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    person: ($stateParams, staffService) => {
                        return staffService.getById($stateParams.id);
                    },

                    $title: ['person', function(person) {
                        return person.name;
                    }]
                }
            });
    });
