#include <stdio.h>
#include <string.h>
#include <stdio_ext.h>

#define MaxItens 50
#define TamItem 20

struct Pilha
{
	int topo;
	int vet[MaxItens];
};
typedef struct Pilha tpPilha;

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

void leString(char *s, int tam)
{
	__fpurge(stdin);
	fgets(s, tam, stdin);
	s[strlen(s)-1] = '\0';
}

void imprimePilha (tpPilha p)
{
	int i;

	for (i = p.topo; i >= 0; i--)
	{
		printf("\n[%d]", p.vet[i]);
	}
}

int desempilha (tpPilha *p)
{
	int ret;

	if (p -> topo >= 0)
	{
		ret = p -> vet[p -> topo];
		p -> vet[p -> topo] = 0;
		p -> topo = p -> topo -1;

		return ret;
	}

	else
	{
		printf("Pilha Vazia!\n");
		return -1;
	}
}

void empilha(tpPilha *p, int e)
{
	if(p -> topo < (MaxItens - 1))
	{
		p -> topo = p -> topo + 1;
		p -> vet[p -> topo] = e;
	}

	else
	{
		printf("Pilha Cheia\n");
	}
}

void criaPilha(tpPilha *p)
{
	p -> topo = -1;
}

int main()
{
	tpPilha p1;
	int op;
	int item;

	criaPilha(&p1);

	do
	{
		printf("\nPilha de inteiros com alocação estatica");
		printf("\n\n1 - Empilha");
		printf("\n2 - Desempilha");
		printf("\n3 - Imprime");
		printf("\n0 - Encerrar\n");
		printf("\nOpcao: ");
		op = leInt();
	
		switch (op)
		{
			case 1:
				printf("\nEntre com o item a empilhar: ");
				item = leInt();
				empilha(&p1, item);
				break;
			
			case 2:
				item = desempilha(&p1);
				if (item != -1)
				{
					printf("\nElemento retirado: %d\n", item);
				}
				break;
			
			case 3:
				imprimePilha(p1);
				break;
				
			case 0:
				break;
			
			default:
				printf("\nOpcao Invalida");
		}
	}while(op != 0);
	
	return 0;
}
