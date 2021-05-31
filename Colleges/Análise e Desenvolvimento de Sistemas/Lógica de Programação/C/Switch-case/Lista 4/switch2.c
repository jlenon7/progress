#include <stdio.h>

         int main(){
			 
			 int cat;
			 
			 printf("\n\n===========================Categoria de Habilitação=============================\n");    			 			
			 printf("\nQual a categoria da sua Carteira?\n");
			 printf("1.Categoria A\n");
			 printf("2.Categoria B\n");
			 printf("3.Categoria C\n");
			 printf("4.Categoria D\n");
			 printf("5.Categoria E\n\n");
			 scanf("%d", &cat);
			 
			 switch(cat)
			 {
			       case 1:
			       printf("Você só está habilitado a dirigir Motos!");
			       break;
			 
			       case 2:
			       printf("Você só está habilitado a dirigir Carros!");
			       break;
			       
			       case 3:
			       printf("Você só está habilitado a dirigir Caminhões");
			       break;
			       
			       case 4:
			       printf("Você só está habilitado a dirigir Ônibus");
			       break;
			       
			       case 5:
			       printf("Você só está habilitado a dirigir Carretas");
			       break;
			 }      		
	return 0;

}

