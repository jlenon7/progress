package org.ProjetoFinal;


public class Conta_Corrente extends Conta{
		public double saldoAtual;
			
		public double getSaldoAtual() {
			return saldoAtual;
		}


		public void setSaldoAtual(double saldoAtual) {
			this.saldoAtual = saldoAtual;
		}


		public double sacar(double valor) {
			if(verificaSenha(this) == true) {
				if(getSaldoAtual() > 0 && getSaldoAtual() > valor) {
					
				}
			}
			else
				System.out.println("Senha Incorreta!");
			return 0;
		}

		
		public boolean depositar(double valor) {
			if(valor > 0) {
				setSaldoAtual(getSaldoAtual() + valor);
				return true;
			}
			else
				return false;
		}

		public double verificaSaldo(Conta_Corrente c) {
			return saldoAtual;
		}


		public boolean verificaSenha(Conta con) {
			return false;
		}

		public String buscaCliente(Conta c) {
			return null;
		}
}
