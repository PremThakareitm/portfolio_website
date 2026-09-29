<?php
/**
 * Portfolio contact mailer for Prem Thakare.
 *
 * Upload this file to PHP hosting (same place as your live site, or a subdomain)
 * as /api/contact.php then set VITE_CONTACT_ENDPOINT to that URL.
 *
 * Requires PHP mail() or a host that routes mail() to the inbox.
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Use POST.']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;
}

// Honeypot — bots fill hidden "website"
if (!empty($data['website'])) {
  echo json_encode(['ok' => true]);
  exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Please add a name, valid email, and message.']);
  exit;
}

if (strlen($name) > 120 || strlen($message) > 5000) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Message is too long.']);
  exit;
}

$to = 'premthakare96680@gmail.com';
$subject = 'Portfolio message from ' . $name;
$body = "Name: {$name}\nEmail: {$email}\n\n{$message}\n";
$fromHost = $_SERVER['SERVER_NAME'] ?? 'portfolio';
$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: Prem Portfolio <no-reply@' . $fromHost . '>',
  'Reply-To: ' . $email,
  'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$sent) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Mail could not be sent. Check PHP mail() on this host.']);
  exit;
}

echo json_encode(['ok' => true]);
