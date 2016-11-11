angular.module('RDash')
.controller('BuildingCtrl', ['$state', 'buildings', 'building', '$scope', '$location','$mdSidenav', '$timeout', 'userService', 'buildingService', '$mdDialog', '$stateParams',  BuildingCtrl]);


function BuildingCtrl($state, buildings, building, $scope,  $location, $mdSidenav, $timeout, userService, buildingService,  $mdDialog, $stateParams) {
	console.log("building ctrl open");
	
	$scope.current.building  = building.data;
	$scope.current.buildings = buildings.data;
	$scope.currentBuilding = building.data;
	$scope.toolbar.title = $scope.currentBuilding.name;
	$scope.newRoom = {};

	$scope.openRoomDialog = function(ev) {
		$scope.newRoom.name = "";
		$mdDialog.show({
			contentElement: '#roomDialog',
			targetEvent: ev,
			clickOutsideToClose: true
		}).then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
	};

	$scope.cancelDialog = function() {
		$mdDialog.cancel();
	};

	$scope.createRoom = function () {
		console.log("create Room");
		console.log($state.params.buildingId);
		buildingService.insertBuildingRoom($state.params.buildingId, $scope.newRoom)
		.then(function (response) {
			console.log(response);
			$state.reload();
			$mdDialog.hide();
		}, function (error) {
			$scope.status = 'Unable to create room: ' + error.message;
		});  
	};

}
