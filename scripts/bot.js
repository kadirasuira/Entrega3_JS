 //Globales
 let nombre, opcion1, opcion2;
 
 let mensajesBOT = [
    "¡Hola, soy BOT GAMER! ¿Cómo te llamas?",
    "",
    "",
];

let contador = 0;

let intentosMaximos = 6;
let frase_elegida = '';
let intentosRestantes = intentosMaximos;

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

  const palabraAdivinar = elegirPalabraAleatoria();
/////////////////////////////// Funciones Generales/////////////////////////////////////////
// Función para cambiar de Chats
function abrirChat(chatId) {
       // Obtén todas las opciones en el chat-list
       const opciones = document.querySelectorAll('.chat-list li');

       // Quita la clase active de todas las opciones
       opciones.forEach(opcion => {
           opcion.classList.remove('active');
       });
   
       // Agrega la clase active a la opción seleccionada
       const opcionSeleccionada = document.querySelector(`[data-chat="${chatId}"]`);
       opcionSeleccionada.classList.add('active');
   
       // Oculta todos los chats
       const chats = document.querySelectorAll('.chat');
       chats.forEach(chat => {
           chat.style.display = 'none';
       });
   
       // Muestra el chat correspondiente al chatId seleccionado
       const chat = document.getElementById(chatId);
       chat.style.display = 'block';
}

// Obtener la fecha y hora actual
function formatoTiempo() {
    const nuevoTiempo = new Date();
    const hora = nuevoTiempo.getHours();
    const minutos = nuevoTiempo.getMinutes();
    const ampm = hora >= 12 ? 'PM' : 'AM';
    const formatoHora = (hora % 12) || 12;
    const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;
    const dia = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][nuevoTiempo.getDay()];
    return `${formatoHora}:${formatoMinutos} ${ampm}, ${dia}`;
}

///////////////////////////////CHAT DE EL AHORCADO////////////////////////////////////////////
//Iniciar Proyecto
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(iniciarMensaje, 2000);
})

//Mensajes que enviará el BOT DE EL AHORCADO
function iniciarMensaje() {
    const horario = formatoTiempo();
    let BOT = mensajesBOT[contador];
    const chatHistory = document.querySelector('.chat-history ul');
    const mensajeBot = document.createElement('li');
    mensajeBot.className = 'clearfix';
    mensajeBot.innerHTML = `
        <div class="message-data">
            <span class="message-data-time">${horario} </span>
        </div>
        <div class="message my-message">${BOT}</div>
    `;
    chatHistory.appendChild(mensajeBot);
}

function agregarMensajeBot(mensaje){

    const horario = formatoTiempo();
    const chatHistory = document.querySelector('.chat-history ul');
    const mensajeBot = document.createElement('li');
    mensajeBot.className = 'clearfix';
    mensajeBot.innerHTML = `
                <div class="message-data">
                    <span class="message-data-time">${horario}</span>
                </div>
                <div class="message my-message">${mensaje}</div>
            `;
    chatHistory.appendChild(mensajeBot);
}
//Mensajes del Usuario y Manejo de Datos
function enviarMensaje(event) {
    if (event.key === "Enter") {
        const mensaje = document.getElementById('message-input').value;
        if (mensaje.trim() !== "") {
            switch (contador) {
                case 0:
                    nombre = mensaje;
                    mensajesBOT[1]= `Mucho gusto, ${nombre}, Bienvenido al Ahorcado! \n Menú \n 1. Iniciar el Juego \n 2. Instrucciones del Juego \n 3. Configuraciones del Juego`;
                    break;
                case 1:
                    opcion1 = parseInt(mensaje);
                    console.log(opcion1)
                    if(opcion1 == 1){
                        iniciarJuego().then(() => {
                            // La función instrucciones ha terminado, puedes realizar acciones aquí
                            mensajesBOT[2] = `Excelente, haz iniciado el Juego. Para regresar al Menu, escribe: Menu`;
                          }); 
                    }else if (opcion1 == 2){
                        instrucciones().then(() => {
                            // La función instrucciones ha terminado, puedes realizar acciones aquí
                            mensajesBOT[2] = `Excelente, ya sabes las instrucciones. Para regresar al Menu, escribe: Menu`;
                          }); 
                        break;
                    }else if (opcion1 == 3){
                        config();
                    }
                    break;
                case 2:
                    opcion2 = mensaje;
                    if (opcion2.toLowerCase() !== "menu") {
                        mensajesBOT[1] = "No ingresaste menu, pero igual se te regresará al Menu. \n Menú \n 1. Iniciar el Juego \n 2. Instrucciones del Juego \n 3. Configuraciones del Juego";
                    }else{
                        mensajesBOT[1] = "Regresando a MENU... \n Menú \n 1. Iniciar el Juego \n 2. Instrucciones del Juego \n 3. Configuraciones del Juego";
                    }
                    contador = 0;
                    break;
            }
            agregarMensajeUsuario(mensaje);
            contador++;
            document.getElementById('message-input').value = '';
        }
    }
}

