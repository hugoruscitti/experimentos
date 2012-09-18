$(function() {
  
var Persona = Backbone.Model.extend({
  nombre: "pepe",
  edad: 123,
});

window.persona = new Persona("pepe");

var VistaPersona = Backbone.View.extend({
  el: $("#persona"),
  render: function() {
    var data = this.model.toJSON();
    $(this.el).html(this.template(data));
  },
  template: function(data){
    html = $("#persona-template").html();
    return Mustache.render(html, data);
  }
});

window.vista_persona = new VistaPersona({model: persona});

persona.bind('change', vista_persona.render, vista_persona);
persona.set({nombre: "Hugo"});

$("#nombre").keyup(function() {persona.set({nombre: $(this).val()})});


/*
var object = {};

_.extend(object, Backbone.Events);

object.on("alert", function(msg) {
  alert("se lanzo " + msg);
});

object.trigger("alert", "pepe");

window.persona.on("change:nombre", function(modelo, nombre) {
  alert("han cambiando el nombre a " + nombre);
});

window.persona.set({nombre: "Pepe"});


var Ciudad = Backbone.Collection.extend({
  model: Persona,
});

window.ciudad = new Ciudad();
window.ciudad.add(window.persona);

*/
});
