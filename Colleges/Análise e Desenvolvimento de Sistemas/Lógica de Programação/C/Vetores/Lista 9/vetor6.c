
/*6) O mesmo exercício anterior, mas agora deve escrever o menor elemento do vetor e a
respectiva posição dele nesse vetor.*/


#include <stdio.h>
#define TAM 20
int main()
{
	float v[TAM], menor = 9999;
	int i, a;
	
	for (i = 0; i < TAM; i++)
	{
	  printf("Digite o %dº valor: ", i+1);
	  scanf("%f", &v[i]);
		
	if (v[i] < menor)
	{
	  menor = v[i];
	  a = i;
	}
	}
	
	printf("\nO menor numero é %g e está na %dº posição", menor, a+1);
	
	return 0;
}
