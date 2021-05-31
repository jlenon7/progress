
/*3) Faça um programa para ler dois vetores X e Y, ambos com n elementos, e determinar
o produto escalar desses vetores.

Exemplo:X = [1 2 3] Y = [4 5 6] O produto escalar é dado por (1*4 + 2*5 + 3*6) = 32 */

#include <stdio.h>
#define TAM 10

int main()
{
	int i, n;
	int x[TAM], y[TAM], pe=0;
     
	printf("Digite o tamanho dos vetores:");
    scanf("%d", &n);
    
    printf("\nDigite o primeiro vetor\n");
    
	for(i=0; i<n; i++)
	{
	  printf("Valor[%d]:", i);
	  scanf("%d", &x[i]);
	}
	
    printf("Digite o segundo vetor\n");
    
	for(i=0; i<n; i++)
    {
      printf("Valor[%d]:", i);
      scanf("%d", &y[i]); 
    }
    
     
    for (i=0; i<n; i++)
    {
      pe = pe + x[i] * y[i];
      printf("Produto escalar:%d\n", pe);
    }

	
	return 0;
}

