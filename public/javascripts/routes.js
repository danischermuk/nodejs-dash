'use strict';

/**
 * Route configuration for the RDash module.
 */
 angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/dashboard.html',

            resolve: {
                buildings: ['buildingService',
                function(buildingService) {

                    return buildingService.getBuildings();
                }]
            },

            controller: 'DashCtrl'
        })
        .state('tables', {
            url: '/tables',
            templateUrl: 'templates/tables.html'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html'
        })
        .state('room', {
            url: '/b/:buildingId/r/:roomId',
            templateUrl: 'templates/room.html',

            resolve: {
                buildings: ['buildingService',
                function(buildingService) {
                    return buildingService.getBuildings();
                }],
                building: ['$stateParams', 'buildingService',
                function($stateParams, buildingService) {
                    return buildingService.getBuilding($stateParams.buildingId);
                }],
                room: ['$stateParams', 'buildingService',
                function($stateParams, buildingService) {

                    return buildingService.getBuildingRoom($stateParams.buildingId, $stateParams.roomId);
                }]

            },

            controller: 'RoomCtrl'
        })
        .state('building', {
            url: '/b/:buildingId',

            resolve: {
                buildings: ['buildingService',
                function(buildingService) {

                    return buildingService.getBuildings();
                }],
                building: ['$stateParams', 'buildingService',
                function($stateParams, buildingService) {

                    return buildingService.getBuilding($stateParams.buildingId);
                }]
            },

            templateUrl: 'templates/building.html',
            controller: 'BuildingCtrl'
        });
    }
    ]);