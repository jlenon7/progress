<!DOCTYPE html>

<html lang ="pt-br">
<head>
	<meta charset="utf-8">
	<title>Acesso ao Sistema</title>
</head>
<body background = "https://img00.deviantart.net/9c00/i/2017/167/d/0/firewatch_inspired_wallpaper__free_dl__by_cirqer-dbcw20y.png">
		<div id = "erro">
			<?php
            if(isset($_GET ["erro"])){
            	if($_GET["erro"] == 1)
            		echo "Acesso não permitido";
            }
			?>
	    <form action = "validaSenha.php" method = "post">
		<div id = "acesso">
			<div><label>Usuário</label></div>
			<div><input type = "text" name = "usuario" size = "20" maxlength="8"><br></div>
			<div><label>Senha</label></div>
			<div><input type = "password" name = "senha" size = "20" maxlength="8"><br></div>
			<br><input type = "submit" value = "Acessar">
		</div>

	</form>
</body>
</html>
