<!-- CABEÇALHO -->
<%@ include file="header.jsp"%>
<%@ page import="controller.FuncionarioController" %>
<%@ page import="model.FuncionarioModel" %>

<%
int id = Integer.parseInt(request.getParameter("id"));
FuncionarioController funcCont = new FuncionarioController();
FuncionarioModel func = new FuncionarioModel();
func = funcCont.buscarFuncPorId(id);

%>

<div class="container">
	<div class="login-form">
		<div class="main-div">
			<div class="panel">
			

<form method="POST" action="crudController.jsp">
  <input type="hidden" name="acao" value="editarFuncionario" >
  <input type="hidden" name="id" value="<%= func.getId() %>" >
  ID:<br>
  <input type="text" name="id" class="form-control" value="<%= func.getId() %>" alt="<%= func.getId() %>" >
  Nome:<br>
  <input type="text" name="nome" class="form-control" value="<%= func.getNome() %>" alt="<%= func.getNome() %>" >
  
  CPF:<br>
  <input type="text" name="cpf" class="form-control" value="<%= func.getCpf() %>">
  
<input type="submit" class="btn btn-primary" value="Salvar">

</form> 


</div>
</div>
</div>
</div>

<!-- RODAPÉ -->
<%@ include file="footer.jsp"%>