//template para criar o Perfil
var fragmentoPerfil =   '<h3> {{NOME}} </h3>'+
                        '<hr>'+
                        'RACF: {{RACF}}   <br>'+
                        'Email: {{EMAIL}}  <br>'+
                        'Setor: {{SETOR}}'+
                        '<hr>';

//template para adicionar o link da imagem                        
var fragmentoFoto = '<img src="{{LINKFOTO}}" width="100%">';

//template para adicionar os pedidos, em loop
var fragmentoPedido = "{{DATAPEDIDO}} - {{OBSERVACAO}} : {{STATUS}} <BR>";

//ao iniciar a pagina, roda a funcao para gerar os itens
function carregaUser(){
    var userStr = localStorage.getItem("user");

    if(!userStr){
        window.location = "login.html";
    }else{
        var user = JSON.parse(userStr)

        document.getElementById("perfil").innerHTML = fragmentoPerfil.replace("{{NOME}}",user.nome)
                                                                     .replace("{{RACF}}", user.racf)
                                                                     .replace("{{EMAIL}}", user.email)
                                                                     .replace("{{SETOR}}", user.setor);                                                     
        
        document.getElementById("fotoUser").innerHTML = fragmentoFoto.replace("{{LINKFOTO}}", user.linkFoto);

        var strPedidos = "";
        for (i=0; i<user.pedidos.length; i++) {            
            let pedidoatual = fragmentoPedido;

            strPedidos += pedidoatual.replace("{{DATAPEDIDO}}", user.pedidos[i].dataPedido)
                                     .replace("{{OBSERVACAO}}", user.pedidos[i].observacao)
                                     .replace("{{STATUS}}", user.pedidos[i].status)
        }

        document.getElementById("pedidos").innerHTML = strPedidos;

    }

}

//comando para remover o cook e redirecionar para login.html
function logout() {
    localStorage.removeItem("user");                
    window.location = "./login.html"; 
}

//função para redirecionar para novo pedido
function novoPedido(){
    window.location = "novopedido.html";
}

//comando para adicionar os itens como icones do feather
feather.replace()