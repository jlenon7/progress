package main

import (
	"fmt"
	m "math"
)

func main() {
	const PI float64 = 3.1415
	var raio = 3.2

	area := PI * m.Pow(raio, 2)
	fmt.Println("A área da circuferência é", area)
}
