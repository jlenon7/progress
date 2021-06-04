#include <stdio.h>

         int main(){
			 
			 float n;
			 printf("Programa para Ler um Numero Inteiro\n");
			 printf("Digite o Numero:");
			 scanf("%f", &n);
			 
			 if (n>100)
			    
			    printf("%f NUMERO NÃO PERMITIDO.", n);
			    
			 else if (n<-100)
			 
			    printf("%f NUMERO NÃO PERMITIDO.", n);
			    
			 else
			 
			    printf("%f Numero Permitido.", n);
			 
			 
			 

	
	return 0;
}

