const Sequelize = require("sequelize");
const sequelize = require("./baza.js");

const Rola = sequelize.import(__dirname+"/rola.js");
const LicniPodaci = sequelize.import(__dirname+"/licniPodaci.js");

const Korisnik = sequelize.define('Korisnik',{
    username: Sequelize.STRING,
    password: Sequelize.STRING,/*{
            type:Sequelize.STRING,
            validate:{
                is:{
                    args:[/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,20}/g],
                    msg:"Nije pravilan format passworda"
                }
            }
    },*/
    datumDodavanja: Sequelize.DATE
})

Rola.hasOne(Korisnik, {as: 'Rola', foreignKey: 'RolaId'});
LicniPodaci.hasOne(Korisnik, {foreignKey: 'LicniPodaciId'});

module.exports = function(sequelize,DataTypes){
    return Korisnik;
}
