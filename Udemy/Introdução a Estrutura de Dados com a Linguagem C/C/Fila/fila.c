#include <stdio.h>
#include <stdlib.h>
#include "fila.h"

struct lista
{
	float info;
	struct lista* prox;
};

struct fila
{
	Lista* ini;
	Lista* fim;
};

Fila* criar_fila()
{
	Fila* f = (Fila*)malloc(sizeof(Fila));
	f->ini = f->fim = NULL;
	return f;
}

void inserir(Fila* f, float v)
{
	Lista* n = (Lista*)malloc(sizeof(Lista));

	n->info = v;
	n->prox = NULL;
	if(f->fim != NULL)
		f->fim->prox = n;
	else
		f->ini = n;
	f->fim = n;
}

float remover(Fila* f)
{
	Lista *t;
	float v;

	if(vazia(f))
	{
		printf("Fila vazia\n");
		exit(1);
	}
	t = f->ini;
	v = t->info;
	f->ini = t->prox;
	if(f->ini == NULL)
		f->fim = NULL;
	free(t);
	return v;
}

int vazia(Fila* f)
{
	return (f->ini == NULL);
}

void liberar(Fila* f)
{
	Lista* q = f->ini;

	while(q != NULL)
	{
		Lista* t = q->prox;
		free(q);
		q = t;
	}
	free(f);
}

void imprimir(Fila* f)
{
	Lista* q = f->ini;

	while(q != NULL)
	{
		printf("%f ", q->info);
		q = q->prox;
	}
}