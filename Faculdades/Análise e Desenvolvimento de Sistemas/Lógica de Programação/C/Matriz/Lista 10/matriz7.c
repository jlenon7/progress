/*
7) Faça um programa que usa uma matriz para gerar e armazenar 50 combinações de 6 números
para a loteria. Utilize a função rand() - da biblioteca stdlib.h, para gerar os números
aleatórios (faixa de números entre 1 e 60) que serão armazendos para cada jogo (combinação).
Considere que é permitido a repetição dos números (ou seja, não é necessária essa verificação).
Ao final o programa deve imprimir as combinações conforme o exemplo abaixo:
Combinação  1:   42  48  35  41  30   5
Combinação  2:   19  19  23  45   6   6
. . .
Combinação 49:    3  26  29  47  58  58
Combinação 50:   53  33  30  55  42  30
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define LIN 50
#define COL 6

int main()
{
	int c[LIN][COL];
	int i, j;
	
	srand(time(NULL));
	
	for (i = 0; i < LIN; i++)
	{
		printf("Combinação %d: \t", i+1);
		for (j = 0; j < COL; j++)
		{
			c[i][j] = 1 + (rand() % 60);
			printf("%d\t", c[i][j]);
		}
		printf("\n");
	}
	
	return 0;
}

