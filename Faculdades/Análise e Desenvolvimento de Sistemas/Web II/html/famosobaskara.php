<?php
$a = 10;
$b = 20;
$c = 6;

 function calculaBaskara($a,$b,$c,$s){
 	$delta = calculaDelta($a,$b,$c);
 	if($s == "+"){
 		$r = (-$b+sqrt($delta))/2*$a;
 	}
 	else{
 		$r = (-$b-sqrt($delta))/2*$a;
 	}
 	return $r;

 }
 function calculaDelta($a,$b,$c){
 	$r = pow($b, 2) -4 * $a* $c;
 	return $r;

 }
 $x1 = calculaBaskara($a,$b,$c, '+');
 $x2 = calculaBaskara($a,$b,$c, '-');
 echo "X1 = ".$x1;
 echo "<br>X2 = " .$x2;

?>