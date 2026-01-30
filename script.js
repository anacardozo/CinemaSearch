const form = document.querySelector('form');
const btn_buscar = document.querySelector('.buscar');
const filmName = document.querySelector('#busca');
const alerta = document.querySelector('.alert')
const inicial = document.querySelector('.cont-inicial');
const resultado = document.querySelector('.cont-result');
const container = document.querySelector('.filmes');

let page = 1;

const API_KEY = "40e083c20909c90167b6b76335756118";

function validarCampo(){
    if (filmName.value.trim() === "") {
            btn_buscar.classList.add("active");
            alerta.style.display = "block"
    } else {
            btn_buscar.classList.remove("active");
            alerta.style.display = "none"
    }
}

validarCampo();

 filmName.addEventListener("input", validarCampo),



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    page = 1;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${filmName.value}&page=${page}&language=pt-BR`;


    const result = await fetch(url);
    const json = await result.json();


    if(json.results.length === 0){

      alert("Não foi possível localizar ...")

    }

    showInfo(json);
})

function renderMais(Cards){
  
      Cards.forEach(filme => {
        const divFilme = document.createElement("div");
        divFilme.classList.add("filme");
        const poster = filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : "img/sem-imagem.png alt='sem imagem'";

        divFilme.innerHTML = `
          <img src="${poster}" alt="">
          <div class="info-film">
            <p class="title-film">${filme.title}</p>
              <div class="info-year">
                <ion-icon name="calendar-outline"></ion-icon>
                <p class="year">${filme.release_date}</p>
              </div>
          </div>
        `;

        container.appendChild(divFilme);
      });

      let btn_carregar = document.querySelector('.carregar');

      if (!btn_carregar) {
        btn_carregar = document.createElement("button");
        btn_carregar.classList.add("carregar");
        btn_carregar.textContent = "Carregar mais...";
        btn_carregar.addEventListener('click', carregarMais);
      }

      container.appendChild(btn_carregar);
}


async function carregarMais(){
  page++;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${filmName.value}&page=${page}&language=pt-BR`;


    const result = await fetch(url);
    const json = await result.json();

    renderMais(json.results);
}

function showInfo(json){
      
      inicial.classList.add("hidden");
      resultado.classList.remove("hidden");

      // numero de resultados

      document.querySelector('.num-result').innerHTML = `${json.total_results} resultados para ${filmName.value}`

      container.innerHTML = "";

      renderMais(json.results);

}


