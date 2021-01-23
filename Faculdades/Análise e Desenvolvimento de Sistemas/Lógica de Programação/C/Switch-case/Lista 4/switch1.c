#include <stdio.h>
#include <math.h>

         int main(){
			 
			 int c;
			 float num1, num2, res;
			 
			 printf("\n\n=================================Calculadora====================================\n");
			 printf("\nEscolha a operação matemática desejada;\n");
			 printf("1.Adição\n");
			 printf("2.Subtração\n");
			 printf("3.Multiplicação\n");
			 printf("4.Divisão\n");
			 printf("5.Raiz Quadrada\n");
			 printf("6.Exponenciação\n\n");
			 scanf("%d", &c);
			 
			 printf("\nDigite as variáveis para realizar as operações;\n");
			 printf("\nVariável A:");
			 scanf("%f", &num1);
			 printf("Variável B:");
			 scanf("%f", &num2);
			 			 			 			 
			 switch (c)
			 {
			        case 1:
			        res = num1 + num2;
			        printf("\nResultado da Adição = %.2f\n\n", res);
			        break;
			
			        case 2:
                    res = num1 - num2;
                    printf("\nResultado da Subtração = %.2f\n\n", res);
                    break;
			        
			        case 3:
                    res = num1 * num2;
                    printf("\nResultado da Multiplicação = %.2f\n\n", res);
                    break;
                    
                    case 4:
                    if (num2 == 0)
                       printf("\nA Divisão da 0\n\n");
                    else
				    {
                    res = num1 / num2;
                    printf("\nResultado da Divisão = %.2f\n\n", res);
				    }
                    break;
                    
                    case 5:
                    res = sqrt(num1);
                    printf("\nO Resultado da Raiz Quadrada é = %f\n", res);
                    break;
                    
                    case 6:
                    res = (int)num1 % (int)num2;
                    printf("\nResultado do Resto da Divisão = %.2f\n\n", res);
                    break;
                    
			        default:
			        printf("Esta opção não existe!");
    }
	return 0;
}

