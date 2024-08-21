import { Link, useLocation } from "react-router-dom";

const MovieList = ({ onMoviesList }) => {
  const location = useLocation();
  // console.log(onMoviesList);
  return (
    <div>
      <ul>
        {onMoviesList.map((movie) => {
          return (
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              key={movie.id}
            >
              <h2>{movie.title}</h2>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
