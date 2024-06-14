<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// CORS headers for allowing cross-origin requests (adjust as per your requirements)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// JSON response header
header('Content-Type: application/json');

// Handle POST request from Angular
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    // Validate input
    $email = filter_var($request->email, FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars($request->subject);
    $message = htmlspecialchars($request->message);

    if ($email && $subject && $message) {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'geldiallaal@gmail.com'; // Replace with your Gmail address
            $mail->Password = 'geldigeldi2024'; // Replace with your app-specific password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            // Recipients
            $mail->setFrom('geldiallaal@gmail.com', 'geldi'); // Replace with your Gmail address and name
            $mail->addAddress($email);

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $message;

            // Send email
            $mail->send();

            // Success response
            http_response_code(200);
            echo json_encode(array('message' => 'Email sent successfully'));
        } catch (Exception $e) {
            // Error response
            http_response_code(500);
            echo json_encode(array('message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo));
        }
    } else {
        // Invalid input response
        http_response_code(400);
        echo json_encode(array('message' => 'Invalid input'));
    }
} else {
    // Method not allowed response
    http_response_code(405);
    echo json_encode(array('message' => 'Method Not Allowed'));
}
?>
