<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
 <%@ page import="Exercicio04.org.PessoaService" %>       
    
   
<!DOCTYPE html>

<html>

<head>
	<meta charset="ISO-8859-1">
	
	<title>Exercio 04</title>
</head>

<body>

	<%
		PessoaService lista = new PessoaService();
	
		for (int i = 0; i < 3; i++){
			out.print("<br><br>");
			
			out.print("Nome: " + lista.listarPessoas().get(i).getNome() + 
					  "<br>" + 
					  "Idade: " + lista.listarPessoas().get(i).getIdade() + "anos");
		}
	%>

</body>

</html>