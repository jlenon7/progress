package main

import "fmt"

func main() {
	var matriz [2][3]int

	for i := 0; i < 2; i++ {
		for j := 0; j < 3; j++ {
			matriz[i][j] = i + j
			fmt.Printf("%d\t", matriz[i][j])
		}

		fmt.Println('\n')
	}

	fmt.Println("2d: ", matriz)
}
