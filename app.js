let listaDeNumerosSorteados = [];
let numeroMaximo = 10; //Número máximo que o usuário pode escolher
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número de 1 a 10");
}

exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector("input").value; //Value para pegar o valor do input

    if (chute == numeroSecreto) { 
        exibirTextoNaTela("h1", "Você acertou!");

        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let msgTentativas = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        exibirTextoNaTela("p", msgTentativas);

        document.getElementById("reiniciar").removeAttribute("disabled");

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "número secreto é menor");
    } else {
            exibirTextoNaTela("p", "número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeNumerosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = []; //Limpa a lista se todos os números já foram sorteados
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); //Chama a função novamente se o número já foi sorteado
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //Adiciona o número sorteado na lista
        return numeroEscolhido; //Retorna o número se ele não foi sorteado
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = ""; //Aponta para o campo input e diz que ele deve ser limpo 
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}