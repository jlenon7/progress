#include <stdio.h>
#include <stdlib.h>
#define LIN 2
#define COL 3

int main(int argc, char *argv[])
{
	int **mat, i;

	mat = (int**)malloc(LIN * sizeof(int));
	for(i = 0; i < LIN; i++)
	{
		mat[i] = (int*)malloc(COL * sizeof(int));
	}

	mat[0][0] = 10;
	mat[0][1] = 20;
	printf("%d\n", mat[0][1]);

	for(i = 0; i < LIN; i++)
		free(mat[i]);

	free(mat);

	return 0;
}
