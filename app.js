
//let titulo =  document.querySelector('h1'); // receber o h1 do html.
//titulo.innerHTML = 'NUMERO SECRETO'; // modifica a tag h1 acima

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = `Escolha um numero de 01 a ${numeroMaximo}`;

//----------------------------------------- VARIAVEIS ----------------------------------------------------------------------------------------

let listaSorteados = []; // criando lista (array) vazia
let numeroMaximo = 2;
let numeroAleatorio = gerarNumeroAleatorio(); // chamada automatica que gera nuemro aleatorio e guarda na variavel
let numeroSecreto = numeroAleatorio;
let textoH1 = 'NUMERO SECRETO';
let textoP = `Escolha um numero de 01 a ${numeroMaximo}`;
let tentativa = 1;
let botaoReiniciar = document.getElementById('reiniciar'); // pegando o botao reiniciar na variavel 

exibirTextoNaTela('h1',textoH1); // chamada automatica que gera texto
exibirTextoNaTela('p', textoP); // chamada automatica que gera texto


//------------------------------------------ FUNÇÕES ------------------------------------------------------------------------------------------

// função que gera um numero aleatorio
function gerarNumeroAleatorio(){
    //return parseInt(Math.floor(Math.random() * numeroMaximo));
    //let numeroEscolhido = parseInt(Math.floor(Math.random() * numeroMaximo));
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosLista = listaSorteados.length; // quantidade de numeros na lista
    if(quantidadeElementosLista == numeroMaximo){ // limpa a lista caso fique cheia igualando com numero maximo de possibilidades
        listaSorteados = []; // deixa lista vazia
    }

    if (listaSorteados.includes(numeroEscolhido)){ // includes verifica toda a lista e ve se o numero esta presente nela
        return gerarNumeroAleatorio(); // se ja existe causa recursão - chama novamente a função para gerar numero e verifica NOVAMENTE se ele existe na lista
    }else{
        listaSorteados.push(numeroEscolhido);
        console.log(listaSorteados);
        return numeroEscolhido;
    }
}

// função que exibe um texto em uma
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value= '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio(); // GERA UM NOVO numero aleatorio para reiniar o jogo
    limparCampo(); // limpa o campo
    tentativa = 1; // reinicia as tentativas
    exibirTextoNaTela('h1',textoH1); // chamada automatica que gera texto
    exibirTextoNaTela('p', textoP); // chamada automatica que gera texto
    botaoReiniciar.setAttribute('disabled','true'); // recolocando e diseble, tem que colocar o true para reinicialo
}

// função ao clicar o butao de chute e esta em um onclick no html
// CADA VEZ QUE APERTA O BOTAO   Ele verifica se igual ao numero secreto criado no inicio
function verificarChute(){
  let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        let erro = tentativa - 1;
        let palavraErro = erro == 1? 'erro' : 'erros'; // PALAVRA ERRO RECEBE 'ERROS' SE MAIOR QUE 1 E 'ERRO' SE MENOR OU IGUAL A 1
        exibirTextoNaTela('h1',`ACERTOU com ${erro} ${palavraErro}.`); // EXIBE O QUE TEM NA VARIAVEL 'erro' E NA VARIAVEL 'palabraErro'
        exibirTextoNaTela('p','PARABÉNS!');
        botaoReiniciar.removeAttribute('disabled'); // retirando o 'disabled' que desabilida o botão no html
    }else{
        tentativa++;
        if (chute > numeroSecreto){
          exibirTextoNaTela('h1',`TENTATIVA: ${tentativa}`);
          exibirTextoNaTela('p',`O numero secreto e MENOR!` );
          limparCampo();
        }else{
          exibirTextoNaTela('h1',`TENTATIVA: ${tentativa}`);
          exibirTextoNaTela('p',`O numero secreto e MAIOR!`); 
          limparCampo();
        }
    }

}