#include <stdio.h>

int main() {

int A = 0, C = 0, F = 0, total;
char t, c;
int continuar = 0;
int se = 0;

do
{
printf("\nVoce torce para o Atletico, Coritiba ou Foz ? Responda com A, C ou F \n");
scanf(" %c", &t);

switch(t){
case 'a':  A =A + 1; break;
case 'c':  C =C + 1; break;
case 'f':  F =F + 1; break;

}

do
{
printf("\nTem mais torcedores ? Digite C para continuar ou S para sair.\n");
scanf(" %c", &c);

switch(c){	
case 'c':  se = 1; continuar = 1; break;
case 's':  se = 1; continuar = 0; break;
default:   se = 0; printf("Resposta Invalida\n"); break;

}
} while (se != 1);

} while (continuar != 0);

printf("\nTorcedores do Atletico = %d\n", A);
printf("Torcedores do Coritiba = %d\n", C);
printf("Torcedores do Foz = %d\n", F);

total = A + C + F;

printf("Total de Entrevistados = %d\n", total);

    return 0;
}
