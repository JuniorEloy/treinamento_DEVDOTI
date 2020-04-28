function carregaSoftware(){
    var user = localStorage.getItem("user");

    if(!user){
        window.location="login.html"
    }
    else{
        fetch("http://localhost:8080/software/disponiveis")
        .then(res=>res.json())
        .then(res=>popula(res));
    }

}


function popula(lista){
    
    strSoftwareList = '';
    for (i=0; i<lista.length; i++){        
        strSoftwareList += '<input type="checkbox" name="'+lista[i].descricao+'">'+
                            '<label for="'+lista[i].descricao+'"> '+lista[i].descricao+'</label><br>'
    }

    document.getElementById("listaSoftware").innerHTML = strSoftwareList;
}