var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/', {templateUrl: 'partials/index.html'}).
  	otherwise({redirectTo: '/'});
}]);

app.controller('TutorialCtrl', ['$scope', function($scope) {
  
  $scope.datos = {
  	nombre: 'Hugo Ruscitti',
  };
  
}]);