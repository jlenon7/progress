
/*
2) Faça um programa semelhante ao anterior, mas agora as duas strings devem ser
digitadas pelo usuário e depois concatenadas e atribuídas a uma terceira string. Exibir o
tamanho de todas elas após a concatenação
Exemplo:
string1: lua
string2: nova
Após concatenar: string1: lua
string2: nova
string3: lua nova
Tamanhos: 3 4 8
*/

#include <stdio.h>
#include <string.h>

int main()
{
	char str1[50];
	char str2[50];
	char str3[50];
	
	printf("Digite a primeira palavra: ");
	fgets(str1, 50, stdin);
	printf("Digite a segunda palavra: ");
	fgets(str2, 50, stdin);
	
	str3 = strcat(str1, str2);
	
	puts(str3);
	
	return 0;
}

