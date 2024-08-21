// import React from "react";
import { useState, useEffect } from "react";
import { requestSearchMovies } from "../services/api.js";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn.jsx";
import SearchMoviesForm from "../components/SearchMoviesForm/SearchMoviesForm";

const MoviesPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesList, setMoviesList] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get("query");

  const handleOnSearchMovies = (value) => {
    setMoviesList([]);
    setPage(1);
    setSearchParams({
      query: value,
    });
  };
  const handleClickLoadMoreBtn = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };
  const showLoadMoreButton = (allPages) => {
    if (allPages !== page) {
      return setShowBtn(true);
    }
    return setShowBtn(false);
  };

  useEffect(() => {
    if (query === null) return;
    const fetchSearchMoviesByValue = async () => {
      try {
        setError(null);
        setIsLoading(true);
        setMoviesList([]);
        const { data } = await requestSearchMovies(query, page);
        if (data.results.length === 0) {
          setMoviesList([]);
          setError("Error");
        } else {
          setMoviesList(data.results);
          showLoadMoreButton(data.total_pages);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchMoviesByValue();
  }, [query, page]);

  // console.log(searchValue);
  return (
    <div>
      <SearchMoviesForm
        defaultSearchValue={query}
        onSearch={handleOnSearchMovies}
      />
      {isLoading && <Loader />}
      {error !== null && <ErrorMessage onError={query} />}
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