// Asociar la función enviarMensaje al botón de envío
document.getElementById('send-button').addEventListener('click', function() {
    const mensaje = document.getElementById('message-input').value;
    if (mensaje.trim() !== "") {
        switch (contador) {
            case 0:
                    nombre = mensaje;
                    mensajesBOT[1]= `Mucho gusto, ${nombre}, Bienvenido al Ahorcado! \n Menú \n 1. Iniciar el Juego \n 2. Instrucciones del Juego \n 3. Configuraciones del Juego`;
                    break;
                case 1:
                    opcion1 = parseInt(mensaje);
                    console.log(opcion1)
                    if(opcion1 == 1){
                        iniciarJuego().then(() => {
                            // La función instrucciones ha terminado, puedes realizar acciones aquí
                            mensajesBOT[2] = `Excelente, haz iniciado el Juego. Para regresar al Menu, escribe: Menu`;
                          }); 
                    }else if (opcion1 == 2){
                        instrucciones().then(() => {
                            // La función instrucciones ha terminado, puedes realizar acciones aquí
                            mensajesBOT[2] = `Excelente, ya sabes las instrucciones. Para regresar al Menu, escribe: Menu`;
                          }); 
                        break;
                    }else if (opcion1 == 3){
                        config();
                    }
                    break;
                case 2:
                    opcion2 = mensaje;
                    if (opcion2.toLowerCase() !== "menu") {
                        mensajesBOT[1] = "No ingresaste menu, pero igual se te regresará al Menu. \n Menú \n 1. Iniciar el Juego \n 2. Instrucciones del Juego \n 3. Configuraciones del Juego";
                    }else{
                        mensajesBOT[1] = "Regresando a MENU... \n Menú \n 1. Iniciar el Juego \n 2. Instrucciones del Juego \n 3. Configuraciones del Juego";
                    }
                    contador = 0;
                    break;
        }
        agregarMensajeUsuario(mensaje);
        contador++;
        document.getElementById('message-input').value = '';
    }
});

//Función para agregar los Mensajes del Usuario EN CHAT DE EL AHORCADO
function agregarMensajeUsuario(mensaje){
    const horario = formatoTiempo();
    const chatHistory = document.querySelector('.chat-history ul');
    const mensajeNuevo = document.createElement('li');
    mensajeNuevo.className = 'clearfix';
    mensajeNuevo.innerHTML = `
                <div class="message-data text-right">
                    <span class="message-data-time">${horario}</span>
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
                </div>
                <div class="message other-message float-right">${mensaje}</div>
            `;
    chatHistory.appendChild(mensajeNuevo);
    setTimeout(iniciarMensaje, 2000);
}
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////CHAT DE INSTRUCCIONES///////////////////////////////////////////
function instrucciones() {
    return new Promise((resolve) => {
      habilitarChat2();
      imprimirMensajeInstruc();
      // Realiza alguna lógica adicional si es necesario.
      // Una vez que hayas terminado, resuelve la promesa.
      resolve();
    });
  }

