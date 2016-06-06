'use strict';

import angular from 'angular';
import localStorage from './service';

export default angular.module('localStorage', ['ngStorage'])
    .service('localStorage', localStorage)
    .config(($localStorageProvider) => {
        $localStorageProvider.setKeyPrefix('project-prefix-');
    });
