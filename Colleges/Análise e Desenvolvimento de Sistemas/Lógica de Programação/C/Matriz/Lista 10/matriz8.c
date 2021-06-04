/*
8) Faça um programa para simular um jogo da velha. Inicialmente, a matriz deve ser preenchida
com pontos. Depois o programa deve solicitar ao jogador que digite um par de coordenadas
atribuir o caractere 'o' ou 'x' ao elemento da matriz correspondente às coordenadas entradas.
A cada coordenada digitada, o programa deve imprimir a matriz resultante e verificar se algum
jogador já ganhou ou se houve empate. O programa deve permanecer nesse loop até chegar ao
finao do jogo.
Exemplo de execução do programa:
Jogo da Velha
(Digite as coordenadas na forma linha coluna)
. . .
. . .
. . .
Coordenadas – Jogador 1: 0 0
o . .
. . .
. . .
Coordenadas – Jogador 2: 0 1
o x .
. . .
. . .
Coordenadas – Jogador 1: 1 1
o x .
. o .
. . .
Coordenadas – Jogador 2: 0 2
o x x
. o .
. . .
Coordenadas – Jogador 1: 2 2
o x x
. o .
. . o
Ganhador: Jogador 1 !!!
*/

#include <stdio.h>

int main()
{
    char m[3][3];
    char O='o', X='x';
    int l=0,j,i;


    for(i=0;i<3;i++)
        for(j=0;j<3;j++)
            m[i][j]=' ';

    while(l<=9)
        {
        printf("JOGO DA VELHA \n");

        
        for(i=0;i<3;i++)
        {
            printf("%c  .%c  .%c\n",m[i][0],m[i][1],m[i][2]);
            if(i<3-1)
            {
                printf("...........\n");
            }
        }

        printf("\nINSIRA AS COORDENADAS, ");
        if(l%2)printf("PLAYER 2\nLINHA: ");
        else printf("PLAYER 1\nLINHA: ");

        scanf("%d",&i);
        printf("COLUNA: ");
        scanf("%d",&j);

        if(m[i-1][j-1]==' ')
        {
            if(l%2)m[i-1][j-1]=X;
            else m[i-1][j-1]=O;
            l++;
        }


        if((m[0][0]==O && m[0][1]==O && m[0][2]==O)||
           (m[1][0]==O && m[1][1]==O && m[1][2]==O)||
           (m[2][0]==O && m[2][1]==O && m[2][2]==O)||
           (m[0][0]==O && m[1][0]==O && m[2][0]==O)||
           (m[0][1]==O && m[1][1]==O && m[2][1]==O)||
           (m[0][2]==O && m[1][2]==O && m[2][2]==O)||
           (m[0][0]==O && m[1][1]==O && m[2][2]==O)||
           (m[0][2]==O && m[1][1]==O && m[2][0]==O))
        {
            printf("\n\a\t\tJogador 1, VOCE VENCEU!!!");
            break;
        }
        if((m[0][0]==O && m[0][1]==O && m[0][2]==O)||
           (m[1][0]==O && m[1][1]==O && m[1][2]==O)||
           (m[2][0]==O && m[2][1]==O && m[2][2]==O)||
           (m[0][0]==O && m[1][0]==O && m[2][0]==O)||
           (m[0][1]==O && m[1][1]==O && m[2][1]==O)||
           (m[0][2]==O && m[1][2]==O && m[2][2]==O)||
           (m[0][0]==O && m[1][1]==O && m[2][2]==O)||
           (m[0][2]==O && m[1][1]==O && m[2][0]==O))
        {
            printf("\n\n\n\n\a\t\tJogador 2, VOCE VENCEU!!!");
            break;
        }

        if(l==9)
        {
            printf("\nPARTIDA EMPATADA");
            break;
        }

    }
    
    return(0);
}
