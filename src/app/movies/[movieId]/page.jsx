"use client";
import { getMoviesRequest } from "@/api/axios";
import MovieDetails from "@/components/movieDetails/MovieDetails";
import Navbar from "@/components/nabvar/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MovieId = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const res = await getMoviesRequest(`/movie/${movieId}`);
      // console.log(res.data);
      setMovie(res.data);
    };
    getMovie();
  }, [movieId]);

  if (!movie) return null;
  const urlImg = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen moviebg pt-10 px-8 md:px-8 lg:px-16 xl:px-20">
        <MovieDetails movie={movie} urlImg={urlImg} />
      </div>
    </>
  );
};

export default MovieId;
