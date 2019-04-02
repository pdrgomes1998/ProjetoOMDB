var apiUrl = "http://www.omdbapi.com/?apikey=f02be0fe&s=";
var input = document.querySelector("#title");

var films = [
    "Thor",
    "Thor Ragnarok",
    "Thor The Dark World",
    "The Incredible Hulk",
    "Hulk",
    "Planet Hulk",
    "Avengers",
    "Avengers Infinity War",
    "Avengers Age of Ultron",
    "Captain America",
    "Pirates of The Caribbean",
    "American Pie",
    "Arrow",
    "The GodFather",
    "The ShawShank Redemption",
    "Batman Origins",
    "Batman The Dark Night",
    "Schindlers List",
    "Lord of the Rings",
    "Star Wars",
    "Forrest Gump",
    "Inception",
    "Matrix",
    "Avatar",
    "Suicid Squad",
    "Prison Break",
    "Breaking Bead",
    "La Casa de Papel",
    "Limitless",
    "The Intouchables",
    "Spider Man"
  ];

$('#title').autocomplete({

  source: films
});
$(document).ready(() => {

    $('#button1').click('submit', (e) => {
        let findText = $('#title').val();
        console.log(findText)
        console.log('findText')
        getMovies(findText);
        e.preventDefault();

    });
});

function getMovies(page) {
    let pagination = sessionStorage.setItem("pagina", page)
    console.log("PAGE GETMOVIE", page)
    let pageFilter = page != null ? `&page=${page}` : '';
    axios.get('http://www.omdbapi.com/?s=' + input.value + '&apikey=f02be0fe' + pageFilter)
        .then((response) => {
            
            let movies = response.data.Search;
            let output = '';
            generatePagination(response.data.totalResults)
            $.each(movies, (index, movie) => {
                if (movie.Poster != "N/A") {
                    console.log("poster != N/A")
                    output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-info" href="#">Mais Detalhes</a>        
                    </div>
                </div>    
            `
                } else {
                    console.log("poster == N/A")
                    output += `
                <div class="col-md-3">
                    <div class="well">
                        <img src="img/notfoundimg.jpg">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-info" href="#">Mais Detalhes</a>             
                    </div>
                </div>    
            `;
                }
            });
            generatePagination(response.data.totalResults)
            console.log("~~~~total Results", response.data.totalResults)
            $('#teste').html(output);


        })
        .catch((err) => {
            console.log(err)
        });
}
function generatePagination(pages) {
    const paginas = document.getElementById("rodape")
    let data = ''
    for (let index = 0; index < (pages / 10); index++) {
        data += `<li onclick="javascript:getMovies(${index + 1})">${index + 1}</li>`, ''
    }
    paginas.innerHTML = `<ul class="pagination">
     <li class="page-item">
         <a class="page-link" href="#" aria-label="Previous">
             <span aria-hidden="true">&laquo;</span>
             <span class="sr-only">Previous</span>
         </a>
     </li>
     <li class="page-item">
     <a id="rodape" class="page-link" href="#">${data}</a>
     </li>
         <a class="page-link" href="#" aria-label="Next">
             <span aria-hidden="true">&raquo;</span>
             <span class="sr-only">Next</span>
         </a>
     </li>
 </ul>`
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?apikey=f02be0fe&i=' + movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
            <div class="row">
              <div class="col-md-4">
                <img src="${movie.Poster}">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genero:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Lançamento:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Avanliação Fonte:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>Avaliação IMDB:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Diretor:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Escritor(a):</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Atores:</strong> ${movie.Actors}</li>
                        <li class="list-group-item"><strong>Sinopse:</strong>  ${movie.Plot}</li>
                        <li class="list-group-item"><strong>Ficou curioso?  </strong> 
                         <a href="http://imdb.com/title/${movie.imdbID}"><button type="submit"class="btn btn-link">Saiba mais sobre o filme: ${movie.Title}</button></a>
                         </li>
                        
                    </ul>
                </div>
               </div>   
            </div>

        `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err)
        });


        
}
