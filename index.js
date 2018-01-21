//Administrator podaci: username:Admin password:admin1234
const express = require ('express');
const session = require('express-session');
const bodyParser= require('body-parser');
const fs = require('fs');
const app = express();
const Sequelize = require('sequelize');
const sequelize = require('./baza.js');
const Korisnik = sequelize.import(__dirname+"/korisnik.js");
const LicniPodaci = sequelize.import(__dirname+"/licniPodaci.js");
const Rola = sequelize.import(__dirname+"/rola.js");
const bcrypt = require('bcrypt');

Rola.sync().then(function()
{
    Rola.findOrCreate({where: {id: 1}, defaults: {rola: 'Administrator'}})
    Rola.findOrCreate({where: {id: 2}, defaults: {rola: 'Nastavnik'}})
    Rola.findOrCreate({where: {id: 3}, defaults: {rola: 'Student'}})
    
});
LicniPodaci.sync();
Korisnik.sync().then(function(){
    Korisnik.findOrCreate({where: {username: 'Admin'}, defaults: {password: '$2a$10$azbe41yIbM.asbvKF.AfHONVcSOI3bsw3.4fn7WrGOkrV3iwr7XU2', RolaId: 1}})
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(session);

app.use("/", express.static('public'));
//ZADATAK4
app.post('/datoteka',function(req,res){
    let tijelo = req.body;
    let podaci = tijelo['indexi'];
    let redovi = podaci.split('\r\n');
    //console.log(redovi);
    let indeksi;
    for(var i = 0; i < redovi.length; i++){
        indeksi = redovi[i].split(',');
        let regex = /^\d{5}$/;
        if(indeksi.length != 6)
            throw 'Nije dodano tacno 6 indeksa. Red: ' + redovi[i];
        var ima = false;
        for(var j = 0; j < indeksi.length; j++){
            for(var k = j+1; k < indeksi.length; k++){
                if(indeksi[j] == indeksi[k]){
                    ima = true;
                    res.json({message:"Došlo je do greške",data:redovi[i]});
                    break;
                }
            }
        }
        if(ima) break;
    }
    if(!ima){
        let broj = tijelo['broj_spirale'];
        let fajl = "spisakS" + broj + ".json";
        //podaci = JSON.stringify(indeksi, null, 2);
        let upis = '[\n';
        for(i = 0; i < redovi.length;i++)
        {
            upis += '[' + redovi[i] + ']';
            if(i<redovi.length-1)
                upis += ',\n';
        }
        upis +='\n]';
        fs.appendFile(fajl,upis,function(err){
            if(err) throw err;
            res.json({message:"Uspješno kreirana datoteka " + fajl});
        });
    }
 });
 //ZADATAK5
 app.post('/komentar',function(req,res){
    if(!req.body.spirala || !req.body.index || !req.body.sadrzaj){
        res.status(400).json({message:"Podaci nisu u traženom formatu!", data:null});
        return;
    }
    var regex = /^(1)[0-9]{4}$/g;
    if(!req.body.index.match(regex)){
        res.status(400).json({message:"Podaci nisu u traženom formatu!", data:null});
        return;
    }
    let fajl = "markS" + req.body.spirala + req.body.index + ".json";
    fs.appendFile(fajl,JSON.stringify(req.body.sadrzaj, null, 2),function(err){
        if(err) throw err;
        res.json({message:"Uspješno kreirana datoteka " + fajl, data:req.body.sadrzaj});
    });
});

app.post('/lista', function(req, res){
    var tijelo = req.body;

    if(!tijelo.hasOwnProperty('godina') || !tijelo.hasOwnProperty('nizRepozitorija')){
        res.json({message:"Podaci nisu u traženom formatu!", data:null})
        return;
    }

    var datoteka = 'spisak' + tijelo.godina + '.txt';
    var niz = JSON.stringify(tijelo.nizRepozitorija);
    niz = niz.replace('[', '').replace(']', '');
    var redovi = niz.split(',');
    var tmp = [];

    for(var i = 0; i < redovi.length; i++){
        if(redovi[i].includes(tijelo.godina)){
            tmp.push(redovi[i].replace('"', '').replace('"', ''));
        }
    }
    fs.appendFile(datoteka, tmp.join('\n'), function(err){
        if(err) throw err;
        res.json({message:"Lista uspješno kreirana", data:tmp.length});
    });
});
//SPirala4
app.post("/register", function(req,res){
    //NASTAVNIK
    if(req.body['imePrezimeNastavnik']&&req.body['usernameNastavnik']&&req.body['passwordNastavnik']&&req.body['conPasswordNastavnik']&&req.body['faxMailNastavnik']&&req.body['maxGrupa']&&req.body['regex']&&req.body['trSemestar']&&req.body['trAkaGodina']){
        LicniPodaci.create({imePrezime:req.body['imePrezimeNastavnik'], 
                                faxMail:req.body['faxMailNastavnik'],
                                maxGrupa:req.body['maxGrupa'], 
                                regex:req.body['regex'],
                                trSemestar:req.body['trSemestar'],
                                trAkaGodina:req.body['trAkaGodina'],
                                datumDodavanja:Date.now()})
               .then(function(zapis){
                bcrypt.hash(req.body['passwordNastavnik'], 10, function(err, hash) {
                    Korisnik.create({username:req.body['usernameNastavnik'], 
                                    password:hash,
                                    LicniPodaciId:zapis.id,
                                    RolaId:2,
                                    datumDodavanja:Date.now()})
                });
                   res.send(zapis);
               })
               .catch(function(err){
                   res.send(err);
               });
        
    }
    //STUDENT
    else if(req.body['imePrezimeStudent']&&req.body['brIndexa']&&req.body['akaGodinaStudent']&&req.body['passwordStudent']&&req.body['conPasswordStudent']&&req.body['bitUrl']&&req.body['bitSsh']&&req.body['imeRepa']){
        LicniPodaci.create({imePrezime:req.body['imePrezimeStudent'], 
                                brIndexa:req.body['brIndexa'],
                                trAkaGodina:req.body['akaGodinaStudent'],
                                grupa:req.body['grupa'],
                                bitbucketUrl:req.body['bitUrl'],
                                bitbucketSSH:req.body['bitSsh'],
                                nazivRepozitorija:req.body['imeRepa'],
                                verify:null,
                                datumDodavanja:Date.now()})
               .then(function(zapis){
                bcrypt.hash(req.body['passwordStudent'], 10, function(err, hash) {
                    Korisnik.create({username:req.body['imePrezimeStudent'], 
                                    password:hash,
                                    LicniPodaciId:zapis.id,
                                    RolaId:3,
                                    datumDodavanja:Date.now()})
                });
                   res.send(zapis);
               })
               .catch(function(err){
                   res.send(err);
               });
    }
});
//Spirala4
app.get("/pretraga", function(req,res){
    LicniPodaci.findAll().then(function(rez){
        var ispis = '';
        var redovi = [];
        for(i = 0; i < rez.length;i++)
        {
            var varijable = rez[i];
            if(varijable.brIndexa == null){
                let dugme = '';
                if(varijable.verify){
                    dugme = 'Unverify'
                }
                else{
                    dugme = 'Verfy';
                }
                var red = '<tr><td>' + varijable.id + '</td><td>' + varijable.imePrezime+ '</td><td>' + varijable.faxMail + '</td><td>' + varijable.maxGrupa + '</td><td>' + varijable.regex + '</td><td>' + varijable.trSemestar + '</td><td>' + varijable.trAkaGodina + '</td><td>' + varijable.brIndexa + '</td><td>'+ varijable.grupa + '</td><td>' + varijable.bitbucketUrl + '</td><td>' + varijable.bitbucketSSH+ '</td><td>' + varijable.nazivRepozitorija + '</td><td>' + varijable.verify + '</td><td>'  + '<form action="/verify/'+ varijable.id +'" method="POST"><button>' + dugme + '</button></form></td></tr>';
                redovi.push(red);
            }
            else{
                var red = '<tr><td>' + varijable.id + '</td><td>' + varijable.imePrezime+ '</td><td>' + varijable.faxMail + '</td><td>' + varijable.maxGrupa + '</td><td>' + varijable.regex + '</td><td>' + varijable.trSemestar + '</td><td>' + varijable.trAkaGodina + '</td><td>' + varijable.brIndexa + '</td><td>'+ varijable.grupa + '</td><td>' + varijable.bitbucketUrl + '</td><td>' + varijable.bitbucketSSH+ '</td><td>' + varijable.nazivRepozitorija + '</td><td>' + '</td></tr>';
                redovi.push(red);
            }
        }
        var ispis = '<table border="1">';
        ispis += '<tr><td>ID</td><td>ImePrezime</td><td>FaxMail</td><td>MaxGrupa</td><td>Regex</td><td>TrenutniSemestar</td><td>AkademskaGodina</td><td>BrojIndexa</td><td>Grupa</td><td>BitbucketURL</td><td>BitbucketSSH</td><td>NazivRepozitorija</td><td>Verify</td></tr>';
        for(i = 0; i < redovi.length;i++)
        {
            ispis += redovi[i];
        }
        ispis += '</table>';
        res.send(ispis);
    });
});

app.post("/pretragaKorisnicko", function(req, res){
    
    Korisnik.findAll().then(function(rez){
        let ispis = '';
    let redovi = [];
        for(var i = 0; i < rez.length; i++){
            if(rez[i].username === req.body['traziKorisnika']){
                var user = rez[i].LicniPodaciId;
                LicniPodaci.findOne({where: {id:user}}).then(function(rez1){
                    console.log('USaooo');
                    var varijable = rez1.dataValues;
                    if(varijable.brIndexa == null){
                        let dugme = '';
                        if(varijable.verify){
                            dugme = 'Unverify'
                        }
                        else{
                            dugme = 'Verfy';
                        }
                        var red = '<tr><td>' + varijable.id + '</td><td>' + varijable.imePrezime+ '</td><td>' + varijable.faxMail + '</td><td>' + varijable.maxGrupa + '</td><td>' + varijable.regex + '</td><td>' + varijable.trSemestar + '</td><td>' + varijable.trAkaGodina + '</td><td>' + varijable.brIndexa + '</td><td>'+ varijable.grupa + '</td><td>' + varijable.bitbucketUrl + '</td><td>' + varijable.bitbucketSSH+ '</td><td>' + varijable.nazivRepozitorija + '</td><td>' + varijable.verify + '</td><td>'  + '<form action="/verify/'+ varijable.id +'" method="POST"><button>' + dugme + '</button></form></td></tr>';
                        redovi.push(red);
                    }
                    else{
                        var red = '<tr><td>' + varijable.id + '</td><td>' + varijable.imePrezime+ '</td><td>' + varijable.faxMail + '</td><td>' + varijable.maxGrupa + '</td><td>' + varijable.regex + '</td><td>' + varijable.trSemestar + '</td><td>' + varijable.trAkaGodina + '</td><td>' + varijable.brIndexa + '</td><td>'+ varijable.grupa + '</td><td>' + varijable.bitbucketUrl + '</td><td>' + varijable.bitbucketSSH+ '</td><td>' + varijable.nazivRepozitorija + '</td><td>' + '</td></tr>';
                        redovi.push(red);
                    }
                    var ispis = '<table border="1">';
                    ispis += '<tr><td>ID</td><td>ImePrezime</td><td>FaxMail</td><td>MaxGrupa</td><td>Regex</td><td>TrenutniSemestar</td><td>AkademskaGodina</td><td>BrojIndexa</td><td>Grupa</td><td>BitbucketURL</td><td>BitbucketSSH</td><td>NazivRepozitorija</td><td>Verify</td></tr>';
                    ispis += red;
                    ispis += '</table>';
                    res.send(ispis);
                });
            }
        }
        
    });
});

app.post("/login",function(req,res){
    let kor;
    let pronasao = false;
    if(req.body['username'] && req.body['password']){
        let bodyUsername = req.body['username'];
        let bodyPassword = req.body['password'];
        Korisnik.findOne({where:{username:bodyUsername}}).then(function(rez){
            if(rez){
                var kor = rez.dataValues;
                bcrypt.compare(bodyPassword, kor.password, function(err, hashRez) {
                    console.log("Body: " + bodyPassword);
                    console.log("Tabela: " + kor.password);
                    if(hashRez){
                        LicniPodaci.findOne({where:{id:kor.LicniPodaciId}}).then(function(rezJedan){
                            if(kor.RolaId === 1){
                                res.sendFile(__dirname + '/administratorMenu.html');
                            }
                            else if(kor.RolaId === 3){
                                res.sendFile(__dirname + '/studentMenu.html');
                            }
                            else if(kor.RolaId === 2  && rezJedan.verify){
                                res.sendFile(__dirname + '/nastavnikMenu.html');
                            }
                            else if(kor.RolaId === 2 && !rezJedan.verify){
                                res.send('Korisnik ' + kor.username +' nije verificiran');
                            }
                        });
                    }
                    else{
                        res.send('Password nije validan');
                        res.end();
                    }
                });
            }
        });
    }
        
});

app.get("/logout", function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/verify/:id", function(req,res){
    let id = req.params.id;
    LicniPodaci.findById(id).then(function(rez){
        if(rez.verify){
            rez.updateAttributes({
                verify: false
              })
              res.send('Korisnik ' + rez.imePrezime + ' uspjesno odverificiran!');
        }
        else{
            rez.updateAttributes({
                verify: true
              })
              res.send('Korisnik ' + rez.imePrezime + ' uspjesno verificiran!');
        }
        
    });
});
//KRAJ spirala4
app.listen(3000);