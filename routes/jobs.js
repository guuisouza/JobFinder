const express = require('express')
// objeto de rotas do express
const router = express.Router()
const Job = require('../models/Job')

// rota de teste
router.get('/test', (req,res)=>{
    res.send("Deu certo")
})

// detalhe da vaga
router.get('/view/:id', (req, res) => {
    Job.findOne({
        where: {id: req.params.id}
    }).then(job => {
        res.render('view', {
            job
        })
    }).catch(err => console.log(err))
})

// form da rota de envio
router.get('/add', (req, res) => {
    res.render('add')
})

// adiciona um job via post
router.post('/add', (req, res) => {

    let {title, salary, company, description, email, new_job} = req.body // pega dados do corpo da req

    // insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router