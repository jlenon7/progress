package main

import "fmt"

func rotina(ch chan int) {
	ch <- 1
	ch <- 2
	ch <- 3
	fmt.Println("Executou!")

	ch <- 4
	fmt.Println("Não sera executado, buffer lotado!")

	ch <- 5
	ch <- 6
}

func main() {
	ch := make(chan int, 3)
	go rotina(ch)

	fmt.Println(<-ch)
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
