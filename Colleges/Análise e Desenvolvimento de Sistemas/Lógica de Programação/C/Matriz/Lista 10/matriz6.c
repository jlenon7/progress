
/*
  6) Faça um programa para calcular e apresentar a média geral de uma turma de n alunos. A
  média a ser obtida deve ser a média geral de cada aluno durante o ano letivo das quatro notas.
  ALUNO  NOTA1  NOTA2  NOTA3  NOTA4  MEDIA
    1     8.0    9.0    8.0    7.0    8.0
    2     9.0    7.0    6.0    7.0    7.2
    3     5.0    6.0    7.0    6.0    6.0
  MEDIA GERAL.......................: 7.1
*/


#include <stdio.h>
#define ALUNOS 3
#define NOTAS 5


    int main()
{
	float m[ALUNOS][NOTAS];
	int i, j;
	float soma, somaM=0, media;
	

for(i=0; i<ALUNOS; i++){

				   
  printf("Informe as notas do %dº aluno: \n", i+1);
  soma = 0;
  

for(j=0; j<NOTAS-1; j++){
	printf("Nota %d: ", j+1);
	scanf("%f", &m[i][j]);
	soma = soma + m[i][j];               
				        }
	m[i][j] = soma/(NOTAS-1);
	somaM += m[i][j];
                        }
                        
                                                                               
printf("\nCalculando...\n");

printf("As médias desses alunos são:\n");

   
printf("ALUNO NOTA1  NOTA2  NOTA3  NOTA4  MEDIA\n");


for(i=0; i<ALUNOS; i++){
	printf("  %d", i+1);
 for(j=0; j<NOTAS; j++){
     
  printf("    %.1f", m[i][j]);
                    }
  printf("\n");
				    }
media = m[1][5] + m[2][5] + m[3][5];

printf("MEDIA GERAL......................: %.1f", media);   
	return 0;
}

