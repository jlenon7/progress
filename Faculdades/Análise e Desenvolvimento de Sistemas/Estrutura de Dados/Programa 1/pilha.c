#include <stdio.h>
#include <stdio_ext.h>
#include <string.h>
#include <stdlib.h>
#include "pilha.h"

Pilha criaPilha()
{
	return NULL;
}

int pilhaVazia(Pilha p)
{
	if (p == NULL)
		return (TRUE);
	else
		return (FALSE);
}

void imprimePilha(Pilha p)
{
	Pilha ap;

	printf("\nItens da Lista\n");
	ap = p;

	while(ap != NULL){
		printf("%d\n",ap -> dado);
		ap = ap -> prox;
	}
	printf("\n");
}

Pilha desempilha (Pilha p, int *e)
{
	Pilha ap;

	if (!pilhaVazia(p)){
		*e = p -> dado; // Retorna o valor do elemento que está no topo da pilha p
		ap = p; 	    // salva o endereço do top para liberação
		p = p -> prox;	// Faz o topo apontar para o segundo elemento
		free(ap);		// Libera o espaço ocupado pelo elemento removido
	}
	else
		*e = -1;

	return (p);
}

Pilha empilha(Pilha p, int e)
{
	Pilha novo;

	novo = malloc(sizeof(struct elementoP));
	novo -> dado = e;
	novo -> prox = p;

	return (novo);
}