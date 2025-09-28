<?php
$host = "localhost";
$usuario = "root";
$senha = ""; 
$banconome = "studypackpess";
$port = 3307;

$conexao = mysqli_connect($host, $user, $password, $dbname, $port);

if (!$conn) {
    die("Deu coiso se liga ->: " . mysqli_connect_error());
}
?>