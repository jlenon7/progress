#include <stdio.h>
#include <stdio_ext.h>
#include <string.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

struct elemento
{
	int dado;
	struct elemento *prox;
};

typedef struct elemento *ApElemento;

typedef struct
{
	ApElemento ini;
	ApElemento fim;

} Fila;

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


// Cria fila
Fila criaFila()
{
	Fila f;
	f.ini=NULL;
	f.fim=NULL;
	return (f);
}

// Fila Vazia
int filaVazia(Fila f)
{
	int ret;
	if(f.ini == NULL)
	{
		ret = TRUE;
	}
	else
	{
		ret = FALSE;
	}
	return (ret);
}

// Insere fila
Fila insereFila(Fila f,int e)
{
	ApElemento novo;
	novo = malloc(sizeof(struct elemento));
	novo->dado = e;
	novo->prox = NULL;
	if (filaVazia(f))
	{
		f.ini = novo;
		f.fim = novo;
	}
	else
	{
		f.fim -> prox = novo;
		f.fim = novo;
	}
	return (f);
}

// Imprime fila
void imprimeFila(Fila f)
{
	ApElemento ap;

	printf("\nItens da Fila\n");
	ap = f.ini;

	while (ap != NULL){
		printf("%d - ",ap->dado);
		ap = ap->prox;
	}
	printf("\n");
}

// Retira fila
Fila retiraFila (Fila f, int *e)
{
	ApElemento ap;
	
	if(!filaVazia(f))
	{
		*e = f.ini ->dado;    //Retorna o valor do elemento que está no topo da fila
		ap = f.ini;           //Salva o endereço do inicio para liberação
		f.ini = f.ini -> prox;//Faz o inicio apontar para o segundo elemento 
		free(ap);             //Libera o espaço  ocupado pelo elemento removido
	}
	else
	{
		*e = -1;
		printf("\nFila Vazia");
	}
	return (f);
}

// Conta Fila
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

int main()
{
	Fila f;
	int op;
	int item;
	int cont;
	
	f = criaFila();
	op = 1;
	while (op != 0) {
		printf("\nFila de inteiros com alocação dinâmica");
		printf("\n\n1 - Inserir um item");
		printf("\n2 - Imprimir fila");
		printf("\n3 - Retirar item");
		printf("\n4 - Número de elementos da Fila");
		printf("\n0 - Encerrar\n");
		printf("\nOpção: ");
		scanf("%d", &op);
		switch (op){
			case 1: printf("\nEntre com o item a inserir: ");
			        item = leInt();
			        f = insereFila(f, item);
			        break;
			case 2: imprimeFila(f);
			        break;
			case 3: if (filaVazia(f))
			        printf("\nA pilha está vazia, não há o que retirar");
			        else
			        {
			        	f = retiraFila(f,&item);
			        	printf("\nRetirou o item %d", item);
			        }
			        break;
			case 4: cont = contaFila(f);
					printf("\nA Fila tem %d elementos", cont);
					break;
			case 0: break;
			default: printf("\nOpção inválida");
		}
}
    
	return 0;
}