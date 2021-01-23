package model;

public class FornecedorModel extends PessoaModel {

	private String cnpj;


	public FornecedorModel(String cnpj, String nome, String login)
	{
		this.cnpj = cnpj;
		super.setNome(nome);
		super.setLogin(login);
		
	}

	public FornecedorModel() {
		
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
}
