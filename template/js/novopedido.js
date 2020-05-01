var fragmento_checkbox =//'<label class="container"> ' +
                        '<input type="checkbox" value="{{SOFTWARE}}" class="option-input checkbox" name="software" />'+
                        '{{LABEL}}'+
                        '</label>'+
                        '&emsp;&emsp;';
                        
var fragmento_radio =   '<label>'+
                        '<input  type="radio" class="option-input radio" name="exampleRadios" id="{{ID}}" value="option1">'+                        
                        '{{LABEL}}'+
                        '</label>'+
                        '&emsp;&emsp;';

                        
 

function carregaSoftware() {
    var user = localStorage.getItem("user");

    if (!user) {
        window.location = "login.html"
    } else {
        fetch("http://localhost:8080/software/disponiveis")
            .then(res => res.json())
            .then(res => popula(res));
        fetch("http://localhost:8080/maquinas/disponiveis")
            .then(res => res.json())
            .then(res => popula_maquina(res));
    }
}

function popula_maquina(lista){
    strMaquina = '';
    for (i=0; i<lista.length; i ++){
        strMaquina_draft = fragmento_radio;
        strMaquina += strMaquina_draft.replace("{{ID}}", lista[i].id)
                                      .replace("{{LABEL}}", lista[i].maquina +" "+ lista[i].modelo + "; HD = " + lista[i].hd +"; Memoria = " + lista[i].ram+ "GB ; "+ lista[i].tamanhoTela+"\"");    
    }
    document.getElementById("listaMaquina").innerHTML = strMaquina;
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
    const radio = document.querySelectorAll('input[name="exampleRadios"]:checked');
    id_maquina = parseInt(radio[0].id);

    let softwares_list = [];
    checkboxes.forEach((checkbox) => {
        softwares_list.push(parseInt(checkbox.value));
    });

    Json_pedido = gera_JSON_pedido(softwares_list, $("#obs_pedido").val(), id_maquina);


   // tambem preciso montar um cabecalho para indicar o metodo, o corpo e os headers
   var cabecalho = {
       method: 'POST',
       body: JSON.stringify(Json_pedido),
       headers: {
               'Content-Type': 'application/json'
       }
   }

   fetch("http://localhost:8080/pedido/novo",cabecalho)
        .then(   
            Swal.fire(
                'Sucesso.',
                'Seu pedido foi solicitado!',
                'success'
            ).then(function() {
                window.location = "profile.html";
            })
        )
        .catch(err=>{          // se deu erro (usuario invalido), uso CSS para mostrar a mensagem de erro
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Alguma coisa deu errado!',                
              })
        });
}



function gera_JSON_pedido(lista_softwares, observacao, id_maquina){
var data = new Date();
var dia         = data.getDate();           // 1-31
var mes         = data.getMonth();          // 0-11 (zero=janeiro)
var ano4        = data.getFullYear();       // 4 dígitos
var str_data    = dia + '/' + (mes+1) + '/' + ano4;

var usuario = JSON.parse(window.localStorage.getItem('user'));

    dict_pedido = {
        "status": "N",
        "observacao": observacao,
        "dataPedido": str_data,
        "solicitante": { "id" : usuario.id},
        "computador" : { "id" : id_maquina},
        "itens":[]
    }

    for (i=0; i<lista_softwares.length; i++){
        dict_pedido['itens'].push({"itemSoftware": {"id" : lista_softwares[i]}});
    }

    return dict_pedido;
}

//comando para remover o cook e redirecionar para login.html
function logout() {
    localStorage.removeItem("user");                
    window.location = "./login.html"; 
}

//comando para adicionar os itens como icones do feather
feather.replace()