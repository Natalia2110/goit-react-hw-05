import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMovieCast } from "/src/services/api.js";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieCastData, setMovieCastData] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieCast = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setMovieCastData([]);
        const { data } = await requestMovieCast(movieId);

        if (data.cast.length === 0) {
          setError("We don't have any cast for this movie");
        }
        setMovieCastData(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      {isLoading && <Loader />}
      {Array.isArray(movieCastData) && movieCastData.length !== 0 && (
        <ul>
          {movieCastData.map((cast) => {
            return (
              <li key={cast.id}>
                <img
                  width={250}
                  alt="poster"
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                      : defaultImg
                  }
                />
                <p>{cast.name}</p>
                <p>Character: {cast.character}</p>
              </li>
            );
          })}
        </ul>
      )}
      {error !== null && (
        <p style={{ color: "red" }}>{error}. Please, try again later.</p>
      )}
    </div>
  );
};

export default MovieCast;
