#include <stdio.h>
#include <math.h>

         int main(){
			 
			 int a, b, c, delta;
			 printf("Programa de Resolução de Delta.\n");
			 printf("Digite o A da equação:");
			 scanf("%d", &a);
			 printf("Digite o B da equação:");
			 scanf("%d", &b);
			 printf("Digite o C da equação:");
			 scanf("%d", &c);
			 delta=pow(b,2)-4*a*c;
			 
			 if(delta>0)
			    
			   printf("O Valor do Delta é %d", delta);
			   
			 else
			 
			   printf("A equação não tem solução real");
	
	return 0;
}

