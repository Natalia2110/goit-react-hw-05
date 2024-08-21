// import React from "react";
import { useState, useEffect } from "react";
import MovieList from "../components/MovieList/MovieList";
import { requestTrendingMovies } from "../services/api.js";
import Loader from "../components/Loader/Loader";

// const data = trendingMovies();
// console.log(data);

const HomePage = () => {
  const [trendingMoviesList, setTrendingMoviesList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const { data } = await requestTrendingMovies();
        setTrendingMoviesList(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {trendingMoviesList !== null && (
        <MovieList onMoviesList={trendingMoviesList} />
      )}
    </div>
  );
};

export default HomePage;
