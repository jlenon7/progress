package org.ProjetoFinal;

public interface Banco {
	
	public static final double saldoInicial = 0.00;
	
	abstract double sacar(double valor);
	abstract boolean depositar(double valor);
	abstract boolean verificaSenha(Conta conta);	
}