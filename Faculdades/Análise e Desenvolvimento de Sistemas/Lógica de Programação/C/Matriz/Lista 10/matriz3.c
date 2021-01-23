
/*3) Considere duas matrizes A e B de tamanho mxn (informados pelo usuário). Faça um programa
para calcular a matriz C, resultante da soma da matriz A com a matriz B. Imprimir a matriz C na
forma de uma matriz (LxC).*/


#include <stdio.h>
#define LIN 99
#define COL 99
int main()
{
int a[LIN][COL], b[LIN][COL], c[LIN][COL];
int m, n, i, j;

printf("Informe o numero de linhas e de colunas da matriz A\n");

printf("\nLinhas:");
scanf("%d", &m);
printf("Colunas:");
scanf("%d", &n);

printf("\n");
if (m < LIN && n < COL)
{
for(i=0; i<m; i++) {
 for(j=0; j<n; j++){
  printf("Informe os valores da matriz A[%d][%d]:", i, j);
  scanf ("%d", &a[i][j]);
  
                   }
                   }
                   
printf("\n");          

for(i=0; i<m; i++) {
 for(j=0; j<n; j++){
  printf("Informe os valores da matriz B[%d][%d]:", i, j);
  scanf ("%d", &b[i][j]);
  
                   }
                   }

printf("\n");   

for (i=0; i<m; i++) {
 for (j=0; j<n; j++){
  c[i][j] = a[i][j] + b[i][j];
  printf("%d ", c[i][j]);
  
                    }
printf("\n");
                    }
}
else
printf("Matriz muito grande!\n");

	return 0;
}

