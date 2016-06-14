'use strict';

import angular from 'angular';
// import index from './index/index';
import dashboard from './dashboard/index';
import Api from './api';

export default angular.module('app',
    [
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'youtube-embed',
        'slick',
        dashboard.name
        
    ])
    .service('api', Api)
    .config(($locationProvider) => {
        $locationProvider.html5Mode(true);
    })
    .run(($rootScope) => {
        $rootScope.$on('$stateChangeError', () => {
            console.log("Error");
        });
    });
