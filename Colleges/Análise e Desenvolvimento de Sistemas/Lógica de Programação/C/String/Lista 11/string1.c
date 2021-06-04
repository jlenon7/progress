
/*
1) Faça um programa para concatenar as duas strings abaixo. A segunda string deve ser
concatenada na primeira.
Exemplo:
string1: lua
string2: cheia
Após concatenar: string1: luacheia
string2: cheia
 */

#include <stdio.h>
#include <string.h>

int main()
{
	char str1[4] = "Lua";
	char str2[6] = "Cheia";
	
    printf("Antes de Concatenar\n");
	
	puts(str1);
	puts(str2);
	
	printf("\n");
	
	strcat(str1, str2);

	printf("\nDepois de Concatenar\n");
	
	puts(str1);
	puts(str2);
	
	return 0;
}

