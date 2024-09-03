const express = require('express')
// objeto de rotas do express
const router = express.Router()
const Job = require('../models/Job')

// rota de teste
router.get('/test', (req,res)=>{
    res.send("Deu certo")
})

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