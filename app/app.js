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

//Loader de juego principal
const loader = async (id) => {
  try {
    const resp = await fetch(
      `http://localhost:3000/mainGame`);
    
    console.log(resp);
      
    if (resp.status === 200) {
        
      const data = await resp.json();
      const main = data.find(mainGame => mainGame.id === 0)
      if (!main) {
        console.log(`El juego con ID ${id} no esite`);
        return;
      }
      let mainGame = '';
      data.forEach(main =>{        
        main.backgroundImage = `url(${main.bgImage})`
          mainGame += `
          <div id="banner-iamge" class="banner-image w-100 vh-100 d-flex justify-content-center align-items-center container-fluid" style="background-image: ${main.backgroundImage};">
          
          <div id="carouselExample${main.id}" class="carousel slide fadeInDown">
            <div class="carousel-inner container text-center justify-content-center">
          <div class="carousel-item active">
            <img class="carousel1 d-block mx-auto" src="${main.carouselImg[0]}" alt="main game">
          </div>
          <div class="carousel-item" id="mainCarousel">
            <div class="container-fluid justify-content-between">
              <div class="justify-content-between">
                <img class="d-block me-auto deluxeEdition" src="${main.carouselImg[2]}" alt="main game">
              </div>
                <div class="carousel-caption d-none d-md-block">
                  <div class="hCaption">
                    <h5 class="text-white d-block ms-auto">${main.venta[0]}</h5> 
                    <p class="text-white d-block ms-auto">
                      ${main.venta[1]} <hr> ${main.venta[2]}
                      <a href="#">Ver más...</a>
                    </p>      
                  </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="container-fluid justify-content-between">
              <img src="${main.carouselImg[1]}" class="d-block me-auto avadaKedavra" alt="...">
            </div>
            <div class="carousel-caption d-none d-md-block">
                <div class="hCaption3">
                  <h5 class="text-white d-block ms-auto">${main.description} </h5> 
                </div>
            </div>
            </div>
          </div>
          <button class="carousel-control-prev me-auto" type="button" data-bs-target="#carouselExample${main.id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
          <button class="carousel-control-next ms-auto" type="button" data-bs-target="#carouselExample${main.id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
      </div>
          `
        });
        document.getElementById('mainGame').innerHTML=mainGame;
        
      } else if (resp.status === 401) {
        console.log('Error 401');
      } else if (resp.status === 404) {
        console.log('El juego no existe');
      } else {
        console.log('ni idea loco, no conocemos este error');
      }


  } catch (error) {
    console.log(error);
  }
};

loader(0);
