// Validación de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const setErrorAlert = (input) => {
  const parentControl = input.parentElement;
  parentControl.classList.remove("success");
  parentControl.classList.add("error");
};

const setSuccessAlert = (input) => {
  const parentControl = input.parentElement;
  parentControl.classList.remove("error");
  parentControl.classList.add("success");
};

const setClearAlert = (input) => {
  const parentControl = input.parentElement;
  parentControl.classList.remove("success");
  parentControl.classList.remove("error");
};

// Configuración EmailJS
const EMAILJS_SERVICE_ID = 'service_pnhysrs';
const EMAILJS_TEMPLATE_ID = 'template_bw21pxa';
const EMAILJS_PUBLIC_KEY = '_J2ybQwMCexEi1I-m';

const checkInputs = (name, email, message) => {
  let result = true;

  // Validar nombre
  if (name.value.trim() === "") {
    setErrorAlert(name);
    result = false;
  } else if (name.value.trim().length < 2) {
    setErrorAlert(name);
    result = false;
  } else {
    setSuccessAlert(name);
  }

  // Validar email
  if (email.value.trim() === "") {
    setErrorAlert(email);
    result = false;
  } else if (!isValidEmail(email.value.trim())) {
    setErrorAlert(email);
    result = false;
  } else {
    setSuccessAlert(email);
  }

  // Validar mensaje
  if (message.value.trim() === "") {
    setErrorAlert(message);
    result = false;
  } else if (message.value.trim().length < 10) {
    setErrorAlert(message);
    result = false;
  } else {
    setSuccessAlert(message);
  }

  return result;
};

const sendEmail = () => {
  const name = document.getElementById("fullname");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (!checkInputs(name, email, message)) {
    return;
  }

  // Deshabilitar el botón mientras se envía
  const submitButton = document.getElementById("contact__button");
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  // Verificar que EmailJS esté cargado
  if (typeof emailjs === 'undefined') {
    Swal.fire({
      title: "Error de configuración",
      html: `
        <p>El servicio de email no está disponible.</p>
        <p>Por favor, recarga la página o contáctame directamente:</p>
        <p><a href="mailto:gersonrhu@gmail.com" style="color: #4CAF50; font-weight: bold;">gersonrhu@gmail.com</a></p>
      `,
      icon: "error",
      confirmButtonText: "OK"
    });
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
    return;
  }

  // Preparar los datos del email
  const templateParams = {
    from_name: name.value.trim(),
    from_email: email.value.trim(),
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim()
  };

  // Enviar el email
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
  .then(() => {
    name.value = "";
    email.value = "";
    message.value = "";
    Swal.fire({
      title: "¡Gracias!",
      text: "Tu mensaje fue enviado correctamente. Te responderé pronto.",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
    setClearAlert(name);
    setClearAlert(email);
    setClearAlert(message);
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  })
  .catch((error) => {
    let errorMessage = "Hubo un problema al enviar el mensaje.";
    
    if (error.status === 400) {
      errorMessage = "Error en la solicitud. Verifica la configuración de EmailJS.";
    } else if (error.status === 401 || error.status === 403) {
      errorMessage = "Error de autenticación. Verifica tu Public Key en EmailJS.";
    } else if (error.status === 404) {
      errorMessage = "Service ID o Template ID no encontrado.";
    } else if (error.text) {
      errorMessage = error.text;
    }
    
    Swal.fire({
      title: "Error al enviar",
      html: `
        <p><strong>${errorMessage}</strong></p>
        <p style="margin-top: 15px;">Por favor, contáctame directamente:</p>
        <p><a href="mailto:gersonrhu@gmail.com" style="color: #4CAF50; font-weight: bold;">gersonrhu@gmail.com</a></p>
      `,
      icon: "error",
      confirmButtonText: "OK"
    });
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  });
};
  