<?php
include_once("./../connection/connection.php");

$email = $_POST['email'];
$password = $_POST['password'];

// Fetch user from the database
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $user['password'])) {
        echo json_encode(['status' => 'success', 'message' => 'Login successful!']);
        // Optionally, you can start a session here and store user info
        session_start();
        $_SESSION['user_id'] = $user['id'];
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Incorrect password.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No user found with that email address.']);
}

$stmt->close();
$conn->close();
?>

