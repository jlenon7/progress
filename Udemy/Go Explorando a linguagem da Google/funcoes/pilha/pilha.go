package main

import "runtime/debug"

// Debug stack é a pilha de execução do código,
// desde onde a execução começou, até onde ela
// parou.
func f3() {
	debug.PrintStack()
}

func f2() {
	f3()
}

func f1() {
	f2()
}

func main() {
	f1()
}
