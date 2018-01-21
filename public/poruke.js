var Poruke = (function(){
  var idDivaPoruka;
  var mogucePoruke = ['*Email koji ste napisali nije validan fakultetski email',
  '*Indeks kojeg ste napisali nije validan',
  '*Nastavna grupa koju ste napisali nije validna',
  '*Bitbucket URL koji ste unijeli nije validan',
  '*Bitbucket SSH koji ste unijeli nije validan',
  '*Naziv repozitorija nije validno unesen',
  '*Sifra koju ste unijeli nije validna',
  '*Potvrdna sifra se ne poklapa sa sifrom',
  '*Ime i prezime koje ste unijeli nije validno',
  '*Broj grupa nije validno unesen',
  '*Akademska godina nije validno unesena'];

  var porukeZaIspis = [];
    return{
    ispisiGreske: function() {
      var div = '';
      document.getElementById('divGreske').innerHTML = "";

      for (var i = 0; i < porukeZaIspis.length; i++) {
        if(typeof porukeZaIspis[i] == "undefined") { continue; }
        //else
        div += porukeZaIspis[i] + '<br>';
      }
      document.getElementById("divGreske").style.height = "auto";
      document.getElementById("divGreske").innerHTML+= div;

    },
    postaviIdDiva: function(idDiv) {
      document.getElementById("divGreske").setAttribute("id", idDiv);
    },
    dodajPoruku: function(brojPoruke){
      if(!porukeZaIspis.includes(mogucePoruke[brojPoruke])){
        porukeZaIspis.push(mogucePoruke[brojPoruke]);
      }
    },
    ocistiGresku: function(brojGreske){
      var poruka = mogucePoruke[brojGreske];
      var index = 0;
      for(var i = 0; i < porukeZaIspis.length; i++){
        if(poruka == porukeZaIspis[i]) break;
        else {
          index = index+1;
        }
      }
      porukeZaIspis.splice(index, 1);
    }
  }
})();
