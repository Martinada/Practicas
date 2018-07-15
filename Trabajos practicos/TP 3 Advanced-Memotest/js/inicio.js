$(document).ready(function() {
  var dificultad;
  $('.botonInicio').on('click', function(){
    let name = $('.name').val();
    let informacion = {};
    informacion['nombre'] = name;
    informacion['dificultad'] = dificultad;
    localStorage.setItem("informacion",JSON.stringify(informacion));
  });
  $('.dropdown-item').on('click',function() {
    dificultad = $(this).html()
  });
});
