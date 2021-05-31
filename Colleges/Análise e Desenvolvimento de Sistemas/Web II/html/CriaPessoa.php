<?php
require_once "Pessoa.php";

class CriaPessoa{
	public function __construct(){
		$p=new Pessoa();
		$this->atribuiDados($p);
	}
	public function atribuiDados(Pessoa $p){
		$p->setNome ($_POST["nome"]);
		$p->setEmail ($_POST["email"]);
		$p->setTelefone ($_POST["telefone"]);
		$p->setNascimento ($_POST["nascimento"]);
		$p->setFoto ($_FILES["foto"]["name"]);
		$this->imprimirDados($p);
	}
    
    public function imprimirDados(Pessoa $p){
    	echo "Nome: " .$p->getNome;
    	echo "Email: ".$p->getEmail;
    	echo "Telefone: ".$p->getTelefone;
    	echo "Nascimento: ".$p->getNascimento;
    	echo "Foto: ".$p->getFoto;
    }
}
new CriaPessoa();
?>