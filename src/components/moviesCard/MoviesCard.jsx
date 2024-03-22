import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import "./MoviesCard.css";

const MoviesCard = ({ movie }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const imgUrl = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  
  return (
    <div
      className="movieCard"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-duration="2000"
      data-aos-offset="0"
    >
      <Link href={`/movies/${movie.id}`}>
        <img className="movieImg" src={imgUrl} alt={movie.title} />
      </Link>
    </div>
  );
};

export default MoviesCard;
