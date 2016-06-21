'use strict';

import angular from "angular";
import ChooseButtonCtrl from './controller.js';

export default angular.module('dashboard.choose-button', [])
    .directive('chooseButton', function () {
        return {
            bindToController: true,
            restrict: 'EA',
            scope: {
                person: '=',
                icon: '@'
            },
            template: require('./template.html'),
            controller: ChooseButtonCtrl,
            controllerAs: 'ctrl'
        }
    });