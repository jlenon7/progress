package area

import "math"

// Pi é uma proporção numérica definida pela relação
// entre o perímetro de uma circuferência e seu diâ
// metro
const Pi = 3.1416

// Circunferencia - responsável por calcular a área da circunferência
func Circunferencia(raio float64) float64 {
	return math.Pow(raio, 2) * Pi
}

// Retangulo - responsável por calcular a área de um retangulo
func Retangulo(base, altura float64) float64 {
	return base * altura
}

func _TrianguloEq(base, altura float64) float64 {
	return (base * altura) / 2
}
