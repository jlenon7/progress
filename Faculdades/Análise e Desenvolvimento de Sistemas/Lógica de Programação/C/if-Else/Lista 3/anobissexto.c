#include <stdio.h>

         int main(){
			 int ano;
			 printf("Ano Bissexto\n");
			 printf("Digite o Ano:\n");
			 scanf("%d", &ano);
			 
             if(ano % 4 == 0 && (ano % 400 == 0 || ano % 100 != 0))
                 
                 printf("%d O ano é bissexto.\n", ano);
                 			
			 else
			 
			     printf("%d O ano não é bissexto.\n", ano);

	
	return 0;
}

