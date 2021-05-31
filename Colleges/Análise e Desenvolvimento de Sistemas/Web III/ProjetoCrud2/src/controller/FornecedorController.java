package controller;

import java.util.List;

import DAO.FornecedorDAO;
import model.FornecedorModel;

public class FornecedorController {
	FornecedorDAO dao = new FornecedorDAO();

	public List<FornecedorModel> listarFornecedores() {
		List<FornecedorModel> lista = dao.consultarPessoas(null);
		return lista;
	}



}
