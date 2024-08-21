import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMovieReviews } from "/src/services/api.js";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setMovieReviews([]);
        const { data } = await requestMovieReviews(movieId);

        if (data.results.length === 0) {
          setError("We don't have any reviews for this movie");
        }
        setMovieReviews(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
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
        <p style={{ color: "red" }}>{error}.Please, try again later.</p>
      )}
    </div>
  );
};

export default MovieReviews;
