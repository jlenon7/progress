#include <stdio.h>


int main(){	
char n;

	printf("\n===============================SÓ SÉRIE TOPZERA=================================\n");	
    printf("\nQual desses gêneros você prefere?\n");
    printf("A-Drama\n");
    printf("B-Comédia\n");
    printf("C-Ação\n");
    scanf("%c", &n);

if (n == 'a')
{
	printf("\nD-Aventura\n");
    printf("E-Misterio\n");
    printf("F-Crime\n");
    printf("G-Politico\n");
    scanf(" %c", &n);
    
if (n == 'd')
{
    printf("\nH-Suspense\n");
    printf("I-Fantasia\n");
    scanf(" %c", &n);

 if (n == 'h')
 
    printf("\nAssista Lost!\n");
    
else if (n == 'i')

    printf("\nAssista Game of Thrones!\n");
     
else

    printf("\nOpção invalida!");
}
else if (n == 'e')
{
    printf("\nJ-Sci-fi\n");
    printf("K-Medico\n");
    scanf(" %c", &n);
    
if (n == 'j')

    printf("\nAssista X-files!\n");
    
else if (n == 'k')

    printf("\nAssista House M.D.!\n");
    
else

    printf ("\nOpção invalida!\n");
}

else if (n == 'f')

    printf("\nAssista Breaking Bad!\n");
    
else if(n == 'g')

    printf("\nAssista House of Cards!\n");
    
else

    printf("\nOpção invalida!\n");

}

else if(n == 'b')
{
    printf("\nL-Romance\n");
    printf("M-Musical\n");
    printf("N-Nerd\n");
    scanf(" %c", &n);
    
if (n == 'l')

    printf("\nAssista How I Met Your Mother!\n");
        
else if(n == 'm')

    printf("\nAssista Glee\n!");
        
else if(n == 'n')

    printf("\nAssista The Big Bang Theory!\n");
        
else

    printf("\nOpção invalida!\n");

}
else if(n == 'c')
{
    printf("\nO-Drama\n");
    printf("P-Policial\n");
    printf("Q-Crime\n");
    scanf(" %c", &n);
    
if (n == 'o')
{
    printf("\nR. Misterio\n");
    printf("S. Terror\n");
    scanf(" %c", &n);
    
if(n == 'r')

    printf("\nAssista Homeland!\n");
    
else if(n == 's')

    printf("\nAssista The Walking Dead!\n");
    
else

    printf("\nOpção invalida!\n");
               
}
else if(n == 'p')

    printf("\nAssista CSI!\n");
    
else if(n == 'q')

    printf("\nAssista Dexter!\n");
        
else

    printf("\nOpção invalida!\n");
    
}

else

   printf("\nOpção invalida!\n");
               
	return 0;
}

