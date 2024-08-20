// import React from "react";
import { useState, useEffect } from "react";
import { requestSearchMovies } from "../services/api.js";
import MovieList from "../components/MovieList/MovieList";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn.jsx";
import SearchMoviesForm from "../components/SearchMoviesForm/SearchMoviesForm";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [moviesList, setMoviesList] = useState(() => {
    const localStorageValue = window.localStorage.getItem("moviesListValue");
    if (localStorageValue !== null) {
      return JSON.parse(localStorageValue);
    }
    [];
  });
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  const handleOnSearchMovies = (value) => {
    setMoviesList([]);
    setPage(1);
    setSearchValue(value);
  };
  const handleClickLoadMoreBtn = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    console.log(nextPage);
  };
  const showLoadMoreButton = (allPages) => {
    if (allPages !== page) {
      // console.log(`all pages: ${allPages}`);
      return setShowBtn(true);
    }
    return setShowBtn(false);
  };

  useEffect(() => {
    window.localStorage.setItem("moviesListValue", JSON.stringify(moviesList));
  }, [moviesList]);

  useEffect(() => {
    if (searchValue === null) return;
    const fetchSearchMoviesByValue = async () => {
      try {
        setError(null);
        setIsLoading(true);
        setMoviesList([]);
        const { data } = await requestSearchMovies(searchValue, page);
        if (data.results.length === 0) {
          setMoviesList([]);
          setError("Error");
        } else {
          setMoviesList(data.results);
          showLoadMoreButton(data.total_pages);
        }
        // console.log(data.results);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
        console.log("finally Search Movies");
      }
    };
    fetchSearchMoviesByValue();
  }, [searchValue, page]);

  console.log(searchValue);
  return (
    <div>
      <SearchMoviesForm onSubmit={handleOnSearchMovies} />
      {isLoading && <Loader />}
      {error !== null && <ErrorMessage onError={searchValue} />}
      {Array.isArray(moviesList) && moviesList.length !== 0 && (
        <MovieList onMoviesList={moviesList} />
      )}
      {showBtn && moviesList.length > 0 && (
        <LoadMoreBtn onClickBtn={handleClickLoadMoreBtn} />
      )}
    </div>
  );
};

export default MoviesPage;
