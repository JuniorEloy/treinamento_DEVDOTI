var fragmentoPerfil = '<h3> {{NOME}} </h3>' + 
		      '{{SETOR}} <br>' +
                      '{{EMAIL}} <br>'
                      

var fragmentoFoto   = '<img class="profileimage" src="{{LINKFOTO}}">';

var fragmentoCodigo = ' {{NUMPEDIDO}} ';

var fragmentoPedido = '<div class="col-12">'+ 
                         ' [ <a href="detalhepedido.html?num={{NUMPEDIDO}}"> ' +
			 ' Visualizar Pedido </a> ] [ {{DATAPEDIDO}} ] [ {{OBSERVACOES}} ]'+
                      '</div>';


function novoPedido(){
    window.location = "novopedido.html";
}

// este metodo eh um dos mais trabalhosos, pois ele pega a informacao do usuario
// e tem que preencher praticamente a pagina toda.

function carregaUser(){
    var userStr = localStorage.getItem("user");
    if (!userStr){  // se nao tiver isso no localStorage, redireciona para o index (login)
        window.location = "index.html";
    }

    else{

        // se o usuario existe armazenado, eu pego, converto-o para JSON

        var user = JSON.parse(userStr);

        // e comeco a preencher as diferentes secoes da minha pagina
        
        // secao da foto
        
	document.getElementById("fotoUser").innerHTML = 
            fragmentoFoto.replace("{{LINKFOTO}}",user.linkFoto);

	// secao do perfil

        var strPerfil = fragmentoPerfil.replace("{{NOME}}",user.nome)
                                       .replace("{{EMAIL}}",user.email)
                                       .replace("{{RACF}}",user.racf)
                                       .replace("{{SETOR}}",user.setor);
        document.getElementById("perfil").innerHTML = strPerfil;

	//codigo
	
	var strCodigo="";
        for (i=0; i<user.pedidos.length; i++){

            strCodigo += fragmentoCodigo.replace("{{NUMPEDIDO}}",user.pedidos[i].numPedido);
	}
	document.getElementById("codigo").innerHTML = strCodigo;

        // secao dos pedidos
        var strPedidos="";
        for (i=0; i<user.pedidos.length; i++){
            let pedidoatual = fragmentoPedido;
            strPedidos += pedidoatual.replace("{{DATAPEDIDO}}",user.pedidos[i].dataPedido)
                                     .replace("{{NUMPEDIDO}}",user.pedidos[i].numPedido)   
                                     .replace("{{OBSERVACOES}}",user.pedidos[i].observacoes);
        }
        document.getElementById("pedidos").innerHTML = strPedidos;
    }
}



function logout(){
    
	localStorage.removeItem("user");
    
	window.location = "index.html"; 
}
