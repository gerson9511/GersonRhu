# 📧 Configuración del Envío de Correos

Este documento explica cómo configurar el envío de correos electrónicos para tu portafolio.

## 🔧 Opción 1: EmailJS (Recomendado - Más fácil y confiable)

EmailJS es un servicio gratuito que permite enviar hasta 200 emails por mes sin necesidad de un servidor backend.

### Pasos para configurar EmailJS:

1. **Crear cuenta en EmailJS**
   - Ve a https://www.emailjs.com/
   - Crea una cuenta gratuita (hasta 200 emails/mes)

2. **Configurar un servicio de email**
   - En el dashboard, ve a "Email Services"
   - Haz clic en "Add New Service"
   - Selecciona tu proveedor de email (Gmail, Outlook, etc.)
   - Sigue las instrucciones para conectar tu cuenta

3. **Crear un template de email**
   - Ve a "Email Templates"
   - Haz clic en "Create New Template"
   - Usa este template como base:
     ```
     Subject: Contacto desde portafolio - {{from_name}}
     
     Nuevo mensaje desde tu portafolio
     
     Nombre: {{from_name}}
     Email: {{from_email}}
     
     Mensaje:
     {{message}}
     ```
   - Guarda el template y copia el "Template ID"

4. **Obtener tus credenciales**
   - Ve a "Account" → "General"
   - Copia tu "Public Key"

5. **Actualizar el código**
   - Abre `js/mail.js`
   - Busca la sección comentada de EmailJS (línea ~70)
   - Descomenta el código de EmailJS
   - Reemplaza:
     - `YOUR_SERVICE_ID` con el ID de tu servicio
     - `YOUR_TEMPLATE_ID` con el ID de tu template
     - `YOUR_PUBLIC_KEY` con tu Public Key
   - Comenta o elimina el código de SMTPJS

6. **Actualizar index.html**
   - Reemplaza la línea:
     ```html
     <script src="https://smtpjs.com/v3/smtp.js"></script>
     ```
   - Por:
     ```html
     <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
     ```
   - Agrega antes del cierre de `</body>`:
     ```html
     <script>
       (function(){
         emailjs.init("YOUR_PUBLIC_KEY");
       })();
     </script>
     ```

---

## 🔧 Opción 2: SMTPJS (Actual - Requiere configuración)

SMTPJS es el servicio que actualmente estás usando. Para que funcione correctamente:

### Pasos para configurar SMTPJS:

1. **Generar un nuevo SecureToken**
   - Ve a https://smtpjs.com/
   - Haz clic en "Generate Secure Token"
   - Ingresa tu email (gersonrhubdp@gmail.com)
   - Ingresa tu contraseña de Gmail (o contraseña de aplicación)
   - Copia el SecureToken generado

2. **Actualizar el SecureToken en el código**
   - Abre `js/mail.js`
   - Busca la línea con `SecureToken: "2c0a952d-c47c-4bf6-a9dc-272f25851ae8"`
   - Reemplaza el token con el nuevo que generaste

3. **Importante sobre Gmail**
   - Si usas Gmail, necesitas crear una "Contraseña de aplicación"
   - Ve a tu cuenta de Google → Seguridad → Verificación en 2 pasos
   - Genera una contraseña de aplicación específica para SMTPJS
   - Usa esa contraseña al generar el SecureToken

### ⚠️ Problemas comunes con SMTPJS:

- **El SecureToken expira**: Necesitas regenerarlo periódicamente
- **Gmail bloquea el acceso**: Necesitas usar contraseña de aplicación
- **Límites de Gmail**: Gmail tiene límites de envío (500 emails/día)

---

## 🔧 Opción 3: Formspree (Alternativa simple)

Formspree es otra opción muy simple que no requiere configuración de código:

1. Ve a https://formspree.io/
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Obtén el endpoint URL
5. Cambia el formulario en `index.html` para usar el método POST a ese endpoint

---

## ✅ Validaciones implementadas

El código actual incluye:
- ✅ Validación de nombre (mínimo 2 caracteres)
- ✅ Validación de email (formato correcto)
- ✅ Validación de mensaje (mínimo 10 caracteres)
- ✅ Indicador visual de carga mientras se envía
- ✅ Manejo de errores con mensajes claros
- ✅ Limpieza del formulario después del envío exitoso

---

## 🧪 Cómo probar

1. Abre tu portafolio en el navegador
2. Ve a la sección de contacto
3. Completa el formulario
4. Haz clic en "Enviar"
5. Verifica que recibes el email en gersonrhubdp@gmail.com

---

## 📝 Notas importantes

- **Seguridad**: Nunca expongas contraseñas reales en el código
- **Límites gratuitos**: 
  - EmailJS: 200 emails/mes
  - SMTPJS: Depende de tu proveedor de email
  - Formspree: 50 submissions/mes
- **GitHub Pages**: Todos estos servicios funcionan con sitios estáticos como GitHub Pages

---

## 🆘 Si no funciona

1. Abre la consola del navegador (F12)
2. Revisa si hay errores en la consola
3. Verifica que el SecureToken/Public Key sea correcto
4. Asegúrate de que el servicio esté activo y configurado correctamente
5. Prueba con un servicio alternativo si el actual no funciona

---

**Recomendación final**: Usa EmailJS para una solución más confiable y fácil de mantener.

