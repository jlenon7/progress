#include <stdio.h>
#include <stdio_ext.h>
#include <string.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

typedef struct elemento {
	int dado;
	struct elemento *prox;

}*Pilha;

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

Pilha criaPilha()
{
	return NULL;
}

int pilhaVazia(Pilha p)
{
	if(p == NULL)
		return (TRUE);
	else 
		return (FALSE);

}

void imprimePilha(Pilha p)
{
	Pilha ap;

	printf("\nItens da Lista\n");
	ap = p;

	while (ap != NULL){
		printf("%d - ",ap -> dado);
		ap = ap -> prox;
	}
	printf("\n");
}

Pilha desempilha (Pilha p, int *e)
{
	Pilha ap;

	if (!pilhaVazia(p)){
		*e = p -> dado; //Retorna o valor do elemento que está no topo da pilha p
		ap = p;         //Salva o endereço do topo para liberação
		p = p -> prox;  //Faz o topo apontar para o segunodo elemento
		free(ap);
    }
	else{
	   *e = -1;
    }

   return p;
}

Pilha empilha(Pilha p, int e)
{
	Pilha novo;
 
    // Aloca o espaço e faz as atribuições de valores
	novo = malloc(sizeof(struct elemento));
	novo -> dado = e;
	novo -> prox = p;
	return (novo);
}

int main()
{
 	Pilha p;
 	int op;
 	int item;

 	p = criaPilha();
 	
 	do{
 		printf("\nPilha de inteiros com alocação dinamica");
 		printf("\n\n1 - Empilhar");
 		printf("\n2 - Desempilhar");
 		printf("\n3 - Imprimir pilha");
 		printf("\n0 - Encerrar");
 		printf("\nOpção: ");
 		scanf("%d", &op);

 	switch(op){
 		case 1: printf("\nEntre com o item a inserir: ");
 				item = leInt();
 				p = empilha(p, item);
 				break;
 		case 2: if (pilhaVazia(p))
 				printf("\nA pilha está vazia, não há o que desempilhar");
 				else{
 					p = desempilha(p, &item);
 					printf("\nDesempilhou o item %d", item);
 				}
 				break;
 		case 3: imprimePilha(p); 		   		
 		   		break;

 		case 0: break;
 		default: printf("\nOpção inválida!");
 	}
}while (op != 0);  

  return 0;
}       