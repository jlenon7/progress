package DAO;

import java.util.ArrayList;
import java.util.List;

import model.ClienteModel;


public class ClienteDAO {
	
	

	public ClienteModel cadastrarPessoa( ClienteModel cliente )
	{
		return cliente;
	}
	
	public ClienteModel atualizarPessoa( ClienteModel cliente )
	{
		return cliente;
	}
	
	public void removerPessoa( Long pessoaId )
	{
		
	}
	
	public List<ClienteModel> consultarPessoas( String filtroCPF )
	{
		
		ClienteModel pessoa1 = new ClienteModel("044.345.324-54", "Pedro", "pedro");
		ClienteModel pessoa2 = new ClienteModel("878.453.234-65", "Antonio", "antonio");
		ClienteModel pessoa3 = new ClienteModel("234.763.434-65", "José", "jose");
		ClienteModel pessoa4 = new ClienteModel("534.867.123-98", "Augusto", "augusto");
		
		List<ClienteModel> listaCliente = new ArrayList<ClienteModel>();
		
		listaCliente.add(pessoa4);
		listaCliente.add(pessoa3);
		listaCliente.add(pessoa2);
		listaCliente.add(pessoa1);
		
		return listaCliente;
	}
	
	public ClienteModel detalharPessoa( Long pessoaId )
	{
		return new ClienteModel("333.443.565-34", "Pedro", "pedro");
	}
	
	
}
