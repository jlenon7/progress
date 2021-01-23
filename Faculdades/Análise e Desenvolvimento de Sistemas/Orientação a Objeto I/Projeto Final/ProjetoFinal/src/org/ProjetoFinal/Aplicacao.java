package org.ProjetoFinal;

import java.util.ArrayList;
import java.util.Scanner;

public class Aplicacao {

	public static void main(String[] args) {
			
		int opcao;
		int tipoConta;
		int tipoContaDeposito;
		int visualizar;
		
		//ArrayLists para guardar as informações das contas em objeto
		ArrayList<Conta> contaCorrente = new ArrayList();
		ArrayList<Conta> contaPoupanca = new ArrayList();
		ArrayList<Conta> contaSalario  = new ArrayList();
		ArrayList<Conta> contaEmpregador = new ArrayList();
		
		
		do {
			//Objeto da classe Scanner para leitura de dados
			Scanner entrada = new Scanner(System.in);
			
			//Menu principal da aplicação
			System.out.println("\n________________________");
			System.out.println("***** Sistema Bancário *****\n");
			System.out.println("-> 1. Cadastrar conta <-");
			System.out.println("-> 2. Depositar <-");
			System.out.println("-> 3. Sacar <-");
			System.out.println("-> 4. Mostrar contas <-");
			System.out.println("-> 0. Sair <-");
			
			//Leitura da opção escolhida no menu principal
			System.out.println("\nEscolha uma das opções: ");
			opcao = entrada.nextInt();
			
			// Estrutura para tratar a opção escolhida no menu principal
			switch(opcao) {
				case 1:
					System.out.println("Opção escolhida: 1\n");
					do {
						//Menu do cadastramento de contas
						System.out.println("Qual tipo de conta você deseja criar? ");
						System.out.println("1. Conta Corrente");
						System.out.println("2. Conta Poupança");
						System.out.println("3. Conta Salário");
						System.out.println("4. Conta Empregador");
						System.out.println("0. Sair");
						//Leitura da opção escolhida no menu de cadastramento de contas
						tipoConta = entrada.nextInt();
						if(tipoConta != 1 && tipoConta != 2 && tipoConta != 3 && tipoConta != 4) {
							System.out.println("Opção inválida. Tente novamente!");
						}
					//Enquanto a opção escolhida for diferente das opções dadas,
					//será perguntado novamente a opção desejada	
					}while(tipoConta != 1 && tipoConta != 2 && tipoConta != 3 && tipoConta != 4);
					
					switch (tipoConta) {
						case 1:
							
							//Cria um objeto da Classe conta corrente
							Conta_Corrente cc = new Conta_Corrente();
							//O método dados solicita a entrada das informações do cliente
							//e adiciona os dados em um objeto, e depos inclui no ArrayList respectivo
							dados(cc, contaCorrente, tipoConta);
						break;
						case 2:
							//Cria um objeto da Classe conta poupança
							Conta_Poupanca pp = new Conta_Poupanca();
							dados(pp, contaPoupanca, tipoConta);
						break;	
						case 3:			
							//Cria um objeto da Classe conta salario
							Conta_Salario cs = new Conta_Salario();
							dados(cs, contaSalario, tipoConta);
						break;
						case 4:
							//Cria um objeto da Classe conta empregador
							Empregador ce = new Empregador();
							dados(ce, contaEmpregador, tipoConta);
						break;
						
						default:
							System.out.println("Opção inválida!");
						break;
					}			
					break;
					
				case 2:
					
					do {
						//Menu de depósito
						System.out.println("Em qual tipo de conta você quer depositar? ");
						System.out.println("1. Conta Corrente");
						System.out.println("2. Conta Poupança");
						System.out.println("3. Conta Salário");
						System.out.println("4. Conta Empregador");
						//Leitura da opção escolhida no menu de depósito
						tipoContaDeposito = entrada.nextInt();
						if(tipoContaDeposito != 1 && tipoContaDeposito != 2 && tipoContaDeposito != 3 && tipoContaDeposito != 4) {
							System.out.println("Opção inválida. Tente novamente!");
						}
					//Enquanto a opção escolhida for diferente das opções dadas,
					//será perguntado novamente a opção desejada	
					}while(tipoContaDeposito != 1 && tipoContaDeposito != 2 && tipoContaDeposito != 3 && tipoContaDeposito != 4);
					
					System.out.println("Em qual conta você quer depositar?");
					String conta = entrada.next();
					
					if(tipoContaDeposito == 1) {
						//O método verificaConta verifica se a conta existe
						if(verificaConta(contaCorrente, tipoContaDeposito, conta)) {
							Conta_Corrente cc = new Conta_Corrente();
							//Se a conta existe, realiza o depósito
							realizaDeposito(cc, contaCorrente, tipoContaDeposito, conta);
						}
					}
					else 
						if(tipoContaDeposito == 2) 	
							if(verificaConta(contaPoupanca, tipoContaDeposito, conta)) {
								Conta_Poupanca pp = new Conta_Poupanca(); 
								realizaDeposito(pp, contaPoupanca, tipoContaDeposito, conta);
							}
					else 
						if(tipoContaDeposito == 3)
							System.out.println("Chegou aqui....");
							if(verificaConta(contaSalario, tipoContaDeposito, conta)) {
								System.out.println("De qual conta desejas depositar?");
								String contaEmp = entrada.next();
								if(verificaEmpregador(contaEmpregador, contaEmp)) {
									Conta_Salario cs = new Conta_Salario(); 
									realizaDeposito(cs, contaSalario, tipoContaDeposito, conta);
								}
								else {
									System.out.println("É necessário ser empregador para depositar em uma conta salário!");
								}
							}
					else 
						if(tipoContaDeposito == 4) 	
							if(verificaConta(contaEmpregador, tipoContaDeposito, conta)) {
								Empregador ee = new Empregador(); 
									realizaDeposito(ee, contaEmpregador, tipoContaDeposito, conta);
							}		
				break;
				case 4:

					do {
						//Menu de Impressão de contas
						System.out.println("Qual tipo de conta você quer visualizar? ");
						System.out.println("1. Conta Corrente");
						System.out.println("2. Conta Poupança");
						System.out.println("3. Conta Salário");
						System.out.println("4. Conta Empregador");
						System.out.println("0. Voltar");
						//Leitura da opção escolhida no menu de depósito
						visualizar = entrada.nextInt();
						if(visualizar != 1 && visualizar != 2 && visualizar != 3 && visualizar != 4) {
							System.out.println("Opção inválida. Tente novamente!");
						}
						//Enquanto a opção escolhida for diferente das opções dadas,
						//será perguntado novamente a opção desejada	
					}while(visualizar != 1 && visualizar != 2 && visualizar != 3 && visualizar != 4);
					if(visualizar == 1) {
						imprimeDados(contaCorrente, visualizar);
					}
					else if(visualizar == 2) {
						imprimeDados(contaPoupanca, visualizar);
					}
					else if(visualizar == 3) {
						imprimeDados(contaSalario, visualizar);
					}
					else if(visualizar == 4) {
						imprimeDados(contaEmpregador, visualizar);
					}
					break;
				case 0:
					System.out.println("*** Obrigado. Volte sempre! ***");
					break;
					
				default:
					System.out.println("\n*** Opção inválida! ***\n");
					break;
			}
			
		}while(opcao != 0);
	}
	
