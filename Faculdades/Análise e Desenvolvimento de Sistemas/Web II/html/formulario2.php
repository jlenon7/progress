
<html>
<head>
<title>
   PHP Orientado a Objetos
</title>
</head>
<body>

<div>
<form action="Pessoa.php" method="post" enctype="multipart/form-data">


   <input type="text" name="nome" placeholder="Seu Nome">
   <input type="email" name="email" placeholder="Seu E-mail">

<br>
   
   <input type="tel" size= "20" pattern="\(\d{2}\)\d{5}-\d{4}" title="Numero de telefone incorreto" placeholder="(00)00000-0000">  
   Dn<input type="date" size="23" name="nascimento">    
   

<br>

<div>
   <br>
   <input type="file" name="foto">
</div>

<br>

<input type="submit" value="Confimar">
</form>
</div>
</body>
</html>
