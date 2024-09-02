const Sequelize = require('sequelize')

// instancia do sequelize, informando alguns dados
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/app.db'
})

module.exports = sequelize