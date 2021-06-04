package DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.FuncionarioModel;

public class FuncionarioDAO {

	
	public List<FuncionarioModel> listarFuncionarios(){
		List listaFuncionarios = new ArrayList<>();
		
		try {
			Class.forName("org.postgresql.Driver");
			Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/exercicio_venda", "postgres", "bancodedados");
			
			Statement stmt = conn.createStatement();
			
			String sql = "SELECT id, nome, cpf FROM funcionario";
			ResultSet rs = stmt.executeQuery(sql);
			
			while(rs.next()) {
				FuncionarioModel func = new FuncionarioModel(rs.getLong(1),rs.getString(2),rs.getString(3));
				listaFuncionarios.add(func);
			}
			
			stmt.close();
			conn.close();
			
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
		
		return listaFuncionarios;
		
	}
	
	public FuncionarioModel buscaFuncionarioPorId(int id){
		FuncionarioModel func = new FuncionarioModel();
		
		try {
			Class.forName("org.postgresql.Driver");
			Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/exercicio_venda", "postgres", "bancodedados");
			
			Statement stmt = conn.createStatement();
			
			String sql = "SELECT id, nome, cpf FROM funcionario WHERE id=" + id;
			ResultSet rs = stmt.executeQuery(sql);
			
			
			rs.next();
			func.setId(rs.getLong(1));
			func.setNome(rs.getString(2));
			func.setCpf(rs.getString(3));
			
			stmt.close();
			conn.close();
			
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		
		
		return func;
		
	}
	public void excluirFuncionario(int id) {
		List listaFuncionarios = new ArrayList<>();
		
		try {
			Class.forName("org.postgresql.Driver");
			Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/exercicio_venda", "postgres", "bancodedados");
			
			Statement stmt = conn.createStatement();
			
			String sql = "DELETE FROM funcionario WHERE id=" + id;
			
			stmt.executeUpdate(sql);
			
			stmt.close();
			conn.close();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			System.out.println("Erro: " + e);
		}
	}
	
	public void inserirFuncionario(FuncionarioModel funcionario) {
		try {
			Class.forName("org.postgresql.Driver");
			Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/exercicio_venda", "postgres", "bancodedados");
			
			Statement stmt = conn.createStatement();
			
			stmt.executeUpdate("INSERT INTO funcionario (nome, cpf) VALUES ('"+funcionario.getNome()+"', '"+funcionario.getCpf()+"')");
		} catch (SQLException | ClassNotFoundException e) {
			System.out.println("Erro ao inserir registro:" + e);
			
		}
	}
	
	public void editarFuncionario(FuncionarioModel funcionario) {
		try {
			Class.forName("org.postgresql.Driver");
			Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/exercicio_venda", "postgres", "bancodedados");
			
			Statement stmt = conn.createStatement();
			
			 stmt.executeUpdate("UPDATE funcionario  SET nome ='" + funcionario.getNome()+ "', cpf = '" + funcionario.getCpf()+"' WHERE id = '"+funcionario.getId()+"'");
		} catch (Exception e) {
			System.out.println("Erro ao alterar registro: "+ e);
		}
	}
}
