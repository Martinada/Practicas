
$(document).ready(function(){

  var fotos = [
      {orden : 0,
      nombre : "frida",
      src : "img/frida.jpg",
      descubierto : false //agrego este attr para poder desactivar el click al cambiarle al valor.
      },

      {orden : 1,
      nombre : "frida",
      src : "img/frida.jpg",
      descubierto : false
      },

      {orden : 2,
      nombre : "chien",
      src : "img/chien.png",
      descubierto: false
      },

      {orden : 3,
      nombre : "chien",
      src : "img/chien.png",
      descubierto: false
      },

      {orden : 4,
      nombre : "ada",
      src : "img/ada.jpg",
      descubierto: false
      },

      {orden : 5,
      nombre : "ada",
      src : "img/ada.jpg",
      descubierto: false
      },

      {orden : 6,
      nombre : "grace",
      src : "img/grace.jpg",
      descubierto: false
      },

      {orden : 7,
      nombre : "grace",
      src : "img/grace.jpg",
      descubierto: false
      },

      {orden : 8,
      nombre : "marie",
      src : "img/marie.jpg",
      descubierto: false
      },

      {orden : 9,
      nombre : "marie",
      src : "img/marie.jpg",
      descubierto: false
      },

      {orden : 10,
      nombre : "michelle",
      src : "img/michelle.jpg",
      descubierto: false
      },

      {orden : 11,
      nombre : "michelle",
      src : "img/michelle.jpg",
      descubierto: false
      },
  ]

  function mezcla(a){ //shuffle para que las fichas se muestren aleatoriamente
    var j, x, i;

    for(i = a.length -1; i > 0; i--){

      j = Math.floor(Math.random()*(i+1));

      x = a[i];
      a [i] = fotos[j];
      a [j] = x;
    }
    return a;
  }

  var desorden = mezcla(fotos);

  var primer = true; //bandera para poder preguntar si es el primer o segundo click
  var contador = 0; //contador para permitir solo dos clicks
  var intentos = 24; //intentos q tiene el jugador para ganar
  var parejas = 6; //cantidad de parejas que deben formarse y asi poder decir si el jugador gano o no
  var anterior; // var donde guardo el objeto que se selecciona con el primer click
  var actual; // var donde guardo el objeto que se selecciona con el segundo click
  var sour1; // var donde guardo el valor del nombre para compararlos (primer click)
  var sour2; // var donde guardo el valor del nombre para compararlos (segundo click)

    var name = prompt("Ingresa tu nombre");
    alert("Hola " + name);

  $(".ficha").on('click', function(){

    //primero chequeamos si descubierto ya ha sido cambiado a true (lo setteamos en false en el objeto)
    //si descubierto es true, quiere decir que ya fue clickeada, por ende no lleva a cabo el resto de la funcion
    var id_global = $(this).attr('id');
    if(desorden[id_global].descubierto == true){
      return;
    }

    if (contador < 2 ){ //menos de dos clicks

      if (primer == true) { //carta de el primer click
        anterior = $(this);
        let id = anterior.attr('id');
        anterior.attr('src', desorden[id].src);
        sour1 = desorden[id].nombre;
        primer = false;
        contador++;
        desorden[id].descubierto = true;
      }else{ // carta del segundo click y aqui di vuelta las dos
        actual = $(this);
        let id = actual.attr('id');
        actual.attr('src', desorden[id].src);
        sour2 = desorden[id].nombre;
        primer = true;
        contador++;

        if (sour1 == sour2) { //comparo las dos cartas

          let id_anterior = anterior.attr('id');
          let id_actual = actual.attr('id');
          desorden[id_anterior].descubierto = true;  //cambiamos el atributo descubierto (inicializado en false)
          desorden[id_actual].descubierto = true;
          parejas-=1;
          if(parejas == 0){
            setTimeout(function(){
              alert('Ganaste crack!')
            },600)
          }
          else if (intentos == 0){
            setTimeout(function(){
            alert("Perdiste :(");
          },600)
          }
          contador = 0;
        }else{
          setTimeout(function(){
            anterior.attr('src', "img/back.jpg");
            actual.attr('src', "img/back.jpg");
            if (intentos == 0){
             alert("Perdiste :(")
            }
            contador = 0;
          }, 1000);
          let id_anterior = anterior.attr('id');
          desorden[id_anterior].descubierto = false;  //cambiamos el atributo descubierto (inicializado en false)
        }
        intentos -= 1;

      }
    }
  });
});
