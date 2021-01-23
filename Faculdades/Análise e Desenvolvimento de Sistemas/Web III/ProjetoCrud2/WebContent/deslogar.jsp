<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
	HttpSession sessao = request.getSession();
	sessao.removeAttribute("usuario");
	response.sendRedirect("telaLogin.jsp");
%>