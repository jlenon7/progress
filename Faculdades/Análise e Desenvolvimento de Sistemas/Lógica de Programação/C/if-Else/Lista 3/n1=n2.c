#include <stdio.h>

int main( )
{
	int n1, n2;
	
	     printf("PROGRAMA PARA IDENTIFICAR QUAL NUMERO E MAIOR\n\n");
	     printf("Digite o primeiro numero: ");
	     scanf("%d", &n1);
	     printf("Digite o segundo numero: ");
	     scanf("%d", &n2);
	     
	     if (n1>n2)
	         printf("%d E maior que %d\n", n1, n2);
	     else if ( n1==n2 )
	         printf("uau %d E igual a %d\n", n2, n1); 
	     else 
	         printf("%d E maior que %d\n", n2, n1);   
	         
	return 0;
}
