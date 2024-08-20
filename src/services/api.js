import axios from "axios";
const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWJmMzM0MWIzN2Q2MDU4MTM5NzhmMjdkOGY5NDNjYyIsIm5iZiI6MTcyMzkwNjUyOC4wMTUxMTEsInN1YiI6IjY2YzBhZjkyMmI5ODhjMjJhOGQwYTUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yxk4HMR8Ph74uJ8-3K3_awpenmLBHrnjUdytgDWMeys",
  },
};

export const requestTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const request = await axios.get(url, options);
  return request;
};

export const requestSearchMovies = async (query, page) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const searchRequest = await axios.get(url, options);
  return searchRequest;
};

export const requestByMovieID = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const movieByMovieId = await axios.get(url, options);
  return movieByMovieId;
};

export const requestMovieCast = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const movieCastMovieId = await axios.get(url, options);
  return movieCastMovieId;
};

export const requestMovieReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const movieReviewsByMovieId = await axios.get(url, options);
  return movieReviewsByMovieId;
};
