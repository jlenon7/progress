<?php
   session_start();
   echo "Compra finalizada<br>";
   echo "Valor Total R$ ".$_SESSION["soma"]."<br>";
   session_destroy();
?>
<a href="formulario.php">Nova Compra</a>