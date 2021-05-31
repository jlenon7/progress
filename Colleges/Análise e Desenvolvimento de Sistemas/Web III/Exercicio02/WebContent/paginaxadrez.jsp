<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Exercicio 02</title>
	
	<link href="Estilos.css" type="text/css" rel="stylesheet">
</head>
<body>

	<%
		int i;
		
		for (i = 1; i <= 100; i++){
			if (i % 2 == 0){ %>
				<div class="divPar"><%= i %></div>
			<%} else {%>
				<div class="divImpar"><%= i %></div>
			<% } } 
	%>
			

</body>
</html>