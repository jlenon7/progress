#include <stdio.h>

int main()
{
	int i, n, p;
    
	printf("Qual tabuada você quer ?\n");
    scanf("%d", &n);

    printf("Até qual multiplicação você quer ?\n");
    scanf("%d", &p);
	
	for(i = 1; i <= p; i++)
	{
		
		printf("%d x %2d = %2d\n", n, i, n*i);
		
    }
	return 0;
}

