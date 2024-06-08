//Seu JavaScript de validação aqui

const formulario = document.getElementById('meuForm');
const campos = document.querySelectorAll('.formcontato__input');
const mensagemErro = document.querySelectorAll('.error');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const button = document.getElementById('botao');
const campoMensagem = document.getElementById('mensagem');

const validacaoFuncoes = [validarNome, validarEmail, validarAssunto];

campos.forEach((campo, index) => {
    campo.addEventListener('blur', validacaoFuncoes[index]);
});

campoMensagem.addEventListener('blur', validarMensagem);

formulario.addEventListener('submit', (event) => {
    if (!validarFormulario()) {
        event.preventDefault();
        console.log('Preencha todos os campos.');
    } else {
        console.log('Enviado com sucesso.');
    }
});

function validarNome() {
    const nome = campos[0].value;
    console.log(`Validando nome: ${nome}`);
    if (nome === '') {
        setError(0, 'O campo Nome é obrigatório.');
        return false;
    } else if (nome.length > 50) {
        setError(0, 'O texto deve ter pelo menos 50 caracteres.');
        return false;
    } else {
        removeError(0);
        return true;
    }
}

function validarEmail() {
    const email = campos[1].value;
    console.log(`Validando email: ${email}`);
    if (email === '') {
        setError(1, 'O campo Email é obrigatório.');
        return false;
    } else if (!emailRegex.test(email)) {
        setError(1, 'O Email inserido não é válido.');
        return false;
    } else {
        removeError(1);
        return true;
    }
}

function validarAssunto() {
    const assunto = campos[2].value;
    console.log(`Validando assunto: ${assunto}`);
    if (assunto === '') {
        setError(2, 'O campo Assunto é obrigatório.');
        return false;
    } else if (assunto.length > 50) {
        setError(2, 'O texto deve ter menos de 50 caracteres.');
        return false;
    } else {
        removeError(2);
        return true;
    }
}

function validarMensagem() {
    const mensagem = campoMensagem.value;
    console.log(`Validando mensagem: ${mensagem}`);
    if (mensagem === '') {
        mensagemErro[3].innerHTML = 'O campo de Mensagem é obrigatório.';
        campoMensagem.style.border = '1px solid red';
        mensagemErro[3].style.display = 'block';
        return false;
    } else if (mensagem.length > 300) {
        mensagemErro[3].innerHTML = 'O texto deve ter no máximo 300 caracteres.';
        campoMensagem.style.border = '1px solid red';
        mensagemErro[3].style.display = 'block';
        return false;
    } else {
        campoMensagem.style.border = '';
        mensagemErro[3].style.display = 'none';
        return true;
    }
}

function setError(index, mensagem) {
    if (mensagemErro[index]) {
        mensagemErro[index].innerHTML = mensagem;
        campos[index].style.border = '1px solid red';
        mensagemErro[index].style.display = 'block';
    } else {
        console.error(`Elemento de erro para índice ${index} não encontrado.`);
    }
}

function removeError(index) {
    if (mensagemErro[index]) {
        campos[index].style.border = '';
        mensagemErro[index].style.display = 'none';
    } else {
        console.error(`Elemento de erro para índice ${index} não encontrado.`);
    }
}

function validarFormulario() {
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const assuntoValido = validarAssunto();
    const mensagemValida = validarMensagem();

    console.log(`Resultados da validação - Nome: ${nomeValido}, Email: ${emailValido}, Assunto: ${assuntoValido}, Mensagem: ${mensagemValida}`);
    if (nomeValido && emailValido && assuntoValido && mensagemValida) {
        button.disabled = false;
        button.style = '';
        return true;
    } else {
        button.style.backgroundColor = 'grey';
        return false;
    }
}
