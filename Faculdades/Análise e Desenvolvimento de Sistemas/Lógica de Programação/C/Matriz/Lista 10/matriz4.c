
/*4) Faça um programa para ler os valores de uma matriz A (mxn) e determine a matriz T transposta
de A. (obs.: T[i][j] = A [j][i]).*/


#include <stdio.h>
#define LIN 99
#define COL 99


int main()
{
int a[LIN][COL], t[LIN][COL];
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
  t[i][j] = a[j][i];
  printf("T[%d][%d]: %d ", i, j, t[i][j]);
                   }
  printf("\n");
                   }
}
else
printf("Matriz muito grande!\n");            
	return 0;
}

