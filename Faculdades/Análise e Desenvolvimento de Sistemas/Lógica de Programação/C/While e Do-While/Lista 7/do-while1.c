#include <stdio.h>

int main()
{
int n;
do
{
	printf("\nDigite um Numero de 0 a 10: ");
	scanf("%d", &n);
	
} while(n >= 0 && n <= 10);
    printf("\nInvalido\n");


	
	return 0;
}

