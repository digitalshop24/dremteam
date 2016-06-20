'use strict';

import angular from 'angular';
import HeaderCtrl from './header/controller.js';
import sitemap from './sitemap/index';
import main from './main/index';
import catalog from './catalog/index';
import contacts from './contacts/index';
import model from './model/index';
import card from './card/index';
import cart2 from './cart2/index';
import cart3 from './cart3/index';
import StaffService from './staffService';

export default angular.module('dashboard',
    [
        sitemap.name,
        main.name,
        catalog.name,
        contacts.name,
        model.name,
        card.name,
        cart2.name,
        cart3.name
    ])
    .service('staffService', StaffService)
    .config($stateProvider => {
        $stateProvider
            .state('dashboard', {
                abstract: true,
                views: {
                    '': {
                        template: require('./template.html')
                    }
                    ,
                    'dashboard-header@dashboard': {
                        template: require('./header/template.html'),
                        controller: HeaderCtrl,
                        controllerAs: 'ctrl'
                    },
                    'dashboard-footer@dashboard': {
                        template: require('./footer/template.html')
                    }
                }
            });
    });
