<!-- CABEÇALHO -->
<%@ include file="header.jsp"%>

<!-- IMPORTS DE CLASSES DO BACK-END -->
<%@page import="model.FornecedorModel"%>
<%@page import="controller.FornecedorController"%>

<!-- GUARDA DE LOGIN -->
<%@ include file="controleAcesso.jsp"%>

<!-- CHECAGEM DE COOKIES PARA EXIBIR -->
<%
	Cookie[] cookies = request.getCookies();
	String nome = "", doc = "";
	if(cookies != null)
	for (Cookie cookie : cookies) {
		if (cookie.getName().equals("nome"))
			nome = cookie.getValue();
		if (cookie.getName().equals("doc"))
			doc = cookie.getValue();
	}
%>

<!-- MIOLO/CONTEÚDO DA PÁGINA -->
	<div class="container">
		<%@ include file="menu.jsp"%>
		<div class="login-form">
			<div class="main-div-index">
				<div class="panel">
					<h1>Página Principal</h1>
					<p>Conteúdo Logado</p>
				</div>
				<div class="panel">
					<%
						if (cookies != null) {
					%>
					Bem-vindo,
					<%
						out.print(nome);
					%>. <br /> Documento:
					<%
						out.print(doc);
					%>
					<%
						}
					%>
				</div>
			</div>
		</div>
	</div>

<!-- RODAPÉ -->
<%@ include file="footer.jsp"%>