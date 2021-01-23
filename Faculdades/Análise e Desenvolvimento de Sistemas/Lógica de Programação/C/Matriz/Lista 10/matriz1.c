
/*1) Faça um programa para identificar o maior e o menor elemento de uma matriz[8][8], mostrando
os valores e a posição destes valores dentro da matriz.*/

#include <stdio.h>
#define LIN 8
#define COL 8


int main()
{
	int m[LIN][COL], i, j, maior=0, menor=999,
	lmaior=-1, cmaior=-1, lmenor=-1, cmenor=-1;

	for(i=0; i<LIN; i++)
	{
		for(j=0; j<COL; j++)
		{
			printf("Informe M[%d][%d]: ", i, j);
			scanf("%d", &m[i][j]);
		if (m[i][j] > maior){
			maior = m[i][j];
		    lmaior = i;
			cmenor = j;
		                    }
		if(m[i][j] < menor){
			menor = m[i][j];
			lmenor = i;
			cmenor = j;
	                       }
        }
    printf("Maior Elemento: m[%d][%d] = %d\n", lmaior, cmaior, maior);    
    printf("Menor Elemento: m[%d][%d] = %d\n", lmenor, cmenor, menor);
    } 
	
	return 0;
}

