
/*1) Faça um programa para calcular o dobro de cada elemento de um vetorA com 5
elementos e colocar os resultados em um segundo vetorB. Mostre os valores resultantes
do vetorB.*/

#include <stdio.h>

  int main()
  {
  int vetA[5], vetB[5];
  int i;
  
  for(i=0; i<5; i++)
  {
	printf("Digite 5 valores[%d]:", i);
	scanf("%d", &vetA[i]);	
  }
  
  printf("\nCalculo da multiplicação\n");
  printf("\nMultiplicados por 2: \n");
  
  for(i=0; i<5; i++)
  {
	vetB[i] = vetA[i]*2;
    printf("x2[%d] = %d\n", i, vetB[i]); 
  }

	return 0;
  }

