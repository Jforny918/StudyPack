<?php
include('conexao.php');




if(isset($_POST['registro'])){
   $nome = $_POST['nome'];
   $email = $_POST['email'];
   $senha =(md5( $_POST['senha']));
   $telefone = $_POST['telefone'];
   $data_nasc = $_POST['data_nasc'];
   $genero = $_POST['sexo'];
   
   $verificaEmail = $conexao->query("SELECT email FROM usuario WHERE email = '$email'");
   
   if($verificaEmail->num_rows > 0){
      echo"Email já cadastrado";
   }else{
      $conexao->query("INSERT INTO usuario(nome, email, senha, telefone, data_nasc, genero) VALUES ('$nome', '$email', '$senha', '$telefone', '$data_nasc', '$genero')");
      //$SQL = "INSERT INTO usuario(nome, email, senha, telefone, data_nasc, genero) VALUES ('$nome', '$email', '$senha', '$telefone', '$data_nasc', '$genero')";
      header("location: \StudyPack\Front\HTML\index.html");
   }  
}
?>
