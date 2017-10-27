<?php
$servername = "localhost";
$username = "omistaja";
$password = "omistaja";

try {
    $conn = new PDO("mysql:host=$servername;dbname=phptest", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT LastName, FirstName, Address, City FROM Persons");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    $result = $stmt->fetchAll();
    foreach( $result as $row ) {
        echo implode(", ", array_values($row)) . "<br>";
    }
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
$conn = null; 
?>