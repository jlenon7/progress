<?php

  $dsemana = date("w");
  $semana  = ["Domingo",
              "Segunda-Feira",
              "Terça-Feira",
              "Quarta-Feira",
              "Quinta-Feira",
              "Sexta-Feira",
              "Sábado"
                             ];
   
  echo "Hoje é ".$semana[$dsemana];
  echo "<hr color='orange'>";
  foreach ($semana as $dia){
  	      echo $dia."<br>";
  }

  $t = sizeof($semana);
  echo "<hr color='orange'>";
  echo "O vetor semana tem ".$t." elementos";

  for ($i = 0; $i < $t; $t++){
  	  echo $semana[$i]."<br>";
  }
  $i = 0;
  echo "<br>";
  do{
  	echo $semana[$i]."<br>";
  	$i++;
  }while($i < $t)
?>