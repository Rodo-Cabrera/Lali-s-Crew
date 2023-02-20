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
  const userEmail = document.login.usuario.value.toLowerCase();
  const userPassword = document.login.contraseña.value.toLowerCase();
  const validationEmail =/^[^@]{1,64}@[^@]+\.[a-zA-Z]{2,}$/ ;
  // entre 6 y 60 caracteres la validacion 
  // /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
  if (!validationEmail.test(userEmail)) {
    swal({
      icon: "error",
      title: "Formato de email incorrecto",
    });  
    // alert('Formato de email incorrecto');
    return;
  };

   fetch('http://localhost:3000/users')
  .then( resp => resp.json())
  .then (users => users.json())
  .catch(err => console.error("ERROR",err.message))
  console.log(users);
  let userLog;
  let flag = false;
  users.map((user) => {
  if (user.email.toLowerCase() === userEmail && user.password.toLowerCase() === userPassword) {
    flag = true;
    userLog = user;
  }
  });
  if (flag) {
   
    swal({
      icon: "success",
      title: "Bienvenido!",
    });    
    // // alert('Bienvenido');
    delete userLog.password;
    localStorage.setItem('userLog', JSON.stringify(userLog));
    setTimeout(()=>{
      window.location = '../indexAdmin.html';
    },3000);
    
    
  } else {
    swal({
      icon: "error",
      title: "Usuario o contraseña incorrect!",
    });  
    // alert('Usuario o contraseña incorrecta');
  };
};
//lo de abajo sirve para no dejar hacer clickderecho
// document.oncontextmenu = function () {
//   return false;
// };
