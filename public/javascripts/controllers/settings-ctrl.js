angular.module('RDash')
.controller('SettingsCtrl', ['$scope', '$location','$mdSidenav', '$timeout', 'userService', 'buildingService', '$mdDialog', SettingsCtrl]);


function SettingsCtrl($scope, $location, $mdSidenav, $timeout, userService, buildingService,  $mdDialog) {
	console.log("settings ctrl open");
	$scope.building = {};
	$scope.buildings = {};
	$scope.toolbar.title = "Settings";


	$scope.cancel = function() {
		console.log("calcelled");
		$scope.building.name ="";
		$scope.building.address ="";
		$scope.building.telephone ="";

		$mdDialog.cancel();
	};
	$scope.createBuilding = function() {
		console.log("creating building");
		$scope.building.users = [$scope.currentUser._id];
		console.log($scope.building);
		buildingService.insertBuilding($scope.building)
		.success(function (response) {
			console.log("created");

			buildingService.getBuildings()
			.then(function (response) {
				$scope.buildings = response.data;
				console.log($scope.buildings);

			}, function (error) {
				$scope.status = 'Unable to get buildings: ' + error.message;
			});

		})
		.error(function (error) {
			$scope.status = 'Unable to create building: ' + error.message;
		});
		$mdDialog.hide();
	};


	$scope.openBuildingDialog = function(ev) {
		$mdDialog.show({
			contentElement: '#buildingDialog',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true
		}).then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
	};

	$scope.editBuilding = function (building) {
		$scope.building.name 		= building.name;
		$scope.building.address 	= building.address;
		$scope.building.telephone	= building.telephone;
		$mdDialog.show({
			contentElement: '#buildingDialog',
			parent: angular.element(document.body),
			clickOutsideToClose: true
		}).then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
	};

	buildingService.getBuildingsByUser($scope.currentUser._id)
			.then(function (response) {
				$scope.buildings = response.data;
				console.log($scope.buildings);

			}, function (error) {
				$scope.status = 'Unable to get buildings: ' + error.message;
			});            
}

