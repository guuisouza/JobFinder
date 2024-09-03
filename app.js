const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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

    let search = req.query.job
    let query = '%'+search+'%'

    // SE não tiver busca, execute a lógica da home
    if (!search) {
        Job.findAll({order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', { // renderiza a view com os jobs dentro dela
                jobs
            })
        })
        .catch(err => console.log(err))
    } else {
        Job.findAll({
            where: {title: { [Op.like]: query}},
            order:[['createdAt', 'DESC']]
        })
        .then(jobs => {
            res.render('index', { // renderiza a view com os jobs dentro dela
                jobs, search
            })
        })
        .catch(err => console.log(err))
    }
})

// jobs routes
app.use('/jobs', require('./routes/jobs'))