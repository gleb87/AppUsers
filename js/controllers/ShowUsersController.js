app.controller('ShowUsersController', ['$scope', '$routeParams', function($scope, $routeParams) {
	console.log($scope.numberOfUsers);
	$scope.numberOfUsers = $routeParams.numberOfUsers;
	console.log($scope.numberOfUsers); 
	if ($scope.loading) return;
	$scope.showUsers = $scope.users.slice(0, $scope.numberOfUsers);
}]);