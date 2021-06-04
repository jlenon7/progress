
/*5) Faça um programa para ler uma matriz 5x5, cujos elementos são do tipo inteiro. Em seguida,
o programa deve possuir um menu com opções para cada uma das seguintes operações:
(a) Mostrar todos os elementos da matriz (na forma de uma matriz LxC);
(b) Mostrar todos os elementos da quarta linha da matriz e da primeira coluna da matriz;
(c) Mostrar a soma dos elementos da diagonal principal;
(d) Atribuir o valor 0 para os valores negativos encontrados fora da diagonal principal;
(e) Buscar um elemento na matriz. O programa deve ler um valor X e buscar esse valor na
matriz e, ao final escrever a localização (linha e coluna) ou uma mensagem de “não
encontrado”.*/


#include <stdio.h>
#define LIN 5
#define COL 5

int main()
{
int m[LIN][COL], v[LIN];
int i, j, k=0, soma=0, busca, buscalinha = 0, buscacoluna = 0;
char n;

for(i=0; i<LIN; i++) {
 for(j=0; j<COL; j++){
	printf("Informe os valores da matriz[%d][%d]: ", i+1, j+1);
	scanf("%d", &m[i][j]);
if(i==j) {
 v[k]=m[i][j];
 k++;
         }           }
                     }
                     
printf("======================================================================================");                     
  			     
printf("\nA.Mostrar todos os elementos da matriz.\n");
printf("B.Mostrar todos os elementos da quarta linha da matriz e da primeira coluna da matriz.\n");
printf("C.Mostrar a soma dos elementos da diagonal principal.\n");
printf("D.Atribuir o valor 0 para os valores negativos encontrados fora da diagonal principal.\n");
printf("E.Buscar um elemento na matriz.");
printf("\n");
printf("\nEscolha uma alternativa: ");
scanf(" %c", &n);

printf("======================================================================================");

switch(n)
{
	case'a':
	
	printf("\nElementos da matriz\n");
    
    for(i=0; i<LIN; i++) {
     for(j=0; j<COL; j++){
	 
       printf("M[%d][%d]: %d ", i, j, m[i][j]);
                         }
      printf("\n");
				         }
	printf("======================================================================================\n");
	break;

	case'A':
	
	printf("\nElementos da matriz\n");
    
    for(i=0; i<LIN; i++) {
     for(j=0; j<COL; j++){
	 
       printf("M[%d][%d]: %d ", i, j, m[i][j]);
                         }
      printf("\n");
				         }
	printf("======================================================================================\n");
	break;
	
	
	case'b':
	for(j=0; j<COL; j++){
	printf("\nElementos da quarta linha: %d\n", m[3][j]);
                        }
	for(i=0; i<LIN; i++){
	printf("\nElementos da primeira coluna: %d\n", m[i][0]);
                        }	
    printf("======================================================================================\n");
	break;

	case'B':
	for(j=0; j<COL; j++){
	printf("\nElementos da quarta linha: %d\n", m[3][j]);
                        }
	for(i=0; i<LIN; i++){
	printf("\nElementos da primeira coluna: %d\n", m[i][0]);
                        }	
    printf("======================================================================================\n");
	break;
	
	case'c':
	printf("\nElementos da diagonal principal\n");
    for(k=0; k<LIN; k++){
    printf("%d\n", v[k]);
    soma = soma + v[k];
                      }
    printf("Soma = %d\n", soma);
	printf("======================================================================================\n");
	break;

	case'C':
	printf("\nElementos da diagonal principal\n");
    for(k=0; k<LIN; k++){
    printf("%d\n", v[k]);
    soma = soma + v[k];
                      }
    printf("Soma = %d\n", soma);
	printf("======================================================================================\n");
	break;
	
	case'd':
	printf("\nElementos com zero fora Diagonal da Matriz\n");
	for(i=0; i<LIN; i++)   {
	for(j=0; j<COL; j++)   {
	if(i != j && m[i][j]<0){
	m[i][j]=0;
						   }
	printf("%d ", m[i][j]);	
						   }
	printf("\n");
						   }
	printf("======================================================================================\n");
	break;

	case'D':
	printf("\nElementos com zero fora Diagonal da Matriz\n");
	for(i=0; i<LIN; i++)   {
	for(j=0; j<COL; j++)   {
	if(i != j && m[i][j]<0){
	m[i][j]=0;
						   }
	printf("%d ", m[i][j]);	
						   }
	printf("\n");
						   }
	printf("======================================================================================\n");
	break;
	
	case'e':
	printf("\nQual elemento você deseja buscar na matriz?: ");
	scanf(" %d", &busca);
	
	for(i=0; i<LIN; i++)  {
	 for(j=0; j<COL; j++) {
	  if(busca == m[i][j]){
	   buscalinha=i;
	   buscacoluna=j;	  
					      }
				          }
					      }
    if(buscacoluna == 0 || buscalinha == 0){
	printf("\nValor não encontrado!\n");
						                   }
	else {
	printf("\nO valor(%d) buscado está na linha %d, coluna %d.\n", busca, buscalinha + 1, buscacoluna + 1);
		 }
					  
	printf("======================================================================================");
	break;

	case'E':
	printf("\nQual elemento você deseja buscar na matriz?: ");
	scanf(" %d", &busca);
	
	for(i=0; i<LIN; i++)  {
	 for(j=0; j<COL; j++) {
	  if(busca == m[i][j]){
	   buscalinha=i;
	   buscacoluna=j;	  
					      }
				          }
					      }
    if(buscacoluna == 0 || buscalinha == 0){
	printf("\nValor não encontrado!\n");
						                   }
	else {
	printf("\nO valor(%d) buscado está na linha %d, coluna %d.\n", busca, buscalinha + 1, buscacoluna + 1);
		 }
					  
	printf("======================================================================================");
	break;
	
}
	return 0;
}

