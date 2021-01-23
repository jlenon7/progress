<?php

$nome = $_POST["nome"];
$ano  = $_POST["ano"];
$anoAtual = date("Y");
echo "O nome é: ".$nome;
echo "<br>Sua idade é ".($anoAtual - $ano);

?>