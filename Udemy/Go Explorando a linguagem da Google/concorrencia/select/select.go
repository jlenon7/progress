package main

import (
	"fmt"
	"time"

	html "github.com/jlenon7/gohtmlpackage"
)

func oMaisRapido(url1, url2, url3 string) string {
	c1 := html.Titulo(url1)
	c2 := html.Titulo(url2)
	c3 := html.Titulo(url3)

	// Estrutura de controle especifica para concorrencia
	select {
	case t1 := <-c1:
		return t1
	case t2 := <-c2:
		return t2
	case t3 := <-c3:
		return t3
	case <-time.After(4000 * time.Millisecond): // Net ta ruim hoje :(
		return "Todos perderam!"
		// default:
		// 	return "Sem resposta ainda!"
	}
}

func main() {
	campeao := oMaisRapido("https://www.cod3r.com.br", "https://www.google.com", "https://www.amazon.com")

	fmt.Println(campeao)
}
