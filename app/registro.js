const redirigir=()=>{
  window.location.href="../index.html";
      alert('Bienvenido!');
}

const guardarEnDb = () => {
    const nombreDeUsuario = document.reg.nombre.value.toLowerCase();
    const email = document.reg.email.value.toLowerCase();
    const contraseña = document.reg.password.value.toLowerCase();
    const contraseña2 = document.reg.password2.value.toLowerCase();
    if (nombreDeUsuario.length < 6) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'El nombre de usuario debe tener al menos 6 caracteres.',
        showConfirmButton: false,
        timer: 3000
      });
      // alert('El nombre de usuario debe tener al menos 6 caracteres.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Por favor, introduce un correo electrónico válido.',
        showConfirmButton: false,
        timer: 3000
      });
      // alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (contraseña.length < 6) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'La contraseña debe tener al menos 6 caracteres.',
        showConfirmButton: false,
        timer: 3000
      });
      // alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (contraseña2.length < 6) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'La contraseña debe tener al menos 6 caracteres.',
        showConfirmButton: false,
        timer: 3000
      });
      // alert('La contraseña debe tener al menos 6 caracteres.');
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
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Se ha creado con exito el usuario!',
        showConfirmButton: false,
        timer: 3000
      });
      // alert('Se ha creado con exito el usuario');
      setTimeout(()=>{
      window.location = '../login.html';
    },2000);

    });
  };

    
    
  
