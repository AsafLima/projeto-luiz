
var alunos = []

var editedAlunoId = 0

var alunoFields = {
    name: document.getElementById("nameNewAluno"),
    phone: document.getElementById("telefoneNewAluno"),
    lastName: document.getElementById("lastNameNewAluno"),
    email: document.getElementById("emailNewAluno")
}

let endpointURL = "http://172.16.48.54:5000/api/alunos"

function showAlert(type, text) {
    var alertPlaceholder = document.getElementById("alertPlaceholder")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'
    + text + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="resetClass()"></button></div>'
  
    alertPlaceholder.append(wrapper)
}


function createNewAluno(data) {
    self.alunos.push(data)
    showAlert("success", `Aluno adicionado com sucesso`)
}

function updateAluno(data) {
    apagaAluno(data.id)
    self.alunos.push(data)
    showAlert("success", `Aluno alterado com sucesso`)
    updateAlunosList()
}

function updateAlunosList() {
    let list = document.getElementById("items")
    var alunoEntries = ""
    self.alunos.forEach(aluno => {
        alunoEntries += `<tr class="cadastrado"><td id="info-name">${aluno.first_name}</td>
        <td id="info-lastName">${aluno.last_name}</td>
        <td id="info-email">${aluno.email}</td>
        <td id="info-phone">${aluno.phone}</td>
        <td><button class="btn" id="btnEdita" onClick="editAluno(${aluno.id})">Editar</button></td>
        <td id="tdBtn"><button id="btnApaga" onClick="apagaAluno(${aluno.id})">Apagar</button></td>
        <td id="tdBtn"><button id="btnAlert" onClick="alertaAluno(${aluno.id})">Alerta!</button></td></tr>`
    });

    list.innerHTML = alunoEntries
}

function alertaAluno(alunoId) {
    console.log(alunoId)
    let alunoFiltrados = alunos.filter(aluno => aluno.id == alunoId)
    let aluno = alunoFiltrados[0]
    alert(`${aluno.first_name} ${aluno.last_name}`);
}

function apagaAluno(idAluno) {
    var newAlunos = self.alunos.filter(aluno => aluno.id != idAluno)
    self.alunos = newAlunos
    updateAlunosList()
}

function editAluno(idAluno) {
    let editButton = document.getElementById("editarAlunoBtn");
    editButton.style.display = "block";
    let createButton = document.getElementById("criarAlunoBtn");
    createButton.style.display = "none";
    let limparBtn = document.getElementById("limpar")
    limparBtn.style.display = "block";
    self.editedAlunoId = idAluno
    let aluno = alunos.filter(aluno => aluno.id == idAluno)[0]
    setCampos(aluno)
}

function setCampos(aluno) {
    console.log(aluno)
    alunoFields.name.value = aluno.first_name
    alunoFields.phone.value = aluno.phone
    alunoFields.lastName.value = aluno.last_name
    alunoFields.email.value = aluno.email
}

function getCampos() {
    return {
        first_name: alunoFields.name.value,
        phone: alunoFields.phone.value,
        last_name: alunoFields.lastName.value,
        email: alunoFields.email.value
    }
}

function clearCampos() {
    alunoFields.name.value = ""
    alunoFields.phone.value = ""
    alunoFields.lastName.value = ""
    alunoFields.email.value = ""
}

function addAluno() {
    let infoNewAluno = getCampos()
    infoNewAluno.id = getRandomInt(1,100000)
    clearCampos()
    createNewAluno(infoNewAluno)
    updateAlunosList()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function submitAlunoEdit() {
    var editedAluno = getCampos()
    editedAluno.id = self.editedAlunoId
    updateAluno(editedAluno)
    clearCampos()
}

function exemplo(cond, callback) {
    if(cond){ 
        callback()
    }
}

function clickLimpar() {
    console.log('limpa')
    clearCampos()
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    exemplo(false, function() {
        console.log("teste")
    })
}

document.addEventListener("DOMContentLoaded", function() {
    updateAlunosList(self.alunos);
    let createButton = document.getElementById("criarAlunoBtn");
    createButton.addEventListener('click', (event) => {
        event.preventDefault();    
        resetClass();

        let verifica = verificaDados();

        if(verifica == true){

            if(isNaN(alunoFields.phone.value) || alunoFields.phone.value.length < 8){
                alunoFields.phone.id = "campoinvalido";
                return showAlert('warning', "Telefone inválido");
            }
            if(validaEmail(alunoFields.email.value) == false){
                alunoFields.email.id = "campoinvalido";
                return showAlert('warning', "Email inválido");
            }
            alunoFields.name.value = alunoFields.name.value[0].toUpperCase() + alunoFields.name.value.substr(1);
            alunoFields.lastName.value = alunoFields.lastName.value[0].toUpperCase() + alunoFields.lastName.value.substr(1);

            addAluno();
            resetClass();
            
        }else if(verifica.length > 0){
            showAlert('warning', "Favor preencha o(s) campo(s):   " + verifica);
        }
    })

    let editButton = document.getElementById("editarAlunoBtn")
    let limparBtn = document.getElementById("limpar")
    limparBtn.style.display = "none";
    editButton.style.display = "none";
    limparBtn.addEventListener('click', (event) => {
        clickLimpar();
        limparBtn.style.display = "none";
        editButton.style.display = "none";
        createButton.style.display = "block";
        self.editedAlunoId = 0;
    });
    editButton.addEventListener('click', (event) => {
        event.preventDefault();
        if(self.editedAlunoId == 0) {
            showAlert('warning', "Favor selecionar um aluno")
        } else {
            createButton.style.display = "block";
            limparBtn.style.display = "none";
            editButton.style.display = "none";
            submitAlunoEdit();
        }
    })
});

function verificaDados(){
    let vazio = verificaVazio();
    if(vazio.length != 0){
        return vazio; 
    }else{
        return true;
    }
}

function resetClass(){
    alunoFields.name.id = "nameNewAluno";
    alunoFields.phone.id = "telefoneNewAluno";
    alunoFields.lastName.id = "lastNameNewAluno";
    alunoFields.email.id = "emailNewAluno";
}

function verificaVazio(){
    var camposVazios = [];
    if(alunoFields.name.value.length == 0){ 
        alunoFields.name.id = "campoinvalido";
        camposVazios.push("Nome");
    }
    if(alunoFields.lastName.value.length == 0){ 
        alunoFields.lastName.id = "campoinvalido";
        camposVazios.push("Sobrenome");
    }
    if(alunoFields.email.value.length == 0){ 
        alunoFields.email.id = "campoinvalido";
        camposVazios.push("Email");
    }
    if(alunoFields.phone.value.length == 0){ 
        alunoFields.phone.id = "campoinvalido";
        camposVazios.push("Telefone");
    }
    return camposVazios;
}

function validaEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }