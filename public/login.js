function nastavnikPrikazi(student, nastavnik){
  document.getElementById('nastavnik').style.display = "block";
  document.getElementById('student').style.display = "none";
  document.getElementById('divGreske').innerHTML = "";

  document.getElementById('nastavnik_button').style.backgroundColor = "#357a38";
  document.getElementById('student_button').style.backgroundColor = "#4CAF50";

  document.getElementById('name').value = "";
  document.getElementById('korIme').value = "";
  document.getElementById('password').value = "";
  document.getElementById('conpassword').value = "";
  document.getElementById('faxmail').value = "";
  document.getElementById('maxgrupe').value = "";
  document.getElementById('regex').value = "";
  document.getElementById('trSemestar').value = "";
  document.getElementById('akademskagod').value = "";


}

function studnetkPrikazi(student, nastavnik){
  document.getElementById('nastavnik').style.display = "none";
  document.getElementById('student').style.display = "block";
  document.getElementById('divGreske').innerHTML = "";

  document.getElementById('nastavnik_button').style.backgroundColor = "#4CAF50";
  document.getElementById('student_button').style.backgroundColor = "#357a38";

  document.getElementById('nameSt').value = "";
  document.getElementById('index').value = "";
  document.getElementById('akademskagodinast').value = "";
  document.getElementById('passwordSt').value = "";
  document.getElementById('conpasswordSt').value = "";
  document.getElementById('bitbucket_url').value = "";
  document.getElementById('bitbucket_ssh').value = "";
  document.getElementById('naziv_repa').value = "";
}


function validiranjeImePrezime(name){
  var validacija = Validacija.validirajImeiPrezime(document.getElementById('name').value);
  var brPoruke = 8;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjePassworda(password){
  var validacija = Validacija.validirajPassword(document.getElementById('password').value);
  var brPoruke = 6;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeConPassworda(password, conpassword){
  var validacija = Validacija.validirajPotvrdu(document.getElementById('conpassword').value, document.getElementById('password').value);
  var brPoruke = 7;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeFaxMail(faxmail){
  var validacija = Validacija.validirajFakultetski(document.getElementById('faxmail').value);
  var brPoruke = 0;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeGrupa(maxgrupe){
  var validacija = Validacija.postaviMaxGrupa(document.getElementById('maxgrupe').value);
  var brPoruke = 9;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeAkademskeGodine(akademskagod){
  var validacija = Validacija.validirajAkGod(document.getElementById('akademskagod').value);
  var brPoruke = 10;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeImePrezimeSt(nameSt){
  var validacija = Validacija.validirajImeiPrezime(document.getElementById('nameSt').value);
  var brPoruke = 8;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeIndexa(index){
  var validacija = Validacija.validirajIndex(document.getElementById('index').value);
  var brPoruke = 1;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeAkademskaGodinaSt(akademskagodinast){
  var validacija = Validacija.validirajAkGod(document.getElementById('akademskagodinast').value);
  var brPoruke = 10;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjePasswordaSt(passwordSt){
  var validacija = Validacija.validirajPassword(document.getElementById('passwordSt').value);
  var brPoruke = 6;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeConPasswordaSt(conpasswordSt){
  var validacija = Validacija.validirajPotvrdu(document.getElementById('conpasswordSt').value, document.getElementById('passwordSt').value);
  var brPoruke = 7;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeBitbucketUrl(bitbucket_url){
  var validacija = Validacija.validirajBitbucketURL(document.getElementById('bitbucket_url').value);
  var brPoruke = 3;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeBitbucketSsh(bitbucket_ssh){
  var validacija = Validacija.validirajBitbucketSSH(document.getElementById('bitbucket_ssh').value);
  var brPoruke = 4;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeNazivRepa(naziv_repa){
  var validacija = Validacija.validirajNazivRepozitorija(document.getElementById('regex').value, document.getElementById('naziv_repa').value);
  var brPoruke = 5;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}

function validiranjeGrupu(maxgrupe){
  var validacija = Validacija.validirajGrupu(document.getElementById('maxgrupe').value);
  var brPoruke = 9;
  if(validacija === false){
    Poruke.dodajPoruku(brPoruke);
    Poruke.ispisiGreske();
  }
  else{
    Poruke.ocistiGresku(brPoruke);
    Poruke.ispisiGreske();
  }
}
