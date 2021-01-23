package controller;

import java.util.List;

import DAO.FuncionarioDAO;
import model.FuncionarioModel;

public class FuncionarioController {
	
	private FuncionarioDAO daoFuncionario = new FuncionarioDAO(); 
	
	public List listarFuncionarios() {
		return daoFuncionario.listarFuncionarios();
	}
	public FuncionarioModel buscarFuncPorId(int id) {
		FuncionarioDAO dao = new FuncionarioDAO();
		return dao.buscaFuncionarioPorId(id);
	}
	
	public void excluirFuncionario(int id) {
		daoFuncionario.excluirFuncionario(id);
	}
	
	public void inserirFuncionario(FuncionarioModel funcionario) {
		daoFuncionario.inserirFuncionario(funcionario);
	}
	
	public void editarFuncionario(FuncionarioModel funcionario) {
		daoFuncionario.editarFuncionario(funcionario);
	}
}	
