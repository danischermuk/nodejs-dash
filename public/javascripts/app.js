var app = angular.module("RDash", ["ngRoute", "ngMaterial"]);
 
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