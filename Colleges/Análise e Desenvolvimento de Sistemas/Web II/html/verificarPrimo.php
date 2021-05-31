<?php

function primo($n){
	for($i = ($n - 1); $i > 1; i--){
		if($n % $i == 0){
			$aux = true;
			break;
		}
	}
   if ($aux){
   	return false;
   }
   else{
   	return true;
   }
}
$resultado = primo($_POST["numero"]);

if($resultado){
	echo "o número é primo";
}
else{
	echo "o número não é primo";
}

?>