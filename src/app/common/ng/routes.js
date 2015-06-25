(function () {
    /*-- begin iify--*/
'use strict';

angular
    .module('app')
    .config(configureRoutes);

/* @ngInject */
function configureRoutes($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    // routes
    $routeProvider
        .when("/", {            
            templateUrl: 'home/partial1.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
}
/*-- end iify--*/
}());