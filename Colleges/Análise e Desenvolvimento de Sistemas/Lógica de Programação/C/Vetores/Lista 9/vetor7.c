
/*7) Fazer uma variação do exercício 5 e 6 em que ele deve escrever o maior e o menor
valor pegando a respectiva posição de cada um*/


#include <stdio.h>
#define TAM 20
int main()
{
	float v[TAM], maior = -999999, menor = 999999;
	int i, a, a2;
	
	for (i = 0; i < TAM; i++)
	{
	  printf("Digite o %dº valor: ", i+1);
	  scanf("%f", &v[i]);
		
	if (v[i] < menor)
	{
	  menor = v[i];
	  a = i;
	}
	if (v[i] > maior)
	{
	  maior = v[i];
	  a2 = i;
	}
	}
	
	printf("\nO menor numero é %g e está na %dº posição\n", menor, a+1);
	printf("\nO maior numero é %g e está na %dº posição", maior, a2+1);
	
	return 0;
}

