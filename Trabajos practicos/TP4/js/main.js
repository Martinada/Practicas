//Variables
var arrayResultados;

var preguntas = [
{	
	codigo:0,
	pregunta:"¿Cuál es tu lenguaje de programación preferido?",
	header:"Lenguaje favorito",
	respuestas:["Javascript","Java","C#"]
},
{	
	codigo:1,
	pregunta:"¿Cuál es tu sistema operativo preferido?",
	header:"Sistema operativo favorito",
	respuestas:["Windows","Linux","Solaris"]
},
{	
	codigo:2,
	pregunta:"¿Qué editor de texto usás?",
	header:"Editor de texto",
	respuestas:["Sublime","Visual Studio","Atom"]
},
{	
	codigo:3,
	pregunta:"¿Cuál fue el primer lenguaje de programación que aprendiste?",
	header:"Primer lenguaje aprendido",
	respuestas:["Javascript","Java","C#"]
}
]

function recuperarResultados(){
	var resultadosRecuperados = localStorage.getItem("datosRecopilados");
	if(resultadosRecuperados===null) {
  		arrayResultados=[];
	}else{
  	datosParseados = JSON.parse(resultadosRecuperados);
  	arrayResultados = datosParseados.resultados;
  	//Creo filas por cada objeto guardado
  	crearLista();
	console.log(arrayResultados)
}
}
//Función para crear el select de objetos

function crearSelect(){
	var selectPaises = `<label for="paises" class="label-paises">País de residencia</label><div id=selectDiv><select name="paises" id="paises"><option value="0">Seleccione una opción</option></select><div id=spinner class=spinner></div></div><p id="errorPais">`;
	$('#datosForm').append(selectPaises);
	var spinner = ``
	console.log(spinner)
	$('#datosForm').append(spinner);
};

//Llamada Ajax para traer los países desde el servidor localHost

function llamadaAjax(){
	//Hace una llamada ajax al servidor local
	$.ajax({
	    url: "http://localhost:3000/",
	    type: "get",
	    //Si se puede conectar, trae los países desde localhost y crea las options con esos datos
	    success: function (response) {
	        if(response){
	            console.log(response);
	            var paises = JSON.parse(response);
	            crearOpciones(paises.paises);      
	            $('#spinner').remove();
	        }else{
	            console.log("No hay países para mostrar");
	        }       
	    },
	    //Si no se puede conectar, usa los países que tiene cargados
	    error: function(response) {
	   		console.log("no se pudo cargar el servidor")
	    	var paisesJSON = {
			"paises":[
    			{"nombre":"Argentina", "codigo":"AR"},
    			{"nombre":"Bolivia", "codigo":"BO"}, 
    			{"nombre":"Brasil", "codigo":"BR"},
    			{"nombre":"Chile", "codigo":"CL"},
    			{"nombre":"Paraguay", "codigo":"PY"},
    			{"nombre":"Uruguay", "codigo":"UY"},
			]};
			var paisesArray = paisesJSON.paises; 
			$('#spinner').remove();
			crearOpciones(paisesArray); 
		}
	}); 
};

//Función para crear las opciones de país recorriendo el array

function crearOpciones(opciones){
	$.each(opciones,function(index,elem){
		var option = `<option value="${elem.codigo}">${elem.nombre}</option>`
		$('#paises').append(option);
	});
};

//Función que crea las preguntas

function crearPreguntas(opciones){
	$.each(opciones,function(index,elem){
		var divPregunta = 	`<div id="pregunta${index}" class="divPregunta">
							<label for="enunciado${index}" class="label-enunciado">${elem.pregunta}</label>
							</div>
							<p id="error${index}">`
		$("#datosForm").append(divPregunta)
		var codigo = index;
		$.each(elem.respuestas, function(index,elem){
			var radioRespuesta = `<input type="radio" name=${codigo} class="option-input radio" value="${elem}"><label>${elem}</label>`
			var idDiv = "pregunta"+codigo;
			$('#'+idDiv).append(radioRespuesta);
		})
	});
};

//Validación del formulario

function validar(event){
	var valido = true;
	event.preventDefault();
	//validación del select
	var nacionalidad = $('#datosForm :selected').val();
	//console.log(nacionalidad);
	if(nacionalidad === "0"){
		$('#errorPais').text("Debe seleccionar un país");
		valido = false;
	}else{
		$('#errorPais').text("");
	}

	//chequear radio buttons
	var traerPreguntas = $('.divPregunta')
	for(i=0;i<preguntas.length;i++){
		var opcionSeleccionada = $('input:radio[name='+i+']:checked').val();
		if(!opcionSeleccionada){
			valido=false;
			$('#error'+i).text('Debe seleccionar una opción');
		}else{
			$('#error'+i).text('');
		}
	};

	if(valido===false){
		return
	}else{
		$("form").submit();
		recopilarDatos();
	}
}

function recopilarDatos(){
	var resultados = {};
	resultados.pais = $('#datosForm :selected').text();
	console.log(resultados.pais)
	for(i=0;i<preguntas.length;i++){
		var opcionResultado = $('input:radio[name='+i+']:checked').val();
		var nombreResultado = "pregunta"+ i
		console.log(nombreResultado)
		resultados[nombreResultado] = opcionResultado;
	}

	arrayResultados.push(resultados);

	var objetoResultados = {
		"resultados":arrayResultados,
		"extension":arrayResultados.length
	}
	var resultadosJSON = JSON.stringify(objetoResultados);
	console.log(resultadosJSON)
	localStorage.setItem("datosRecopilados",resultadosJSON);

}

//Crea la fila en la lista
function crearLista(){
	var headerNumero =`<th id="num">N°</th>`;
	$('thead').append(headerNumero);
	var headerPais = `<th>País de residencia</th>`
	$('thead').append(headerPais);
	$.each(preguntas,function(index,elem){
		var tableHeader = `<th>${elem.header}</th>`;
		$('thead').append(tableHeader);
	})
	
	$('tbody').children().remove();
	
	$.each(arrayResultados, function(index,elem){
  		var fila = `<tr><td>${index}</td><td>${elem.pais}</td><td>${elem.pregunta0}</td><td>${elem.pregunta1}</td><td>${elem.pregunta2}</td><td>${elem.pregunta3}</td></tr>`
  		$('table').append(fila);
  		})
	}


//Llamadas a funciones	
crearSelect();
llamadaAjax();
crearPreguntas(preguntas);
recuperarResultados();
$('button').on('click',validar);
