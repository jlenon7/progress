package matematica

import (
	"fmt"
	"strconv"
)

// Media é responsável por calcular a média entre dois ou mais valores
func Media(numeros ...float64) float64 {
	total := 0.0
	for _, num := range numeros {
		total += num
	}

	media := total / float64(len(numeros))
	mediaArredondada, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", media), 64)

	return mediaArredondada
}
