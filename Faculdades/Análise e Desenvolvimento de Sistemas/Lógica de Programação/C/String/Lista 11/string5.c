
/*
5) Faça um programa que leia uma string e troque todos os caracteres para caracteres
maiúsculos.
Exemplo:
Entrada: teste
Saída: TESTE
*/


#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main()
{
	char str[50];
	int i;
	
	printf("Digite a palavra: ");
	fgets(str, 50, stdin);
	
	
	for (i = 0; i < 50; i++)                 
		str[i] = toupper(str[i]);
		
	printf("Palavra em maiusculo: %s", str);
	
	return 0;
}

