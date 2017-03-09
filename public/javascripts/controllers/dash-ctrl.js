angular.module('RDash')
.controller('DashCtrl', ['$state', 'buildings', 'appliances', '$scope', '$location','$mdSidenav', '$timeout', 'userService', 'buildingService', '$mdDialog', '$stateParams',  DashCtrl]);


function DashCtrl($state, buildings, appliances, $scope,  $location, $mdSidenav, $timeout, userService, buildingService,  $mdDialog, $stateParams) {
	console.log("dash ctrl open");
	
	
	$scope.current.buildings = buildings.data;
	$scope.appliances = appliances.data;
	$scope.toolbar.title = "DashBoard";

}