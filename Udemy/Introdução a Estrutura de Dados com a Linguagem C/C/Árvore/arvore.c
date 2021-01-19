#include <stdlib.h>
#include <stdio.h>
#include "arvore.h"

struct arv
{
	char info;
	struct arv* esq;
	struct arv* dir;
};

Arv* criar_vazia()
{
	return NULL;
}

Arv* criar(char c, Arv* sae, Arv* sad)
{
	Arv* p = (Arv*)malloc(sizeof(Arv));
	p->info = c;
	p->esq = sae;
	p->dir = sad;
	return p;
}

int vazia(Arv* a)
{
	return a == NULL;
}

void imprimir(Arv* a)
{
	if(!vazia(a))
	{
		printf("%c ", a->info); // mostra a raiz
		imprimir(a->esq); //  mostra subárvore a esquerda
		imprimir(a->dir); // mostra subárvore a direita
	}
}

void imprimir_arvore(Arv* a)
{
	printf("<");
	if(!vazia(a))
	{
		printf("%c ", a->info); // mostra a raiz
		imprimir_arvore(a->esq); //  mostra subárvore a esquerda
		imprimir_arvore(a->dir); // mostra subárvore a direita
	}
	printf(">");
}

Arv* liberar(Arv* a)
{
	if(!vazia(a))
	{
		liberar(a->esq);
		liberar(a->dir);
		free(a);
	}
	return NULL;
}