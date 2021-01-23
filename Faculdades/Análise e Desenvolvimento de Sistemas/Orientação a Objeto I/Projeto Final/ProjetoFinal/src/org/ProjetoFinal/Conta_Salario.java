package org.ProjetoFinal;

public class Conta_Salario extends Conta{
	private String empregador;
	
	public double sacar(double valor) {
		if(verificaSenha(this) == true) {
			if(getSaldoAtual() > 0 && getSaldoAtual() > valor) {
				
			}
		}
		else
			System.out.println("Senha Incorreta!");
		return 0;
	}

	public String getEmpregador() {
		return empregador;
	}

	public void setEmpregador(String empregador) {
		this.empregador = empregador;
	}
	

	public boolean depositar(double valor) {
		if(valor > 0) {
			setSaldoAtual(getSaldoAtual() + valor);
			return true;
		}
		else
			return false;
	}

	@Override
	public boolean verificaSenha(Conta conta) {
		// TODO Auto-generated method stub
		return false;
	}

	
	
}