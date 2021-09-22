function check(idCheck, idTh, idTd){
    var check = document.querySelector(idCheck);
    check.addEventListener("change", (event) => {
        var cadastrados = document.querySelectorAll(".cadastrado");
        if(check.checked){
            document.querySelector(idTh).classList.remove("invisivel");
            for(var i=0; i < cadastrados.length; i++){
                let cadastrado = cadastrados[i];
                let td = cadastrado.querySelector(idTd);
                td.classList.remove('invisivel');
            }
        }else{
            document.querySelector(idTh).classList.add("invisivel");
            for(var i=0; i < cadastrados.length; i++){
                let cadastrado = cadastrados[i];
                let td = cadastrado.querySelector(idTd);
                td.classList.add('invisivel');
            }
        }
    });
}

check('#checkNome','#THnome','#info-name');
check('#checkSobrenome','#THsobrenome','#info-lastName');
check('#checkEmail','#THemail','#info-email');
check('#checkTel','#THtel','#info-phone');