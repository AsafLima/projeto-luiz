var campoFiltro = document.querySelector(".txtFiltro");

campoFiltro.addEventListener("input", function(){
    var cadastrados = document.querySelectorAll(".cadastrado");
    if(this.value.length > 0){
        for(var i=0; i < cadastrados.length; i++){
            var cadastrado = cadastrados[i];
            var TDnome = cadastrado.querySelector("#info-name");
            var nome = TDnome.textContent;
            var expressao = new RegExp(this.value, "i");
            if(!expressao.test(nome)){
                cadastrado.classList.add("invisivel");
            }else{
                cadastrado.classList.remove("invisivel");
            }
        }
    }else{
        for(var i=0; i < cadastrados.length; i++){
            var cadastrado = cadastrados[i];
            cadastrado.classList.remove("invisivel");
        }
    }
})