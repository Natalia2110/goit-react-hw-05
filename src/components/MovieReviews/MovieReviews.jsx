import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMovieReviews } from "/src/services/api.js";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  console.log(movieId);
  useEffect(() => {
    if (!movieId) return;
    const fetchMovieReviews = async () => {
      try {
        setError(null);
        setMovieReviews([]);
        const { data } = await requestMovieReviews(movieId);
        console.log(data);
        setMovieReviews(data.results);
        console.log(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        console.log("MovieReviews-finally");
      }
    };
    fetchMovieReviews();
  }, [movieId]);
  return (
    <div>
      {Array.isArray(movieReviews) && movieReviews.length !== 0 && (
        <ul>
          {movieReviews.map((review) => {
            return (
              <li key={review.id}>
                <p>Author: {review.author}</p>
                <p>{review.content}</p>
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

export default MovieReviews;
