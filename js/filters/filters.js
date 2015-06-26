angular.module('customFilters', []).filter('cfNames', function() {
	return function(input) {
		var names = input.split(" ");
		for (var i = 0; i < names.length; i++) {
			names[i] = names[i][0].toUpperCase() + names[i].slice(1);
		};
		return names.join(" ");
	};
});