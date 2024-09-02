const Sequelize = require('sequelize')
const db = require('../db/connection')

const Job = db.define('job', {
    title: {   // campo title na tabela 
        type: Sequelize.STRING, // tipo do campo na tabela
    },
    description: {
        type: Sequelize.STRING
    },
    salary: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    new_job: {
        type: Sequelize.INTEGER 
    },
})

// exportar
module.exports = Job