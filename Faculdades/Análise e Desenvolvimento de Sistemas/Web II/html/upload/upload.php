<?php
  $tmp = $_FILES["foto"]["tmp_name"];
  $destino = "imagens/".$_FILES["foto"]["name"];
  if(move_uploaded_file($tmp, $destino))
     echo "Enviando o arquivo ".$destino;
  else
  	 echo "Não foi possivel enviar o arquivo";
?>