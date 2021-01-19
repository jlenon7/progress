#include <stdio.h>
#include <stdlib.h>
#include "lista.h"

struct lista
{
	int info;
	struct lista* prox;
};

Lista* criar_lista()
{
	return NULL;
}

Lista* inserir_lista(Lista* l, int i)
{
	Lista* novo = (Lista*)malloc(sizeof(Lista));
	novo->info = i;
	novo->prox = l;
	return novo;
}

void imprimir_lista(Lista* l)
{
	Lista* p;

	for(p = l; p != NULL; p = p->prox)
		printf("%d\n", p->info);
}

int vazia(Lista* l)
{
	if(l == NULL)
		return 1;
	return 0;
}

Lista* buscar(Lista* l, int v)
{
	Lista* p;
	for(p = l; p != NULL; p = p->prox)
	{
		if(p->info == v)
			return p;
	}
	return NULL;
}

Lista* remover(Lista* l, int v)
{
	Lista* ant = NULL; // ponteiro para o elemento anterior
	Lista* p = l; // ponteiro para percorrer a lista

	while(p != NULL && p->info != v)
	{
		ant = p;
		p = p->prox;
	}

	if(p == NULL)
		return l;

	if(ant == NULL)
	{
		// remove do início da lista
		l = p->prox;
	}
	else
	{
		// remove do meio da lista
		ant->prox = p->prox;
	}
	free(p);
	return l;
}

void liberar(Lista* l)
{
	Lista* p = l;
	while(p != NULL)
	{
		Lista* t = p->prox;
		free(p);
		p = t;
	}
}

int igual(Lista* l1, Lista* l2)
{
	Lista* p1 = l1;
	Lista* p2 = l2;

	while(p1 != NULL && p2 != NULL)
	{
		if(p1->info != p2->info)
			return 0;
		p1 = p1->prox;
		p2 = p2->prox;
	}
	return p1 == p2;
}