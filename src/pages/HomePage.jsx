// import React from "react";
import { useState, useEffect } from "react";
import MovieList from "../components/MovieList/MovieList";
import { requestTrendingMovies } from "../services/api.js";

// const data = trendingMovies();
// console.log(data);

const HomePage = () => {
  const [trendingMoviesList, setTrendingMoviesList] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const { data } = await requestTrendingMovies();
        // console.log(data.results);
        setTrendingMoviesList(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    };
    fetchTrendingMovies();
  }, []);
  // console.log(trendingMoviesList);

  return (
    <div>
      <h1>Trending today</h1>
      {trendingMoviesList !== null && (
        <MovieList onMoviesList={trendingMoviesList} />
      )}
    </div>
  );
};

export default HomePage;
