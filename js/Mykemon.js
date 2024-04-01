const sectionAtaques = document.getElementById("selecionar-ataques")
const botonPetJugador =  document.getElementById("boton-Pet")

const botonPlayAgain = document.getElementById("boton-Play-again")

const spanPetJugador = document.getElementById("pet-jugador")
const spanPetPc = document.getElementById("pet-enemiga")
const pImgaenPetJugador = document.getElementById("imagen-pet-jugador")
const sectionPet = document.getElementById("Seleccionar-Pet")


const pImgaenPetPc = document.getElementById("imagen-pet-pc")

const spanVIdaJUgador = document.getElementById("vida-jugador")
const spanVidaPC = document.getElementById("vidad-pc")

const sectionMensaje = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDePc = document.getElementById("ataque-del-pc")

const sectionResultadoCombate = document.getElementById("resultado")
const sectionPlayAgain = document.getElementById("Play again")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const subtituloAtaques = document.getElementById("subtitulo-ataques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let mykemones = []
let mykemonesPc = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMykemones
let botones = []
let indexAtaqueJugador
let indexAtaquePc
let botonFire
let botonWater
let botonGround

let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos

let petJugador
let petJugadorObjeto
let petPCObjeto

let ataquesMykemonPc
let icono = ""
let iconoPc = ""

let victoriasJugador = 0
let victoriasPc = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/Mykemap.png"

class Mykemon{
    constructor(nombre, foto, vida, x = aleatorio(1, 780), y = aleatorio(1, 580) ){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMykemon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
        )
    }
}

let hipodoge = new Mykemon("Hipodoge", "./assets/Hipodoge.png", 5, 10, 10)
let capipepo = new Mykemon("Capipepo", "./assets/Capipepo.png", 5, 10, 10)
let ratigueya = new Mykemon("Ratigueya", "./assets/Ratigueya.png", 5, 10, 10)
let langostelvis = new Mykemon("Langostelvis", "./assets/Langostelvis.gif", 5, 10, 10)
let tucapalma = new Mykemon("Tucapalma", "./assets/Tucapalma.gif", 5, 10, 10)
let pydos = new Mykemon("Pydos", "./assets/Pydos.gif",5)

let hipodogePc = new Mykemon("Hipodoge", "./assets/Hipodoge.png",5)
let capipepoPC = new Mykemon("Capipepo", "./assets/Capipepo.png",5)
let ratigueyaPC = new Mykemon("Ratigueya", "./assets/Ratigueya.png",5)
let langostelvisPC = new Mykemon("Langostelvis", "./assets/Langostelvis.gif",5)
let tucapalmaPC = new Mykemon("Tucapalma", "./assets/Tucapalma.gif",5)
let pydosPC = new Mykemon("Pydos", "./assets/Pydos.gif",5)

hipodoge.ataques.push(
    { nombre: "💧", id:"boton-Water" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "☘️", id:"boton-Ground" },
)

capipepo.ataques.push(
    { nombre: "☘️", id:"boton-Ground" },
    { nombre: "☘️", id:"boton-Ground" },
    { nombre: "☘️", id:"boton-Ground" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "🔥", id:"boton-Fire" },
)

ratigueya.ataques.push(
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "☘️", id:"boton-Ground" },
)

langostelvis.ataques.push(
    { nombre: "💧", id:"boton-Water" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "☘️", id:"boton-Ground" },
)

tucapalma.ataques.push(
    { nombre: "☘️", id:"boton-Ground" },
    { nombre: "☘️", id:"boton-Ground" },
    { nombre: "☘️", id:"boton-Ground" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "🔥", id:"boton-Fire" },
)

pydos.ataques.push(
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "🔥", id:"boton-Fire" },
    { nombre: "💧", id:"boton-Water" },
    { nombre: "☘️", id:"boton-Ground" },
)

mykemones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos)
mykemonesPc.push(hipodogePc, capipepoPC, ratigueyaPC, langostelvisPC, tucapalmaPC, pydosPC)

