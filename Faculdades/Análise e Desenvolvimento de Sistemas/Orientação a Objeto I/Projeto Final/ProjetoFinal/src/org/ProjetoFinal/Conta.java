package org.ProjetoFinal;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

public abstract class Conta implements Banco{

	
	private String banco = "IFPR";
	private String agencia = "1717";
	private String operacao;
	private String numeroConta;
	private String nomeTitular;
	private String senha;
	private double saldoAtual;
	private int tipoConta;
	
	public String getBanco() {
		return banco;
	}
	public void setBanco(String b) {
		this.banco = b;
	}
	public String getAgencia() {
		return agencia;
	}
	public void setAgencia(String agencia) {
		this.agencia = agencia;
	}
	public String getOperacao() {
		return operacao;
	}
	public void setOperacao() {
		if(this.getTipoConta() == 1)
			this.operacao = "001"; // Conta Corrente
		else if(this.getTipoConta() == 2)
			this.operacao = "002"; // Conta Poupança
		else if(this.getTipoConta() == 3)
			this.operacao = "003"; // Conta Salário
		else if(this.getTipoConta() == 4) {
			this.operacao = "004"; //Conta Empregador
		}
		else {
			this.operacao = "Operação Inválida!";
		}
	}
	public String getNumeroConta() {
		return numeroConta;
	}
	public void criaNumeroConta() {
		Random r = new Random();
		int numeros = r.nextInt(5000);
		//String numeros[] = {"12345","235414","124545","541215","541235","456148","129584","126599",
		//		"6565655","211845","854548","4545415","123154","1548541"};
		//int qnt = numeros.length;
		//String conta = numeros[r.nextInt(qnt)];
		String conta = Integer.toString(numeros);
		setNumeroConta(conta);
	}
	public void imprimeDados(ArrayList<Conta> c) {
		int tamanho = c.size();
		if(tamanho > 0) {
			for(int i = 0; i < tamanho; i++) {
				System.out.println("\n*** Dados do cliente " + c.get(i).getNomeTitular() + " ***");
				System.out.println("Banco: " + c.get(i).getBanco());
				System.out.println("Agencia: " + c.get(i).getAgencia());
				System.out.println("Nome do Titular: " + c.get(i).getNomeTitular());
				System.out.println("Numero da Conta: " + c.get(i).getNumeroConta());
				System.out.println("Saldo: "+c.get(i).getSaldoAtual());
				if (getTipoConta() == 1) {
					System.out.println("Tipo de Conta: Conta Corrente");
				}
				else if (getTipoConta() == 2) {
					System.out.println("Tipo de Conta: Conta Poupança");
				}
				else if (getTipoConta() == 3) {
					System.out.println("Tipo de Conta: Conta Salário");
				}
				else if (getTipoConta() == 4) {
					System.out.println("Tipo de Conta: Conta Empregador");
				}
			}
		}
	}
	public boolean verificaCadastro(Conta c) {
		
		return false;
	}
	public String getNomeTitular() {
		return nomeTitular;
	}
	public void setNomeTitular(String nomeTitular) {
		this.nomeTitular = nomeTitular;
	}
	public String getSenha() {
		return senha;
	}
	public void setarSenha(String s) {
		this.senha = s;
	}
	public boolean setSenha(int qtdeCaracteres) {
		Scanner entrada = new Scanner(System.in);
		String senha = entrada.next();
		if(senha.length() < qtdeCaracteres) {
			System.out.println("Senha com menos de " + qtdeCaracteres + " caracteres!");
			return false;
		}
		else {
			this.senha = senha;
			return true;
		}
	}
	public double getSaldoAtual() {
		return this.saldoAtual;
	}
	public void setSaldoAtual(double saldoAtual) {
		this.saldoAtual = saldoAtual;
	}
	public int getTipoConta() {
		return tipoConta;
	}
	public void setTipoConta(int tipoConta) {
		this.tipoConta = tipoConta;
	}
	public void setNumeroConta(String numero) {
		this.numeroConta = numero;
	}
	
}
