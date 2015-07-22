(function () {
    /*-- begin iify--*/
    'use strict';

    angular.element(document).ready(function () {
        var app = angular.module("app");

        app.constant("API_PATH", "http://localhost:16845/");

        angular.bootstrap(document, ["app"]);
    });

    /*-- end iify--*/
}());