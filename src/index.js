'use strict';

import angular from 'angular';
// import index from './index/index';
import dashboard from './dashboard/index';
// import Api from './api';
import session from './auth/session';
import auth from './auth/auth';
import localStorage from './auth/localstorage/index';

export default angular.module('app',
    [
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'youtube-embed',
        'slick',
        localStorage.name,
        dashboard.name
        
    ])
    // .service('api', Api)
    .service('session', session)
    .service('auth', auth)
    .config(($locationProvider) => {
        $locationProvider.html5Mode(true);
    });
