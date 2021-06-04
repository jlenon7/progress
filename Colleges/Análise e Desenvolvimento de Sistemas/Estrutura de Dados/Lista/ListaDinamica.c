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

/*void insereFimLista1(Lista *l, int e)
{
	// Procura o final da lista
	Lista p, ant, novo;
	
	novo = malloc(sizeof(struct elemento));
	novo -> dado = e;
	novo -> prox = NULL;

	ant = p = *l;

	while (p != NULL)
	{
		ant = p;
		p = p -> prox;
	}

	// Aloca o espaço e faz as atrubuições de valores
	
	// Conecta o novo elemento ao final da lista
	if (listaVazia(ant))
		*l = novo;
	else
		ant -> prox = novo;
}*/

Lista insereFimLista2(Lista l, int e)
{
	Lista p, ant, novo;

	// Aloca o espaço e faz as atribuições de valores
	novo = malloc(sizeof(struct elemento));
	novo -> dado = e;
	novo -> prox = NULL;

	// Procura o final da lista
	p = ant = l;
	
	while(p != NULL){
		ant = p;
		p = p -> prox;
	}

	// Conecta o novo elemento ao final da lista 
	if (listaVazia(ant)){
		// A lista está vazia, altera o início da lista
		l = novo;
	}
	else{
		// Lista não está vazia, conecta ao final
		ant -> prox = novo;
	}

	return (l);
}

Lista insereInicioLista(Lista l, int e)
{
	Lista novo;

	novo = malloc(sizeof(struct elemento));
	novo -> dado = e;
	novo -> prox = l;

	return (novo);
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

void alteraLista(Lista l, int e, int novo)
{
	Lista p;
	
	p = buscaLista(l, e);
	if (p != NULL) // Achou o elemento
	{
		p -> dado = novo;
		printf("Elemento alterado!\n");
	}
	else
		printf("Elemento %d não encontrado!\n", e);
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
		printf("\n\n1 - Inserir item no fim da lista");
		printf("\n2 - Inserir item no inicio da lista");
		printf("\n3 - Imprimir lista");
		printf("\n4 - Retirar Item");
		printf("\n5 - Tamanho da lista");
		printf("\n6 - Altera item da lista");
		printf("\n7 - Busca elemento na lista");
		printf("\n0 - Encerrar\n");
		printf("\nOpcao: ");
		scanf("%d", &op);
	
		switch (op)
		{
			case 1:
				printf("\nEntre com o item a inserir: ");
				item = leInt();
				l = insereFimLista2(l, item);
				// insereFimLista1(&l, item);
				break;
				
			case 2:
				printf("\nEntre com o item a inserir: ");
				item = leInt();
				l = insereInicioLista(l, item);
				break;
			
			case 3:
				imprimeLista(l);
				break;
			
			case 4:
				printf("\nEntre com o item a retirar: ");
				item = leInt();
				l = retiraLista(l, item);
				break;
				
			case 5:
				cont = contaLista(l);
				printf("\nA lista tem %d itens\n", cont);
				break;

			case 6:
				printf("\nEntre com o item a alterar: ");
				item = leInt();
				printf("\nEntre com o novo valor: ");
				novo = leInt();
				alteraLista(l, item, novo);
				break;

			case 7:
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
