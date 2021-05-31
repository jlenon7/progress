#include <stdio.h>

int main()
{
	
int i, ni, nf;

printf("Digite o Numero Inicial: ");
scanf("%d", &ni);

printf("Digite o Numero Final: ");
scanf("%d", &nf);


while ( i < ni )
{
     printf("%d\n", i);
     i = ni + 0;
}    

while ( i <= nf )
{
     printf("%d\n", i);
     i = i + 1;
}     

	return 0;
}
