var fragmento_checkbox = ' <div class="row">' +
                        '<label class="label">' +
                        '<input  class="label__checkbox" value="{{SOFTWARE}}" name="software" type="checkbox" />' +
                        '<span class="label__text">' +
                        '<span class="label__check">' +
                        '<i class="fa fa-check icon"></i>' +
                        '</span>' +
                        '</span>' +
                        '</label>' +
                        '{{LABEL}}' +
                        '</div>';


function carregaSoftware() {
    var user = localStorage.getItem("user");

    if (!user) {
        window.location = "login.html"
    } else {
        fetch("http://localhost:8080/software/disponiveis")
            .then(res => res.json())
            .then(res => popula(res));
    }
}


function popula(lista) {
    strSoftwareList = '';
    for (i = 0; i < lista.length; i++) {
        checkbox_str = fragmento_checkbox
        strSoftwareList += checkbox_str.replace('{{LABEL}}', lista[i].descricao)
                                       .replace('{{SOFTWARE}}', lista[i].id);
    }
    document.getElementById("listaSoftware").innerHTML = strSoftwareList;
}

function gera_lista_softwares_escolhidos(){
    const checkboxes = document.querySelectorAll('input[name="software"]:checked');
    let softwares_list = [];
    checkboxes.forEach((checkbox) => {
        softwares_list.push(checkbox.value);
    });

    Json_pedido = gera_JSON_pedido(softwares_list, $("#obs_pedido").val());

    console.log(Json_pedido);


}

function gera_JSON_pedido(lista_softwares, observacao){
var data = new Date();
var dia         = data.getDate();           // 1-31
var mes         = data.getMonth();          // 0-11 (zero=janeiro)
var ano4        = data.getFullYear();       // 4 dígitos
var str_data    = dia + '/' + (mes+1) + '/' + ano4;

var usuario = JSON.parse(window.localStorage.getItem('user'));;

    dict_pedido = {
        "status": "N",
        "observacao": observacao,
        "dataPedido": str_data,
        "solicitante": { "id" : usuario.id},
        "itens":[]
    }

    for (i=0; i<lista_softwares.length; i++){
        dict_pedido['itens'].push({"itemSoftware": {"id" : lista_softwares[i]}});
    }

    return dict_pedido;
}

//comando para adicionar os itens como icones do feather
feather.replace()