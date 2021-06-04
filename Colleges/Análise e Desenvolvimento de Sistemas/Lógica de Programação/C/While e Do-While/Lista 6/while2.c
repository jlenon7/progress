#include "stdio.h"
 

int main()
{
	
int proximo = 0, atual = 0, anterior = 1;

printf("Sequencia de Fibonacci\n");

while(proximo <= 610)
{
  
  printf("%d\n", proximo);
  proximo = atual + anterior;
  anterior = atual;
  atual = proximo;
  
}
  	return 0;
}
