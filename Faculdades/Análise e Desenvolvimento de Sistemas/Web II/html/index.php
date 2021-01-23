<?php
	//php usa uma tipagem dinamica

	$texto = "Olá Mundo do php"; //Variaveis começam com '$' seguida do nome da variavel
	echo utf8_decode ($texto)."<br>"; //echo printa na tela
	//. serve pra concatenar um texto no outro

	$a = "20a"; //ignora o a e mostra o resultado de 20+5
	$b = 5;
	echo $a+$b."<br>";

	$c = "10a";
	$d = 5;
	$e = $c + $d;
	echo $e."<br>";
	$e = "PHP";
	echo $e."<br>";

	$n = 2.59;
	echo round($n)."<br>";
	//Round é um metodo para arredondar um numero pro decimal mais proximo
	echo ceil($n)."<br>";
	//Ceil arredonda o numero pro decimal de cima
	echo floor($n)."<br>";
	//Floor arredonda o numero pro decimal de baixo

	echo pow(3, 2)."<br>";
	echo sqrt(9)."<br>";

	$a = 2; $b = 6; $c = 1;
	$x1 = (-$b + sqrt(pow($b, 2) - 4 * $a * $c)) / 2 * $a;
	$x2 = (-$b - sqrt(pow($b, 2) - 4 * $a * $c)) / 2 * $a;

	echo "x1 = ", $x1;
	echo "<br>x2 = ", $x2;

?>