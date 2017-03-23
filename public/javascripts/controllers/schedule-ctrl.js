angular.module('RDash')
.controller('ScheduleCtrl', ['$state',  'jobs', '$scope', '$location','$mdSidenav', '$timeout', 'socket', '$mdDialog', '$stateParams',  ScheduleCtrl]);


function ScheduleCtrl($state,  jobs, $scope,  $location, $mdSidenav, $timeout, socket,  $mdDialog, $stateParams) {
	console.log("schedule ctrl open");

}