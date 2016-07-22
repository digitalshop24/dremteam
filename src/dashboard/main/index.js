'use strict';

import angular from 'angular';
import MainCtrl from './controller.js';
import MainService from './service.js';
import RecruitingModal from './modal/index.js';


export default angular.module('dashboard.main', [])
    .service('mainService', MainService)
    .service('recruitingModal', RecruitingModal)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.main', {
                template: require('./template.html'),
                url: '/',
                controller: MainCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    images: (mainService) => {
                        return mainService.getImagesForSlider();
                    },

                    models: staffService => {
                        return staffService.getStaff(true);
                    },

                    works: mainService => {
                        return mainService.getWorks();
                    },

                    $title: () => { return 'Главная'; },
                }
            });
    });
