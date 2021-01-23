#include <stdio.h>
#include <string.h>
#include <stdio_ext.h>

#define MaxItens 50
#define TamItem 20

typedef char tpLista[MaxItens][TamItem];

void insereLista(tpLista l, char *item)
{
	int i;
	
	for (i = 0; i < MaxItens && strlen(l[i]) > 0; i++);
	
	if (i < MaxItens)
	{
		strcpy(l[i], item);
		printf("\nItem (%s) inserido com sucesso!\n", item);
	}
		
	else 
		printf("\nLista cheia, nao pode inserir");
}

void retiraLista(tpLista l, char *item)
{
	int i;
	
	for (i = 0; i < MaxItens && strlen(l[i]) > 0 && (strcmp(l[i], item) != 0); i++);
	
	if (strcmp(l[i], item) == 0)
	{
		printf("\nItem (%s) encontrado. Removendo\n", item);
		
		if (i == (MaxItens-1))
			l[MaxItens-1][0] = '\0';
			
		else
		{
			for (; i < (MaxItens-1) && strlen(l[i]) > 0; i++)
				strcpy(l[i], l[i+1]);
		}
	}
	else
		printf("\nItem (%s) nao encontrado\n", item);
}

int contaLista(tpLista l)
{
	int i;
	
	for(i = 0; i < MaxItens && strlen (l[i]) > 0; i++);
	
	return (i);
}

void imprimeLista(tpLista l)
{
	int i;
	
	printf("\nItens da Lista\n");
	
	for (i = 0; i < MaxItens && strlen(l[i]) > 0; i++)
		printf("\n%s", l[i]);
	
	printf("\n");
}

void criaLista(tpLista l)
{
	int i;
	
	for (i = 0; i < MaxItens; i++)
		l[i][0] = '\0';
}

void leString(char *s, int tam)
{
	__fpurge(stdin);
	fgets(s, tam, stdin);
	s[strlen(s)-1] = '\0';
}

int buscaLista(tpLista l, char *item)
{
	int i;
	
	for (i = 0; i < MaxItens && strlen(l[i]) > 0 && strcmp(l[i], item) != 0; i++);
	
	if (i < MaxItens && strcmp(l[i], item) == 0)
		return (i);
	else
		return (-1);
}

void alteraLista(tpLista l, char *item, char *novo)
{
	int i;
	
	i = buscaLista(l, item);
	
	if (i != -1)
	{
		retiraLista(l, item);
		insereLista(l, novo);
		printf("Elemento alterado!\n");
	}
	else
		printf("Elemento nao encontrado!\n");
}

int main()
{
	tpLista Lista;
	int op, numi;
	char item[20];
	
	criaLista(Lista);
	op = 1;
		
	do
	{
		printf("\nLista de string com alocacao estatica");
		printf("\n\n1 - Inserir item");
		printf("\n2 - Imprimir lista");
		printf("\n3 - Retirar Item");
		printf("\n4 - Numero de itens");
		printf("\n0 - Encerrar\n");
		printf("\nOpcao: ");
		scanf("%d", &op);
	
		switch (op)
		{
			case 1:
				printf("\nEntre com o item a inserir: ");
				leString(item, TamItem);
				insereLista(Lista, item);
				break;
			
			case 2:
				imprimeLista(Lista);
				break;
			
			case 3:
				printf("\nEntre com o item a retirar: ");
				leString(item, TamItem);
				retiraLista(Lista, item);
				break;
				
			case 4:
				numi = contaLista(Lista);
				printf("\nNumero de itens = %d\n", numi);
				break;
			
			case 0:
				break;
			
			default:
				printf("\nOpcao Invalida");
		}
	}while(op != 0);
	
	return 0;		
}
