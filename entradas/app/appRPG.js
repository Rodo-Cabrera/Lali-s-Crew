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
      let modals ='';
        data.forEach(game => {       
          games += `
          <div class="game" style="width: 18rem;">
          <a href="${document.getElementById('modalDiv')}" data-bs-toggle="modal" data-bs-target="#myModal${game.id}">
              <div class="card my-3 rounded-4" style="width: 20rem;">
                <h2>${game.name}</h2>
                <img src="${game.images[0]}" class="card-img-bottom  gameimg" alt="...">
            </div>
            </a>
          </div>
          `;
          modals += `                  
            <div class="modal fade" id="myModal${game.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${game.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                  </div>
                  <div class="modal-body">
                    <p>${game.description}</p>
                    <div>
                    <img src="${game.images[2]}"/>
                    <img src="${game.images[1]}"/>
                    </div>
                  </div>
                  <div class="modal-footer text-center">
                   <p> Requerimientos mínimos <br> 
                   ${game.requirementsMin.so} <br> 
                   ${game.requirementsMin.processor} <br> 
                   ${game.requirementsMin.memory} <br> 
                   ${game.requirementsMin.graphics} <br> 
                   ${game.requirementsMin.directx} <br> 
                   ${game.requirementsMin.storage}</p>
                  </div>
                </div>
              </div>
            </div>
          `
        });
        document.getElementById('modalDiv').innerHTML=modals;
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
