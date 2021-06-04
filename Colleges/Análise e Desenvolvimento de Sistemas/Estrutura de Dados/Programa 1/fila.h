#include <stdio.h>
#include <stdio_ext.h>
#include <stdlib.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

struct elementoF{
	int dado;
	struct elementoF *prox;
};

typedef struct elementoF *ApElemento;

typedef struct{
	ApElemento ini;
	ApElemento fim;
} Fila;


int leInt();

Fila criaFila();

int filaVazia(Fila f);

Fila insereFila(Fila f, int e);

Fila retiraFila(Fila f, int *e);

void imprimiFila(Fila f);

int contaFila(Fila f);