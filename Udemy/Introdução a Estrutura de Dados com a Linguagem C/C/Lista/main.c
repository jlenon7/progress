#include <stdio.h>
#include "lista.h"

int main(int argc, char *argv[])
{
	Lista* lista;
	
	lista = criar_lista();
	
	if(vazia(lista))
		printf("Lista vazia!\n");
	else
		printf("Lista NAO vazia\n");
	
	lista = inserir_lista(lista, 10);
	lista = inserir_lista(lista, 20);
	lista = inserir_lista(lista, 5);
	
	imprimir_lista(lista);
	
	if(vazia(lista))
		printf("Lista vazia!\n");
	else
		printf("Lista NAO vazia\n");
	
	int elemento = 100;
	if(buscar(lista, elemento) == NULL)
		printf("Nao encontrou o elemento %d\n", elemento);
	else
		printf("Encontrou o elemento %d\n", elemento);
	
	Lista* lista2;
	lista2 = criar_lista();
	lista2 = inserir_lista(lista2, 10);
	lista2 = inserir_lista(lista2, 20);
	lista2 = inserir_lista(lista2, 50);
	
	printf("Iguais? %d\n", igual(lista, lista2));
	
	lista = remover(lista, 10);
	printf("Impressao apos a remocao:\n");
	imprimir_lista(lista);
	liberar(lista);
	
	return 0;
}