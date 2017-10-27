<?php
if (isset($_FILES['image'])) {
    $errors= array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));
    $extensions = array("jpeg", "jpg", "png", "gif");
       
    if (in_array($file_ext, $extensions) === false ){
        $errors[] = "Extension not allowed, please choose a JPEG or PNG file";
    }
    if ($file_size > 2097152) {
        $errors[] = "File size must not exceed 2 MB";
    }
       
    if (empty($errors) === true) {
        move_uploaded_file($file_tmp, "uploads/images/".$file_name);
        echo "File uploaded successfully!";
    } else {
        echo implode("<br>", $errors);
    }
}
?>