function iniciarJuego(){
    
    sectionAtaques.style.display = "none"
    sectionVerMapa.style.display = "none"

    mykemones.forEach((mykemon) => {
        opcionDeMykemones = `
        <input type="radio" name="Pet" id=${mykemon.nombre} />
        <label class="tarjeta-de-mykemon" for=${mykemon.nombre}>
            <p>${mykemon.nombre}</p>
            <img src=${mykemon.foto} alt=${mykemon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMykemones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputTucapalma = document.getElementById("Tucapalma")
        inputPydos = document.getElementById("Pydos")
    })

    botonPetJugador.addEventListener("click", seleccionarPetJugador)
    
    botonPlayAgain.addEventListener("click", reiniciarJuego)

}

//Funcion de seleccion del jugador

function seleccionarPetJugador(){

    let jugar = false;

    //Condicionales para la seleccion y cambiar el DOM

    if(inputHipodoge.checked) {
        spanPetJugador.innerHTML = inputHipodoge.id
        petJugador = inputHipodoge.id
        pImgaenPetJugador.src = hipodoge.foto
        jugar=true
    }else if(inputCapipepo.checked){
        spanPetJugador.innerHTML = inputCapipepo.id
        petJugador = inputCapipepo.id
        pImgaenPetJugador.src = capipepo.foto
        jugar=true
    }else if(inputRatigueya.checked){
        spanPetJugador.innerHTML = inputRatigueya.id
        petJugador = inputRatigueya.id
        pImgaenPetJugador.src = ratigueya.foto
        jugar=true
    }else if(inputLangostelvis.checked){
        spanPetJugador.innerHTML = inputLangostelvis.id
        petJugador = inputLangostelvis.id
        pImgaenPetJugador.src = langostelvis.foto
        jugar=true
    }else if(inputTucapalma.checked){
        spanPetJugador.innerHTML = inputTucapalma.id
        petJugador = inputTucapalma.id
        pImgaenPetJugador.src = tucapalma.foto
        jugar=true
    }else if(inputPydos.checked){
        spanPetJugador.innerHTML = inputPydos.id
        petJugador = inputPydos.id
        pImgaenPetJugador.src = pydos.foto
        jugar=true
    }else{
        alert("Selecciona una Pet para jugar!!⛔⛔")
        //Solo si el jugador no elige una Pet
    }

    if(jugar){

        sectionPet.style.display = "none"
        //sectionAtaques.style.display = "flex"
        sectionVerMapa.style.display =  "flex"
        
        iniciarMapa()
        
        extraerAtaques(petJugador)
        seleccionarPetPc()
    }
    
}

function extraerAtaques(petJugador){
    let ataques
    for (let i = 0; i < mykemones.length; i++) {
        if (petJugador === mykemones[i].nombre) {
            ataques = mykemones[i].ataques
            mostrarAtaques(ataques) 
        }   
    }

}

function mostrarAtaques(ataques){
    ataques.forEach( (ataque) => {
        ataquesMykemon = `
        <button id=${ataque.id} class="boton-ataques Bataques">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML +=  ataquesMykemon
    } )
    
    botones = document.querySelectorAll(".Bataques")
   
}

//Funcion de seleccion de la PC
function  seleccionarPetPc(){

    let petRandom = aleatorio(0, mykemones.length -1)
    
    spanPetPc.innerHTML = mykemones[petRandom].nombre
    pImgaenPetPc.src= mykemones[petRandom].foto
    ataquesMykemonPc = mykemones[petRandom].ataques
    

    secuenciaAtaques()

}

//Funciones de ataques

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.innerText === "🔥") {
                ataqueJugador.push("FIRE")
                boton.style.background = "#112f58"
                boton.disabled = true
            }else if (e.target.innerText === "💧"){
                ataqueJugador.push("WATER")
                boton.style.background = "#112f58"
                boton.disabled = true
            }else {
                ataqueJugador.push("GROUND")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            ataqueRandomEnemigo()
        })
    })
    
}



function ataqueRandomEnemigo(){

    let ataqueRandom = aleatorio(0, ataquesMykemonPc.length -1)

    if(ataquesMykemonPc[ataqueRandom].nombre === "🔥"){
        ataqueEnemigo.push("FIRE")
        ataquesMykemonPc.splice(ataqueRandom,1)
    }else if(ataquesMykemonPc[ataqueRandom].nombre === "💧"){
        ataqueEnemigo.push("WATER")
        ataquesMykemonPc.splice(ataqueRandom,1)
    }else{
        ataqueEnemigo.push("GROUND") 
        ataquesMykemonPc.splice(ataqueRandom,1)
    }

    iniciarpelea()
}

function iniciarpelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }
}

//Combate

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaquePc = ataqueEnemigo[enemigo]
}

