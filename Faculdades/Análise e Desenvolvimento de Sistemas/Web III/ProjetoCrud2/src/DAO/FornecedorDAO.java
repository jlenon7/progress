package DAO;

import java.util.ArrayList;
import java.util.List;

import model.ClienteModel;
import model.FornecedorModel;


public class FornecedorDAO {
	
	

	public FornecedorModel cadastrarPessoa( FornecedorModel fornecedor )
	{
		return fornecedor;
	}
	
	public FornecedorModel atualizarPessoa( FornecedorModel fornecedor )
	{
		return fornecedor;
	}
	
	public void removerPessoa( Long pessoaId )
	{
		
	}
	
	public List<FornecedorModel> consultarPessoas( String filtroCNPJ )
	{
		
		FornecedorModel pessoa1 = new FornecedorModel("044.345.324/0001-54", "Atlanta SA", "atlanta");
		FornecedorModel pessoa2 = new FornecedorModel("878.453.234/0001-65", "Foz Ltda", "foz");
		FornecedorModel pessoa3 = new FornecedorModel("234.763.434/0001-65", "XPTO SA", "xpto");
		FornecedorModel pessoa4 = new FornecedorModel("534.867.123/0001-98", "XYZ", "xyz");
		
		List<FornecedorModel> listaFornecedor = new ArrayList<FornecedorModel>();
		
		listaFornecedor.add(pessoa4);
		listaFornecedor.add(pessoa3);
		listaFornecedor.add(pessoa2);
		listaFornecedor.add(pessoa1);
		
		return listaFornecedor;
	}
	
	public FornecedorModel detalharPessoa( Long pessoaId )
	{
		return new FornecedorModel("333.443.565/0001-34", "XPTO SA", "xpto");
	}
	
	
}
