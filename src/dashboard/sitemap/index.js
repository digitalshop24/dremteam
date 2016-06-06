'use strict';

import angular from 'angular';

export default angular.module('sitemap',
    [])
    .config($stateProvider => {
        $stateProvider
            .state('sitemap', {
                url: '/sitemap',
                template: require("./template.html")
            });
    });
