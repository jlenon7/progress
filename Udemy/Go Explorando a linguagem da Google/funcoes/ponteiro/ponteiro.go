package main

import "fmt"

func inc1(n int) {
	n++
}

func inc2(n *int) {
	// o tipo *int é usado para desreferenciar um ponteiro,
	// ou seja pegar o valor real que o ponteiro aponta.
	*n++
}

func main() {
	n := 1

	inc1(n)
	fmt.Println(n)

	inc2(&n) // evitar passagem por referência
	fmt.Println(n)
}
