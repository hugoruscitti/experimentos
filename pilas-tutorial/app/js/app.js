var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/', {templateUrl: 'partials/index.html'}).
  	when('/numeros', {templateUrl: 'partials/numeros.html'}).
  	otherwise({redirectTo: '/'});
}]);

app.controller('TutorialCtrl', ['$scope', function($scope) {
  
  $scope.datos = {
  	nombre: 'Hugo Ruscitti',
  };
  
}]);