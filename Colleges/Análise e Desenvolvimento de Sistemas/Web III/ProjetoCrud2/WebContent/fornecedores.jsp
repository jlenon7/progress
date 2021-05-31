<!-- CABEÇALHO -->
<%@ include file="header.jsp"%>

<!-- IMPORTS DE CLASSES DO BACK-END -->
<%@ include file="controleAcesso.jsp"  %>
<%@ page import="controller.FornecedorController" %>
<%@ page import="java.util.List" %>
<%@ page import="model.FornecedorModel" %>

<%
FornecedorController app = new FornecedorController();
List<FornecedorModel> lista = app.listarFornecedores();
%>

<!-- MIOLO/CONTEÚDO DA PÁGINA -->
<div class="container">
	<%@ include file="menu.jsp" %>
	<div class="login-form">
		<div class="main-div-index">
    		<div class="panel">
   				<h2>Fornecedores</h2>
   				<p>Listagem dos Fornecedores</p>

   			</div>
    		<div class="panel">
    			<table class="table table-hover table-striped">
    				<thead>
    					<th>Nome</th>
    					<th>cnpj</th>
    					<th>login</th>
    				</thead>
    				<tbody>
    					<%
    						for(FornecedorModel fornecedor : lista) {
    					%>
    						<tr>
    							<td><% out.print(fornecedor.getNome()); %></td>
    							<td><% out.print(fornecedor.getCnpj()); %></td>
    							<td><% out.print(fornecedor.getLogin()); %></td>
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