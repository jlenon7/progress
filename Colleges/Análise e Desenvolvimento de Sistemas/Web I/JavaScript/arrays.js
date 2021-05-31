var nomes = ["João", "Maria", "José", "Vanessa"];
console.log("Arrays");
console.log(nomes);

console.log("Primeiro Elementos Array nomes:" + nomes[0]);
console.log("Segundos Elementos Array nomes:" + nomes[1]);
console.log("Terceiro Elementos Array nomes:" + nomes[2]);
console.log("Quarto Elementos Array nomes:" + nomes[3]);
console.log("Tamanho do Array nomes:" + nomes.length);

document.getElementById("nomes")

console.log("Array com tipos misturados");
var misturados = ["Uma String qualquer", 100, nomes];
console.log(misturados);

var paragrafo_nomes = document.getElementById("nomes");
alert(paragrafo_nomes.innerHTML);

nomes.push("Odin");
var nomesComAdicao = nomes;
paragrafo_nomes.innerHTML = nomesComAdicao;
nomes.splice(0,2);
document.getElementById("editado").innerHTML = nomes
+ "<br>Quebra de linha";

console.log("==== OBJECT ====");
var pessoa = {nome: "João", sobrenome: "Lenon", altura: 1.70, idade: 17};
console.log("Nome: " + pessoa.nome);
console.log("Sobrenome: " + pessoa["sobrenome"]);

for (var p in pessoa) {
    console.log("Elemento: " + p + " Valor: " + pessoa[p]);
}

var cidades = [
                 {nome: "Foz", estado: "PR"},
                 {nome: "Cascavel", estado: "PR"}
              ];

for (var i = 0; i < pessoa.length; i++) {
	console.log(cidades[i]);
	console.log("Nome cidade: " + cidades[i].nome);
}

console.log("==== Array com Object ====");
nomes.push(pessoa);
console.log(nomes);
