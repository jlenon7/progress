package controller;

import java.util.List;

import DAO.ClienteDAO;
import DAO.FuncionarioDAO;
import model.ClienteModel;

public class ClienteController {
	private ClienteDAO dao = new ClienteDAO();


	public List<ClienteModel> listarClientes() {			
		List<ClienteModel> lista = dao.consultarPessoas(null);
		
		return lista;
	}
	
	public void salvarCliente(ClienteModel cliente) {
		dao.cadastrarPessoa(cliente);
	}
	
	public void alterarCliente(ClienteModel cliente) {
		dao.atualizarPessoa(cliente);
	}

	public ClienteModel buscarClientePorId(long id) {
		return dao.detalharPessoa(id);
	}

}
