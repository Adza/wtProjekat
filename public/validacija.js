var Validacija = (function(){
var maxGrupa = 7;
var trenutniSemestar = 0;//0 za zimski, 1 za ljetni semestar

return{
    validirajFakultetski: function(mail){
      var regMail = /^[a-z][a-z1-9]*\@etf\.unsa\.ba$/g;
      if(mail.match(regMail)) {return true;}
      else{
        return false;
      }
    },
    validirajIndex: function(index){
      var regIndex = /^(1)[0-9]{4}$/g;
      if(index.match(regIndex)) {return true;}
      else{
        return false;
      }
    },
    validirajGrupu: function(grupa){
      if(parseInt(grupa) > 0 && parseInt(grupa) <= parseInt(maxGrupa)) {return true;}
      else{
        return false;
      }
    },
    validirajAkGod: function(datum){
      var regDatum = /^20[0-9]{2}\/20[0-9]{2}$/g;
      if(datum.match(regDatum)){
        var prvioDio = parseInt(datum.substring(0, 4));
        var drugiDio = parseInt(datum.substring(5, datum.length));
        if(trenutniSemestar === 0){
          var date = new Date();
          if(prvioDio+1 === drugiDio && date.getFullYear() === prvioDio) {return true;}
          else{
            return false;
          }
        }
        if(trenutniSemestar === 1){
          var date = new Date();
          if(prvioDio+1 === drugiDio && date.getFullYear() === drugiDio) {return true;}
          else{
            return false;
          }
        }
      }
      else{
        return false;
      }
    },
    validirajPassword: function(password){
      var regPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,20}/g;
      if(password.match(regPass)) {return true;}
      else{
        return false;
      }
    },
    validirajPotvrdu: function(password1, password2){
      if(password1.match(password2)) {return true;}
      else{
        return false;
      }
    },
    validirajBitbucketURL: function(urlBitbucket){
      var regBitBucket = /^https:\/\/[a-zA-Z0-9][a-zA-Z0-9]*@bitbucket\.org\/[a-zA-Z0-9][a-zA-Z0-9]*\/[a-zA-Z0-9][a-zA-Z0-9]*\.git$/g;
      if(urlBitbucket.match(regBitBucket)) {return true;}
      else{
        return false;
      }
    },
    validirajBitbucketSSH: function(bitbucketssh){
      var regSSH = /^git@bitbucket\.org:[a-zA-Z0-9][a-zA-Z0-9]*\/[a-zA-Z0-9][a-zA-Z0-9]*\.git$/g;
      if(bitbucketssh.match(regSSH)) {return true;}
      else{
        return false;
      }
    },
    validirajNazivRepozitorija: function(regex, nazivRep){
      if(regex === ""){
        regex = /^(wtProjekat1[0-9]{4}|wtprojekat1[0-9]{4})$/g;
        if(nazivRep.match(regex)) {return true;}
        else{
          return false;
        }
      }
      else{
        if(nazivRep.match(regex)) {return true;}
        else{
          return false;
        }
      }
    },
    validirajImeiPrezime: function(imePrezime) {
      var regImePrez = /^[A-ZŠĐČĆŽ][a-z-'čćžđš]{2,11}(\s[A-ZŠĐČĆŽ][a-z-'čćžđš]{2,11})*$/g;
      if(imePrezime.match(regImePrez)) {return true;}
      else{
        return false;
      }
    },
    postaviMaxGrupa: function(grupa){
      maxGrupa = grupa;
    },
    postaviTrenSemestar: function(trenutniSem){
      trenutniSemestar = trenutniSem;
    },
    }
})();
