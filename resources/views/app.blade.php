<!DOCTYPE html>
<html>
    <head>
        <title>Escama - Gestión de finanzas personales</title>
        @vite(['resources/css/app.css', 'resources/js/main.tsx'])
        <link rel="manifest" href="{{ asset('manifest.webmanifest') }}">
        <meta name="theme-color" content="#ffffff">
        <meta name="apple-mobile-web-app-title" content="Escama">
        <link rel="apple-touch-icon" href="{{ asset('favicon.ico') }}">
        <link rel="icon" href="{{ asset('img/escama-logo.svg') }}" type="image/svg+xml">
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>