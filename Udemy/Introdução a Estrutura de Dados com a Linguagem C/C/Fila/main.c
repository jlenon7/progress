#include <stdio.h>
#include "fila.h"

int main(int argc, char *argv[])
{
	Fila* f = criar_fila();
	
	inserir(f, 10);
	inserir(f, 50);
	inserir(f, 30);
	imprimir(f);
	remover(f);
	printf("\n");
	imprimir(f);
	return 0;
}