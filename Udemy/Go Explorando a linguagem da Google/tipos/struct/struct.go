package main

import "fmt"

type produto struct {
	nome     string
	preco    float64
	desconto float64
}

func (produto produto) precoComDesconto() float64 {
	return produto.preco * (1 - produto.desconto)
}

func main() {
	var produto1 produto
	produto1 = produto{
		nome:     "Lapis",
		preco:    1.79,
		desconto: 0.05,
	}
	fmt.Println(produto1, produto1.precoComDesconto())

	produto2 := produto{"Notebook", 1989.90, 0.10}
	fmt.Println(produto2.precoComDesconto())
}
