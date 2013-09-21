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
  
  $scope.exito = false;
  
  $scope.cuando_ejecuta = function(dato) {
    if (dato == 4)
      $scope.exito = true;
    else
      alert("sigue intentando...");
  }
  
}]);


app.directive('pilasInterprete', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
    
      //elem[0].addEventListener('entrada', function (e) {console.log(e); alert('el usuaior ingreso: ' + e.texto)}, false);
      
      /* Se conecta al evento de impresion de pantalla que emite la consola.
         Cuando llega esta senal intenta conectarla con el callback de la
         directiva.
         
         Todo esto se evalua en el contexto del scope.
      */
      elem[0].addEventListener('salida', function (e) {
        var funcion = attrs.evaluador.replace("()", "(" + e.texto + ")");
        
        console.log(funcion);
      	scope.$eval(funcion);
        scope.$apply();
      }, false);
      
      iniciar_consola();
    },
    template: '<div id="consola" class="stretch console">' + 
       	'<div id="console" class="stretch">' +
        ' <ul id="output"></ul>' +
        '  <form>' + 
        '   <textarea autofocus id="exec" spellcheck="false" autocapitalize="off" rows="1" autocorrect="off"></textarea>' +
        '  </form>' +
      	' </div>' +
        '</div>',
  }
});