<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Exercico 03</title>
</head>
<body>

	<%
		int i;
		
		for (i = 1; i <= 100; i++){%>
			
			<hr width="<%= i %> %"><%
		}
	%>

</body>
</html>