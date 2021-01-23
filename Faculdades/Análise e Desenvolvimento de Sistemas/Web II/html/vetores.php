<?php
   
   $v = array(1,2,3,4,5);
   echo "valor do vetor na posição 1:".$v[3];

   echo "<br>";

   $v1 = [1,2,3,4,5,6];
   echo "valor do vetor1 na posição 3:".$v1[3];

   $v2 = [];
   $v2[0] = "a";
   $v2[1] = "b";

   echo "<br>";

   echo "Valor do vetor 2 na posição 1:".$v2[1];
   $v3 = ["jaodozap",20,12.4,'b'];

   echo "<br>";

   echo "Valor do vetor na posição 2:".$v3[2];

   $aluno = [
      "nome" => "jaodozapzap", 
      "Idade" => 20, 
      "curso" =>"Tads",
      "Periodo" =>2 
   ];
    
   echo "<br>";
   echo "Aluno: ".$aluno["nome"]." tem ".$aluno["idade"]."17 anos"."<br>";
   echo "Estuda no IFPR no curso ".$aluno["curso"];
?>