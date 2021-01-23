package model;



public class ClienteModel extends PessoaModel {

	private String cpf;

	
	public ClienteModel(String cpf, String nome, String login)
	{
		this.cpf = cpf;
		super.setNome(nome);
		super.setLogin(login);
		
	}
	
	
	
	public ClienteModel() {
		
	}
	
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	
}
