// const formulario = document.getElementsByName("reg");
// const nombre = document.getElementsByName("nombre");
// const email = document.getElementsByName("email");
// const contrasena = document.getElementsByName("password");


const registrarUsuario = (e) => {
  e.preventDefault();

  const nombreValor = document.reg.nombre.value.toLowerCase();
  const emailValor = document.reg.email.value.toLowerCase();
  const contrasenaValor = document.reg.password.value.toLowerCase();

  // Validación del campo nombre
  if (nombreValor === "") {
    alert("Por favor, ingrese su nombre.");
    nombre.focus();
    return false;
  }

  // Validación del campo correo electrónico
  if (emailValor === "") {
    alert("Por favor, ingrese su correo electrónico.");
    email.focus();
    return false;
  } else if (!validarEmail(emailValor)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    email.focus();
    return false;
  }

  // Validación del campo contraseña
  if (contrasenaValor === "") {
    alert("Por favor, ingrese su contraseña.");
    contrasena.focus();
    return false;
  } else if (contrasenaValor.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    contrasena.focus();
    return false;
  }

  // Si todas las validaciones pasan, el formulario se envía
  alert("Formulario enviado con éxito!");
  e.target.submit();
};

// Función para validar el correo electrónico
function validarEmail(email) {
  const re = /\S+@\S+.\S+/;
  return re.test(email);
}

const guardarEnDb = () => {
  registrarUsuario();
  validarEmail();
  fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({
        nombreValor: document.reg.nombre.value.toLowerCase(),
        emailValor: document.reg.email.value.toLowerCase(),
        contrasenaValor: document.reg.password.value.toLowerCase()
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));



    swal( {
      title: "Bienvenido!",
      text: "Ya te encuentras registrado!",
      icon: "success",
      timer:5000,
      button: "Regresar al inicio de sesión",
    });
    setTimeout(() => {
      Window.location = `#`;
      }, 5000);
  }
  
  
    
    
  
