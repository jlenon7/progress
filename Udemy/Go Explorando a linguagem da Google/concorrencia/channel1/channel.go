package main

import "fmt"

func main() {
	ch := make(chan int, 1)

	ch <- 1 // Enviando dados para o canal (publish)
	<-ch    // Recebendo dados do canal (leitura)

	ch <- 2
	fmt.Println(<-ch)
}
