const axios = require('axios');
const report = require('./report');



/**
 * Genera una lista de 10 peliculas de forma random.
 * Obtiene Title, Premiere y vewers de THE MOVIE DB, 
 * y por medio de 2 funciones se generan los datos ficticios de director y array de actores
 */
const generatorMovies = async () => {
  const director = () => {
    const directors = [
      'Martin Scorsese',
      'Steven Spielberg',
      'Ingmar Bergman',
      'Federico Fellini',
    ];
    let random = Math.floor(Math.random() * 4);
    return directors[random];
  };
  const actors = () => {
    const actors = [
      'Leonardo Di Caprio',
      'Guillermo Franchela',
      'Mariano Martinez',
      'Brad Pitt',
    ];
    let random = Math.floor(Math.random() * 4);
    return actors[random];
  };
  try {
    let index = Math.floor(Math.random() * 100);
    const respuesta = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?page=${index}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzY3MzAwZTdjZTE0MzdiNTQyNTUzNzM2MzY1YzZjNCIsInN1YiI6IjVlNDFhNTE2NDE0NjVjMDAxNGNkOTRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ux_nPdSJrLo4lVircrWgY3cIuAHtAOIouOHCrTwaC1s',
        },
      }
    );
    const { results } = respuesta.data;

    let movies = [];
    let movieList = [];
    //console.log(results);
    for (let i = 0; i < 10; i++) {
      movieList = [...movieList, results[i]];
    }
    // console.log(results);
    movieList.map(
      lamovie =>
        (movies = [
          ...movies,
          {
            title: lamovie.original_title,
            viewers: lamovie.vote_count,
            premiere: lamovie.release_date,
            actors: [actors()],
            director: director(),
          },
        ])
    );

    return movies;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Obtengo una array con 10 peliculas creadas aleatoreamente
 * y las inserto en la DB por medio de la API
 *
 */
exports.insertMovies = async () => {
  try {
    const listMovies = await generatorMovies();
    
    listMovies.forEach(
      // async movie => await axios.post('http://localhost:5000/movies/', movie)
      
      async movie => await axios.post(process.env.URL_APP1,movie)
      
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Obtiene todas las peliculas y las elimina una a una
 */
exports.deleteAllMovies = async () => {
  try {
    const respuesta = await axios.get(process.env.URL_APP1);
    //console.log(respuesta);
    const actualMovies = respuesta.data;
    actualMovies.forEach(
      async movie =>
        await axios.delete(`${process.env.URL_APP1}${movie._id}`)
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * genera un valor random entre 0 y 3,
 * otiene todas las peliculas y se actualiza los viewers
 * luego genera el update en la db
 */
exports.updateMovieViewer = async () => {
  try {
    let random = Math.floor(Math.random() * 4);
    const movieList = await axios.get(process.env.URL_APP1);
    //console.log(respuesta);
    const actualMovies = movieList.data;
    let movie = actualMovies[random];
    console.log(movie.title, movie.viewers);
    movie = { ...movie, viewers: movie.viewers + 1 };
    console.log(movie.title, movie.viewers);
    let respuesta = await axios.put(
      `${process.env.URL_APP1}${movie._id}`,
      movie
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * obtiene la lista de peliculas y las ordena de forma descendiente
 * tomando como valor los viewers. Luego devuelve dicha coleccion ordenada
 */
exports.movieListSort = async () => {
  try {
    const movieList = await axios.get(process.env.URL_APP1);
    //console.log(respuesta);

    const actualMovies = movieList.data;

    actualMovies.sort((a, b) => b.viewers - a.viewers);
    let filtrado = actualMovies.filter((movie, index) => index < 5);
    console.log(filtrado);
    report.sendReport(filtrado);
  } catch (error) {
    console.log(error);
  }
};
