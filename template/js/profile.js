var fragmentoPerfil = '<h3> {{NOME}} </h3>' +
    '{{SETOR}} <br>' +
    '{{EMAIL}} <br>';

var fragmentoFoto = '<img class="profileimage" src="{{LINKFOTO}}">';

var fragmentoPedido = '<div class="col-12">' +
    ' [ <a href="detalhepedido.html?num={{NUMPEDIDO}}"> ' +
    ' Visualizar Pedido </a> ] [ {{DATAPEDIDO}} ] [ {{OBSERVACOES}} ] [ {{STATUS}} ]' +
    '</div>';

function novoPedido() {
    window.location = "novopedido.html";
}

// este metodo eh um dos mais trabalhosos, pois ele pega a informacao do usuario
// e tem que preencher praticamente a pagina toda.

$(document).ready(function() {
    var userStrTeste = localStorage.getItem("user");
    if (!userStrTeste) { // se nao tiver isso no localStorage, redireciona para o index (login)
        window.location = "login.html";
    } else {
        var userTeste = JSON.parse(userStrTeste);

        fetch("http://localhost:8080/usuario/"+userTeste.id)
        .then(res => res.json() )
        .then(res => {
                var usuario = res; 
                localStorage.removeItem("user")
                localStorage.setItem("user", JSON.stringify(usuario)); 
        })

        
        var userStr = localStorage.getItem("user");

        // se o usuario existe armazenado, eu pego, converto-o para JSON
        var user = JSON.parse(userStr);

        // e comeco a preencher as diferentes secoes da minha pagina
        // secao da foto
        document.getElementById("fotoUser").innerHTML =
            fragmentoFoto.replace("{{LINKFOTO}}", user.linkFoto);

        // secao do perfil
        var strPerfil = fragmentoPerfil.replace("{{NOME}}", user.nome)
            .replace("{{EMAIL}}", user.email)
            .replace("{{RACF}}", user.racf)
            .replace("{{SETOR}}", user.setor);
        document.getElementById("perfil").innerHTML = strPerfil;

        // secao dos pedidos
        var strPedidos = "";
        for (i = 0; i < user.pedidos.length; i++) {
            let pedidoatual = fragmentoPedido;
            strPedidos += pedidoatual.replace("{{DATAPEDIDO}}", user.pedidos[i].dataPedido)
                .replace("{{NUMPEDIDO}}", user.pedidos[i].numPedido)
                .replace("{{OBSERVACOES}}", user.pedidos[i].observacao)
                .replace("{{STATUS}}", user.pedidos[i].status);
        }
        document.getElementById("pedidos").innerHTML = strPedidos;
    }
});



function logout() {
    localStorage.removeItem("user");
    window.location = "login.html";
}