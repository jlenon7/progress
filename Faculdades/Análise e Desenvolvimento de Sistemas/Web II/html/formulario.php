<html>
<head>
	<title>Variável de Sessão</title>
</head>
<body>
<div id="erro">
	<?php
	  if(isset($_GET["erro"])){
	  	  echo "Acesso restrito a usuários cadastrados";
	  }
	?>
</div>
    <form action="validaSessao.php" method="post">
	<input type="text" name="nome" placeholder="Seu Nome">
	<input type="text" name="valor" placeholder="Valor">
	<input type="submit" value="Enviar">
</body>
</form>
</html>