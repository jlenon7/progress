#include <stdio.h>

int busca_linear_ord(int n, int* v, int e)
{
	int i;
	
	for(i = 0; i < n; i++)
	{
		if(v[i] == e)
			return i;
		else if(v[i] > e)
			return -1;
	}
	return -1;
}

int main(int argc, char *argv[])
{
	int v[] = {1, 5, 6, 10, 25, 30};
	int tam = sizeof(v) / sizeof(int);
	
	printf("%d\n", busca_linear_ord(tam, v, 8));
	return 0;
}
