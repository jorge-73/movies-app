"use client";
import { useEffect, useState } from "react";
import TvSeriesCard from "../tvseriesCard/TvSeriesCard";
import { getMoviesRequest } from "@/api/axios";
import "../moviesGrid/MoviesGrid.css";

const TvSeriesGrid = () => {
  const [allSeries, setAllSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("seriesPage") || 1);
    } else {
      return 1;
    }
  });

  useEffect(() => {
    const getSeries = async () => {
      const res = await getMoviesRequest(`/discover/tv?page=${currentPage}`);
      setAllSeries(res?.data?.results);
      localStorage.setItem("seriesPage", JSON.stringify(currentPage));
      // console.log(res?.data);
    };
    getSeries();
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
        {allSeries.map((serie, idx) => (
          <TvSeriesCard key={idx} serie={serie} />
        ))}
      </div>
    </>
  );
};

export default TvSeriesGrid;
