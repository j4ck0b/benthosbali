<?php
session_start();

// Verificar que el envío fue exitoso
if (empty($_SESSION['envio_exitoso'])) {
    header('Location: contacto.html');
    exit;
}

// Obtener nombre
$nombre = $_SESSION['nombre_usuario'] ?? '';

// Limpiar sesión
session_destroy();
?>
<!DOCTYPE html>
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You! - Benthos Bali</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #f0f8ff; }
        .thankyou-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .thankyou-card { background: white; padding: 50px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 119, 190, 0.15); text-align: center; max-width: 600px; width: 100%; border-top: 5px solid #0077be; }
        h1 { color: #0077be; margin-bottom: 20px; }
        p { color: #555; line-height: 1.6; margin-bottom: 20px; font-size: 1.1rem; }
        .btn { display: inline-block; background: linear-gradient(135deg, #0077be 0%, #00a8ff 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 10px; transition: all 0.3s; }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0, 119, 190, 0.3); }
        .checkmark { font-size: 60px; color: #28a745; margin-bottom: 20px; }
        @media (max-width: 600px) { .thankyou-card { padding: 30px; } }
    </style>
</head>
<body>
    <div class="thankyou-container">
        <div class="thankyou-card">
            <div class="checkmark">✅</div>
            <h1>Thank you <?php echo htmlspecialchars($nombre); ?>!</h1>
            <p>Your message has been successfully sent to the Benthos Bali Dive Resort team.</p>
            <p>We will respond to you within 24 hours.</p>
            <p>For urgent inquiries, you can contact us via WhatsApp: <strong>+62 822 4721 5443</strong></p>
            <div style="margin-top: 30px;">
                <a href="contacto.html" class="btn">Send another message</a>
                <a href="index.html" class="btn" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%);">Back to Home</a>
            </div>
        </div>
    </div>
</body>
</html>