// Imprimir Mensaje de Instrucciones     
function imprimirMensajeInstruc() {

    const guideBot = [
        "Intrucciones del Ahorcado",
        "Las palabras tienen que ver con los nombres de un animal",
        "Si en tal caso la palabra tiene una tilde, no la ponga, el programa se lo pondra como error.",
        "Tienes 5 Vidas de fábrica",
        "¡BUENA SUERTE! \n Para cerrar el Chat de Instrucciones, diga cerrar. \n Si desea mantener el Chat Abierto toque el chat de Ahorcado"
    ];

    let contadorI = 0;

    for (let contadorI = 0; contadorI < guideBot.length; contadorI++) {
        setTimeout(() => {
            const horario = formatoTiempo();
            let BOTI = guideBot[contadorI];
            const chatHistory = document.querySelector('.history2 ul');
            const mensajeBot = document.createElement('li');
            mensajeBot.className = 'clearfix';
            mensajeBot.innerHTML = `
                <div class="message-data">
                    <span class="message-data-time">${horario}</span>
                </div>
                <div class="message my-message">${BOTI}</div>
            `;
            chatHistory.appendChild(mensajeBot);
        }, contadorI * 2000); // Espera 2 segundos entre cada mensaje
    }
}

//Función para habilitar el Chat de Instrucciones
function habilitarChat2() {
    // Oculta el chat1
    const chat1 = document.getElementById('chat1');
    chat1.style.display = 'none';

    // Muestra el chat2
    const chat2 = document.getElementById('chat2');
    chat2.style.display = 'block';

    // Muestra el chat-list
    const chatList = document.getElementById('chatlist2');
    chatList.style.display = 'block';

    // Obtén todas las opciones en el chat-list
    const opciones = document.querySelectorAll('.chat-list li');

    // Quita la clase active de todas las opciones
    opciones.forEach(opcion => {
        opcion.classList.remove('active');
    });

    // Agrega la clase active a la opción seleccionada
    const opcionSeleccionada = document.querySelector(`[data-chat="chat2"]`);
    opcionSeleccionada.classList.add('active');
}


//Función para agregar los Mensajes del Usuario

function agregarMensajeUsuarioI(mensaje){
    const horario = formatoTiempo();
    const chatHistory = document.querySelector('.history2 ul');
    const mensajeNuevo = document.createElement('li');
    mensajeNuevo.className = 'clearfix';
    mensajeNuevo.innerHTML = `
                <div class="message-data text-right">
                    <span class="message-data-time">${horario}</span>
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
                </div>
                <div class="message other-message float-right">${mensaje}</div>
            `;
    chatHistory.appendChild(mensajeNuevo);
}
// Agregar mensaje final del Bot
function agregarMensajeBotI(mensaje){

    const horario = formatoTiempo();
    const chatHistory = document.querySelector('.history2 ul');
    const mensajeBot = document.createElement('li');
    mensajeBot.className = 'clearfix';
    mensajeBot.innerHTML = `
                <div class="message-data">
                    <span class="message-data-time">${horario}</span>
                </div>
                <div class="message my-message">${mensaje}</div>
            `;
    chatHistory.appendChild(mensajeBot);
}

//Mensajes del Usuario y Manejo de Datos
function enviarMensajeI(event) {
    if (event.key === "Enter") {
        const mensaje = document.getElementById('message-input2').value;
        agregarMensajeUsuarioI(mensaje);
        document.getElementById('message-input2').value = '';

        if (mensaje.toLowerCase() !== "cerrar") {
            agregarMensajeBotI("No dijiste cerrar, se mantendrá el Chat. Porfavor entrar al otro haciendole click.");
        }else{
            cerrarChat2();
        }
    }
}

document.getElementById('send-button2').addEventListener('click', function() {
    const mensaje = document.getElementById('message-input2').value;
    agregarMensajeUsuarioI(mensaje);
    document.getElementById('message-input2').value = '';

    if (mensaje.toLowerCase() !== "cerrar") {
        agregarMensajeBotI("No dijiste cerrar, se mantendrá el Chat. Porfavor entrar al otro haciendole click.");
    }else{
        cerrarChat2();
    }
});

