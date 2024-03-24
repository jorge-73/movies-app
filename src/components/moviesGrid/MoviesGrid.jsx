"use client";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import MoviesCard from "../moviesCard/MoviesCard";
import { getMoviesRequest } from "@/api/axios";
import "./MoviesGrid.css";
import toast from "react-hot-toast";

const MoviesGrid = () => {
  const [moviesData, setMoviesData] = useState({
    movies: [],
    currentPage: 1,
    oldActive: false,
    popularActive: false,
    latestActive: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Recuperar moviesData de localStorage al cargar la página
  useEffect(() => {
    const storedMoviesData = localStorage.getItem("moviesData");
    const searchData = localStorage.getItem("search");
    if (storedMoviesData) {
      setMoviesData(JSON.parse(storedMoviesData));
    }
    if (searchData) {
      setSearchTerm(JSON.parse(searchData));
    }
  }, []);

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `/discover/movie?page=${moviesData.currentPage}`;
        if (moviesData.oldActive) {
          url = `/discover/movie?sort_by=release_date.asc&page=${moviesData.currentPage}`; // Ordenar por fecha de lanzamiento (mas viejos)
        }
        if (moviesData.latestActive) {
          url = `/discover/movie?sort_by=release_date.desc&page=${moviesData.currentPage}`; // Ordenar por fecha de lanzamiento (mas nuevos)
        }
        const res = await getMoviesRequest(url);
        // console.log(res.data.results);
        setMoviesData((prevData) => ({
          ...prevData,
          movies: res?.data?.results || [],
        }));
        localStorage.setItem("moviesData", JSON.stringify(moviesData));
      } catch (error) {
        toast.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [moviesData.currentPage, moviesData.oldActive, moviesData.latestActive]); */

  useEffect(() => {
    const searchMovies = async () => {
      try {
        let res;
        if (searchTerm) {
          res = await getMoviesRequest(
            `/search/movie?query=${searchTerm}&page=${moviesData.currentPage}`
          );
        } else {
          res = await getMoviesRequest(
            `/discover/movie?page=${moviesData.currentPage}`
          );
        }
        setMoviesData((prevData) => ({
          ...prevData,
          movies: res?.data?.results,
        }));
        // Actualizar currentPage basado en la página actual de la búsqueda
        if (res?.data?.page) {
          setMoviesData((prevData) => ({
            ...prevData,
            currentPage: res.data.page,
          }));
        }
        localStorage.setItem("moviesData", JSON.stringify(moviesData));
        localStorage.setItem("search", JSON.stringify(searchTerm));
      } catch (error) {
        toast.error("Error searching movies:", error);
      }
    };
    searchMovies();
  }, [searchTerm, moviesData.currentPage]);

  const handlePageChange = (direction) => {
    let nextPage;
    if (direction === "next") {
      nextPage = moviesData.currentPage + 1;
    } else {
      nextPage = moviesData.currentPage - 1;
    }
    // Verifica que nextPage no sea menor que 1
    nextPage = Math.max(nextPage, 1);
    setMoviesData((prevData) => ({
      ...prevData,
      currentPage: nextPage,
    }));
  };

  /* const handleTabClick = (tab) => {
    setMoviesData((prevData) => ({
      ...prevData,
      [`${tab}Active`]: !prevData[`${tab}Active`],
    }));
  }; */

  const handleClearSearch = () => {
    localStorage.removeItem("search");
    setSearchTerm("");
  };

  return (
    <>
      <div className="join grid grid-cols-12 mt-5">
        {/* <div
          role="tablist"
          className="tabs tabs-boxed col-span-2 col-start-2 bg-neutral"
        >
          <button
            role="tab"
            className={`tab h-full font-bold ${
              moviesData.oldActive && "tab-active"
            }`}
            onClick={() => handleTabClick("old")}
          >
            <span className="text-white">Older</span>
          </button>
          <button
            role="tab"
            className={`tab h-full font-bold ${
              moviesData.popularActive && "tab-active"
            }`}
            onClick={() => handleTabClick("popular")}
          >
            <span className="text-white">Popular</span>
          </button>
          <button
            role="tab"
            className={`tab h-full font-bold ${
              moviesData.latestActive && "tab-active"
            }`}
            onClick={() => handleTabClick("latest")}
          >
            <span className="text-white">Released</span>
          </button>
        </div> */}
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
        {moviesData.movies.length > 0 &&
          moviesData.movies.map((movie, idx) => (
            <MoviesCard key={idx} movie={movie} />
          ))}
      </div>
    </>
  );
};

export default MoviesGrid;
