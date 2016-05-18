/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$location','$mdSidenav', '$timeout', MasterCtrl]);

function MasterCtrl($scope, $location, $mdSidenav, $timeout) {

    $scope.go = function ( path ) {
           console.log(path);
          $location.path( path );
     };


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
	
	$scope.dashboard = {	"name": 	"Dashboard",
							"url":		"/#",
							"type":		"item",
							"iconUrl": 	"/images/dash.svg",							
						}; 
	$scope.rooms =		{
							"name": 	"Rooms",
							"url":		"/#",
							"type":		"menu"
						};
	$scope.rooms.items =  [{	"name": "Room1",
											"url":	"/tables",
											"type":	"item"
									   }, {	
											"name": "Room2",
											"url":	"/#",
											"type":	"item"
									   },{	
											"name": "Room3",
											"url":	"/#",
											"type":	"item"
									   } ];
	$scope.settings = {	"name": 	"Settings",
							"url":		"/#",
							"type":		"item",
							"iconUrl": 	"/images/settings.svg",							
						}; 									

	
}


    
