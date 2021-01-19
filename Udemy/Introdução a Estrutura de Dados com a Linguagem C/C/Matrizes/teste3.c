#include <stdio.h>
#include <stdlib.h>
#define LIN 2
#define COL 2

int main()
{
	int *mat;
	int i;

	mat = (int*)malloc(LIN * COL * sizeof(int));
	if(mat == NULL)
	{
		printf("Memoria insuficiente\n");
		exit(1);
	}

	for(i = 0; i < LIN * COL; i++)
	{
		mat[i] = i;
	}

	// acessar o elemento da primeira linha
	// e segunda coluna
	// k = i*n + j -> k = i*LIN*COL + j
	// int ind = 0*LIN*COL + 1
	printf("%d\n", mat[1]);

	return 0;
}