<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recuperación de contraseña</title>
</head>
<body style="font-family: Arial, sans-serif; background:#f7f7f7; padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #e5e5e5;">
        <tr>
            <td style="padding:24px;">
                <h2 style="margin:0 0 12px 0; color:#111827;">Hola, {{ $name }}</h2>
                <p style="margin:0 0 16px 0; color:#374151;">
                    Recibimos una solicitud para restablecer tu contraseña. Si fuiste tú, presiona el siguiente botón para continuar.
                </p>
                <p style="margin:24px 0;">
                    <a href="{{ $actionUrl }}" style="display:inline-block; background:#2563eb; color:#fff; text-decoration:none; padding:12px 20px; border-radius:8px;">Restablecer contraseña</a>
                </p>
                <p style="margin:0 0 8px 0; color:#6b7280; font-size:14px;">Si no solicitaste este cambio, ignora este correo.</p>
                <p style="margin:0; color:#6b7280; font-size:14px;">Este enlace expirará en 60 minutos.</p>
            </td>
        </tr>
    </table>
</body>
</html>

