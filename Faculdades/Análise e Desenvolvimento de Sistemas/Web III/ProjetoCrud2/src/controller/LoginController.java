package controller;

import model.ClienteModel;
import model.FornecedorModel;

public class LoginController {

	public Object validarLogin(String login, String senha, String tipo) {
		if(tipo.equals("fornecedor") && login.equals("fornecedor") && senha.equals("fornecedor")) {
			FornecedorModel usuario = new FornecedorModel();
			usuario.setNome("Fulano");
			usuario.setCnpj("CNPJ00000");
			return usuario;
		}else
			if(tipo.equals("cliente") && login.equals("cliente") && senha.equals("cliente")) {
				ClienteModel usuario = new ClienteModel();
				usuario.setNome("Fulano");
				usuario.setCpf("CPF00000");
				return usuario;
			}
		
		//Dados não bateram... retorna nulo
		return null;
	}

}
