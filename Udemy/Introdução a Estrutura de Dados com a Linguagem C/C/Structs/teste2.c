#include <stdio.h>

struct pessoa
{
	int idade;
	float peso;
};

int main(int argc, char *argv[])
{
	struct pessoa p;
	struct pessoa *pp;
	
	pp = &p;
	(*pp).idade = 25;
	(*pp).peso = 75.67;
	
	printf("Idade: %d\n", p.idade);
	printf("Peso: %.2f\n", pp->peso);
	
	return 0;
}