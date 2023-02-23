const nav = document.querySelector('nav');
window.addEventListener("scroll", navShadow);

function navShadow () {
  if (window.scrollY > 50) {
    // modificacion de 500
    nav.classList.add("bg-dark", "shadow", "opacity-50");
  } else {
    nav.classList.remove("bg-dark", "shadow", "opacity-50");
  }
}

const loginUser = () => {
  

    const email = document.login.usuario.value.toLowerCase();
    const contraseña = document.login.contraseña.value.toLowerCase();

    if (!email.includes('@') || !email.includes('.')) {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
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
        icon: 'success',
        title: 'La contraseña debe tener al menos 6 caracteres.',
        showConfirmButton: false,
        timer: 3000
      });
      // alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
   fetch('http://localhost:3000/users')
  .then( resp => resp.json())
  .then (users => 
  {
    const email = document.login.usuario.value.toLowerCase();
    const contraseña = document.login.contraseña.value.toLowerCase();
    console.log(users);
    let userLog;
    let flag = false;
    users.map((user) => {
      console.log(user);
      if (user.email.toLowerCase() ===email && user.contraseña.toLowerCase() === contraseña) {
    flag = true;
    userLog = user;
  }
  });
  if (flag) { 
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Usted ha ingresado con éxito',
      showConfirmButton: false,
      timer: 3000
    })  
    // alert('Bienvenido');
    delete userLog.contraseña;
    localStorage.setItem('userLog', JSON.stringify(userLog));
    setTimeout(()=>{
      window.location = '../indexAdmin.html';
    },2000);
    
    
  } else {
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: 'Usuario o contraseña incorrecta',
      showConfirmButton: false,
      timer: 3000
    })
    //  alert('Usuario o contraseña incorrecta');
  };
  });
};

// document.oncontextmenu = function () {
//   return false;
// };
