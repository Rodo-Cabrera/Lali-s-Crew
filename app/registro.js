const redirigir=()=>{
  window.location.href="../index.html";
      alert('Bienvenido!');
}

const guardarEnDb = () => {
    const nombreDeUsuario = document.reg.nombre.value.toLowerCase();
    const email = document.reg.email.value.toLowerCase();
    const contraseña = document.reg.password.value.toLowerCase();

    if (nombreDeUsuario.length < 6) {
      alert('El nombre de usuario debe tener al menos 6 caracteres.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (contraseña.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
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
    .then((resp) => {
      redirigir();

    })
    .catch((error) => console.log(error))
  }

    
    
  
