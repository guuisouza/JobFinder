const express = require('express')
const app = express()
const db = require('./db/connection')

const PORT = 3000

app.listen(PORT, () => {
    console.log(`O Express está rodando na porta ${PORT}`)
})

// db connection
db
    .authenticate()
    .then(() => {
        console.log("Conectado ao sqlite com sucesso!")
    })
    .catch(error => {
        console.log("Ocorreu um erro ao conectar: " + error)
    })

// routes
app.get('/', (req, res) => {
    res.send("Funcionando 3")
})