var BitbucketApi = (function(){
        return {
            dohvatiAccessToken: function(key, secret, fnCallback){
                function ispisi(error,token){
                    if(!error) console.log(token);
                 }
                 function getAccessToken(proslijedi){
                    var ajax = new XMLHttpRequest();
                 
                    ajax.onreadystatechange = function() {
                        if (ajax.readyState == 4 && ajax.status == 200){
                            error = null;
                            ajax.responseText = JSON.parse(ajax.responseText).access_token;
                        }
                        else if(ajax.readyState == 4){
                            error = ajax.status;
                            data = null;
                        }
                        if(key == null || secret == null){
                            error = -1;
                            data = "Key ili secret nisu pravilno proslijeđeni!";
                        }
                        fnCallback(error, data);
                    }
                    ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
                    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key+':'+secret));
                    ajax.send("grant_type="+encodeURIComponent("client_credentials"));
                 }
                 
                 getAccessToken(ispisi);
            },//-----------------------------------------------------------------------------------------------
            dohvatiRepozitorije: function(token, godina, naziv, branch, fnCallback){
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function(){
                    if (ajax.readyState == 4 && ajax.status == 200){
                        var lista_repozitorija = [];
                        var podaci = JSON.parse(ajax.responseText.values);
                        for(i = 0; i < podaci.length;i++)
                        {
                            
                        }
                        error = null;
                        data = lista_repozitorija;
                        console.log(ajax.responseText);
                        console.log(JSON.parse(ajax.responseText).values[0].name);
                        console.log(JSON.parse(ajax.responseText).values[0].owner.username);

                        // Podatke parsirajte sa var podaci = JSON.parse(ajax.responseText);
                        // Imena repozitorija možete dobiti sa podaci.values[i].name
                        // Imena vlasnika repozitorija sa podaci.values[i].owner.username
                    }
                    else if (ajax.readyState == 4){
                        error = ajax.status;
                        data = null;
                    }
                    fnCallback(error,data);
            }
            var tmp = 'https://api.bitbucket.org/2.0/repositories/?role=member&q=name~"' + naziv + '"&pagelen=150';
            console.log(tmp);
            ajax.open("GET", tmp);
            ajax.setRequestHeader("Authorization", 'Bearer ' + token);
            ajax.send();
            },//----------------------------------------------------------------------------------------------
            dohvatiBranch: function(token, url, naziv, fnCallback){
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if (ajax.readyState == 4 && ajax.status == 200)
                    {
                        error = null;
                        data = ajax.responseText.includes(naziv);
                    }
                    else if (ajax.readyState == 4)
                    {
                        error = ajax.status;
                        data = null;
                    }
                    fnCallback(error,data);
                }
                ajax.open("GET",url,false);
                ajax.setRequestHeader("Authorization", 'Bearer ' + token);
                ajax.send();
            }
        }
})();