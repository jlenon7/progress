#include <stdio.h>  
#include <stdio_ext.h>
#include <string.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

typedef struct elemento{
	int dado;
	struct elemento *prox;
} *Lista;

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

Lista criaLista()
{
	return NULL;
}

int listaVazia(Lista l)
{
	if (l == NULL)
		return (TRUE);
	else
		return (FALSE);
}

Lista insereLista(Lista l, int e)
{
	Lista p, ant, novo;

	novo = malloc(sizeof(struct elemento));
	novo -> dado = e;

	ant = p = l;

	while((p != NULL) && (p -> dado < e))
	{
		ant = p;
		p = p -> prox;
	}

	if (p != ant) // Não vai inserir antes do primeiro, insere entre o ant e o p
		ant -> prox = novo;
	else
		l = novo;

	novo -> prox = p;
	return l;
}

void imprimeLista(Lista l)
{
	Lista p;
	p = l;

	while(p != NULL)
	{
		printf("\n%d", p -> dado);
		p = p -> prox;
	}
	printf("\n");
}

Lista buscaLista(Lista l, int e)
{
	Lista p;
	p = l;

	while((p != NULL) && (p -> dado != e))
	{
		p = p -> prox;
	}
	
	return (p);
}

int contaLista (Lista l)
{
	Lista p;
	int cont = 0;

	p = l;
	while (p != NULL)
	{
		cont++;
		p = p -> prox;
	}

	return cont;
}

Lista retiraLista(Lista l, int e)
{
	Lista p, ant;

	ant = p = l;

	// Procura o elemento e
	while((p != NULL) && (p -> dado != e))
	{
		ant = p;
		p = p -> prox;
	}

	if (p != NULL)
	{
		if (p == ant) // Remove o primeiro elemento
			l = p -> prox;
		else // Não é o primeiro elemento da lista
			ant -> prox = p -> prox;
		
		free(p);
	}

	return (l);
}

Lista alteraLista(Lista l, int e, int novo)
{
	Lista p;
	
	p = buscaLista(l, e);
	if (p != NULL) // Achou o elemento
	{
		l = retiraLista(l, e);
		l = insereLista(l, novo);
		printf("Elemento %d alterado para %d!\n", e, novo);
	}
	else
		printf("Elemento %d não encontrado!\n", e);

	return (l);
}

int main()
{
	Lista l, pos;
	int op;
	int cont;
	int item;
	int novo;
	
	l = criaLista();
		
	do
	{
		printf("\nLista de string com alocacao estatica");
		printf("\n\n1 - Inserir item");
		printf("\n2 - Imprimir lista");
		printf("\n3 - Retirar Item");
		printf("\n4 - Tamanho da lista");
		printf("\n5 - Altera item da lista");
		printf("\n6 - Busca elemento na lista");
		printf("\n0 - Encerrar\n");
		printf("\nOpcao: ");
		scanf("%d", &op);
	
		switch (op)
		{
			case 1:
				printf("\nEntre com o item a inserir: ");
				item = leInt();
				l = insereLista(l, item);
				break;
			
			case 2:
				imprimeLista(l);
				break;
			
			case 3:
				printf("\nEntre com o item a retirar: ");
				item = leInt();
				l = retiraLista(l, item);
				break;
				
			case 4:
				cont = contaLista(l);
				printf("\nA lista tem %d itens\n", cont);
				break;

			case 5:
				printf("\nEntre com o item a alterar: ");
				item = leInt();
				printf("\nEntre com o novo valor: ");
				novo = leInt();
				l = alteraLista(l, item, novo);
				break;

			case 6:
				printf("\nEntre com o elemento a ser buscado: ");
				item = leInt();
				pos = buscaLista(l, item);
				if (pos == NULL)
					printf("\nItem nao encontrado");
				else
					printf("\nItem encontrado");
				break;
			
			case 0:
				break;
			
			default:
				printf("\nOpcao Invalida");
		}
	}while(op != 0);
	
	return 0;		
}