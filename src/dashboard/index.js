'use strict';

import angular from 'angular';
import sitemap from './sitemap/index';
import main from './main/index';
import catalog from './catalog/index';
import contacts from './contacts/index';
import model from './model/index';
import cart from './cart/index';
import cart2 from './cart2/index';
import cart3 from './cart3/index';

export default angular.module('dashboard',
    [   
        sitemap.name,
        main.name,
        catalog.name,
        contacts.name,
        model.name,
        cart.name,
        cart2.name,
        cart3.name
    ])
    // .service('login', Login)
    // .service('modal', Modal)
    // .service('modalSpeed', ModalSpeed)
    // .service('notificationService', NotificationService)
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
                    },
                    'dashboard-footer@dashboard': {
                        template: require('./footer/template.html')
                    }
                }
            });
    })
    // .config($provide => {
    //     $provide.decorator('taOptions', ['$delegate', function(taOptions){
    //         taOptions.toolbar = [
    //             ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
    //             ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
    //             ['justifyLeft','justifyCenter','justifyRight', 'justifyFull', 'insertLink']
    //         ];
    //         return taOptions;
    //     }]);
    // });
