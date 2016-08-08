'use strict';

import angular from "angular";

export default angular.module('dashboard.valid-init', [])
    .directive('validInit', function () {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    initValid();
                });
            }
        }
    });