	public static void imprimeDados(ArrayList<Conta> c, int v) {
		if(c.size() > 0) {
			for(int i = 0; i < c.size(); i++) {
				System.out.println("*** Dados do cliente " + c.get(i).getNomeTitular());
				System.out.println("Titular: " + c.get(i).getNomeTitular());
				System.out.println("Conta: " + c.get(i).getNumeroConta());
				if(v != 3 && v != 4) {
					//System.out.println("Saldo: " + c.get(i).getSaldoAtual());
				}
				System.out.println("________________________________");
				System.out.println(".");
			}
		}
	}
	//VERIFICA SE A CONTA EXISTE
	public static boolean verificaConta(ArrayList<Conta> c, int tipoConta, String numeroConta) {
		boolean achou = false; 
		if(c.size() > 0) {
			for(int i = 0; i < c.size(); i ++) {
				if(numeroConta.equals(c.get(i).getNumeroConta())) {
					achou = true;
					System.out.println("Número conta: " + c.get(i).getNumeroConta());
				}
			}
			if(achou) {
				System.out.println("Conta encontrada!");
				return true;
			}
			else {
				System.out.println("Conta não encontrada!");
				return false;
			}
		}
		else {
			System.out.println("Não há contas cadastradas!");
			return false;
		}
	}
	
