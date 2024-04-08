const express = require("express")
const cors = require("cors")

const port = 8080
const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }

    asignarMykemon(mykemon){
        this.mykemon = mykemon
    }
}

class Mykemon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mykemon/:jugadorId", (req, res) => {

    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mykemon || ""
    const mykemon = new Mykemon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMykemon(mykemon)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.listen(port, () => {
    console.log(`Servidor activo en port ${port}`)
})