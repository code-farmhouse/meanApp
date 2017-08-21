var app = angular.module('meanApp', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})
		.when('/add-song', {
			templateUrl: 'partials/song-form.html',
			controller: 'AddSongCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.controller('HomeCtrl', ['$scope', '$resource', function($scope, $resource){
	var Songs = $resource('/api/songs');
	Songs.query(function(songs){$scope.songs = songs;});
}]);

app.controller('AddSongCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location){
		$scope.save = function(){
			var Songs = $resource('/api/songs');
			Songs.save($scope.song, function(){
				$location.path('/');
			});
		};
	}]);
