//para esconder o banner de falha no login
$("#failLogin").hide();

//funcao de autenticacao do login
function autentica() {
    var input_racf = $("#txtLogin").val();
    var input_senha = $("#txtSenha").val();

    var msgBody = {
        racf: input_racf,
        senha: input_senha
    }

    var head = {
        method: "POST",
        body: JSON.stringify(msgBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch("http://localhost:8080/login/racf", head)
        .then(res => res.json() )
        .then(res => {
                usuario = res;
                localStorage.setItem("user", JSON.stringify(usuario));                
                window.location = "./profile.html";   
                             
        })
        .catch(err=>{
            $("#failLogin").fadeTo(2000, 500).slideUp(500, function(){
                $("#failLogin").slideUp(500);
            });
        });
}


