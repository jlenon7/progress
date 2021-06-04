#include <stdio.h>

         int main(){
			 
		 int n, ano;
         printf("\n=====================PROGRAMA PARA SABER O NUMERO DE DIAS========================\n");
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
			   printf("\nO Mês de Janeiro possui 31 dias!");
			   break;
			   
			   case 2:
			   
			   printf("\nInforme o Ano;\n\n");
               scanf("\n%d", &ano);
			   			   			   
			   if(ano % 4 == 0 && (ano % 400 == 0 || ano % 100 != 0))
			     			   			                   
                 printf("\n%d O mês de fevereiro tem 29 dias!\n", ano);
                 			
			     else
			   {
			     printf("\n%d O mês de fevereiro tem 28 dias!.\n", ano);
			   }		   
			   break;
			   
			   case 3:
			   printf("\nO Mês de Março possui 31 dias!");
			   break;
			   
			   case 4:
			   printf("\nO Mês de Abril possui 30 dias!");
			   break;
			   
			   case 5:
			   printf("\nO Mês de Maio possui 31 dias!");
			   break;
			   
			   case 6:
			   printf("\nO Mês de Junho possui 30 dias");
			   break;
			   
			   case 7:
			   printf("\nO Mês de Julho possui 31 dias!");
			   break;
			   
			   case 8:
			   printf("\nO Mês de Agosto possui 31 dias!");
			   break;
			   
			   case 9:
			   printf("\nO Mês de Setembro possui 30 dias!");
			   break;
			   
			   case 10:
			   printf("\nO Mês de Outubro possui 31 dias!");
			   break;
			   
			   case 11:
			   printf("\nO Mês de Novembro possui 30 dias!");
			   break;
			   
			   case 12:
			   printf("\nO Mês de Dezembro possui 31 dias!");
			   break;
			   
			   default:
			   printf("\nEsta opção não existe!");
	    } 

	
	return 0;
}

