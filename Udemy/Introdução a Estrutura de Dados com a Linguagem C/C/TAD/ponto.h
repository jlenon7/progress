typedef struct ponto Ponto;

/*
	Aloca e retorna um ponto com coordenadas (x,y)
*/
Ponto* criar_ponto(float x, float y);

/*
	Libera a memória de um ponto
*/
void liberar_ponto(Ponto* p);

/*
	Retorna os valores das coordenadas de um ponto
*/
void acessar_ponto(Ponto* p, float* x, float* y);

/*
	Atribui valores às coordenadas de um ponto
*/
void atribuir_valores(Ponto* p, float x, float y);

/*
	Retorna a distância entre dois pontos
*/
float distancia(Ponto* p1, Ponto* p2);