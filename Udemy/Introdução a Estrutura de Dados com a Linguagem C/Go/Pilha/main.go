package main

import "fmt"

func main() {
	size := 5
	pilha := Pilha{}

	if flag := pilha.Init(size); flag {
		fmt.Println("Tamanho da pilha: ", size)

		pilha.Push(0)
		pilha.Print()
		pilha.Push(1)
		pilha.Print()
		pilha.Push(2)
		pilha.Print()
		pilha.Push(3)
		pilha.Print()
		pilha.Push(4)
		pilha.Print()

		fmt.Println(pilha.Peek())

		// FIFO - First in First out
		pilha.Pop()
		pilha.Print()

		pilha.Pop()
		pilha.Print()

		fmt.Println(pilha.Peek())
	}
}
