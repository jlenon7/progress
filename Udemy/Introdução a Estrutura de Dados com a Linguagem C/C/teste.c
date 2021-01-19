#include <stdio.h>

int somar(int n1, int n2) {
  return n1 + n2;
}

int main() {
  int n1, n2, resultado;

  printf("Digite dois numeros: ");
  scanf("%d %d", &n1, &n2);

  resultado = somar(n1, n2);

  printf("%d\n", resultado);

  return 0;
}
