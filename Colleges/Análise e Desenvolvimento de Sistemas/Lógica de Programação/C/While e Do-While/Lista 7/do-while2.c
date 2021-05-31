#include <stdio.h>

int main()
{

float nA, nB, nM;
char m;
int continuar = 0;
int se = 0;
	
printf("Média Ponderada\n");

do{

printf("\nDigite a Nota A: ");
scanf("%f", &nA);
printf("\nDigite a Nota B: ");
scanf("%f", &nB);
nM=((nA+nB)/2);
printf("\nMédia do Aluno: %.2f\n", nM);


do{	
printf("\nContinuar ? s/n");
scanf(" %c", &m);	
switch(m){	
case 's':  se = 1; continuar = 1; break;
case 'n':  se = 1; continuar = 0; break;
default:   se = 0; printf("Resposta Invalida\n"); break;

}
} while (se != 1);

} while (continuar != 0);
	
	return 0;
}

