var KreirajFajl=(function(){
        return {
            kreirajKomentar = function(spirala, index, sadrzaj, fnCallback){
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.readyState == 4 && ajax.status == 200){
                        error = null;
                        data = ajax.responseText;
                    }
                    else if(ajax.readyState == 4 && ajax.status != 200){
                        error = ajax.status;
                        data = ajax.responseText;
                    }
                    else{
                        if(index.length < 1 || spirala.length < 1){
                            error = -1;
                            data = "Nispravni parametri";
                        }
                        for(i = 0; i < sadrzaj.length; i++){
                            if(!sadrzaj[i].hasOwnProperty('sifra_studenta') || !sadrzaj[i].hasOwnProperty('tekst') || !sadrzaj[i].hasOwnProperty('ocjena')){
                                error = -1;
                                data = "Neispravni podaci";
                                break;
                            }
                        }
                    }
                    fnCallback(error, data);
                }
                ajax.open("POST", "http://localhost:3000/komentar", true);
                ajax.setRequestHeader("Content-Type", "application/json");
                ajax.send(JSON.stringify({spirala:spirala, index:index, sadrzaj:sadrzaj}));
            },
            kreirajListu = function(godina, nizRepozitorija, fnCallback){
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.readyState == 4 && ajax.status == 200){
                        error = null;
                        data = ajax.responseText;
                    }
                    else if(ajax.readyState == 4 && ajax.status != 200){
                        error = ajax.status;
                        data = ajax.responseText;
                    }
                    else{
                        if(godina.length < 1 || nizRepozitorija.length < 1){
                            error = -1;
                            data = "Neispravni parametri";
                        }
                    }
                    fnCallback(error, data);
                }
                ajax.open("POST", "http://localhost:3000/lista", true);
                ajax.setRequestHeader("Content-Type", "application/json");
                ajax.send(JSON.stringify({godina:godina, nizRepozitorija:nizRepozitorija}));
            },
            kreirajIzvjestaj = function(spirala,index, fnCallback){
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.readyState == 4 && ajax.status == 200){
                        error = null;
                        data = ajax.responseText;
                    }
                    else if(ajax.readyState == 4 && ajax.status != 200){
                        error = ajax.status;
                        data = ajax.responseText;
                    }
                    else{
                        if(index.length < 1){
                            error = -1;
                            data = "Neispravni parametri";
                        }
                    }
                    fnCallback(error, data);
                }
                ajax.open("POST", "http://localhost:3000/izvjestaj", true);
                ajax.setRequestHeader("Content-Type", "application/json");
                ajax.send(JSON.stringify({spirala:spirala, index:index}));
            },
            kreirajBodove = function(spirala,index, fnCallback){
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.readyState == 4 && ajax.status == 200){
                        error = null;
                        data = ajax.responseText;
                    }
                    else if(ajax.readyState == 4 && ajax.status != 200){
                        error = ajax.status;
                        data = ajax.responseText;
                    }
                    else{
                        if(index.length < 1){
                            error = -1;
                            data = "Neispravni parametri";
                        }
                    }
                    fnCallback(error, data);
                }
                ajax.open("POST", "http://localhost:3000/bodovi", true);
                ajax.setRequestHeader("Content-Type", "application/json");
                ajax.send(JSON.stringify({spirala:spirala, index:index}));
            }
        }
    })();