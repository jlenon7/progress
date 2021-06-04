<%@page import="controller.FuncionarioController"%>
<%@page import="model.FuncionarioModel" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%@ page import="model.ClienteModel" %>
<%@page import="controller.ClienteController"%>
 <%
 
 String acao = request.getParameter("acao");
 
 if(acao.equals("incluirCliente")){
	 //Coletando valores do formulário
	 String nome = request.getParameter("nome");
	 String cpf = request.getParameter("cpf");
	 String login = request.getParameter("login");
	 String senha = request.getParameter("senha");
	 //Criando um novo objeto de Cliente e alimentando com os valores do form
	 ClienteModel cliente = new ClienteModel();
	 cliente.setNome(nome);
	 cliente.setCpf(cpf);
	 cliente.setLogin(login);
	 cliente.setSenha(senha);
	 ClienteController clienteCont = new ClienteController();
	 clienteCont.salvarCliente(cliente);
	 response.sendRedirect("clientes.jsp");
 }
 else
	 if(acao.equals("incluirFornecedor")){
		 
	 }
	 else
		 if(acao.equals("editarCliente")){
			 //Coletando valores do formulário
			 String id = request.getParameter("id");
			 String nome = request.getParameter("nome");
			 String cpf = request.getParameter("cpf");
			 String login = request.getParameter("login");
			 String senha = request.getParameter("senha");
			 //Criando um novo objeto de Cliente e alimentando com os valores do form
			 ClienteModel cliente = new ClienteModel();
			 cliente.setId(Long.parseLong(id));
			 cliente.setNome(nome);
			 cliente.setCpf(cpf);
			 cliente.setLogin(login);
			 cliente.setSenha(senha);
			 ClienteController clienteCont = new ClienteController();
			 clienteCont.alterarCliente(cliente);
			 response.sendRedirect("clientes.jsp");
		 }
		 else
			 if(acao.equals("editarFornecedor")){
				 
			 }
			 else
				 if(acao.equals("excluirCliente")){
					 
				 }
				 else
					 if(acao.equals("excluirFornecedor")){
						 
					 }
					 else
						 if(acao.equals("excluirFuncionario")){
							 int id = Integer.parseInt(request.getParameter("id"));
							 FuncionarioController funcCont = new FuncionarioController();
							 funcCont.excluirFuncionario(id);
							 response.sendRedirect("funcionarios.jsp");
						 }else if (acao.equals("incluirFuncionario")){
							 FuncionarioController funcController = new FuncionarioController();
							 String nome = request.getParameter("nome");
							 String cpf = request.getParameter("cpf");
							 FuncionarioModel funcionario = new FuncionarioModel(nome, cpf);
							 funcController.inserirFuncionario(funcionario);
							 
							 response.sendRedirect("funcionarios.jsp");
						 } else if (acao.equals("editarFuncionario")){
							 Long id = Long.parseLong(request.getParameter("id"));
							 FuncionarioController funcCont = new FuncionarioController();
							 String nome = request.getParameter("nome");
							 String cpf = request.getParameter("cpf");
							 FuncionarioModel funcionario = new FuncionarioModel(id, nome, cpf);
							 funcCont.editarFuncionario(funcionario);
							 
							 response.sendRedirect("funcionarios.jsp");
							 
							 
						 }
	 
 
 %>