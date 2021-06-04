#include <stdio.h>
#include <stdlib.h>
#include <stdio_ext.h>
#include <string.h>

struct elemento
{
	int dado;
	struct elemento *esq;
	struct elemento *dir;
};

typedef struct elemento *Arvore;

Arvore a;

Arvore criaArvore()
{
	return (NULL);
}

int fat(int n)
{
	int ret;

	printf("\nCalculando Fatorial de %d",n);
	if(n == 1)
		ret = 1;
	else
		return(n*fat(n-1));
	printf("\nO resultado do fatorial de %d é %d",n,ret);
	return (ret);
}

int leInt()
{
	int ret;
	char s[10];

	__fpurge(stdin);
	fgets(s, 10, stdin);
	s[strlen(s)-1] = '\0';
	sscanf(s, "%d", &ret);

	return ret;
}

Arvore insereArvore(Arvore a,int e)
{
	if(a == NULL)
	{
		a = malloc(sizeof(struct elemento));
		a->dado=e;
		a->esq=NULL;
		a->dir=NULL;
	}
	if(e > (*a)->dado)
		a=insereArvore(&(*a)->dir;e);
	else
	{
		insereArvoce(&(*a)->esq,e);

	}
}

int main()
{
	int valor;
	int fatorial;

	printf("\nEntre com o valor: ");
	valor = leInt();
	fatorial = fat(valor);
	printf("\nO Fatorial de %d é %d",valor,fatorial);
	return (0);
}

