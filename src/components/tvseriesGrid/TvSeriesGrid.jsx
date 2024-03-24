"use client";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import TvSeriesCard from "../tvseriesCard/TvSeriesCard";
import { getMoviesRequest } from "@/api/axios";
import "../moviesGrid/MoviesGrid.css";
import toast from "react-hot-toast";

const TvSeriesGrid = () => {
  const [seriesData, setSeriesData] = useState({
    series: [],
    currentPage: 1,
    oldActive: false,
    popularActive: false,
    latestActive: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Recuperar seriesData de localStorage al cargar la página
  useEffect(() => {
    const storedSeriesData = localStorage.getItem("seriesData");
    const searchData = localStorage.getItem("searchSeries");
    if (storedSeriesData) setSeriesData(JSON.parse(storedSeriesData));
    if (searchData) setSearchTerm(JSON.parse(searchData));
  }, []);

  useEffect(() => {
    const getSeries = async () => {
      try {
        let res;
        if (searchTerm) {
          res = await getMoviesRequest(
            `/search/tv?query=${searchTerm}&page=${seriesData.currentPage}`
          );
        } else {
          res = await getMoviesRequest(
            `/discover/tv?page=${seriesData.currentPage}`
          );
          // console.log(res?.data);
        }
        setSeriesData((prevData) => ({
          ...prevData,
          series: res?.data?.results,
        }));
        // Actualizar currentPage basado en la página actual de la búsqueda
        if (res?.data?.page) {
          setSeriesData((prevData) => ({
            ...prevData,
            currentPage: res.data.page,
          }));
        }
        localStorage.setItem("seriesData", JSON.stringify(seriesData));
        localStorage.setItem("searchSeries", JSON.stringify(searchTerm));
      } catch (error) {
        toast.error("Error searching movies:", error);
      }
    };
    getSeries();
  }, [searchTerm, seriesData.currentPage]);

  const handlePageChange = (direction) => {
    let nextPage;
    if (direction === "next") {
      nextPage = seriesData.currentPage + 1;
    } else {
      nextPage = seriesData.currentPage - 1;
    }
    // Verifica que nextPage no sea menor que 1
    nextPage = Math.max(nextPage, 1);
    setSeriesData((prevData) => ({
      ...prevData,
      currentPage: nextPage,
    }));
  };

  const handleClearSearch = () => {
    localStorage.removeItem("searchSeries");
    setSearchTerm("");
  };

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
        {seriesData.series.length > 0 &&
          seriesData.series.map((serie, idx) => (
            <TvSeriesCard key={idx} serie={serie} />
          ))}
      </div>
    </>
  );
};

export default TvSeriesGrid;
