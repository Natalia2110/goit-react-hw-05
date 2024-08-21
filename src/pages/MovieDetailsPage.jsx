// import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { requestByMovieID } from "../services/api.js";
import Loader from "../components/Loader/Loader.jsx";
import { useState, useEffect, useRef } from "react";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const backLinkRef = useRef(location.state?.from ?? "/movie");

  useEffect(() => {
    if (!movieId) return;
    setError(null);
    const fetchrequestByMovieID = async () => {
      try {
        setIsLoading(true);
        const { data } = await requestByMovieID(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchrequestByMovieID();
  }, [movieId]);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      {movieDetails !== null && (
        <div>
          <Link to={backLinkRef.current}>⬅ Go back</Link>
          <div>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : defaultImg
              }
              alt={`${movieDetails.original_title} movie poster`}
              width={600}
            />
            <div>
              <div>
                <h2> {movieDetails.title}</h2>
                <p>User score: {movieDetails.vote_average}</p>
              </div>
              <div>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
              </div>
              <div>
                <h3>Genres</h3>
                <p>
                  {movieDetails.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>

            <Outlet />
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      {error !== null && (
        <p style={{ color: "red" }}>{error}. Please, try again later.</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
