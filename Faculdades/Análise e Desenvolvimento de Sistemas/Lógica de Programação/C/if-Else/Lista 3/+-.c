#include <stdio.h>

     int main() {
		 
	     int numero;
         printf("Programa para saber se o numero e positivo, negativo ou nulo.\n");
         printf("Digite seu numero:");
         scanf("%d", &numero);
         
                if (numero > 0)
                   printf("%d Seu numero e positivo", numero);
                                    
                else if (numero == 0)
                   printf("%d Seu numero e nulo", numero);  
                   
                else 
                   printf("%d Seu numero e negativo", numero);
                 
           	     	
	return 0;
}

