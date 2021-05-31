package org.ProjetoFinal;

public class Conta_Poupanca extends Conta{

	@Override
	public double getSaldoAtual() {
		// TODO Auto-generated method stub
		return super.getSaldoAtual();
	}

	@Override
	public void setSaldoAtual(double saldoAtual) {
		// TODO Auto-generated method stub
		super.setSaldoAtual(saldoAtual);
	}

	@Override
	public double sacar(double valor) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean depositar(double valor) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public boolean verificaSenha(Conta con) {
		// TODO Auto-generated method stub
		return false;
	}

	
}