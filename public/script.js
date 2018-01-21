function klik(index)
{
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
	if (ajax.readyState == 4 && ajax.status == 200)
		document.getElementById("view").innerHTML = ajax.responseText;
	if (ajax.readyState == 4 && ajax.status == 404)
		document.getElementById("view").innerHTML = "Greska: nepoznat URL";
    }
    console.log(index);
    if(index == 1){
        ajax.open("GET", "login.html", true);
        ajax.send();
    }
    else if(index == 2){
        ajax.open("GET", "statistika.html", true);
        ajax.send();
    }
    else if(index == 3){
        ajax.open("GET", "unoskomentara.html", true);
        ajax.send();
    }
    else if(index == 4){
        ajax.open("GET", "unosSpiska.html", true);
        ajax.send();
    }
    else if(index == 5){
        ajax.open("GET", "nastavnik.html", true);
        ajax.send();
    }
    else if(index == 6){
        ajax.open("GET", "bitbucketPozivi.html", true);
        ajax.send();
    }
    else if(index == 7){
        ajax.open("GET", "listaKorisnika.html", true);
        ajax.send();
    }
}