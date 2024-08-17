<?php
include_once("./../connection/connection.php");
// Get data from POST request
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password before storing it
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Insert data into the database
$sql = "INSERT INTO users (email, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Registration successful!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();

?>