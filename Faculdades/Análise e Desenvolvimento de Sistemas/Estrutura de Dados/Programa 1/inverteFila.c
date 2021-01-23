#include "fila.h"
#include "pilha.h"

Fila inverteFila(Fila f)
{
	Pilha p;
	int e;

	p = criaPilha();

	while (!filaVazia(f)){
		f = retiraFila(f, &e);
		p = empilha(p, e);
	}

	while (!pilhaVazia(p)){
		p = desempilha(p, &e);
		f = insereFila(f, e);
	}

	return f;
}


int main()
{
	Fila f;
	int op;
	int item;
	int num;

	f = criaFila();

	do
	{
		printf("\nFila de inteiros com alocacao dinamica");
		printf("\n\n1 - Insere fila");
		printf("\n2 - Retira fila");
		printf("\n3 - Imprimir fila");
		printf("\n4 - Numero de elementos da fila");
		printf("\n5 - Inverte a fila");
		printf("\n0 - Encerrar");
		printf("\nOpcao: ");
		scanf("%d", &op);

		switch(op)
		{
			case 1:
				printf("\nEntre com o elemento a insrir: ");
				item = leInt();
				f = insereFila(f, item);
				break;

			case 2:
				if (filaVazia(f))
					printf("\nA fila está vazia, não há o que retirar");
				else{
					f = retiraFila(f, &item);
					printf("\nRetirou o item %d", item);
				}
				break;

			case 3:
				imprimiFila(f);
				break;

			case 4:
				num = contaFila(f);
				printf("\nA fila tem %d elementos", num);
				break;

			case 5:
				f = inverteFila(f);
				printf("\nA fila foi invertida");
				break;

			case 0:
				break;
			default:
				printf("\nOpcao Invalida!\n");
				break;
		}
	}while (op != 0);

	return 0;
}