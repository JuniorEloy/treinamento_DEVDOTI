function carregaPedido(){
    var numPedido = window.location.search;
    numPedido = numPedido.split("=")[1];    
    console.log(numPedido);

    fetch("http://localhost:8080/pedido/"+numPedido)
        .then(res => res.json())
        .then(res => {
            var resultado = '';
            resultado = "Pedido "+res.numPedido+"<br>"+
                        "Data: "+ res.dataPedido+"<br>"+
                        "Solicitante: "+ res.solicitante.nome + '<br>'+
                        "Status: "+ res.status + "<br>"+
                        "Observacao: "+ res.observacao;

            document.getElementById("detalhesPedido").innerHTML = resultado;
        });

}