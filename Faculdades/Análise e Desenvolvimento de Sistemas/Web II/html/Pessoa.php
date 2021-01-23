<?php

class Pessoa {
	public $nome;
	public $nascimento;
	public $telefone;
	public $email;
	public $foto;

	public function getNome(){
    	return $this -> nome;
	}

	public function setNome(){
		$this -> nome = $nome;
	}

	public function getNascimento(){
    	return $this -> nascimento;
	}

	public function setNascimento(){
		$this -> nome = $nascimento;
	}

	public function getEmail(){
    	return $this -> email;
	}

	public function setEmail(){
		$this -> nome = $email;
	}

	public function getTelefone(){
    	return $this -> telefone;
	}

	public function setTelefone(){
		$this -> nome = $telefone;
	}

	public function getFoto(){
    	return $this -> foto;
	}

	public function setFoto(){
		$this -> nome = $foto;
	}
}

/* class Pessoa {
	public $nome;
	public $nascimento;
	public $email;
	public $foto;

	public function dadosPessoa (Pessoa $p) {
		//Criando dados
		$p->nome=$_POST["nome"];
		$p->nascimento=$_POST["nascimento"];
		$p->telefone=$_POST["telefone"];
		$p->email=$_POST["email"];
		$p->foto=$_FILES["foto"]["name"];
		//Imprimir dados

		echo "<br>Nome da pessoa: ".$p->nome;
		echo "<br>Nascimento da pessoa: ".$p->nascimento;
		echo "<br>Telefone da pessoa: ".$p->telefone;
		echo "<br>E-mail da pessoa: ".$p->email;
		echo "<br>Foto da pessoa: ".$p->foto;
	}
}

$p = new Pessoa();
$p -> dadosPessoa($p);
*/

?>