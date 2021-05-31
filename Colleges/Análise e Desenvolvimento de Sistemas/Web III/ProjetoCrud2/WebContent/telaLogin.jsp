<!-- CABEÇALHO -->
<%@ include file="header.jsp"%>

<div class="container">
	<div class="login-form">
		<div class="main-div">
			<div class="panel">
				<h1>Login</h1>
				<p>Coloque seu login e senha</p>
			</div>
			<form id="Login" method="post" action="controleLogin.jsp">
				<div class="form-group">
			
					<input type="text" class="form-control" id="login" required
						name="login" placeholder="Login">
				</div>

				<div class="form-group">
					<input type="password" class="form-control" id="senha" required
						name="senha" placeholder="Senha">
				</div>

				<div class="form-group">
					<select name="tipo-usuario" required>
						<optgroup label="Selecione um Tipo de Usuário"></optgroup>
						<option value="cliente">Cliente</option>
						<option value="fornecedor">Fornecedor</option>
					</select>
				</div>
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
		</div>
	</div>
</div>

<!-- RODAPÉ -->
<%@ include file="footer.jsp"%>