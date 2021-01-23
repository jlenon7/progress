<?php
require_once "Pessoa.php";

class criaPessoa{
	public function __construct(){
		$p=new Pessoa();
		atribuiDados($p);
	}
	public function atribuiDados(Pessoa $p){
		$p->nome=$_POST["nome"];
		$p->email=$_POST["email"];
		$p->telefone=$_POST["telefone"];
		$p->nascimento=$_POST["nascimento"];
		$p->foto=$_FILES["foto"]["name"];
	}
}
?>