#include <stdio.h>
#include <stdio_ext.h>
#include <string.h>

#define MaxItens 50
#define TamItem 20

typedef struct Fila
{
	int ini, fim;
	int vet [50];
} tpFila;

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

int filaVazia(tpFila f)
{
	if (f.ini == -1)
		return (1);
	else
		return (0);
}

int filaCheia(tpFila f)
{
	int ret = 0;

	if (f.ini == 0 && f.fim == MaxItens)
		ret = 1;
	else if (f.fim == (f.ini - 1))
		ret = 1;

	return ret;
}

void criaFila(tpFila *f)
{
	f -> ini = -1;
	f -> fim = -1;
}


void insereFila(tpFila *f, int valor)
{
	if (filaCheia(*f))
		printf("Fila Cheia!\n");
	else 
	{
		f -> fim = f -> fim + 1;
		
		if (f -> fim == MaxItens) 
			f -> fim = 0;

		f -> vet[f -> fim] = valor; 

		if(f -> ini == -1) 
			f -> ini = 0;  
	}
}

void imprimeFila(tpFila f)
{
	int i;

	if(filaVazia(f))
		printf("Fila Vazia!\n");

	else	
	{
		i = f.ini; 
		while (i != f.fim){ 
			printf("%d\n", f.vet[i]); 
			i++;

			if (i == MaxItens)	
				i = 0;			
		}
		printf("%d\n", f.vet[i]);	
	}
}

int retiraFila()
{
	int ret = -1;

	if (!filaVazia(*f))
	{
		ret = f -> vet[f -> ini];
		if (f -> ini == f -> fim)
		{
			criaFila(f);
		}
		else
		{
			f -> ini = f -> ini + 1;
			if (f -> ini == MaxItens)
			{
				f -> ini = 0;
			}
		}
	}

	return ret;
}

int contaFila(tpFila f)
{
	int i;
	int cont = 0;

	if (filaVazia(f))
		cont = 0;
	else{
		i = f.ini;
		while(i != f.fim){
			cont++;
			i++;
			if (i == MaxItens)
				i = 0;
		}
		cont++;
	}
	return cont;
}

int main()
{
	tpFila f1;
	int op;
	int item;
	int num;

	criaFila(&f1);

	do
	{
		printf("\nFila de inteiros");
		printf("\n\n1 - Insere");
		printf("\n2 - Retira");
		printf("\n3 - Imprime");
		printf("\n4 - Conta elementos");
		printf("\n0 - Encerrar\n");
		printf("\nOpcao: ");
		op = leInt();
	
		switch (op)
		{
			case 1:
				printf("\nEntre com o item: ");
				item = leInt();
				insereFila(&f1, item);
				break;
			
			case 2:
				item = retiraFila(&f1);
				if (item != -1)
				{
					printf("\nElemento retirado: %d\n", item);
				}
				break;
			
			case 3:
				imprimeFila(f1);
				break;

			case 4:
				num = contaFila(f1);
				printf("\nA fila tem %d elementos", num);
				
			case 0:
				break;
			
			default:
				printf("\nOpcao Invalida");
		}
	}while(op != 0);
	
	return 0;
}
