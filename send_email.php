<?php
// Set header untuk JSON response
header('Content-Type: application/json');

// Aktifkan error reporting untuk debugging (hapus di production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Log untuk debugging
$log_file = 'email_log.txt';
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Request diterima\n", FILE_APPEND);

// Periksa metode request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Method tidak valid\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Method tidak valid']);
    exit;
}

// Periksa data form
$data = $_POST;
file_put_contents($log_file, date('Y-m-d H:i:s') . " - Data diterima: " . print_r($data, true) . "\n", FILE_APPEND);

// Validasi data
if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Data tidak lengkap\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Semua field harus diisi']);
    exit;
}

// Sanitasi input
$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($data['subject']);
$message = htmlspecialchars($data['message']);

// Validasi email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Email tidak valid: $email\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Email tidak valid']);
    exit;
}

// Email tujuan
$to = "dwishafira811@gmail.com";

// Persiapkan pesan email
$email_content = "Nama: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Subject: $subject\n";
$email_content .= "Pesan:\n$message";

// Header email
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Coba kirim email
$mail_sent = mail($to, $subject, $email_content, $headers);

// Log hasil
if ($mail_sent) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Email berhasil dikirim\n", FILE_APPEND);
    echo json_encode(['success' => true, 'message' => 'Pesan berhasil dikirim!']);
} else {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - Gagal mengirim email\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Gagal mengirim email. Silakan coba lagi atau hubungi kami melalui email/telepon.']);
}
?>