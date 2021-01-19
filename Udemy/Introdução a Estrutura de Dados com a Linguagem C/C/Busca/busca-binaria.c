#include <stdio.h>

int busca_linear_ord(int n, int* v, int e)
{
	int ini = 0;
	int fim = n - 1;
	int meio;
	
	while(ini <= fim)
	{
		meio = (ini + fim) / 2;
		if(e < v[meio])
			fim = meio - 1;
		else if(e > v[meio])
			ini = meio + 1;
		else
			return meio;
	}
	return -1;
}

int main(int argc, char *argv[])
{
	int v[] = {1, 5, 6, 10, 25, 30};
	int tam = sizeof(v) / sizeof(int);
	
	printf("%d\n", busca_linear_ord(tam, v, 7));
	return 0;
}
