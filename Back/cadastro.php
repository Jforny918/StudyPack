<?php
include('conexao.php');

if (isset($_POST['cadastro'])) {
   $nome = $_POST['nome'];
   $email = $_POST['email'];
   $senha = $_POST['senha']; //adicionar md5 depois
   $telefone = $_POST['telefone'];
   $data_nasc = $_POST['data_nasc'];
   $genero = $_POST['sexo'];

   $verificaEmail = $conexao->query("SELECT email FROM usuario WHERE email = '$email'");

   if ($verificaEmail->num_rows > 0) {
      echo "Email já cadastrado";
   } else {
      $conexao->query("INSERT INTO usuario(nome, email, senha, telefone, data_nasc, genero) VALUES ('$nome', '$email', '$senha', '$telefone', '$data_nasc', '$genero')");
      //$SQL = "INSERT INTO usuario(nome, email, senha, telefone, data_nasc, genero) VALUES ('$nome', '$email', '$senha', '$telefone', '$data_nasc', '$genero')";
      header("location: /StudyPack/Front/HTML/index.html");
   }
   exit();
}

if (isset($_POST['login'])) {
   $email = $_POST['email'];
   $senha = $_POST['senha'];

   $verificaEmail = $conexao->query("SELECT * FROM usuario WHERE email = '$email'");

   if ($verificaEmail->num_rows > 0) {
      $usuario = $verificaEmail->fetch_assoc();

      if ($usuario["senha"] === $senha) {
         header("location: /StudyPack/Front/HTML/index.html");
      } else {
         header("location: /StudyPack/Front/HTML/login.html");
      }
   } else {
      header("location: /StudyPack/Front/HTML/cadastro.html");
   }
   exit();
}

?>