package main

import "fmt"

func estaVazia(lista Lista) bool {
	return lista == nil
}

func inserirLista(lista Lista, number int) Lista {
	var novo Data

	novo.info = number
	novo.prox = &lista

	return append(lista, novo)
}

func imprimirLista(lista Lista) {
	if estaVazia(lista) {
		fmt.Print("Lista vazia!\n")
	} else {
		fmt.Print("Imprimindo lista:\n\n")

		for i, data := range lista {
			fmt.Printf("[%v]: %v\n", i, data)
		}
	}
}

func buscaLista(lista Lista, valor int) {
	var indice int
	var dataEncontrada Data

	for i, data := range lista {
		if data.info == valor {
			indice = i
			dataEncontrada = data
		}
	}

	fmt.Print("\nValor encontrado na lista:\n\n")
	fmt.Printf("[%v]: %v\n", indice, dataEncontrada)
}
