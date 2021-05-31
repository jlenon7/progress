#include <stdio.h>
#include <ctype.h>

int main(){
	int i=1, idade, contM=0, contF=0, soma=0, maior=0, menor=999;
	char gen;
	float media;
	
	while (i<=10){
		printf("Informe a idade: ");
		scanf("%d", &idade);
		printf("Informe o genero: ");
		scanf(" %c", &gen);
		gen = toupper(gen);
		if(gen =='M'){
			contM++;
		}
		else if(gen=='F'){
			contF++;
			soma = soma + idade;
		}
		
		if(idade > maior)
			maior = idade;
			
		if(idade < menor)
			menor = idade;
		
		i++;
	}
	if(contF>0){
		media = (float)soma/contF;
		printf("Media da idade das mulheres = %.2f\n", media);
	}
	else
		printf("Não houveram mulheres\n");
	printf("Quantidade de homens = %d\n", contM);
	
	printf("Maior idade = %d\n", maior);
	printf("Menor idade = %d\n", menor);
	
	
	return 0;
}
