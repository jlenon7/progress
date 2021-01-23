
/*2) Faça um programa para ler uma matriz 3x3 (float) e depois
exibir uma determinada linha da matriz indicada pelo usuário.*/


#include <stdio.h>
#define LIN 3
#define COL 3

int main()
{
float m[LIN][COL];
int i, j, x;

for(i=0; i<LIN; i++) {
 for(j=0; j<COL; j++){
	printf("Informe os valores da matriz[%d][%d]: ", i, j);
	scanf("%g", &m[i][j]);
                     }
                     }
    printf("\nElementos da matriz\n");
    
for(i=0; i<LIN; i++) {
 for(j=0; j<COL; j++){
	 
    printf("m[%d][%d]= %g\n", i, j, m[i][j]);
                     }
				     }
				     
    printf("\nEscolha a linha: ");
    scanf("%d", &x);
				
for(j=0; j<COL; j++){
	
    printf("O valor é: m[i][j] = %g\n", m[x][j]);
			        }   	
	return 0;
}

