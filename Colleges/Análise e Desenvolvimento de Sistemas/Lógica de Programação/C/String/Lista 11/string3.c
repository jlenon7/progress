
/*
3) Faça um programa para contar quantos caracteres “a” existe em uma string fornecida
pelo usuário.
Exemplo:
Entrada: o dia esta nublado
Saída: 3
*/


#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

int main()
{
	char str[50]
	char vogais[1];
	int i;
	int n = 0;
    
	printf("Digite a Frase: ");
	scanf("%s", str);
	
    for(i=0; str[i] != '\0'; i++){
    if(str[i] == c)
	n = n+1;
    }
	
	printf("Insira o caracter\n");
    scanf("%c", c);
		
	printf("O caracter aparece %d vezes\n", conta(c,str));
	
	return 0;
}

