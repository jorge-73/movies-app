"use client";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import TvSeriesCard from "../tvseriesCard/TvSeriesCard";
import { getMoviesRequest } from "@/api/axios";
import "../moviesGrid/MoviesGrid.css";

const TvSeriesGrid = () => {
  const [allSeries, setAllSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handlePageChange = (direction) => {
    // let nextPage;
    // if (direction === "next") {
    //   nextPage = moviesData.currentPage + 1;
    // } else {
    //   nextPage = moviesData.currentPage - 1;
    // }
    // // Verifica que nextPage no sea menor que 1
    // nextPage = Math.max(nextPage, 1);
    // setMoviesData((prevData) => ({
    //   ...prevData,
    //   currentPage: nextPage,
    // }));
  };

  const handleClearSearch = () => {}

  return (
    <>
      <div className="join grid grid-cols-12 mt-5">
      <button
          className="join-item btn btn-outline col-span-2 md:col-span-1 col-start-2 md:col-start-3 lg:col-span-2 lg:col-start-2 text-center"
          onClick={() => handlePageChange("prev")}
        >
          <span className="text-white">Prev page</span>
        </button>
        <button
          className="join-item btn btn-outline col-span-2 md:col-span-1 col-start-4 md:col-start-4 lg:col-span-2 lg:col-start-4 text-center"
          onClick={() => handlePageChange("next")}
        >
          <span className="text-white">Next page</span>
        </button>
        <div className="flex col-span-1 col-start-7 lg:col-start-8 xl:col-start-10">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto bg-neutral text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-neutral mx-1" onClick={handleClearSearch}>
            <MdClear />
          </button>
        </div>
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
