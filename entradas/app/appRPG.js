const nav = document.querySelector("nav");
window.addEventListener("scroll", navShadow);

function navShadow() {
  if (window.scrollY > 150) {
    nav.classList.add("bg-dark", "shadow", "opacity-50");
  } else {
    nav.classList.remove("bg-dark", "shadow", "opacity-50");
  }
};

const loader = async () => {
  try {
    const resp = await fetch(
      `http://localhost:3000/games`);
    
    console.log(resp);
      
    if (resp.status === 200) {
        
      const data = await resp.json();
      
      let games = '';
        data.forEach(game => {       
          games += `         
          <div class="game" style="width: 18rem;">
              <div class="card my-3 rounded-4" style="width: 20rem;">
                <h2>${game.name}</h2>
                <img src="${game.images[0]}" class="card-img-bottom  gameimg" alt="...">
            </div>
          </div>
          `;
        });
      document.getElementById('games1').innerHTML = games;
        
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

loader();