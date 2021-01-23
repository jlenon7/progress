#include <stdio.h>

int main()
{
	
int ida;
	
 printf("Digite a sua idade:");
 scanf("%d", &ida);
	
if((ida >= 5) && (ida <=13)) 
 printf("Você está na categoria Junior");
	  
else if(((ida >= 14) && (ida <= 17)) || ((ida >= 31) && (ida <=150)))
 printf("Você está na categoria Amador");
	
else if((ida >= 18) && (ida <= 30))
 printf("Você está na categoria Oficial");
	  
else
 printf("Está idade não se encaixa na competição!");
	
	return 0;
}

