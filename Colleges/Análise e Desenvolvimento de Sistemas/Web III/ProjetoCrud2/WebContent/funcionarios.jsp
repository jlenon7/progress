<!-- CABE�ALHO -->
<%@ include file="header.jsp"%>

<!-- IMPORTS DE CLASSES DO BACK-END -->
<%@ include file="controleAcesso.jsp"  %>
<%@ page import="controller.FuncionarioController" %>
<%@ page import="java.util.List" %>
<%@ page import="model.FuncionarioModel" %>

<%
	FuncionarioController app = new FuncionarioController();
	List<FuncionarioModel> lista = app.listarFuncionarios();
%>

<!-- MIOLO/CONTE�DO DA P�GINA -->
<div class="container">
	<%@ include file="menu.jsp" %>
	<div class="login-form">
		<div class="main-div-index">
    		<div class="panel">
   				<h2>Funcion�rios</h2>
   				<p>Listagem dos Funcion�rios</p>

   			</div>
    		<div class="panel">
    			<table class="table table-hover table-striped">
    				<thead>
    					<th>ID</th>
    					<th>Nome</th>
    					<th>cpf</th>
    					<th>A��o</th>
    				</thead>
    				<tbody>
    					<%
    						for(FuncionarioModel func : lista) {
    					%>
    						<tr>
    							<td><% out.print(func.getId()); %></td>
    							<td><% out.print(func.getNome()); %></td>
    							<td><% out.print(func.getCpf()); %></td>
    							<td>
    							    <a href="editarFuncionario.jsp?id=<%=func.getId() %>" class="btn btn-primary">Editar</a>
								</td>
    							<td>
    							    <a href="crudController.jsp?acao=excluirFuncionario&id=<%=func.getId() %>" class="btn btn-primary">Excluir</a>
    							</td>
    						</tr>
    					<% } %>
    				</tbody>	
    				<tfoot>
    					<tr>
    						<td colspan="3" align="center">- 1 -</td>
    					</tr>
    				</tfoot>
    			</table>
    		</div>
    	</div>
	</div>
</div>

<!-- RODAP� -->
<%@ include file="footer.jsp"%>