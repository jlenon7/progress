#include <stdio.h>

int main()
{
	
int i=1, num, soma=0, cont=0;
float media;
while(i<=15){
	printf("Digite um Numero:");
	scanf("%d", &num);
if(num>10){
	soma=soma+num;
	cont++;	
}  
    i++;
}
media=(float)soma/cont;
printf("Media=%2f", media);
		
	
	return 0;
}

