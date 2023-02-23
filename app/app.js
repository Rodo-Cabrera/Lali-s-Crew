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
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Acabas de cerrar sesion como administrador!',
    showConfirmButton: false,
    timer: 3000
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


const buscarJuego=()=>{
  fetch('http://localhost:3000/games')
  .then(response => response.json())
  .then(data => {
    // Buscar el juego por su nombre
    const game = data.find(game => game.name.toLowerCase() === document.admin.adminNombre.value.toLowerCase());
    if (game) {
      console.log(game);
      alert(game.description);
    } else {
      console.log("No se encontró el juego");
    }
  })
  .catch(error => {
    console.error(error);
  });
}


const eliminarRegistro = () => {
  let juegoB=document.admin.adminNombre.value.toLowerCase();
  //primero use un fetch para buscar un juego y dentro del mismo fetch hice otro fetch pero como delete para borrarlo 
  fetch('http://localhost:3000/games')
  .then(response => response.json())
  .then(data => {
    // Buscar el juego por su nombre
    const game = data.find(game => game.name.toLowerCase() === document.admin.adminNombre.value.toLowerCase());
    if (game) {
      fetch(`http://localhost:3000/games/${game.id}`, {
        method: 'DELETE'
      })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error))
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: `se ha borrado el juego ${juegoB} !`,
        showConfirmButton: false,
        timer: 3000
      });  
        
    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: `No se ha encontrado el juego!`,
        showConfirmButton: false,
        timer: 3000
      });  
      console.log("No se encontró el juego");
    }
  })
  .catch(error => {
    console.error(error);
  });


 
};

//con esto guardo en localhost el nombre del juego a modificar
const modificarA= () =>{
  const juego = document.admin.adminNombre.value.toLowerCase();
    if (juego.length < 3) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: `El numero de caracteres es menor al permitido, ingrese bien el nombre del juego.`,
        showConfirmButton: false,
        timer: 3000
      });
      // alert('El numero de caracteres es menor al permitido, ingrese bien el nombre del juego.');
      return;
    }
  fetch('http://localhost:3000/games')
  .then(response => response.json())
  .then(data => {
    // Buscar el juego por su nombre
    const game = data.find(game => game.name.toLowerCase() === document.admin.adminNombre.value.toLowerCase());
    if (game) {
      localStorage.setItem('gameModif', JSON.stringify(game));
      console.log(game);
      window.location = '../indexModificar.html';
    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'El juego ingresado no existe. Ingrese de nuevo el nombre.',
        showConfirmButton: false,
        timer: 3000
      });
      // alert('El juego ingresado no existe. Ingrese de nuevo el nombre.');
      return;
    }
  })
  .catch(error => {
    console.error(error);
  });

}
//modifica el juego en el index modificar
const modificarB=()=>{
  const gameModif = JSON.parse(localStorage.getItem('gameModif'));
  alert(gameModif.id);
  fetch(`http://localhost:3000/games/${gameModif.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      description: document.modi.desc.value
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp);
    Swal.fire({
      position: 'top-center',
      icon: 'succes',
      title: 'La descripcion del juego se ha modificado con éxito!',
      showConfirmButton: false,
      timer: 3000
    });
  })
  .catch((error) => console.log(error))

}

