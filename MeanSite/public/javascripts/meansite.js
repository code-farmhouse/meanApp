var app = angular.module('meanApp', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);

app.controller('HomeCtrl', ['$scope', '$resource',
	fuction($scope, $resource){
		var Songs = $resource('/api/songs');
		Songs.query(function(songs){
			$scope.songs = songs;
		});
	}]);
