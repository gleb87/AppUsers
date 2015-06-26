app.controller('MainController', ['$scope', '$routeParams', 'randomUsers', function($scope, $routeParams, randomUsers) {
	$scope.usersPerPage = 25;

	randomUsers.success(function(data) {
		$scope.users = data.results;

		//users table head
		$scope.sortBtns = [{
			title: "Name",
			url: "#/users/" + $routeParams.page + "/sort/name/reverse/0",
			glyphiconClass: "",
			srOnly: "",
		}, {
			title: "Email",
			url: "#/users/" + $routeParams.page + "/sort/email/reverse/0",
			glyphiconClass: "",
			srOnly: "",
		}, {
			title: "Username",
			url: "#/users/" + $routeParams.page + "/sort/username/reverse/0",
			glyphiconClass: "",
			srOnly: "",
		}, {
			title: "Date Of Birth",
			url: "#/users/" + $routeParams.page + "/sort/dob/reverse/0",
			glyphiconClass: "",
			srOnly: "",
		}];

		switch ($routeParams.sortBy) {
			case 'name':
				filter = sortByName;
				if ($routeParams.reverse === "1") {
					$scope.sortBtns[0].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet-alt";
					$scope.sortBtns[0].srOnly = "Sorted by Name reverse";
				} else {
					$scope.sortBtns[0].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet";
					$scope.sortBtns[0].srOnly = "Sorted by Name";
					$scope.sortBtns[0].url = "#/users/" + $routeParams.page + "/sort/name/reverse/1";
				};
				break;
			case 'email':
				filter = sortByEmail;
				if ($routeParams.reverse === "1") {
					$scope.sortBtns[1].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet-alt";
					$scope.sortBtns[1].srOnly = "Sorted by Email reverse";
				} else {
					$scope.sortBtns[1].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet";
					$scope.sortBtns[1].srOnly = "Sorted by Email";
					$scope.sortBtns[1].url = "#/users/" + $routeParams.page + "/sort/email/reverse/1";
				};
				break;
			case 'username':
				filter = sortByUsername;
				if ($routeParams.reverse === "1") {
					$scope.sortBtns[2].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet-alt";
					$scope.sortBtns[2].srOnly = "Sorted by Username reverse";
				} else {
					$scope.sortBtns[2].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet";
					$scope.sortBtns[2].srOnly = "Sorted by Username";
					$scope.sortBtns[2].url = "#/users/" + $routeParams.page + "/sort/username/reverse/1";
				};
				break;
			case 'dob':
				filter = sortByDob;
				if ($routeParams.reverse === "1") {
					$scope.sortBtns[3].glyphiconClass = "glyphicon glyphicon-sort-by-attributes-alt";
					$scope.sortBtns[3].srOnly = "Sorted by Date of Birth reverse";
				} else {
					$scope.sortBtns[3].glyphiconClass = "glyphicon glyphicon-sort-by-attributes";
					$scope.sortBtns[3].srOnly = "Sorted by Date of Birth";
					$scope.sortBtns[3].url = "#/users/" + $routeParams.page + "/sort/dob/reverse/1";
				};
				break;
			default:
				filter = sortByName;
				if ($routeParams.reverse === "1") {
					$scope.sortBtns[0].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet-alt";
					$scope.sortBtns[0].srOnly = "Sorted by Name reverse";
				} else {
					$scope.sortBtns[0].glyphiconClass = "glyphicon glyphicon-sort-by-alphabet";
					$scope.sortBtns[0].srOnly = "Sorted by Name";
					$scope.sortBtns[0].url = "#/users/" + $routeParams.page + "/sort/name/reverse/1";
				};
		};

		//sort users
		$scope.users.sort(filter);
		if ($routeParams.reverse === "1") {
			$scope.users.reverse();
		};

		//users table body
		var from = ($routeParams.page - 1) * $scope.usersPerPage;
		var to = from + $scope.usersPerPage;
		$scope.showUsers = $scope.users.slice(from, to);

		//pagination
		$scope.pagination = [];
		var pagesNum = Math.ceil($scope.users.length / $scope.usersPerPage);
		for (var i = 1; i <= pagesNum; i++) {
			var pageBtn = {};
			pageBtn.url = "#/users/" + i + "/sort/" + $routeParams.sortBy + "/reverse/" + $routeParams.reverse;
			if ($routeParams.page == i) {
				pageBtn.class = "active";
			} else {
				pageBtn.class = "";
			};
			$scope.pagination.push(pageBtn);
		};
		//prev btn
		$scope.prevBtn = {};
		var prevPage = $routeParams.page - 1;
		if (prevPage < 1) {
			$scope.prevBtn.url = "#/users/" + $routeParams.page + "/sort/" + $routeParams.sortBy + "/reverse/" + $routeParams.reverse;
			$scope.prevBtn.class = "disabled";
		} else {
			$scope.prevBtn.url = "#/users/" + prevPage + "/sort/" + $routeParams.sortBy + "/reverse/" + $routeParams.reverse;
			$scope.prevBtn.class = "";
		};
		//next btn
		$scope.nextBtn = {};
		var nextPage = +$routeParams.page + 1;
		if (nextPage > pagesNum) {
			$scope.nextBtn.url = "#/users/" + $routeParams.page + "/sort/" + $routeParams.sortBy + "/reverse/" + $routeParams.reverse;
			$scope.nextBtn.class = "disabled";
		} else {
			$scope.nextBtn.url = "#/users/" + nextPage + "/sort/" + $routeParams.sortBy + "/reverse/" + $routeParams.reverse;
			$scope.nextBtn.class = "";
		};
	});
}]);

//filters

function sortByName(user1, user2) {
	var name1 = user1.user.name.first;
	var name2 = user2.user.name.first;
	if (name1 > name2) {
		return 1;
	} else if (name1 < name2) {
		return -1;
	} else if (name1 == name2) {
		return 0;
	}
}

function sortByEmail(user1, user2) {
	var email1 = user1.user.email;
	var email2 = user2.user.email;
	if (email1 > email2) {
		return 1;
	} else if (email1 < email2) {
		return -1;
	} else if (email1 == email2) {
		return 0;
	}
}

function sortByUsername(user1, user2) {
	var username1 = user1.user.username;
	var username2 = user2.user.username;
	if (username1 > username2) {
		return 1;
	} else if (username1 < username2) {
		return -1;
	} else if (username1 == username2) {
		return 0;
	}
}

function sortByDob(user1, user2) {
	return user1.user.dob - user2.user.dob;
}