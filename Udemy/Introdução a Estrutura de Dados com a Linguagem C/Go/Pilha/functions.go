package main

import "fmt"

// Init Pilha
func (pilha *Pilha) Init(size int) bool {
	if !pilha.IsInitialized() {
		fmt.Println("Pilha já inicializada!")

		return false
	}

	pilha.Items = make([]int, size)
	pilha.head = -1

	return true
}

// IsInitialized Pilha
func (pilha *Pilha) IsInitialized() bool {
	if cap(pilha.Items) == 0 {
		return true
	}

	return false
}

// Push - Adiciona elemento na pilha
func (pilha *Pilha) Push(element int) {
	pilha.head++

	if pilha.head == -1 {
		pilha.Items[0] = element
	} else {
		pilha.Items[pilha.head] = element
	}
}

// Print - imprime elementos da pilha
func (pilha *Pilha) Print() {
	fmt.Printf("Items: [%v]", pilha.Items)
	fmt.Printf(" Head: %v", pilha.head)
	fmt.Printf(" Tail: %v", pilha.tail)
	fmt.Print("\n")
}

// Pop - Remove elemento da pilha
func (pilha *Pilha) Pop() {
	pilha.Items[pilha.head] = 0
	pilha.head--
}

// Peek - Retorna o primeiro elemento
func (pilha *Pilha) Peek() int {
	return pilha.head
}
