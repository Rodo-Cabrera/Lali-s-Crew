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
    
        swal({
          icon: "success",
          title: `se ha borrado el juego ${juegoB} !`
        });    
        // esto de abajo no funciona hay que ver como usar el alert o hacer que funcione con modal
        // setTimeout(()=>{
        //   window.location = '../indexModificar.html';
        // },4000);
      // console.log(game);
      // alert(game.description);
    } else {
      console.log("No se encontró el juego");
    }
  })
  .catch(error => {
    console.error(error);
  });


 
};

//con esto guardo en localhost el nombre del juego a modificar
// falta eliminarlo una vez hecha la trampa ahrex
const modificarA= () =>{

  fetch('http://localhost:3000/games')
  .then(response => response.json())
  .then(data => {
    // Buscar el juego por su nombre
    const game = data.find(game => game.name.toLowerCase() === document.admin.adminNombre.value.toLowerCase());
    if (game) {
      localStorage.setItem('gameModif', JSON.stringify(game));
      console.log(game);
      window.location = '../indexModificar.html';
      // alert(game.description);
      
    } else {
      console.log("No se encontró el juego");
    }
  })
  .catch(error => {
    console.error(error);
  });

}
//modifica en el index modificar
const modificarB=()=>{
  const gameModif = JSON.parse(localStorage.getItem('gameModif'));
  alert(gameModif.id);
  fetch(`http://localhost:3000/games/${gameModif.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      //si quieren agregamos mas cosas chiquis
      description: document.modi.desc.value
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((resp) => resp.json())
  .then((resp) => console.log(resp))
  .catch((error) => console.log(error))

}

//HACER VALIDACIONES REGEX