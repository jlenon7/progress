<%@ include file="header.jsp"%>

<div class="container">
	<div class="login-form">
		<div class="main-div">
			<div class="panel">
			
			
	<form method="POST" action="crudController.jsp">
		  <input type="hidden" name="acao" value="incluirFuncionario" >
		  Nome:<br>
		  <input type="text" name="nome" class="form-control" >
		  
		  CPF:<br>
		  <input type="text" name="cpf" class="form-control">
		
			<input type="submit" class="btn btn-primary" value="Salvar">
	
	</form> 




</div>
</div>
</div>
</div>


<!-- RODAPÉ -->
<%@ include file="footer.jsp"%>