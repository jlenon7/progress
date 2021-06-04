function mudarCor(opcao) {

	if(opcao == 1) {
		document.getElementById('texto').style.color = 'blue';
	} else if (opcao == 2) {
		document.getElementById('texto').style.color = 'green';
	} else if (opcao == 3) {
	  	document.getElementById('texto').style.color = 'black';
	}
	  
}
function pegarTexto() {
	var texto = document.getElementById('pegar_texto').value;
	alert("O valor do campo é: " + texto);
}
/* 

Exercicio:

Crie uma função que pegue 2 números de 2 campos de texto,
a funçâo irá receber 1 parâmetro que serà a operaçâo ma-
temática a ser realizada. Imprimir no HTML o resultado da
operação realizada. 

*/