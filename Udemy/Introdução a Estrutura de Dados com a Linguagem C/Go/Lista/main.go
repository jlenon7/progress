package main

func main() {
	var lista Lista

	lista = inserirLista(lista, 1)
	lista = inserirLista(lista, 2)
	lista = inserirLista(lista, 3)
	lista = inserirLista(lista, 4)
	lista = inserirLista(lista, 5)
	lista = inserirLista(lista, 6)
	lista = inserirLista(lista, 7)
	lista = inserirLista(lista, 8)
	lista = inserirLista(lista, 9)

	imprimirLista(lista)
	buscaLista(lista, 1)
}
