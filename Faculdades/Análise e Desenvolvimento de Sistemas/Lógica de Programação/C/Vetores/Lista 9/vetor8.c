
/*8) Faça um programa para ler uma sequência de 10 números, armazená-los em um vetor,
e depois armazená-los em um segundo vetor na ordem inversa à da leitura.*/


#include <stdio.h>

int main()
{

	float vA[10], vB[10];
	int i, a;
	
	for (i = 0; i < 10; i++)
	{
	  printf("Digite o %dº valor: ", i+1);
	  scanf("%f", &vA[i]);
	}
	
	for (i = 9, a = 0; i >= 0; i--, a++)
	{
	  vB[a] = vA[i];
	  printf("\n%dº Valor = %g",a+1, vB[a]);
	}

	return 0;
}

