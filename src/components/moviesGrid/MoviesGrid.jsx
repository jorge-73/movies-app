"use client";
import { useEffect, useState } from "react";
import MoviesCard from "../moviesCard/MoviesCard";
import { getMoviesRequest } from "@/api/axios";
import "./MoviesGrid.css";

const MoviesGrid = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("page") || 1);
    } else {
      return 1;
    }
  });

  useEffect(() => {
    const getMovies = async () => {
      const res = await getMoviesRequest(`/discover/movie?page=${currentPage}`);
      setAllMovies(res?.data?.results);
      localStorage.setItem("page", JSON.stringify(currentPage));
      // console.log(res?.data);
    };
    getMovies();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="join grid grid-cols-12 mt-5">
        <button
          className="join-item btn btn-outline col-span-2 col-start-5 text-center"
          onClick={handlePrevPage}
        >
          <span className="text-white">Prev page</span>
        </button>
        <button
          className="join-item btn btn-outline col-span-2 col-start-7 text-center"
          onClick={handleNextPage}
        >
          <span className="text-white">Next page</span>
        </button>
      </div>
      <div className="moviesGrid">
        {allMovies.map((movie, idx) => (
          <MoviesCard key={idx} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MoviesGrid;
