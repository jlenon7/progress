package main

import "fmt"

func main() {
	aprovados := make(map[int]string)

	aprovados[12345678] = "Maria"
	aprovados[12312313] = "Pedro"
	aprovados[12312331] = "Ana"

	fmt.Println(aprovados)

	for cpf, nome := range aprovados {
		fmt.Printf("%s (CPF: %d)\n", nome, cpf)
	}

	fmt.Println(aprovados[12345678])
	delete(aprovados, 12345678)
	fmt.Println(aprovados[12345678])
}
