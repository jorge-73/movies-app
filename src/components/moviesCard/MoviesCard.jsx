import Link from "next/link";
import "./MoviesCard.css";

const MoviesCard = ({ movie }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  return (
    <div className="card movieCard text-white">
      <Link href={`/movies/${movie.id}`}>
        <img className="movieImg" src={imgUrl} alt={movie.title}/>
        {/* <div>{movie.title}</div> */}
      </Link>
    </div>
  );
};

export default MoviesCard;
