package main

import "fmt"

// Init Fila
func (fila *Fila) Init(size int) bool {
	if !fila.IsInitialized() {
		fmt.Println("Fila já inicializada!")

		return false
	}

	fila.items = make([]int, size)
	fila.head = 0
	fila.tail = 0

	return true
}

// IsInitialized Fila
func (fila *Fila) IsInitialized() bool {
	if cap(fila.items) == 0 {
		return true
	}

	return false
}

// Push - Adiciona elemento na fila
func (fila *Fila) Push(element int) {
	fila.items[fila.head] = element

	if fila.items[fila.head] == 1 {
		fila.tail = fila.tail + 1
	}

	fila.head = fila.head + 1
}

// Print - imprime elementos da fila
func (fila *Fila) Print() {
	fmt.Printf("Items: [%v]", fila.items)
	fmt.Printf(" Head: %v", fila.head)
	fmt.Printf(" Tail: %v", fila.tail)
	fmt.Print("\n")
}

// Pop - Remove elemento da fila
func (fila *Fila) Pop() {
	fila.items[fila.tail-1] = 0

	fila.tail = fila.tail + 1
}

// Peek - Retorna o primeiro elemento
func (fila *Fila) Peek() int {
	return fila.items[fila.tail-1]
}
