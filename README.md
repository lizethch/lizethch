# Sistema de Carga y Validación de Datos con Autenticación
🌟 Descripción General
    Sistema web desarrollado en React que permite a usuarios administradores cargar archivos CSV, validar sus datos y corregir registros con errores. El sistema incluye autenticación de usuarios y manejo de roles para garantizar un acceso seguro a las funcionalidades.

🔑 Características Principales

# Autenticación de usuarios con manejo de roles
    Carga y validación de archivos CSV
    Interfaz para corrección de registros con errores
    Visualización de resultados de la carga
    Sistema de retroalimentación visual para el usuario

🛠️ Tecnologías Utilizadas

    React 18.x
    React Router 6.x
    Tailwind CSS
    Jest + React Testing Library
    JSON Web Tokens (JWT)

📋 Requisitos Previos

    Node.js (versión 18.x o superior)
    npm (versión 8.x o superior)

🚀 Instalación y Configuración

Clonar el repositorio

git clone https://github.com/lizethch/data-upload-system.git
cd data-upload-system

Instalar dependencias

 npm install

Iniciar el servidor de desarrollo

npm run dev
📝 Uso del Sistema
Autenticación

Acceder a /login
Credenciales de prueba:

Email: admin@mail.com
Contraseña: supersecret

Carga de Archivos

Navegar a la página principal
Seleccionar archivo CSV
El sistema validará y mostrará resultados
Corregir errores si es necesario

Formato del CSV
El archivo CSV debe contener las siguientes columnas:

name (texto)
email (formato email válido)
age (número positivo)
password(6 digitos)

Ejemplo:
csvCopyname,email,age
Juan Pérez,juan.perez@example.com,28
María García,maria.garcia@example.com,35
🔍 Endpoints API Simulados
Login
javascriptCopyPOST /api/login
// Request body
{
  "email": "admin@mail.com",
  "password": "supersecret"
}

// Response
{
  "ok": true,
  "data": {
    "email": "admin@mail.com",
    "name": "Mr. Admin",
    "role": "admin",
    "token": "eyJhbGci..."
  }
}

🧪 Testing
Ejecutar los tests:
npm run test
El proyecto incluye tests para:

Autenticación
Procesamiento de CSV
Reglas de validación
Funcionalidad de inicio de sesión
Carga de archivo