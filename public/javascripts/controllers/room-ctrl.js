angular.module('RDash')
.controller('RoomCtrl', ['$scope', 'buildings', 'building', 'room', '$location','$mdSidenav', '$timeout', 'userService', 'buildingService', '$mdDialog', '$stateParams',  RoomCtrl]);


function RoomCtrl($scope, buildings, building, room, $location, $mdSidenav, $timeout, userService, buildingService,  $mdDialog, $stateParams) {
	console.log("room ctrl open");
	$scope.current.buildings 	= buildings.data;
	$scope.current.building  	= building.data;
	$scope.current.room 		= room.data;
	$scope.toolbar.title 		= $scope.current.room.name;

	$scope.currentAppliance		= {};
	$scope.edit					= false;
	$scope.delete				= false;

	console.log($scope.current.room);

	$scope.cancelDialog = function() {
		$mdDialog.cancel();
	};

	$scope.editDialog = function() {
		$scope.edit					= true;
		$scope.delete				= false;
	};

	$scope.openApplianceDialog = function(ev, appliance) {
		$scope.edit					= false;
		$scope.delete				= false;
		$scope.currentAppliance = appliance;
		$mdDialog.show({
			contentElement: '#applianceDialog',
			targetEvent: ev,
			clickOutsideToClose: true
		}).then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.edit					= false;
			$scope.delete				= false;
		});
	};

	$scope.showConfirmDelete = function(ev) {
		$scope.delete = true;
     };
}
