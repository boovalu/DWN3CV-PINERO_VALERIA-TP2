const APIKEY = "fd24ad9d";

const searchPeli = document.getElementById('buscarPeli');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// Carga pelis por APIKEY
async function cargarPelis(buscar){
	const LINK = `https://omdbapi.com/?s=${buscar}&page=1&apikey=${APIKEY}`;
	
	const res = await fetch(`${LINK}`);
    const data = await res.json();
     console.log(data.Search);
    if(data.Response == "True") ListaPelis(data.Search);
}
  
/* DEvuelve el listado de pelis*/
function buscarPeli(){
    let buscar = (searchPeli.value).trim();
    if(buscar.length > 0){
        searchList.classList.remove('hide-search-list');
        cargarPelis(buscar);
    } else {
        searchList.classList.add('hide-search-list');
    }
}
  
function ListaPelis(pelis){
	searchList.innerHTML = "";
    for(let i = 0; i < pelis.length; i++){
        let peliListaItem  = document.createElement('div');
        peliListaItem.dataset.id = pelis[i].imdbID; // setting movie id in  data-id
        peliListaItem.classList.add('search-list-item');
        if(pelis[i].Poster != "N/A")
            peliPortada = pelis[i].Poster;
        else 
            peliPortada = "imgs/resource/filmnotfound.png";

        peliListaItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img class="img-fluid" src = "${peliPortada}">
        </div>
        <div class = "search-item-info">
            <h3>${pelis[i].Title}</h3>
            <p>${pelis[i].Year}</p>
        </div>
        `;
        searchList.appendChild(peliListaItem);
    }
    cargaDetalle();

}


function cargaDetalle(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            searchPeli.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "imgs/resource/filmnotfound.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
	<input type="hidden" id="title" value="${details.Title}" />
        <h3 class = "movie-title">${details.Title} <a href="#" class="btn btn-warning" id="agregar-favoritos"><span class="material-icons text-white">star_rate</span></a>
		</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Año: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released"> Estreno: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Género:</b> ${details.Genre}</p>
        <p class = "writer"><b>Escritor:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actores: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Idioma:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
		
    </div>
    `;
}



window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});

