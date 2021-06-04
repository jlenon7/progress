
/*5) Ler um vetor V de 20 posições (aceitar somente números positivos). Escrever a seguir
o valor do maior elemento de V e a respectiva posição que ele ocupa no vetor.*/

#include <stdio.h>
#define TAM 20
int main()
{
	float v[TAM], maior = -9999;
	int i, a;
	
	for (i = 0; i < TAM; i++)
	{
      printf("Digite o %dº valor: ", i+1);
	  scanf("%f", &v[i]);
		
    if (v[i] > maior)
	{
	  maior = v[i];
	  a = i;
	}
	}
	
	printf("\nO maior numero é %g e está na %dº posição", maior, a+1);
	
	return 0;
}
