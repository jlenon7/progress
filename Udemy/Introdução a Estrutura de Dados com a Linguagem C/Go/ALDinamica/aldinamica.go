package main

// Comando para visualizar melhor os detalhes da compilação
// go build -gcflags "-m -m" aldinamica.go

// go tool compile -S aldinamica.go

// func main() {
// 	f()
// }

// Stack

// Stack é a pilha de funções, é a área da memória
// que aloca dados/variáveis ou ponteiros quando
// uma função é chamada e desalocada quando a função
// termina. Representa a memória local daquela função.

// Heap

// Heap é a memória global do programa, é um espaço
// que o computador reserva para a área de alocação
// dinâmica, variáveis e dados criados durante a
// execução do programa.

// desabilitando otimizações do compilador do go
// go:noinline
// func f() *int {
// 	i := 10
// 	return &i
// }

import "fmt"

func f1(vetor [10]int) {
	vetor[0] = 20
}

func main() {
	var vetor [10]int

	for i := 0; i < 10; i++ {
		vetor[i] = i
		fmt.Printf("%d\n", vetor[i])
	}
}
