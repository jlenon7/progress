package Exercicio04.org;

import java.util.ArrayList;
import java.util.List;

public class PessoaService{

	public List<Pessoa> listarPessoas() {
		
		Pessoa pessoa1 = new Pessoa();
		Pessoa pessoa2 = new Pessoa();
		Pessoa pessoa3 = new Pessoa();
		
		List<Pessoa> lista = new ArrayList();
		
		pessoa1.setNome("Adryell");
		pessoa1.setIdade(18);
		
		pessoa2.setNome("Maria");
		pessoa2.setIdade(54);
		
		pessoa3.setNome("Antonio");
		pessoa3.setIdade(42);
		
		lista.add(pessoa1);
		lista.add(pessoa2);
		lista.add(pessoa3);
		
		return lista;
	}
	
	
}
