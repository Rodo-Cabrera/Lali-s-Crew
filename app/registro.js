const formulario = document.getElementsByName("reg");
const nombre = document.getElementsByName("nombre");
const email = document.getElementsByName("email");
const contraseña = document.getElementsByName("password");

const registrarUsuario = (e) => {
  e.preventDefault()
  if(nombre.value === "" ||
    email.value === "" ||
    contraseña.value === "")
  {alert("Conpletar campos vacíos");
} 
}



const guardarEnDb = () => {
  const guardarRegEx = "";

    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({
        nombreDeUsuario: document.reg.nombre.value.toLowerCase(),
        email: document.reg.email.value.toLowerCase(),
        contraseña: document.reg.password.value.toLowerCase()
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

  };
    
    
  
