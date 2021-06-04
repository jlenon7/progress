#include <stdio.h>

         int main(){
			 
			 int dia;
			 
			 printf("Escolha um Numero\n");
			 printf("1\n");
			 printf("2\n");
			 printf("3\n");
			 printf("4\n");
			 printf("5\n");
			 printf("6\n");
			 printf("7\n\n");
			 scanf("%d", &dia);
			 
			 switch (dia)
			 {
			        case 1:
			        printf ("Hoje é Domingo pé de Cachimbo!");
			        break;
			        
			        case 2:
			        printf ("Hoje é Segunda!");
			        break;
			        
			        case 3:
			        printf ("Hoje é Terça!");
			        break;
			        
			        case 4:
			        printf("Hoje é Quarta!");
			        break;
			        
			        case 5:
			        printf("Hoje é Quinta!");
			        break;
			        
			        case 6:
			        printf("Hoje é Sexta!");
			        break;
			        
			        case 7:
			        printf("Hoje é Sábado!");
			        break;
			         
			        default:
			        printf("Esta opção não existe!");  
			}        		
	return 0;
}

