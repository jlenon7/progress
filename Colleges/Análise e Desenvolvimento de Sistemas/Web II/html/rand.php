<?php

$m = [];

for($l = 0; $l < 5; $l++){
	for($c; $c < 5; $c++){
		$x = rand (1, 100);
	}

	$achou = false;
	for($x1 = 0; $x < $l; $x++){
		for($y = 0; $y < $c; $y++){
			if($x == $m[$x][$y])
				$achou = true;
		}
	}

	if($achou)$c--;
	$m[$l][$c]=$x;
}


?>