<?php
session_start();

// ================= CARGA DE VARIABLES .env =================
require 'vendor/autoload.php'; // Carga Composer (si usaste Opción A)

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$dotenv->required(['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'SMTP_PORT', 'MAIL_FROM', 'MAIL_TO']);

// ================= CONFIGURACIÓN DESDE .env =================
$smtp_config = [
    'host'      => $_ENV['SMTP_HOST'],
    'usuario'   => $_ENV['SMTP_USER'],
    'password'  => $_ENV['SMTP_PASS'],
    'puerto'    => (int)$_ENV['SMTP_PORT'], // Convertir a número
    'destinatario' => $_ENV['MAIL_TO'],
    'remitente' => $_ENV['MAIL_FROM']
];

// ================= VERIFICAR ENVÍO POST =================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // Verificar honeypot (campo anti-spam)
    if (!empty($_POST['website'])) {
        // Es spam, redirigir sin hacer nada
        header('Location: contacto.html');
        exit;
    }
    
    // Si alguien accede directamente, redirigir
    header('Location: contacto.html');
    exit;
}

// ================= OBTENER Y VALIDAR DATOS =================
$nombre = trim(htmlspecialchars($_POST['nombre'] ?? ''));
$email = trim($_POST['email'] ?? '');
$mensaje = trim(htmlspecialchars($_POST['mensaje'] ?? ''));

// Validación básica
if (empty($nombre) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($mensaje)) {
    // Mostrar error simple
    echo '<h2>Error: Please fill in all fields correctly</h2>';
    echo '<p><a href="contacto.html">Back to form</a></p>';
    exit;
}

// ================= ENVIAR CORREO =================
try {
    // Incluir PHPMailer
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
    
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    
    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host = $smtp_config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_config['usuario'];
    $mail->Password = $smtp_config['password'];
    $mail->SMTPSecure = 'ssl';
    $mail->Port = $smtp_config['puerto'];
    $mail->CharSet = 'UTF-8';
    
    // Para depuración (descomenta si necesitas ver errores)
    // $mail->SMTPDebug = 2;
    // $mail->Debugoutput = function($str) { echo "SMTP: $str<br>"; };
    
    // Remitente y destinatario
    $mail->setFrom($smtp_config['remitente'], 'Benthos Bali Web Form');
    $mail->addAddress($smtp_config['destinatario'], 'Benthos Bali Team');
    $mail->addReplyTo($email, $nombre);
    
    // Contenido
    $mail->Subject = 'New web contact: ' . $nombre;
    $mail->isHTML(true);
    
    $mail->Body = "
    <h2>📧 New message from Benthos Bali Website</h2>
    <p><strong>Name:</strong> $nombre</p>
    <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
    <p><strong>Message:</strong><br>" . nl2br($mensaje) . "</p>
    <p><strong>Date:</strong> " . date('d/m/Y H:i:s') . "</p>
    ";
    
    $mail->AltBody = "New contact:\nName: $nombre\nEmail: $email\nMessage:\n$mensaje\nDate: " . date('d/m/Y H:i:s');
    
    // Enviar
    $mail->send();
    
    // Guardar en sesión para la página de gracias

    $_SESSION['nombre_usuario'] = $nombre;
    $_SESSION['envio_exitoso'] = true;
    
    // Redirigir
    header('Location: gracias.php');
    exit;
    
} catch (Exception $e) {
    // Mostrar error amigable
    echo '<!DOCTYPE html>
    <html lang="en">
    <head>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8N1D03XB4"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-C8N1D03XB4');
        </script>
        <title>Error sending</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 40px; background: #f8f9fa; }
            .error-box { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; border-left: 5px solid #dc3545; }
            h2 { color: #dc3545; }
            .btn { display: inline-block; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="error-box">
            <h2>❌ Error sending message</h2>
            <p>Sorry, a technical error has occurred.</p>
            <p><strong>Details:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>
            <p>Please try again later or contact us directly.</p>
            <a href="contacto.html" class="btn">← Back to form</a>
        </div>
    </body>
    </html>';
    
    // Log para depuración
    error_log("Error PHPMailer: " . $e->getMessage());
}
?>