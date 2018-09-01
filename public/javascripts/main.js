$(document).ready(() => {
    $('#seachForm').on('submit', (e) => {
        let searchText = $('#searchText').val();

        //funcion 1
        getMovies(searchText);
        e.preventDefault();
    });

});

//funcion 1
function getMovies(searchText) {
    //solucion a la falla de api
    //https://www.imdb.com/find?ref_=nv_sr_fn&q=home&s=all
    //https://www.imdb.com/find?ref_=nv_sr_fn&q=home&s=all
    // funcionando bien 'http://www.omdbapi.com/?t=' + searchText + '&apikey=272f72db' //
    // la busqueda de un solo elemento se hace con 't' y se se quieren varios se pones 's'
    axios.get('https://www.omdbapi.com/?s=' + searchText + '&apikey=272f72db')
        .then((response) => {
            console.log(response);//saber que data nos esta dando el api
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="${movie.Poster}" alt="">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movies Details</a>

                    </div>
                </div>
                `;
            });

            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}

// nuevo metodo de aceurdo al id de la pelicula

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'buscadorResultado';
    console.log('error de data');
    return false;


}


//

function getMovie() {

    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?i=' + movieId + '&apikey=272f72db')
        .then((response) => {
            console.log(response);//saber que data nos esta dando el api
            let movie = response.data;

            let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail" />
             
                </div>
                
                <div class="col-md-8">
                
                <h2>${movie.Title}</h2>
             <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-danger">Views Web</a>
            <a href="../index.html" class="btn btn-default"><strong>Go Back To Search</strong></a>
 

                <ul class="list-group">
                <li class="list-group-item"> <strong>Genero:</strong> ${movie.Genre}</li>
                <li class="list-group-item"> <strong>Actors:</strong> ${movie.Actors}</li>
                <li class="list-group-item"> <strong>Awards:</strong> ${movie.Awards}</li>
                <li class="list-group-item"> <strong>Country:</strong> ${movie.Country}</li>
                <li class="list-group-item"> <strong>DVD:</strong> ${movie.DVD}</li>
                <li class="list-group-item"> <strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"> <strong>Metascore:</strong> ${movie.Metascore}</li>
                <li class="list-group-item"> <strong>Runtime:</strong> ${movie.Runtime}</li>
                <li class="list-group-item"> <strong>Released:</strong> ${movie.Released}</li>
                
                </ul>
                
                </div>
            
            
            </div>   
            
  
  
            
</div>
            
</div>
            
            
            `;


            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err);

        })


}