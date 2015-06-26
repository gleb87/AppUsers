app.factory('randomUsers', ['$http', function($http) {
	var numberOfUsers = 100;

	return $http.get('http://api.randomuser.me/?results=' + numberOfUsers)
	.success(function(data) {
		return data;
	})
	.error(function(data) {
		return data;
	});
}]);