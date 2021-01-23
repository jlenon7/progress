<?php

$alunos=[
  "nome" => ["João", "Adryell", "Carol", "André"],
  "periodo" => [2,3,1,2],
  "curso" => ["Física", "TADS", "Cozinha", "Aquicultura"],
  "chines" => ["我是同性戀", "我是同性戀", "我是同性戀", "我是同性戀"]
];

$t = sizeof ($alunos["nome"]);
   echo "<hr color='orange' size='8' width='9.32%' align='left'>";
for($i = 0; $i < $t; $i++){

   echo "Nome : ".$alunos["nome"][$i]."<br>";
   echo "Periodo : ".$alunos["periodo"][$i]."<br>";
   echo "Curso : ".$alunos["curso"][$i]."<br>";
   echo "Frase motivacional : ".$alunos["chines"][$i];
   echo "<hr color='orange' size='8' width='9.32%' align='left'>";

}

?>