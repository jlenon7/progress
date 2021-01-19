#include <stdio.h>
#include <stdlib.h>

typedef struct animal
{
	int idade;
} tanimal;

typedef struct pessoa
{
	int idade;
	float peso;
	tanimal animal;
} tpessoa;

int main(int argc, char *argv[])
{
	tpessoa *p;

	p = (struct pessoa*)malloc(sizeof(struct pessoa));
	p->idade = 20;
	p->peso = 76.44;
	printf("Idade da pessoa: %d\n", p->idade);
	(p->animal).idade = 30;
	printf("Idade do animal: %d\n", (p->animal).idade);

	return 0;
}
