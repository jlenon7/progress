#include <stdio.h>

         int main(){
         
         int n;
         printf("\n=======================PROGRAMA PARA SABER O TRIMESTRE==========================\n");
         printf("\nEm qual mês você está? Informe de (1 a 12);\n");
         printf("1.Janeiro\n");
         printf("2.Fevereiro\n");
         printf("3.Março\n");
         printf("4.Abril\n");
         printf("5.Maio\n");
         printf("6.Junho\n");
         printf("7.Julho\n");
         printf("8.Agosto\n");
         printf("9.Setembro\n");
         printf("10.Outubro\n");
         printf("11.Novembro\n");
         printf("12.Dezembro\n\n");
         scanf("%d", &n);
         
         switch(n)
         {
			   case 1:
			   case 2:
			   case 3:
			   printf("\nVocê está no 1º Trimestre!");
			   break;
			   			 			   
			   case 4:
			   case 5:
			   case 6:
			   printf("\nVocê está no 2º Trimestre!");
			   break;
			   			   
			   case 7:
			   case 8:
			   case 9:
			   printf("\nVocê está no 3º Trimestre!");
			   break;
			   
			   case 10:
			   case 11:
			   case 12:
			   printf("\nVocê está no 4º Trimestre!");
			   break;
			   			  			   
			   default:
			   printf("\nEsta opção não existe!");
	    }
	return 0;
}

