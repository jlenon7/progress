
/*4) Faça um programa que permita a leitura das notas (tipo float) de uma turma de 20
alunos. Calcular a média da turma e contar quantos alunos obtiveram nota acima desta
média calculada. Escrever a média da turma e o resultado da contagem.*/

#include <stdio.h>
#define TAM 10

int main(){

  float alunos[TAM], soma = 0, media, total=0;
  int i;
  
  for(i=0; i<TAM; i++)
  {
    printf("Digite a nota do %d aluno: ", (i+1));
    scanf("%f", &alunos[i]);
    soma = soma + alunos[i];
  }

   media = soma/TAM;
   
  for(i=0; i<TAM; i++)
  {
  if (alunos[i]>= media)
	total++;
  }
   
  printf("\nMédia = %.1f", media);
  printf("\nTotal de alunos acima da média:%.1f", total);

  return 0;
}
