import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import "../moviesCard/MoviesCard.css";

const TvSeriesCard = ({ serie }) => {
  const imgUrl = serie.poster_path
    ? `https://image.tmdb.org/t/p/w300/${serie.poster_path}`
    : "/no-image.jpg";

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className="movieCard"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-duration="2000"
      data-aos-offset="0"
    >
      <Link href={`/tv/${serie.id}`}>
        <img className="movieImg" src={imgUrl} alt={serie.name} />
      </Link>
    </div>
  );
};

export default TvSeriesCard;
