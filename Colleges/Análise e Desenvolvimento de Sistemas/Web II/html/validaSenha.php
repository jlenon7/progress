<?php

 function validaSenha($u, $s) 
 {

     $acesso=false;
 	 $usuarios=array(
           "usuario"=>array("Joclertano", "Anacleto", "Asdrubaldo", "jao"),
           "senha"=>array("123", "321", "213", "jao")
     );

     $q=sizeof($usuarios["usuario"]);
     for($i=0;$i<$q;$i++) {
     	if($u == $usuarios["usuario"][$i]){
     		if($s == $usuarios["senha"][$i]){
     			$acesso = true;
     			header("Location: paginainicial.php");
     		   }
     		
     		}
     	}
     	if(!$acesso)header("Location: senhanodale.php?erro=1");
     }
     //header ("Location:senha.php");
 
 function validaConteudo($u, $s)
 {
 	if($u != "" && $s != "")
 		return true;
 	else
 		return false;
 }
 $u = $_POST["usuario"];
 $s = $_POST["senha"];
 $retorno=validaConteudo($u,$s);
 if($retorno)validaSenha($u,$s);

 validaSenha($u, $s);
?>