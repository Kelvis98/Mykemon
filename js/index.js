const express = require("express")
const port = 8080
const app = express()

app.get("/", (req, res) => {
    res.send("Wasaaa")
})

app.listen(port, () => {
    console.log(`Servidor activo en port ${port}`)
})