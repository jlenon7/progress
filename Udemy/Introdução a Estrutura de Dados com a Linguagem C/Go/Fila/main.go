package main

import "fmt"

func main() {
	size := 5
	fila := Fila{}

	if flag := fila.Init(size); flag {
		fmt.Println("Tamanho da fila: ", size)

		fila.Print()

		fila.Push(1)
		fila.Print()
		fila.Push(2)
		fila.Print()
		fila.Push(3)
		fila.Print()
		fila.Push(4)
		fila.Print()
		fila.Push(5)
		fila.Print()

		fmt.Println(fila.Peek())

		// LIFO - Last In First Out
		fila.Pop()
		fila.Print()

		fmt.Println(fila.Peek())

		fila.Pop()
		fila.Print()

		// fila.Pop()
		// fila.Print()

		// fila.Pop()
		// fila.Print()

	}
}
