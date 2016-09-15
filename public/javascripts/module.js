var app = angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngMaterial', 'ngMessages']);

app.factory('userService', ['$http', function($http) {

    var urlBase = '/api/user';
    var userService = {};

    userService.getUsers = function () {
        return $http.get(urlBase);
    };

    userService.getMe = function () {
        return $http.get(urlBase + '/me');
    };


    userService.getUser = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    userService.insertUser = function (cust) {
        return $http.post(urlBase, cust);
    };

    userService.updateUser = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    userService.deleteUser = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    userService.getUserMenu = function (id) {
        return $http.get(urlBase + '/' + id + '/menu');
    };


    
    return userService;
}]);

app.factory('buildingService', ['$http', function($http) {

    var urlBase = '/api/building';
    var buildingService = {};

    buildingService.getBuildings = function () {
        return $http.get(urlBase);
    };

    buildingService.getBuilding = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    buildingService.getBuildingsByUser = function (id) {
        return $http.get(urlBase + '/user/' + id);
    };

    buildingService.insertBuilding = function (cust) {
        return $http.post(urlBase, cust);
    };

    buildingService.updateBuilding = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    buildingService.deleteBuilding = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    
    return buildingService;
}]);

app.factory('roomService', ['$http', function($http) {

    var urlBase = '/api/room/';
    var roomService = {};

    roomService.getRooms = function () {
        return $http.get(urlBase);
    };

    roomService.getRoom = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    roomService.insertRoom = function (cust) {
        return $http.post(urlBase, cust);
    };

    roomService.updateRoom = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    roomService.deleteRoom = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    
    return roomService;
}]);