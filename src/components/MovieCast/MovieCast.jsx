import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMovieCast } from "/src/services/api.js";

const MovieCast = () => {
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [movieCastData, setMovieCastData] = useState([]);
  console.log(movieId);
  useEffect(() => {
    if (!movieId) return;
    const fetchMovieCast = async () => {
      try {
        setError(null);
        setMovieCastData([]);
        const { data } = await requestMovieCast(movieId);
        setMovieCastData(data.cast);
        console.log(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        console.log("MovieCast-finally");
      }
    };
    fetchMovieCast();
  }, [movieId]);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
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
        <p style={{ color: "red" }}>
          {error}.Not found. Please, try again later.
        </p>
      )}
    </div>
  );
};

export default MovieCast;
