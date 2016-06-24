'use strict';

import extend from 'extend';
import StaffCtrl from './controller.js';

export default class Recruiting {
    constructor($modal, $rootScope) { 
        this.modal = $modal;
        this.rootscope = $rootScope;
        this.default = {
            animation: true,
            controller: StaffCtrl,
            controllerAs: 'ctrl',
            template: require('./template.html')
        };
    }

    open(options) {
        options = extend(this.default, options);
        this.modal.open(options);
    }
    
}