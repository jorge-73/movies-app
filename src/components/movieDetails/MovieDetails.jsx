import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import Link from "next/link";

const MovieDetails = ({ movie, urlImg }) => {
  return (
    <div className="movie-principal bg-slate-800 mx-4 md:mx-8 p-6 md:p-4 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <div className="md:mr-8 mb-4 md:mb-0">
          <img
            src={urlImg}
            alt={movie.title}
            className="rounded-lg"
            style={{ minWidth: "16rem", maxWidth: "100%" }}
          />
        </div>
        <div className="flex flex-col justify-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            {movie.title}
          </h3>
          <p className="text-base md:text-lg mb-2">{movie.overview}</p>
          <p className="text-base md:text-lg mb-2">
            <span className="font-bold">Genre: </span>
            {movie.genres.map((genre) => genre.name).join(" / ")}
          </p>
          <p className="text-base md:text-lg mb-2">
            <span className="font-bold">Date: </span>
            {movie.release_date}
          </p>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <button className="flex items-center btn btn-neutral">
              <i className="mr-2">
                <FaPlay />
              </i>
              Play
            </button>
            <Link
              href={movie?.homepage}
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
  );
};

export default MovieDetails;
