<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	HttpSession sessao = request.getSession();
	Object usuarioLogado = (Object) sessao.getAttribute("usuario");
	
	if(usuarioLogado == null) {
		response.sendRedirect("telaLogin.jsp");
	}
%>