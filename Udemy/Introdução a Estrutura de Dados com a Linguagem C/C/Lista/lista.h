typedef struct lista Lista;

// função de criação da lista
Lista* criar_lista();

// função que insere no início da lista
Lista* inserir_lista(Lista* l, int i);

// função para imprimir os elementos da lista
void imprimir_lista(Lista* l);

// verifica se a lista está vazia
int vazia(Lista* l);

// busca elementos na lista
Lista* buscar(Lista* l, int v);

// remoção de elementos da lista
Lista* remover(Lista* l, int v);

// libera a lista
void liberar(Lista* l);

// compara duas listas
int igual(Lista* l1, Lista* l2);