#include <stdio.h>
#include <stdlib.h>
#include "pilha.h"

struct lista
{
	float info;
	struct lista* prox;
};

struct pilha
{
	Lista* prim;
};

Pilha* criar_pilha()
{
	Pilha* p = (Pilha*)malloc(sizeof(Pilha));
	p->prim = NULL;
	return p;
}

void push(Pilha* p, float v)
{
	Lista* n = (Lista*)malloc(sizeof(Lista));
	n->info = v;
	n->prox = p->prim;
	p->prim = n;
}

float pop(Pilha* p)
{
	Lista* t;
	float v;
	if(vazia(p))
	{
		printf("Pilha vazia\n");
		exit(1);
	}
	t = p->prim;
	v = t->info;
	p->prim = t->prox;
	free(t);
	return v;
}

int vazia(Pilha* p)
{
	return (p->prim == NULL);
}

void liberar(Pilha* p)
{
	Lista* q = p->prim;
	while(q != NULL)
	{
		Lista* t = q->prox;
		free(q);
		q = t;
	}
	free(p);
}

float topo(Pilha* p)
{
	if(vazia(p))
	{
		printf("Pilha vazia\n");
		exit(1);
	}
	return p->prim->info;
}
