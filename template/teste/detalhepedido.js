var fragmentoPerfil = '<h3> {{NOME}} </h3>' + 
		      '{{SETOR}} <br>' +
                      '{{EMAIL}} <br>'
                      

var fragmentoFoto   = '<img class="profileimage" src="{{LINKFOTO}}">';

var fragmentoPedido = '<div class="col-12">'+ 
                         ' [ <a href="detalhepedido.html?num={{NUMPEDIDO}}"> ' +
			 ' Visualizar Pedido </a> ] [ {{DATAPEDIDO}} ] [ {{OBSERVACOES}} ]'+
                      '</div>';


function carregaUser(){
    
    var userStr = localStorage.getItem("user");
    if (!userStr){  // se nao tiver isso no localStorage, redireciona para o index (login)
        window.location = "index.html";
    }

    else{
            var user = JSON.parse(userStr);

	        document.getElementById("fotoUser").innerHTML = 
            fragmentoFoto.replace("{{LINKFOTO}}",user.linkFoto);

	// secao do perfil

        var strPerfil = fragmentoPerfil.replace("{{NOME}}",user.nome)
                                       .replace("{{EMAIL}}",user.email)
                                       .replace("{{RACF}}",user.racf)
                                       .replace("{{SETOR}}",user.setor);
        document.getElementById("perfil").innerHTML = strPerfil;


        // secao dos pedidos
        var str = window.location.search;
        // ?num=15
        var numPedido = str.substr(5);
        console.log("Capturei NUMPEDIDO = "+numPedido);

        fetch("http://localhost:8080/pedido/"+numPedido)
        .then(res => res.json())
        .then(res => {
          var resultado ="";
          resultado = "<h4> Detalhes do Pedido #"+res.numPedido+"</h4><hr><br>"+  
                      "Data: " +res.dataPedido+"<br>"+
                      "Observacoes: " +res.observacoes + "<br>" +
                      "Status: "+res.status;
            
          if(res.status == "C") {
              '<img src="img1.jpg">';
          }
          
          document.getElementById("detalhes").innerHTML = resultado;              
          
      })
      .catch(erro => alert("erro ao recuperar!"));
    }
}


function logout(){
	localStorage.removeItem("user");
	window.location = "index.html"; 
}


function novoPedido(){
    window.location = "novopedido.html";
}