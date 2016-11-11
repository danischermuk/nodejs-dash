angular.module('RDash')
.controller('RoomCtrl', ['$scope', 'buildings', 'building', 'room', '$location','$mdSidenav', '$timeout', 'userService', 'buildingService', '$mdDialog', '$stateParams', RoomCtrl]);


function RoomCtrl($scope, buildings, building, room, $location, $mdSidenav, $timeout, userService, buildingService,  $mdDialog, $stateParams) {
	console.log("room ctrl open");
	$scope.current.buildings 	= buildings.data;
	$scope.current.building  	= building.data;
	$scope.current.room 		= room.data;
	$scope.toolbar.title 		= $scope.current.room.name;

}
