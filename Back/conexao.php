<?php
$host = "localhost";
$usuario = "root";
$senha = ""; 
$banconome = "studypack";

$conexao = mysqli_connect($host, $usuario, $senha, $banconome);

if (!$conexao) {
    die("Deu coiso se liga ->: " . mysqli_connect_error());
}
echo"deu bom chefe";
?>