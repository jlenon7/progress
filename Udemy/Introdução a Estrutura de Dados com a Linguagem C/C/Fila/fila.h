typedef struct fila Fila;
typedef struct lista Lista;

Fila* criar_fila();
void inserir(Fila* f, float v);
float remover(Fila* f);
int vazia(Fila* f);
void liberar(Fila* f);
void imprimir(Fila* f);