#include <stdio.h>

int main()
{
	
	int horas, depen, salariob, salariol, x, y;
	char inicial;
	
	printf("\nDigite a inicial do seu nome:");
	scanf("%c", &inicial);
	
	printf("Digite o numero de horas trabalhadas:");
	scanf("%d", &horas);
	
	printf("Digite o numero de dependentes:");
	scanf("%d", &depen);
	
	salariob = (horas*12) + (depen*40);
	x = salariob * 0.05;
	y = salariob * 0.085;
	salariol = (salariob - x) - y;
	
	printf("\nO seu salário bruto é de %d reais\n", salariob);
	printf("Imposto IR:%d\n", x);
	printf("Imposto INSS:%d\n", y);
	printf("Seu salário liquido é de %d reais\n", salariol);
	
	return 0;
}

