typedef struct lista Lista;

// fun��o de cria��o da lista
Lista* criar_lista();

// fun��o que insere no in�cio da lista
Lista* inserir_lista(Lista* l, int i);

// fun��o para imprimir os elementos da lista
void imprimir_lista(Lista* l);

// verifica se a lista est� vazia
int vazia(Lista* l);

// busca elementos na lista
Lista* buscar(Lista* l, int v);

// remo��o de elementos da lista
Lista* remover(Lista* l, int v);

// libera a lista
void liberar(Lista* l);

// compara duas listas
int igual(Lista* l1, Lista* l2);