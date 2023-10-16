import { useEffect, useState } from 'react';

const KEY = '8a8a2f8b';

export default function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
            signal: controller.signal
          });
          if (!res.ok) throw new Error('Something went wrong');
          const data = await res.json();
          setMovies(data.Search);
          setIsError('');
          if (data.Response === 'False') throw new Error('Movie not found');
        } catch (err) {
          if (err !== 'AbortError') setIsError(err);
        } finally {
          setIsLoading(false);
          setIsError(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { isLoading, isError, movies };
}
