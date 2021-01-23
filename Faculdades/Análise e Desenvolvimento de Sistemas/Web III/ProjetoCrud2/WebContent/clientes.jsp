<!-- CABEÇALHO -->
<%@ include file="header.jsp"%>

<!-- IMPORTS DE CLASSES DO BACK-END -->
<%@ include file="controleAcesso.jsp"  %>
<%@ page import="controller.ClienteController" %>
<%@ page import="java.util.List" %>
<%@ page import="model.ClienteModel" %>
<%@ page import="model.FornecedorModel" %>

<%
	ClienteController app = new ClienteController();
	List<ClienteModel> lista = app.listarClientes();
%>

<!-- MIOLO/CONTEÚDO DA PÁGINA -->
<div class="container">
	<%@ include file="menu.jsp" %>
	<div class="login-form">
		<div class="main-div-index">
    		<div class="panel">
   				<h2>Clientes</h2>
   				<p>Listagem dos Clientes</p>

   			</div>
    		<div class="panel">
    			<table class="table table-hover table-striped">
    				<thead>
    					<th>Nome</th>
    					<th>cpf</th>
    					<th>login</th>
    					<th>Ação</th>
    				</thead>
    				<tbody>
    					<%
    						for(ClienteModel cliente : lista) {
    					%>
    						<tr>
    							<td><% out.print(cliente.getNome()); %></td>
    							<td><% out.print(cliente.getCpf()); %></td>
    							<td><% out.print(cliente.getLogin()); %></td>
    							<td>
    							    <a href="editarCliente.jsp?id=<%=cliente.getId() %>" class="btn btn-primary">Editar</a>
								</td>
    							<td>
    							    <a class="btn btn-primary" href="crudController.jsp">Excluir</a>
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

<!-- RODAPÉ -->
<%@ include file="footer.jsp"%>