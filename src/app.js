import Agenda from "./agenda";
import Usuario from "./usuarios";


let usuarios = [];
let agendados = [];
const divLogin = document.getElementById("divLogin")
let inputUsuario = document.getElementById("usuario")
let inputSenha = document.getElementById("senha")
let divAgenda = document.getElementById("horarioMarcados")


function cadastrarUsuario(usuario, senha) {
    const novoUsuario = new Usuario(usuario, senha);
    usuarios.push(novoUsuario);
    console.log(usuarios);

    alert("Usuário Cadastrado");
    inputUsuario.value = "";
    inputSenha.value = "";
}


function verificarUsuario(usuario, senha) {
    for (const i of usuarios) {
        if (i.usuario == usuario && i.senha == senha) {
            localStorage.setItem('usuario', usuario);
            alert('conectado')
            window.location.href = "http://localhost:8080/index2.html";

        }
    }


};

function agendar(dia, hora, servico, usuario) {
    if (dia && hora && servico && usuario) {
        agendados.push({ usuario: usuario, dia: dia, hora: hora, servico: servico });
        mostrarAgenda(usuario);
        document.getElementById("inputDia").value = "";
        document.getElementById("inputHora").value = "";
        document.getElementById("inputServico").value = ""

    } else alert("Preencha todas as informações para agendar seu horário")
};

function mostrarAgenda(usuario) {
    divAgenda.innerHTML = null;
    for (const i of agendados) {
        if (i.usuario = usuario) {
            divAgenda.innerHTML += `${i.servico} agendado para: ${i.dia} às ${i.hora} <BR>`
        }
    }
};

// salvarLocalStorage() {
//     localStorage.setItem("agenda", JSON.stringify(this.agendados));
// }


if (document.getElementById("btnCadastrar")) {
    const btnCadastrar = document.getElementById("btnCadastrar");
    btnCadastrar.onclick = () => cadastrarUsuario(document.getElementById("usuario").value, document.getElementById("senha").value);
}
if (document.getElementById("btnAcessar")) {
    const btnAcessar = document.getElementById("btnAcessar");
    btnAcessar.onclick = () => verificarUsuario(document.getElementById("usuario").value, document.getElementById("senha").value);
}

if (document.getElementById("btnConfirmar")) {
    const btnConfirmar = document.getElementById("btnConfirmar");
    btnConfirmar.onclick = () => agendar(document.getElementById("inputDia").value, document.getElementById("inputHora").value, document.getElementById("inputServico").value, localStorage.getItem('usuario'));
}