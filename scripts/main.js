/* JUEGO EL AHORCADO

ADIVINA EL ANIMAL, SE TE DARÁ UNA PISTA.

*/ 



// Número de intentos permitidos
let intentosMaximos = 6;
let jugador_nombre = '';
let frase_elegida = '';

let palabras = [
    "ardilla","gorila","iguana","pajaro",
    "tortuga", "tiburon", "serpiente", 
    "conejo", "gallina", "caballo", "medusa", "ballena",
    "cangrejo", "calamar", "jirafa" 
  ];
  
let frases = [
    "Animal que le gusta comer bellotas\n",
    "Animal grande que le gusta la banana\n", 
    "Animal de cuatro patas, parecido a un cocodrilo. \nEs el personaje principal de la pelicula 'Rango'.\n", 
    "No tiene dientes\n", 
    "Es lenta\n",
    "Viven en el océano, hay una canción de reggaetón que lo menciona\n",
    "No tiene patas y vive en la tierra\n",
    "Animal que le gusta saltar.\n", 
    "Animal que produce lo que muchas veces consumimos en el desayuno.\n",
    "Animal que se utilizaba como transporte antes de los carros.\n", 
    "Animal que vive en el agua y es un monstruo en la mitología griega.\n",
    "Animal mas grande del mundo\n","Animal que les gusta pescar y esconderse en la arena.\n", 
    "Este animal vive en el agua. Sale en Bob Esponja.\n",
    "Animal con gran altura\n" 
  ];



function menu(){
    alert("¡Bienvenido al Ahorcado");

    let opcion = parseInt(prompt("MENU DEL JUEGO \n 1. Empezar a Jugar \n 2. Instrucciones del Juego \n 3. Configuración del Juego \n INGRESE EL NÚMERO DE LA OPCION:"));

    if (opcion == 1){
        jugarAhorcado();
    }
    else if (opcion == 2){
        instrucciones();
    }
    else if (opcion == 3){
        configuraciones();
    }
    else{
        alert("Porfavor introduce una opción válida del Menú (Número)");
        menu();
    }
}

//Instrucciones
function instrucciones(){
    alert("Intrucciones del Ahorcado \n Las palabras tienen que ver con los nombres de un animal");
    alert("Si en tal caso la palabra tiene una tilde, no la ponga, el programa se lo pondra como error. \n Tienes 5 Vidas de fábrica");

    let opcion = parseInt(prompt("¡BUENA SUERTE! \n 1. Empezar a Jugar \n 2.Regresar a Menú \n INGRESE EL NÚMERO DE LA OPCION:"));

    if (opcion == 1){
        jugarAhorcado();
    }
    else if (opcion == 2){
        menu();
    }
    else{
        alert("Opción incorrecta, se le enviará al Menú....");
        menu();
    }
}

function configuraciones(){
    let opcion = parseInt(prompt("MENU DE CONFIGURACIONES \n 1. Agregar Palabras y Frase \n 2. Eliminar Palabras y Frase \n 3. Cambiar la cantidad de Vidas\n 4.Empezar el Juego \n INGRESE EL NÚMERO DE LA OPCION:"));

    if (opcion == 1){
        alert("RECUERDA QUE DEBE AGREGAR UNA PALABRA Y UNA FRASE PARA QUE JUEGO FUNCIONE CORRECTAMENTE");
        let nueva_palabra = prompt("INGRESE SU NUEVA PALABRA");
        palabras.push(nueva_palabra);
        let nueva_frase = prompt("INGRESE LA PISTA DE LA NUEVA PALABRA");
        frases.push(nueva_frase);
        alert ("PALABRA Y FRASE AGREGADA CORRECTAMENTE, REGRESANDO A CONFIGURACIONES....");
        
        //COMPROBAR QUE SE AGREGO
        for (let i = 0; i < palabras.length; i++) {
            console.log(`${i + 1}. ${palabras[i]}`);
            console.log(`${i + 1}. ${frases[i]}`);
        }
        
        configuraciones();
    }
    else if (opcion == 2){
        alert("RECUERDA QUE AL ELIMINAR UNA PALABRA ELIMINARÁ LA FRASE");
        let lista = palabras.map((elemento, indice) => `${indice + 1}. ${elemento}`).join('\n');
        let respuesta = parseInt(prompt(`Palabras del Juego:\n${lista} \n Pon el número de la palabra que deseas eliminar`));

        if (!isNaN(respuesta)) {
            let respuesta_verdadera = respuesta - 1;

            if (respuesta_verdadera >= 0 && respuesta_verdadera < palabras.length) {
                palabras.splice(respuesta_verdadera, 1);
                frases.splice(respuesta_verdadera, 1);

                alert("PALABRA Y FRASE ELIMINADA CORRECTAMENTE, REGRESANDO A CONFIGURACIONES....");
                //COMPROBAR QUE SE ELIMINO
                for (let i = 0; i < palabras.length; i++) {
                    console.log(`${i + 1}. ${palabras[i]}`);
                    console.log(`${i + 1}. ${frases[i]}`);
                }

                configuraciones();
            } else {
                alert("El número de palabra especificado no es válido.");
                configuraciones();
            }
        } else {
            alert("Por favor, ingresa un número válido.");
            configuraciones();  
        } 
    }
    else if (opcion == 3){
        alert ("EL JUEGO TRAE DE FÁBRICA 6 VIDAS, PUEDES CAMBIAR LA CANTIDAD");
        let nueva_vida = parseInt(prompt("Ingrese el número de cantiadad de vidas:"));
        intentosMaximos = nueva_vida;

        console.log(intentosMaximos);

        alert ("VIDAS CAMBIADAS! Regresando a configuraciones..");
        configuraciones();
    }

    else if (opcion == 4){
        jugarAhorcado();
    }
    else if (opcion == 4){
        alert ("REGRESANDO A MENU...");
        menu();
    }
    else{
        alert("Porfavor introduce una opción válida del Menú (Número)");
        configuraciones();
    }
}

// Función para elegir una palabra aleatoria
function elegirPalabraAleatoria() {

    const indice = Math.floor(Math.random() * palabras.length);
    frase_elegida = frases[indice];
    return palabras[indice];
}

// Función para mostrar el progreso actual de la palabra a adivinar
function mostrarProgreso(palabra, letrasAdivinadas) {

    let progreso = '';
    for (const letra of palabra) {
      if (letrasAdivinadas.includes(letra)) {
        progreso += letra + ' ';
      } else {
        progreso += '_ ';
      }
    }
    return progreso;
}

// Función para jugar al ahorcado
function jugarAhorcado() {
    let palabraAdivinar = elegirPalabraAleatoria();
    let letrasAdivinadas = [];
    let intentosRestantes = intentosMaximos;
  
    alert('///////INICIANDO AHORCADO//////');
    jugador_nombre = prompt('INGRESA TU APODO:');
    alert ('¡Bienvenido al Juego del Ahorcado! Adivina la palabra. \n ----------- RECERDATORIO ----------- \n Introduce sólo una letra en minúscula \n -------------------------------------');
        
    while (intentosRestantes >= 0) {

        const progresoActual = mostrarProgreso(palabraAdivinar, letrasAdivinadas);
        const progresoActualSinEspacios = progresoActual.replace(/ /g, '');

        

        if (progresoActualSinEspacios === palabraAdivinar) {
            alert(`¡Felicidades ${jugador_nombre}! Has adivinado la palabra: ${palabraAdivinar}`);
            alert("SISTEMA DE PUNTAJES AÚN NO DISPONIBLE, DISCULPAS :(")
            let opcion = parseInt(prompt("QUIERES JUGAR DE NUEVO? \n 1. Regresar Menú \n 2. Jugar de Nuevo \n 3. Salir del Juego\n INGRESE EL NÚMERO DE LA OPCION:"));

            if (opcion == 1){
                menu();
            }
            else if (opcion == 2){
                jugarAhorcado();
            }
            else if (opcion == 3){
                return;
            }
            else{
                alert("Opción inválida, terminando el programa...");
                return;
            }
            
          }
      
        else if (intentosRestantes == 0) {
            alert(`¡Has perdido! La palabra correcta era: ${palabraAdivinar}`);
            let opcion = parseInt(prompt("QUIERES JUGAR DE NUEVO? \n 1. Regresar Menú \n 2. Jugar de Nuevo \n 3. Salir del Juego\n INGRESE EL NÚMERO DE LA OPCION:"));

            if (opcion == 1){
                menu();
            }
            else if (opcion == 2){
                jugarAhorcado();
            }
            else if (opcion == 3){
                return;
            }
            else{
                alert("Opción inválida, terminando el programa...");
                return;
            }
        }

        alert(`PISTA: ${frase_elegida}\nPalabra a adivinar: ${progresoActual}\nIntentos restantes: ${intentosRestantes}`);

        const letraIngresada = prompt('Ingresa una letra:').toLowerCase();
    
        if (letraIngresada.length !== 1 || !letraIngresada.match(/[a-z]/)) {
          alert('Por favor, ingresa una sola letra válida.');
          continue;
        }
    
        else if (letrasAdivinadas.includes(letraIngresada)) {
          alert(`Ya has ingresado la letra ${letraIngresada} antes.`);
          continue;
        }
    
        letrasAdivinadas.push(letraIngresada);
    
        if (!palabraAdivinar.includes(letraIngresada)) {
          intentosRestantes--;
          alert(`La letra ${letraIngresada} no está en la palabra.`);
        }
    
    }
 }
    
menu();
  

