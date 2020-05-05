var fragmentoPedido = '<div class="col-12">' +
    ' [ <a href="detalhepedido.html?num={{NUMPEDIDO}}"> ' +
    ' Visualizar Pedido </a> ] [ {{DATAPEDIDO}} ] [ {{OBSERVACOES}} ]' +
    '</div>';


function carregaUser() {

    var userStr = localStorage.getItem("user");
    if (!userStr) { // se nao tiver isso no localStorage, redireciona para o index (login)
        window.location = "login.html";
    } else {
        var user = JSON.parse(userStr);

        // secao dos pedidos
        var str = window.location.search;
        // ?num=15
        var numPedido = str.substr(5);
        console.log("Capturei NUMPEDIDO = " + numPedido);

        fetch("http://localhost:8080/pedido/" + numPedido)
            .then(res => res.json())
            .then(res => {
                var resultado = "";
                resultado = "<h4> Detalhes do Pedido #" + res.numPedido + "</h4><hr><br>" +
                    "Data: " + res.dataPedido + "<br>" +
                    "Observacoes: " + res.observacao + "<br>" +
                    "Status: " + res.status;

                document.getElementById("detalhes").innerHTML = resultado;

                if (res.status == "N") {
                    var status = '<img src="./img/img1.png">';
                }else if (res.status == "E"){
                    var status = '<img src="./img/img2.png">';
                }else{
                    var status = '<img src="./img/img3.png">';
                }
            
                document.getElementById("imagemstatus").innerHTML = status;
                
            })
            .catch(erro => alert("erro ao recuperar!"));
    }
}


function logout() {
    localStorage.removeItem("user");
    window.location = "login.html";
}