<?php 
if (isset($_POST['submit'])) {
    $to = "mitusalmi@gmail.com";
    $from = $_POST['email'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $subject = $_POST['subject'];
    $subject_copy = "Copy: " . $subject;
    $message = $_POST['message'];
    
    $headers = "From:" . $from;
    $headers_copy = "From:" . $to;
    mail($to, $subject, $message, $headers);
    mail($from, $subject_copy, $message, $headers_copy);
    echo "Mail Sent. Thank you " . $first_name . ", we'll be in touch!";
}
?>