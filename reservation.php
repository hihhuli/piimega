<?php

function getTimeString($day, $month, $year) {
    return date("Y-m-d", strtotime("$year-$month-$day"));
}

function select_date($day, $month, $year) {
    $d = getTimeString($day, $month, $year);
    try {
        $conn = new PDO("mysql:host=localhost;dbname=phptest", "omistaja", "omistaja");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT description FROM reservations WHERE reservation_date=:date");
        $stmt->bindParam(':date', $d);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC); 
        $result = reset(reset($stmt->fetchAll()));
        $conn = null;
    } catch(PDOException $e) {
        return "Connection failed: " . $e->getMessage();
    }
    return $result;
}

function insert_date($day, $month, $year, $description) {
    $d = getTimeString($day, $month, $year);
    try {
        $conn = new PDO("mysql:host=localhost;dbname=phptest", "omistaja", "omistaja");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("INSERT INTO reservations VALUES(:date, :description)");
        $stmt->bindParam(':date', $d);
        $stmt->bindParam(':description', $description);
        $stmt->execute();
        $conn = null;
        return "Success!";
    } catch(PDOException $e) {
        return "Connection failed: " . $e->getMessage();
    }
}

function update_date($day, $month, $year, $description) {
    $d = getTimeString($day, $month, $year);
    try {
        $conn = new PDO("mysql:host=localhost;dbname=phptest", "omistaja", "omistaja");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("UPDATE reservations SET description=:description WHERE reservation_date=:date");
        $stmt->bindParam(':date', $d);
        $stmt->bindParam(':description', $description);
        $stmt->execute();
        $conn = null;
        return "Success";
    } catch(PDOException $e) {
        return "Connection failed: " . $e->getMessage();
    }
    return $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $put);
    $day = $put['day'];
    $month = $put['month'];
    $year = $put['year'];
    $description = $put['description'];
    if (select_date($day, $month, $year) != FALSE) {
        echo update_date($day, $month, $year, $description);
    } else {
        echo insert_date($day, $month, $year, $description);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo select_date($_GET['day'], $_GET['month'], $_GET['year']);
}
?>