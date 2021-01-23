# include <stdio.h> 
# include <stdlib.h> 



int main() 
{ 
int i,inicio = 0, fim = 0; 
int letraA = 0, letraB = 0, letraC = 0, letraD = 0; 
int somaA = 0, somaB = 0, somaC = 0, somaD = 0; 
float mediaA = 0, mediaB = 0, mediaC = 0, mediaD = 0; 

printf(" Digite o numero inicial da faixa de valores: ");
scanf("%d",&inicio); 
printf(" Digite o numero final da faixa de valores: ");
scanf("%d",&fim); 

for (i = inicio; i <= fim; i++) 
{ 

if (i >= 0){letraA++; somaA += abs(i);} 

if (i%2 == 0){letraB++; somaB += abs(i);} 

if (i%2 != 0){letraC++; somaC += abs(i);} 

if ((i%2 != 0)&&(i%3 == 0)&&(i%4 == 0)){letraD++; somaD += abs(i);} 
} 

mediaA = (letraA > 0)? (float)somaA/(float)letraA : 0; 
mediaB = (letraB > 0)? (float)somaB/(float)letraB : 0; 
mediaC = (letraC > 0)? (float)somaC/(float)letraC : 0; 
mediaD = (letraD > 0)? (float)somaD/(float)letraD : 0; 

printf("\n A)A quantidade de numeros inteiros e positivos: %d",letraA); 
printf("\n Media: %.2f\n",mediaA); 
printf("\n B)A quantidade de numeros pares: %d",letraB); 
printf("\n Media: %.2f\n",mediaB); 
printf("\n C)A quantidade de numeros impares: %d",letraC); 
printf("\n Media: %.2f\n",mediaC); 
printf("\n D)A quantidade de numeros impares divisiveis por 3 e 4 ao mesmo tempo: %d",letraD); 
printf("\n Media: %.2f\n\n",mediaD); 


return 0; 
} 
