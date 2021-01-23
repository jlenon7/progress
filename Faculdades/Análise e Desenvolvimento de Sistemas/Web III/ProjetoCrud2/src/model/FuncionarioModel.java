package model;

import java.util.List;

import DAO.FuncionarioDAO;

public class FuncionarioModel extends PessoaModel{
	
	private String cpf;
	
	public FuncionarioModel() {
		
	}
	
	public FuncionarioModel(String nome, String cpf) {
		super.setNome(nome);
		this.cpf = cpf;
	}
	
	public FuncionarioModel(Long id, String nome, String cpf) {
		super();
		super.setNome(nome);
		super.setId(id);
		this.cpf = cpf;
	}
	public FuncionarioModel buscarFuncPorId(int id) {
		FuncionarioDAO dao = new FuncionarioDAO();
		return dao.buscaFuncionarioPorId(id);
	}
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
}
