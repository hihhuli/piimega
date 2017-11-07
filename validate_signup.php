<?php 
function check_name($name) {
    $errors= array();
    if (strlen($name) < 2) {
        $errors[] = "Name must be at least 2 characters long!";
    }

    return $errors;
}

function check_email($email) {
    $errors= array();
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email is not valid!";
    }

    return $errors;
}

function check_password($pwd, $pwd_again) {
    $errors= array();
    if (strlen($pwd) < 8) {
        $errors[] = "Password must be at least 8 characters! long";
    }
    if (!preg_match("#[0-9]+#", $pwd)) {
        $errors[] = "Password must include at least one number!";
    }
    if (!preg_match("#[^A-Za-z0-9]+#", $pwd)) {
        $errors[] = "Password must include at least one special character!";
    }
    if ($pwd !== $pwd_again) {
        $errors[] = "Passwords do not match!";
    }
    
    return $errors;
}

if (isset($_POST['signup'])) {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_again = $_POST['password_again'];

    $errors = array();
    $errors = array_merge($errors, check_name($first_name));
    $errors = array_merge($errors, check_name($last_name));
    $errors = array_merge($errors, check_email($email));
    $errors = array_merge($errors, check_password($password, $password_again));

    if (empty($errors) === true) { 
        echo "Signup information valid!";
    } else {
        echo implode("<br>", $errors);
    }
}
?>