//Función para cerrar el Chat de Instrucciones
function cerrarChat2() {
    // Oculta el chat1
    const chat1 = document.getElementById('chat1');
    chat1.style.display = 'block';

    // Muestra el chat2
    const chat2 = document.getElementById('chat2');
    chat2.style.display = 'none';

    // Muestra el chat-list
    const chatList = document.getElementById('chatlist2');
    chatList.style.display = 'none';

    // Obtén todas las opciones en el chat-list
    const opciones = document.querySelectorAll('.chat-list li');

    // Quita la clase active de todas las opciones
    opciones.forEach(opcion => {
        opcion.classList.remove('active');
    });

    // Agrega la clase active a la opción seleccionada
    const opcionSeleccionada = document.querySelector(`[data-chat="chat1"]`);
    opcionSeleccionada.classList.add('active');
}
//////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////// AHORCADO EL JUEGO /////////////////////////////

function iniciarJuego() {
    return new Promise((resolve) => {
        habilitarChat3();
        jugarAhorcado()
        resolve();
    });
  }


  function habilitarChat3() {
    // Oculta el chat1
    const chat1 = document.getElementById('chat1');
    chat1.style.display = 'none';

    // Oculta el chat1
    const chat2 = document.getElementById('chat2');
    chat2.style.display = 'none';


    // Muestra el chat3
    const chat3 = document.getElementById('chat3');
    chat3.style.display = 'block';

    // Muestra el chat-list
    const chatList = document.getElementById('chatlist3');
    chatList.style.display = 'block';

    // Obtén todas las opciones en el chat-list
    const opciones = document.querySelectorAll('.chat-list li');

    // Quita la clase active de todas las opciones
    opciones.forEach(opcion => {
        opcion.classList.remove('active');
    });

    // Agrega la clase active a la opción seleccionada
    const opcionSeleccionada = document.querySelector(`[data-chat="chat3"]`);
    opcionSeleccionada.classList.add('active');
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
function jugarAhorcado(letra) {

    
    const letrasAdivinadas = [];
    while (intentosRestantes >= 0) {

        let intentos = 0;
        let letras = [];

        const progresoActual = mostrarProgreso(palabraAdivinar, letrasAdivinadas);
        const progresoActualSinEspacios = progresoActual.replace(/ /g, '');

        letra[intentos] = mensaje;

        if (progresoActualSinEspacios === palabraAdivinar) {
            alert(`¡Felicidades ${nombre}! Has adivinado la palabra: ${palabraAdivinar}`);
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



function agregarMensajeBotJ(mensaje) {
    const chatHistory = document.querySelector('.history3 ul');
    const mensajeBot = document.createElement('li');
    mensajeBot.className = 'clearfix';
    mensajeBot.innerHTML = `
        <div class="message-data">
            <span class="message-data-time">${horario} </span>
        </div>
        <div class="message my-message">${mensaje}</div>
    `;
    chatHistory.appendChild(mensajeBot);
}

function agregarMensajeUsuarioJ(mensaje) {
    const chatHistory = document.querySelector('.history3 ul');
    const mensajeNuevo = document.createElement('li');
    mensajeNuevo.className = 'clearfix';
    mensajeNuevo.innerHTML = `
        <div class="message-data text-right">
            <span class="message-data-time">${horario}</span>
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
        </div>
        <div class="message other-message float-right">${mensaje}</div>
    `;
    chatHistory.appendChild(mensajeNuevo);
}

//Mensajes del Usuario y Manejo de Datos
function enviarMensajeI(event) {
    if (event.key === "Enter") {
        const mensaje = document.getElementById('message-input3').value;
        agregarMensajeUsuarioI(mensaje);
        document.getElementById('message-input2').value = '';

        if (mensaje.toLowerCase() !== "cerrar") {
            agregarMensajeBotI("No dijiste cerrar, se mantendrá el Chat. Porfavor entrar al otro haciendole click.");
        }else{
            cerrarChat2();
        }
    }
}

document.getElementById('send-button3').addEventListener('click', function() {
    const mensaje = document.getElementById('message-input3').value;
    agregarMensajeUsuarioJ(mensaje);
    document.getElementById('message-input2').value = '';
    jugarAhorcado(mensaje);
});