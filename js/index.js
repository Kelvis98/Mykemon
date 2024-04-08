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

    actualizaPosicion(x, y){
        this.x = x
        this.y = y
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

app.post("/mykemon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizaPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.listen(port, () => {
    console.log(`Servidor activo en port ${port}`)
})