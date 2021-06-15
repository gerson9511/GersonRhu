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
  };
  
  const checkInputs = (name, email, body) => {
    let result = true;
  
    if (name.value.trim() === "") {
      setErrorAlert(name);
      result = false;
    } else {
      setSuccessAlert(name);
    }
    if (email.value.trim() === "") {
      setErrorAlert(email);
      result = false;
    } else {
      setSuccessAlert(email);
    }
    if (message.value.trim() === "") {
      setErrorAlert(message);
      result = false;
    } else {
      setSuccessAlert(message);
    }
  
    return result;
  };
  
  const sendEmail = () => {
    const name = document.getElementById("Nombre completo");
    const email = document.getElementById("Correo");
    const body = document.getElementById("Mensaje");
  
    if (!checkInputs(name, email, body)) return;
  
    Email.send({
      SecureToken: "2c0a952d-c47c-4bf6-a9dc-272f25851ae8",
      To: "gersonrhu@gmail.com",
      From: "gersonrhu@gmail.com",
      Subject: `Contact from ${name.value}`,
      Body: `<strong>${name.value}</strong> ha escrito:<br>${body.value}<br><br>Para responder escribir al correo: ${email.value}`,
    }).then(
      (name.value = ""),
      (email.value = ""),
      (body.value = ""),
      Swal.fire({
        title: "Gracias!",
        text: "Tu mensaje fue enviado, nos vemos pronto",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      }),
      setClearAlert(name),
      setClearAlert(email),
      setClearAlert(body)
    );
  };
  