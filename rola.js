const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
const Rola = sequelize.define('Rola',{
    rola: Sequelize.STRING,
    datumDodavanja: Sequelize.DATE
})
module.exports = function(sequelize,DataTypes){
    return Rola;
}

