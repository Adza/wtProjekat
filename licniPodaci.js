const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
const LicniPodaci = sequelize.define('LicniPodaci',{
    imePrezime: Sequelize.STRING, /*{
            type:Sequelize.STRING,
            validate:{
                is:{
                    args:[/^[A-ZŠĐČĆŽ][a-z-'čćžđš]{2,11}(\s[A-ZŠĐČĆŽ][a-z-'čćžđš]{2,11})*$/g],
                    msg:"Nije pravilano uneseno ime i prezime"
                }
            }
    },*/
    faxMail: Sequelize.STRING,/*{
        type:Sequelize.STRING,
        validate:{
            is:{
                args:[/^[a-z][a-z1-9]*\@etf\.unsa\.ba$/g],
                msg:"Nije pravilan format fakultetskog maila"
            }
        }
    },*/
    maxGrupa: Sequelize.STRING,
    regex: Sequelize.STRING,
    trSemestar: Sequelize.STRING,
    trAkaGodina: Sequelize.STRING,
    brIndexa: Sequelize.STRING,/*{
        type:Sequelize.STRING,
        validate:{
            is:{
                args:[/^(1)[0-9]{4}$/g],
                msg:"Nije pravilan format indexa"
            }
        }
    },*/
    grupa: Sequelize.STRING,
    bitbucketUrl: Sequelize.STRING,/*{
        type:Sequelize.STRING,
        validate:{
            is:{
                args:[/^https:\/\/[a-zA-Z0-9][a-zA-Z0-9]*@bitbucket\.org\/[a-zA-Z0-9][a-zA-Z0-9]*\/[a-zA-Z0-9][a-zA-Z0-9]*\.git$/g],
                msg:"Nije pravilan bitbucketURL-a"
            }
        }
    },*/
    bitbucketSSH: Sequelize.STRING,/*{
        type:Sequelize.STRING,
        validate:{
            is:{
                args:[/^git@bitbucket\.org:[a-zA-Z0-9][a-zA-Z0-9]*\/[a-zA-Z0-9][a-zA-Z0-9]*\.git$/g],
                msg:"Nije pravilan format indexa"
            }
        }
    },*/
    nazivRepozitorija: Sequelize.STRING,/*{
        type:Sequelize.STRING,
        validate:{
            is:{
                args:[/^(wtProjekat1[0-9]{4}|wtprojekat1[0-9]{4})$/g],
                msg:"Nije pravilan format indexa"
            }
        }
    },*/
    verify: {type: Sequelize.BOOLEAN, defaultValue: false},
    datumDodavanja: Sequelize.DATE
})
module.exports = function(sequelize,DataTypes){
    return LicniPodaci;
}