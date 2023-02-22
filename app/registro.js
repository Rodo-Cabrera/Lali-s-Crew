
const guardarEnDb = () => {

  fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({
        nombreDeUsuario: document.reg.nombre.value.toLowerCase(),
        email: document.reg.email.value.toLowerCase(),
        contraseña: document.reg.password.value.toLowerCase(),
        id: ""
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
    });
    setTimeout(() => {
      window.location.href = "../index.html";
      }, 10000);
  }

  //ya esta funcando pero no se que hacer con el tiempo ese de settimeout
  
  
    
    
  
