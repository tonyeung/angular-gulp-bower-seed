(function () {
    /*-- begin iify--*/
'use strict';

angular
    .module('app')
    .config(configureRoutes);

/* @ngInject */
function configureRoutes($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    // routes
    $routeProvider
        .when("/", {            
            templateUrl: 'home/templates/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
}
/*-- end iify--*/
}());