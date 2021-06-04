#include <stdio.h>
#include <ctype.h>

         int main(){
	
	         char ec;
	         printf("Programa para mostrar seu Estado Civil.\n");
	         printf("Você é [Solteiro / Casado / Divorciado / Viuvo]?\n");
	         scanf("%c", &ec);
	         
	         ec = toupper(ec);
	         
	         if(ec == 's' )
	            
	            printf("%c Seu Estado Civil é Solteiro\n", ec);
	           
	         else if(ec == 'C' )
	         
	            printf("%c Seu Estado Civil é Casado\n", ec);
	            
	         else if(ec == 'd' )
	         
	            printf("%c Seu Estado Civil é Divorciado\n", ec);
	            
	         else
	            
                printf("%c Seu Estado Civil é Viuvo\n", ec);
	
	return 0;
}

