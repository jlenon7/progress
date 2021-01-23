#include <stdio.h>

int main(){
	
int i = 1, n;
printf("\n\t\t\t\tDigite o Numero:\n\t\t\t\t");
scanf("%d", &n);

while (i <= n)
{
if (i % 2 != 0)
printf ("Numeros Impares %d\n", i);
i++;

if (i * 2 != 0)
printf ("Numeros Pares %d\n", i);
i++;
}


	
	return 0;
}

