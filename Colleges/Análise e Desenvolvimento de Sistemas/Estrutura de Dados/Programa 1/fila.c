#include <stdio.h>
#include <stdio_ext.h>
#include <stdlib.h>
#include <string.h>
#include "fila.h"

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

Fila criaFila()
{
	Fila f;
	f.ini = NULL;
	f.fim = NULL;

	return f;
}

int filaVazia(Fila f)
{	
	if (f.ini == NULL)
		return TRUE;
	else
		return FALSE;
}

Fila insereFila(Fila f, int e)
{
	ApElemento novo;
	novo = malloc(sizeof(struct elementoF));

	novo -> dado = e;
	novo -> prox = NULL;

	if (filaVazia(f))
		f.ini = novo;
	else
		f.fim -> prox = novo;
		
	f.fim = novo;

	return f;
}

Fila retiraFila(Fila f, int *e)
{
	ApElemento ap;

	if (!filaVazia(f)){
		*e = f.ini -> dado;    // Retorna o valor do elemento que está no inicio da fila
		ap = f.ini; 		   // Salva o endereço do inicio para liberação
		f.ini = f.ini -> prox; // Faz o inicio apontar para o segundo elemento
		free(ap); 			   // Libera o espaço ocupado pelo elemento removido
	}
	else
		*e = -1;

	return f;
}

void imprimiFila(Fila f)
{
	ApElemento ap;

	printf("\nItens da Lista\n");
	ap = f.ini;

	while (ap != NULL){
		printf("%d - ", ap -> dado);
		ap = ap -> prox;
	}
	printf("\n");
}

int contaFila(Fila f)
{
	ApElemento ap;
	int cont = 0;

	ap = f.ini;
	while(ap != NULL){
		cont ++;
		ap = ap -> prox;
	}
	
	return cont;
}