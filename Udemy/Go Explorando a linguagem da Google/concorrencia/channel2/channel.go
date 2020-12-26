package main

import (
	"fmt"
	"time"
)

// Channel (canal) - É a forma de comunicação entre GoRoutines
// Channel é um tipo

func doisTresQuatroVezes(base int, c chan int) {
	time.Sleep(time.Second)
	c <- 2 * base

	time.Sleep(time.Second)
	c <- 3 * base

	time.Sleep(3 * time.Second)
	c <- 4 * base
}

func main() {
	c := make(chan int)
	go doisTresQuatroVezes(2, c)
	fmt.Println("A")

	a, b := <-c, <-c
	fmt.Println("B")

	fmt.Println(a, b)
	fmt.Println(<-c)
	// fmt.Println(<-c) Erro deadlock pois não tem nenhuma go routine executando
}
