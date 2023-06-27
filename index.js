let main = document.querySelector("main");
let container_films = document.querySelector(".container_films");

function render() {
  //Zerando container para evitar erros
  container_films.innerHTML = "";

  //Consultando API de filmes
  fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=eba45982107db6a59d137d00d06d29de"
    )
    .then((resp) => resp.json())
    .then((teste) => {
      const filmes = teste.results;
      const image_path = "https://image.tmdb.org/t/p/w500";

      //Renderizando os da API na tela
      for (let i = 0; i < filmes.length; i++) {
        container_films.innerHTML += `
        <div id=${filmes[i].id} class="poster">
            <img onclick="captura()" class="img_poster" src=${image_path}${filmes[i].poster_path}>
            <span class="title">${filmes[i].title}</span>
        </div>
        `;
      }

      //CRIANDO A PASSAGEM DO CLIQUE NO FILME PARA PÁGINA DE INFORMAÇÕES
      seach = (id) => {
        teste.results.map((item) => {
          if (item.id == id) {
            const vote_average = item.vote_average;
            const vote_count = item.vote_count;
            const popularity = item.popularity;
            const original_language = item.original_language;
            const original_title = item.original_title;
            const overview = item.overview;
            const release_date = item.release_date;
            const poster = item.poster_path;

            const vote_count_format = vote_count.toLocaleString("pt-br", {
              minimumFractionDigits: 0,
            });

            const popularity_format = popularity.toLocaleString("pt-br", {
              minimumFractionDigits: 0,
            });

            //Criando a página de informações
            container_films.innerHTML = `
        
          <section class="info_film">
          <img id="close" onclick="render()" src="./fechar.png">
              <div id="division_0">
                <img class="poster_info" src="${image_path}${poster}">
                <p id="note">Nota: <span>${vote_average} / 10</span></p>
                <span>Visualizações: ${popularity_format}</span>
                 <p>Avaliações: <span>${vote_count_format}</span></p>
                 <h5 id="date">Lançamento: ${release_date}</h5>
                 <span>Linguagem: ${original_language}</span>
              </div>
                <article  id="division_1">
                    <h2>${original_title}</h2>
                    <div id="overview">
                    <h4>Sinopse:</h4>
                  <span>${overview}</span>
                    </div>
                </article>
          </section>
          `;
          }
        });
      };
    });
}

//chamando função principal
render();

//Função de captura de clique, passando na função "seach()" o id do item clicado
function captura() {
  let posters = document.querySelectorAll(".poster");
  for (let i = 0; i < posters.length; i++) {
    posters[i].addEventListener("click", function () {
      item = this;
      let brutImage = this.children[0];
      let image = brutImage.src;
      console.log(image);
      seach(item.id);
    });
  }
}
