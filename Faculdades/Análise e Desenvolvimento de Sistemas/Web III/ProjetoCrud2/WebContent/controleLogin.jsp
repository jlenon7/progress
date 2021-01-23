<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="controller.LoginController"%>
<%@ page import="model.ClienteModel"%>
<%@ page import="model.FornecedorModel"%>
<%
	//Obtenção dos valores dos campos do formulário que submeteu para este arquivo
	HttpSession sessao = request.getSession();
	String login = request.getParameter("login");
	String senha = request.getParameter("senha");
	String tipoUsuario = request.getParameter("tipo-usuario");

	//Instância de um objeto da classe LoginController pra conseguir invocar o método de validação do login
	LoginController loginController = new LoginController();
	//Invocação do método de validação de login (retorno null ou, se está correto, um objeto)
	Object usuario = loginController.validarLogin(login, senha, tipoUsuario);

	//Se usuario não for nulo, ou seja, o retorno foi um objeto... posso logar a pessoa...
	if (usuario != null) {
		sessao.setAttribute("usuario", usuario);

		//Se o retorno for instância de ClienteModel, cria os respectivos cookies...
		//... e redireciona para a página clientes.jsp
		if (usuario instanceof ClienteModel) {
			Cookie cookie = new Cookie("nome", ((ClienteModel)usuario).getNome());
			response.addCookie(cookie);
			cookie = new Cookie("doc", ((ClienteModel)usuario).getCpf());
			response.addCookie(cookie);
			response.sendRedirect("clientes.jsp");
		}
		//Se o retorno NÃO for instância de ClienteModel (ou seja, é instância de FornecedorModel), cria os respectivos cookies...
		//... e redireciona para a página clientes.jsp
		else {
			Cookie cookie = new Cookie("nome", ((FornecedorModel)usuario).getNome());
			response.addCookie(cookie);
			cookie = new Cookie("doc", ((FornecedorModel)usuario).getCnpj());
			response.addCookie(cookie);
			response.sendRedirect("fornecedores.jsp");
		}
	} else {
		//Se caiu nesse else, é porque o retorno veio nulo. Logo, houve erro na digitação dos dados de login
		response.sendRedirect("telaLogin.jsp");
	}
%>