'use strict';

import angular from 'angular';
import dashboard from './dashboard/index';
import Api from './api';

export default angular.module('app',
    [
        'ui.router',
        'ui.bootstrap',
        'slick',
        'ngStorage',
        'yaMap',
        'rzModule',
        'ng',
        'ui.router.title',
        require('angular-sanitize'),
        dashboard.name
    ])
    .service('api', Api)
    .config(($locationProvider, $localStorageProvider) => {
        $locationProvider.html5Mode(true);
        $localStorageProvider.setKeyPrefix('dt-agency-');
    })
    .run(($rootScope, $state) => {
        $rootScope.$state = $state;

        $rootScope.$on('$stateChangeError', () => {
            console.log("Error");
        });
    });