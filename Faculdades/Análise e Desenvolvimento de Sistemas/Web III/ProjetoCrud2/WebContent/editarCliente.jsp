<!-- CABEÇALHO -->
<%@ include file="header.jsp"%>
<%@ page import="controller.ClienteController" %>
<%@ page import="model.ClienteModel" %>

<%
String id = request.getParameter("id");
ClienteController clienteCont = new ClienteController();
ClienteModel cliente = clienteCont.buscarClientePorId( Long.parseLong(id) );

%>

<div class="container">
	<div class="login-form">
		<div class="main-div">
			<div class="panel">
			

<form method="POST" action="crudController.jsp">
  <input type="hidden" name="acao" value="editarCliente" >
  <input type="hidden" name="id" value="<%= cliente.getId() %>" >
  Nome:<br>
  <input type="text" name="nome" class="form-control" value="<%= cliente.getNome() %>" alt="<%= cliente.getNome() %>" >
  
  CPF:<br>
  <input type="text" name="cpf" class="form-control" value="<%= cliente.getCpf() %>">
  
  Login:<br>
  <input type="text" name="login" class="form-control" value="<%= cliente.getLogin() %>">
  
  Senha:<br>
  <input type="password" name="senha" class="form-control" value="<%= cliente.getSenha() %>">

<input type="submit" class="btn btn-primary" value="Salvar">

</form> 


</div>
</div>
</div>
</div>

<!-- RODAPÉ -->
<%@ include file="footer.jsp"%>