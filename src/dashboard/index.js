'use strict';

import angular from 'angular';
import HeaderCtrl from './header/controller.js';
import sitemap from './sitemap/index';
import main from './main/index';
import catalog from './catalog/index';
import contacts from './contacts/index';
import model from './model/index';
import card from './card/index';
import card2 from './card2/index';
import chooseButton from './choose-button/index';
import StaffService from './staffService';
import validInit from './valid-init/index';
import sliderInit from './slider-init/index';

export default angular.module('dashboard',
    [
        sitemap.name,
        main.name,
        catalog.name,
        contacts.name,
        model.name,
        chooseButton.name,
        card.name,
        card2.name,
        validInit.name,
        sliderInit.name
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
    })
    .run(($rootScope, $state, $window, $timeout, $location, $anchorScroll) => {
        var scrollPosCache = {};


        $rootScope.$on('$stateChangeStart', function() {
            // store scroll position for the current view
            if ($state.current) {
                scrollPosCache[$state.current.url] = [ $window.pageXOffset, $window.pageYOffset ];
            }
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            // if hash is specified explicitly, it trumps previously stored scroll position
            if ($location.hash()) {
                $anchorScroll();

                // else get previous scroll position; if none, scroll to the top of the page
            } else {
                var prevScrollPos = scrollPosCache[$state.current.url] || [ 0, 0 ];
                $timeout(function() {
                    $window.scrollTo(prevScrollPos[0], prevScrollPos[1]);
                }, 0);
            }
        });
    });
