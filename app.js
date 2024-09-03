const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')

const PORT = 3000

app.listen(PORT, () => {
    console.log(`O Express está rodando na porta ${PORT}`)
})

// boddy parser no express
app.use(bodyParser.urlencoded({ extended: false }))

// handlebars
app.set('views', path.join(__dirname, 'views')) // diretorio das views
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})) // arquivo principal de layout da aplicação
app.set('view engine', 'handlebars') // qual a view engine (framework p renderizar views)

// static folder (css)
app.use(express.static(path.join(__dirname, 'public'))) // pasta de arquivos estáticos

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
    res.render('index') // renderiza o index (arquivo handlebars)
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))