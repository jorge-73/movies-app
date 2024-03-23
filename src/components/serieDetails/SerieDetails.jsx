"use client";
import { useState, useEffect } from "react";
import { getMoviesRequest } from "@/api/axios";
import MovieVideoPlayer from "../movieVideo/MovieVideoPlayer";
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import Link from "next/link";
import toast from "react-hot-toast";

const SerieDetails = ({ serie, urlImg }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getSerieVideo = async () => {
      const res = await getMoviesRequest(`/tv/${serie?.id}/videos`);
      if (!res?.data) setVideos([]);
      setVideos(res?.data?.results);
    };
    getSerieVideo();
  }, []);

  const handleClickVideo = () => {
    if (videos.length > 0) {
      document.getElementById("my_modal2").showModal();
    } else {
      toast.error("Videos not Found");
    }
  };

  return (
    <>
      <div className="bg-slate-800 mx-4 md:mx-8 p-6 md:p-4 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:mr-8 mb-4 md:mb-0">
            <img
              src={urlImg}
              alt={serie.title}
              className="rounded-lg"
              style={{ minWidth: "16rem", maxWidth: "100%" }}
            />
          </div>
          <div className="flex flex-col justify-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
              {serie.name}
            </h3>
            <p className="text-base md:text-lg mb-2">{serie.overview}</p>
            <p className="text-base md:text-lg mb-2">
              <span className="font-bold">Genre: </span>
              {serie.genres.map((genre) => genre.name).join(" / ")}
            </p>
            <p className="text-base md:text-lg mb-2">
              <span className="font-bold">First air Date: </span>
              {serie.first_air_date}
            </p>
            <p className="text-base md:text-lg mb-2">
              <span className="font-bold">Number of Seasons: </span>
              {serie.number_of_seasons}
            </p>
            <p className="text-base md:text-lg mb-2">
              <span className="font-bold">Number of Episodes: </span>
              {serie.number_of_episodes}
            </p>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <button
                className="flex items-center btn btn-neutral"
                onClick={handleClickVideo}
              >
                <i className="mr-2">
                  <FaPlay />
                </i>
                Play
              </button>
              <Link
                href={serie?.homepage}
                target="_blank"
                className="flex items-center btn btn-neutral"
              >
                <i className="mr-2">
                  <FaCircleInfo />
                </i>
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal2" className="modal">
        <div className="modal-box w-11/12 max-w-7xl bg-neutral-950">
          <MovieVideoPlayer videos={videos} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-neutral">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SerieDetails;
