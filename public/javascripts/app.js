var app = angular.module("RDash", ["ngRoute", "ngMaterial"]);
 
app.config(function($routeProvider, $locationProvider)
{
    $routeProvider.when("/", {
        templateUrl : "templates/home.html",
        controller : "homeCtrl"
    })
    .when("/login", {
        templateUrl : "templates/login.html",
        controller : "loginCtrl"
    })
    .when("/profile", {
    	templateUrl: "templates/profile.html",
    	controller: "profileCtrl"
    })
    .otherwise({ redirectTo : "/" });
	
})
 
app.controller('homeCtrl', ['$scope', function($scope)
{
	$scope.saludo = "Hola desde la home";	
}]);
 
app.controller('loginCtrl', ['$scope', 'loginService', function($scope, loginService)
{
	$scope.saludo = "Hola desde login";	
	$scope.login = function(user)
	{
		loginService.login('email='+user.email+'&password='+user.password).then(function(result)
        {
            alert(JSON.stringify(result));
        });
	}
}]);
 
app.controller('profileCtrl', ['$scope', function($scope)
{
	$scope.saludo = "Hola desde profile";	
}]);
 
app.service('loginService', ['$http', function($http)
{
    var obj = {};
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    obj.login = function(user)
    {
        return $http.post('/login', user).then(function(results) 
        {
            return results;
        });
    }  
    return obj;
}]);