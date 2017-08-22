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
		.when('/song/:id', {
			templateUrl: 'partials/song-form.html',
			controller: 'EditSongCtrl'
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

app.controller('EditSongCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){
		var Songs = $resource('/api/songs/:id', { id: '@_id' }, {
			update: { method: 'PUT' }
		});

		Songs.get({ id: $routeParams.id }, function(song){
			$scope.song = song;
		});

		$scope.save = function(){
			Songs.update($scope.song, function(){
				$location.path('/');
			});
		}
	}]);
