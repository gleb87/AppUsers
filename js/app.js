var app = angular.module("AppUsers", ['ngRoute', 'customFilters']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/users/:page/sort/:sortBy/reverse/:reverse', {
			controller: 'MainController',
			templateUrl: 'views/users.html'
		})
		.otherwise({
    		redirectTo: '/users/1/sort/name/reverse/0'
  		});
});