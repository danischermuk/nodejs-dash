/**
 * Master Controller
 */

 angular.module('RDash')
 .controller('MasterCtrl', ['$scope', '$location','$mdSidenav', '$timeout', 'userService', 'buildingService', 'roomService', '$mdDialog', MasterCtrl]);


 function MasterCtrl($scope, $location, $mdSidenav, $timeout, userService, buildingService, roomService, $mdDialog) {

  $scope.hide = function() {
    console.log("hidden master");
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    console.log("calcelled master");
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    console.log(answer);
    $mdDialog.hide(answer);
  };


  $scope.go = function ( path ) {
   console.log(path);
   $location.path( path );
 };

 $scope.users       = {};
 $scope.currentUser = {};
 $scope.userMenu    = {};
 $scope.getUser = function () {
   userService.getMe()
   .then(function (response) {
    $scope.currentUser = response.data;
    console.log($scope.currentUser);
    userService.getUserMenu($scope.currentUser.username)
    .then( function (response) {
      $scope.userMenu = response.data;
    })
    buildingService.getBuildingsByUser($scope.currentUser.username)
    .then( function (response) {
      $scope.buildings = response.data;
    }, function (error) {
      $scope.status = 'Unable to find any buildings for this user' + error.message;
    })
  }, function (error) {
    $scope.status = 'Unable to load user: ' + error.message;
  });
 };
 $scope.getUser();


 

	 /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
     $scope.debounce = function(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
        args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    };
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
     $scope.buildDelayedToggler=function (navID) {
      return $scope.debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID).toggle();
      }, 200);
    };
    
    $scope.buildToggler = function (navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
      }
    };
    


    $scope.toggleLeft = $scope.buildDelayedToggler('left');	

    $scope.dashboard = {  "name":   "Dashboard",
    "url":    "/#",
    "type":   "item",
    "iconUrl":  "/images/dash.svg",             
  };

  $scope.rooms =    {
    "name":   "Building1",
    "url":    "/#",
    "type":   "menu"
  };

  $scope.rooms.items =  [{  "name": "Room1",
  "url":  "/tables",
  "type": "item"
}, { 
  "name": "Room2",
  "url":  "/#",
  "type": "item"
},{  
  "name": "Room3",
  "url":  "/#",
  "type": "item"
} ];

$scope.settings = { "name":   "Settings",
"url":    "/settings",
"type":   "item",
"iconUrl":  "/images/settings.svg",             
};                  
}



