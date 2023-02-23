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
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (contraseña.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
   fetch('http://localhost:3000/users')
  .then( resp => resp.json())
  .then (users => 
  {
    console.log(users);
    let userLog;
    let flag = false;
    users.map((user) => {
      console.log(user);
      if (user.email.toLowerCase() ===userEmail && user.contraseña.toLowerCase() === userPassword) {
    flag = true;
    userLog = user;
  }
  });
  if (flag) {
   
    // swal({
    //   icon: "success",
    //   title: "Bienvenido!",
    // });    
    alert('Bienvenido');
    delete userLog.contraseña;
    localStorage.setItem('userLog', JSON.stringify(userLog));
    setTimeout(()=>{
      window.location = '../indexAdmin.html';
    },3000);
    
    
  } else {
 
     alert('Usuario o contraseña incorrecta');
  };
  });
};


//lo de abajo sirve para no dejar hacer clickderecho
// document.oncontextmenu = function () {
//   return false;
// };
