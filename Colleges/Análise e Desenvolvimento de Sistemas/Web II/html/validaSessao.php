<?php
   session_start();

   if(!isset($_SESSION["carrinho"])){
   	$_SESSION["carrinho"]=[
   		"produtos"=>[],
   		"valor"=>[]
   	];
   }
   	$q=sizeof($_SESSION["carrinho"]["produtos"]);
   	$_SESSION["carrinho"]["produtos"][$q]=$_POST["nome"];
   	$_SESSION["carrinho"]["valor"][$q]=$_POST["valor"];
   	$i=0;
   	$_SESSION["soma"]=0;

   	do{
   	    echo $_SESSION["carrinho"]["produtos"][$i]." - R$".
   	         $_SESSION["carrinho"]["valor"][$i]."<br>";   
             $_SESSION["soma"]+=$_SESSION["carrinho"]["valor"][$i];
             $i++;
   	}while($i<=$q);
   	echo "<hr> Total: "." R$ ".$_SESSION["soma"]."<br>";
 

?>
<a href="formulario.php">Continuar</a> | <a href="concluirVenda.php">Encerrar</a>