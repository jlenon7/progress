#include <stdio.h>

int busca_linear(int n, int* v, int e)
{
	int i;
	
	for(i = 0; i < n; i++)
	{
		if(v[i] == e)
			return i;
	}
	return -1;
}

int main(int argc, char *argv[])
{
	int v[] = {10, 5, 6, 20, 15};
	int tam = sizeof(v) / sizeof(int);
	
	printf("%d\n", busca_linear(tam, v, 15));
	return 0;
}
