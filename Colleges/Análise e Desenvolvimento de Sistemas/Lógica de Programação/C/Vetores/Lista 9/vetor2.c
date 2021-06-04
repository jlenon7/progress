
/*2) Ler os valores de um vetorA com 10 elementos, verificar se o valor é PAR, se SIM
multiplicar por 5, se NÃO, somar com 5. O resultado deve ser colocado em outro vetor.
Mostre os valores do vetor final.*/

#include <stdio.h>

int main()
{
	int vetA[10], vetB[10];
	int i;
	
    printf("Digite 10 valores\n");
    
	for(i=0; i<10; i++)
	{
	  printf("Valor[%d]:", i);
	  scanf("%d", &vetA[i]);
	
    if(vetA[i]%2==0)
    {
    vetB[i] = vetA[i] * 5;
    }
    else
	vetB[i] = vetA[i] + 5;
    }
    
    printf("\nPares ou Impares\n");
    
    for(i=0; i<10; i++)
    {
    printf("+5 ou *5[%d] = %d\n", i, vetB[i]); 
    }
	
	return 0;
}

