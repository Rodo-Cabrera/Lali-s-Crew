const nav = document.querySelector('nav');
window.addEventListener("scroll", navShadow);

function navShadow () {
  if (window.scrollY > 500) {
    nav.classList.add("bg-dark", "shadow", "opacity-50");
  } else {
    nav.classList.remove("bg-dark", "shadow", "opacity-50");
  }
}

const logoutUser = () => {
  localStorage.removeItem('userLog');
  swal({
    icon: "success",
    title: "Acabas de cerrar sesion como administrador!",
  });  
  setTimeout(()=>{
    window.location = '../login.html';
  },3000);
};

const checkLogin = () => {
  const userLog = JSON.parse(localStorage.getItem('userLog'));
  if (!userLog) {
    window.location = '../login.html';
  }
};