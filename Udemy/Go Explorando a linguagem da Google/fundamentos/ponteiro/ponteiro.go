package main

import "fmt"

func main() {
	i := 1

	var p *int = nil

	p = &i
	*p++
	i++

	fmt.Println(p, *p, i, &i)

	i++

	fmt.Println(i, *p)
}
