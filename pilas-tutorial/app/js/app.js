var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	when('/',  {templateUrl: 'partials/paso1.html', controller: 'Paso1Ctrl'}).
  	when('/2', {templateUrl: 'partials/paso2.html', controller: 'Paso2Ctrl'}).
  	when('/3', {templateUrl: 'partials/paso3.html', controller: 'Paso3Ctrl'}).
  	when('/4', {templateUrl: 'partials/paso4.html', controller: 'Paso4Ctrl'}).
  	when('/5', {templateUrl: 'partials/paso5.html', controller: 'Paso5Ctrl'}).
  	otherwise({redirectTo: '/'});
}]);



app.controller('TutorialCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.mostrar_mensaje = false;
  $scope.mensaje = "";
  
  $scope.ocultar_mensajes = function() {
  	$scope.mostrar_mensaje = false;
  }
  
  function es_actual() {
    var path_del_ejercicio = "/" + this.path;
    var path_actual = $location.path();
    return (path_actual == path_del_ejercicio);
  }
  
  $scope.ejercicios = [
    {numero: 1, completado: false, path:  '', es_actual: es_actual},
    {numero: 2, completado: false, path: '2', es_actual: es_actual},
    {numero: 3, completado: false, path: '3', es_actual: es_actual},
    {numero: 4, completado: false, path: '4', es_actual: es_actual},
    {numero: 5, completado: false, path: '5', es_actual: es_actual},
  ];
    
   /* La funcion "cuando_ejecuta" contiene el callback que se va
      a llamar cada vez que el usuario escriba dentro de la consola.
      
      El argumento que recibe es la salida por pantalla (en formato string).
      
      Este callback va a ser sobre-escrito por cada controller. Así cada
      consigna del tutorial hacer sus propias validaciones y flujo de
      programa.
    */
   $scope.cuando_ejecuta = function(datos) {
   };
    
}]);

app.controller('Paso1Ctrl', ['$scope', '$location', function($scope, $location) {
  
  $scope.$parent.cuando_ejecuta = function(dato) {
    if (dato == 4) {
      $location.path('/2');
      $scope.$parent.mensaje = "Ejercicio 1 completado!";
      $scope.$parent.mostrar_mensaje = true;
      $scope.$parent.ejercicios[0]['completado'] = true;
    } 
  }
  
}]);

app.controller('Paso2Ctrl', ['$scope', '$location', function($scope, $location) {
  $scope.$parent.cuando_ejecuta = function(data) {
   
    if (window['nombre']) {
      $scope.$parent.nombre = window.nombre;
    }
  }
  
}]);


app.directive('pilasInterprete', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
    
      var exec = document.getElementById('exec');
      /* Se conecta al evento de impresion de pantalla que emite la consola.
         Cuando llega esta senal intenta conectarla con el callback de la
         directiva.
         
         Todo esto se evalua en el contexto del scope. */
      elem[0].addEventListener('salida', function (e) {
        var funcion = attrs.evaluador.replace("()", "('" + e.texto + "')");
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
  
app.directive('pilasCanvas', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
      pilas = new Pilas();
	  pilas.iniciar({ancho: 320, alto: 240, data_path: 'data'});
      
      pilas.onready = function() {
  		var fondo = new pilas.fondos.Plano();

  		window.aceituna = new pilas.actores.Aceituna();
  		//window.aceituna.aprender(pilas.habilidades.SeguirAlMouse);
  		//window.bomba = new pilas.actores.Bomba();
  		//window.bomba.aprender(pilas.habilidades.MoverseConElTeclado);
  		//window.bomba.x = 50;
  		//window.actor = new pilas.actores.Actor();
  		//window.aceituna.x = [100, 0, 100, 0];

  		//pilas.definir_modos({puntos_de_control: true})
	  }
	  pilas.ejecutar();
    },
    template: '<div class="centrado">' + 
    		  '<canvas id="canvas"></canvas>' +
    		  '</div>'
  }
});