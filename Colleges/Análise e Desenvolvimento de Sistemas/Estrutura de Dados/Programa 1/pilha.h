#include <stdio.h>
#include <stdio_ext.h>
#include <string.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

typedef struct elementoP{
	int dado;
	struct elementoP *prox;
} *Pilha;

Pilha criaPilha();

int pilhaVazia(Pilha p);

void imprimePilha(Pilha p);

Pilha desempilha (Pilha p, int *e);

Pilha empilha(Pilha p, int e);
