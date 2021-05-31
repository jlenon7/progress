#include <stdio.h>

int main()
{
	int i=1, menor=30, maior=50,soma=0,tempo;
	float media;

		while (i <= 4)
		{
			printf("Informe a temperaturo de hoje dia");
			scanf("%d",&tempo);			
			if (tempo > menor)
				maior = tempo;
			
			if (tempo < maior)
				menor = tempo;

				soma = soma +tempo;
			i++;
		}
		media = tempo /4;
			
		printf("A menor temperatura do ano foi %d\n",menor);
		printf("A maior temperatura do ano foi %d\n",maior);
		printf("A media anual foi %1.f",media);	
	return 0;
}