	public static boolean verificaEmpregador(ArrayList<Conta> c, String numeroConta) {
			
		for(int i = 0; i < c.size(); i++) {
			if(numeroConta.equals(c.get(i).getNumeroConta())) {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	}
	
	public static void realizaDeposito(Conta conta, ArrayList<Conta> c, int tipoConta, String numeroConta) {
		Scanner e = new Scanner(System.in);
		System.out.println("Qual valor você quer depositar?");
		double valor = e.nextDouble();
		for(int i = 0; i < c.size(); i++) {
			if(numeroConta.equals(c.get(i).getNumeroConta())) {
				//Recuperando dados do ArrayList
				String titular = c.get(i).getNomeTitular();
				String numConta = c.get(i).getNumeroConta();
				double saldo = c.get(i).getSaldoAtual();
				String senha = c.get(i).getSenha();
				String agencia = c.get(i).getAgencia();
				String banco = c.get(i).getBanco();
				String operacao = c.get(i).getOperacao();
				
				//Setando valores no objeto conta
				conta.setNomeTitular(titular);
				conta.setNumeroConta(numConta);
				conta.setSaldoAtual(saldo);
				conta.setarSenha(senha);
				conta.setAgencia(agencia);
				conta.setBanco(banco);
				
				if(conta.depositar(valor)) {
					System.out.println("Depositou com sucesso!");
				}
				else {
					System.out.println("Erro ao depositar!");
				}
				System.out.println("*** Conta do tipo: " + c.get(i).getTipoConta() + "***");
				System.out.println("Titular: " + conta.getNomeTitular() + ", saldo: R$ " + conta.getSaldoAtual());
				c.remove(i);
			}
		}
		System.out.println("Titular ...:" + conta.getNomeTitular());
		c.add(conta);	
	}
	public static void dados(Conta cc, ArrayList<Conta> a, int tipoConta) {
		int opcao;
		String nomeTitular; 
		int qtdeCaracteres;
		int depositar;
		double valorDepositar;
		int erro;
		
		Scanner entrada = new Scanner(System.in);
		Scanner nome = new Scanner(System.in);
		
		//Seta no objeto cc o tipo de conta escolhida anteriormente
		cc.setTipoConta(tipoConta);
		//Leitura do nome do titular da conta
		System.out.println("Qual o seu nome? ");
		nomeTitular = nome.nextLine();
		cc.setNomeTitular(nomeTitular);
		//Seta o tipo de operacao
		//Quando for conta corrente será 001
		//Quando for poupança será 002
		cc.setOperacao();
		//Gera um número de conta automaticamente e seta no objeto
		cc.criaNumeroConta(); // Cria e seta um número de conta
		do {
			//Cadastramento da senha
			System.out.println("Informe uma senha: (mínimo de 6 caracteres)");
			//Quantidade mínima de caracteres na senha
			qtdeCaracteres = 6;
			//A variável erro verifica se ocorreu algum erro ao setar a senha
			erro = 0;
			/*
			 	A funcão setSenha faz a leitura e a verificação da senha
			 */
			if(cc.setSenha(qtdeCaracteres))
				//Se não ocorreu problemas, a variável erro recebe valor 1
				erro = 1;
		//Enquanto a variável erro for igual a 0 (com erros)
		//será solicitado a digitação da senha
		}while(erro == 0);
			if(tipoConta != 3) {
					do {
						/*
							Verificação para depósito de valor inicial na conta recém-criada
						*/
						System.out.println("Você quer depositar algum valor? (0 - NÃO / 1 - SIM)");
						depositar = entrada.nextInt();
						if(depositar == 1) {
							valorDepositar = 0;
							//Leitura do valor a ser depositado
							System.out.println("Informe o valor a ser depositado: ");
							valorDepositar = entrada.nextDouble();
							if(cc.depositar(valorDepositar)) {
								/*
								 	Caso o depósito tenha ocorrido com sucesso, 
									será retornada uma mensagem de confirmação e o 
									valor atual
								*/
								System.out.println("Valor depositado com sucesso!");
								System.out.println("Seu saldo atual é: R$ " + cc.getSaldoAtual());
							}
							else
								/*
								  	Caso haja algum erro ao depositar, será retornado 
								  	essa mensagem de erro
								 */
								System.out.println("Erro as realizar depósito!");
						}
						else if(depositar == 0) {
							//Caso não haja depósito inicial, o valor será igual a zero
							System.out.println("Seu saldo inicial é igual a zero!");
						}
						else {
							System.out.println("A opção escolhida é inválida! Tente novamente!");
						}
				}while(depositar != 0 && depositar != 1);
			}
			//Adiciona o objeto no ArrayList
			a.add(cc);
			cc.imprimeDados(a);
	}
}
