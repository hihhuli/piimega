<?php
$servername = "localhost";
$username = "omistaja";
$password = "omistaja";

try {
    $conn = new PDO("mysql:host=$servername;dbname=phptest", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
$conn = null; 
?>