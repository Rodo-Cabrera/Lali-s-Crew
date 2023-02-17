const nav = document.querySelector("nav");
window.addEventListener("scroll", navShadow);

function navShadow() {
  if (window.scrollY > 500) {
    nav.classList.add("bg-dark", "shadow", "opacity-50");
  } else {
    nav.classList.remove("bg-dark", "shadow", "opacity-50");
  }
};

const loader = async () => {
  try {
    const resp = await fetch(
      "https://api.rawg.io/api/games?key=1615093f0f64427988bd9c1e6d80c9d6&dates=2019-09-01%2C2019-09-30&platforms=18%2C1%2C7&fbclid=IwAR2UYmDaRdH0MoykyfSUdykUkkxuWJJYq1sOWa0iuzkGhoh3_DjqWLZLPPY");
    
    console.log(resp);
      
    if (resp.status === 200) {
        
      const data = await resp.json();
      
      let games = '';
        data.results.forEach(game => {
          games += `         
          <div class="game">
              <div class="card" style="width: 18rem;">
                <h1>${game.name}</h1>
                <img src="${game.background_image}" class="card-img-top  gameimg" alt="...">
                <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
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