function combate(){

    for (let index = 0; index < ataqueJugador.length; index++) {
       if (ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponentes(index, index)
            crearMensaje("TIE", icono = "🟡", iconoPc = "🟡")
       }else if(ataqueJugador[index] == "FIRE" && ataqueEnemigo[index] == "GROUND" || ataqueJugador[index] == "WATER" && ataqueEnemigo[index] == "FIRE" || ataqueJugador[index] == "GROUND" && ataqueEnemigo[index] == "WATER"){
        indexAmbosOponentes(index, index)
            crearMensaje("WIN", icono = "✅", iconoPc = "❌")
            victoriasJugador++
            spanVIdaJUgador.innerHTML = victoriasJugador
       }else{
        indexAmbosOponentes(index, index)
            crearMensaje("LOSE", icono = "❌", iconoPc = "✅")
            victoriasPc++
            spanVidaPC.innerHTML = victoriasPc
       }
    }
    
    revisarVidas()
}

function revisarVidas(){

    if(victoriasJugador === victoriasPc){
        mensajeResultado("EMPATE!!")
    }else if(victoriasJugador > victoriasPc){
        mensajeResultado("GANASTE!!")
    }else {
        mensajeResultado("PERDISTE!!")
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaquePc = document.createElement("p")

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML  = indexAtaqueJugador + icono
    nuevoAtaquePc.innerHTML = iconoPc + indexAtaquePc  

    ataqueDelJugador.prepend(nuevoAtaqueJugador)
    ataqueDePc.prepend(nuevoAtaquePc)
}

function mensajeResultado(resultadoFinal){
    
    sectionResultadoCombate.innerHTML = resultadoFinal

    subtituloAtaques.style.display = "none"
    contenedorAtaques.style.display = "none"
    sectionPlayAgain.removeAttribute("hidden")
}

//Play again

function reiniciarJuego(){
    location.reload()
}

//Funcion de numeros aleatorios

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    petJugadorObjeto.x = petJugadorObjeto.x + petJugadorObjeto.velocidadX
    petJugadorObjeto.y = petJugadorObjeto.y + petJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    petJugadorObjeto.pintarMykemon()
    
    mykemonesPc.forEach((mykemonPc) => {
        mykemonPc.pintarMykemon()
        if(petJugadorObjeto.velocidadX !== 0 ||
            petJugadorObjeto.velocidadY !== 0){
                revisarColision(mykemonPc)
            }
    })
}

function moverArriba(){
   petJugadorObjeto.velocidadY = -5
}

function moverIzquierda(){
    petJugadorObjeto.velocidadX = -5
}

 function moverAbajo(){
    petJugadorObjeto.velocidadY = 5
}

 function moverDerecho(){
    petJugadorObjeto.velocidadX = 5
}

function detenerMovimiento(){
    petJugadorObjeto.velocidadX = 0
    petJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    
    switch (event.key) {
        case "ArrowUp":
        case "w":
            moverArriba()
            break
        case "ArrowLeft":
        case "a":
            moverIzquierda()
            break
        case "ArrowDown":
        case "s":
            moverAbajo()
            break
        case "ArrowRight":
        case "d":
            moverDerecho()
            break
        default:
            break;
    }
}

function  iniciarMapa(){
    mapa.width = 800
    mapa.height = 600
    petJugadorObjeto = obtenerObjetoMascota(petJugador)


    intervalo = setInterval(pintarCanvas, 50)

        window.addEventListener("keydown", sePresionoUnaTecla)

        window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mykemones.length; i++) {
        if (petJugador === mykemones[i].nombre) {
          return mykemones[i]
        }
    }

}

function revisarColision(enemigo){

    const arribaPetPc = enemigo.y
    const abajoPetPc = enemigo.y + enemigo.alto
    const izquierdaPetPc = enemigo.x
    const derechaPetPC = enemigo.x + enemigo.ancho

    const arribaPet = petJugadorObjeto.y
    const abajoPet = petJugadorObjeto.y + petJugadorObjeto.alto
    const izquierdaPet = petJugadorObjeto.x
    const derechaPet = petJugadorObjeto.x + petJugadorObjeto.ancho
    
    if(
        abajoPet < arribaPetPc ||
        arribaPet > abajoPetPc ||
        derechaPet < izquierdaPetPc ||
        izquierdaPet > derechaPetPC
    ){
        return
    }

    detenerMovimiento()
    alert("Inicia el combate con " + enemigo.nombre)
}

window.addEventListener('load', iniciarJuego)