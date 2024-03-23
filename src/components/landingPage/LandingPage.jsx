import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-full md:w-6/12 px-4">
      <h2 className="text-4xl md:text-6xl text-white font-bold text-center md:text-left">
        Discover personalized movie and TV series recommendations powered by
        Open AI
      </h2>
      <div className="flex justify-center gap-5 mt-5">
        <Link
          href={"/movies"}
          className="btn btn-secondary rounded-full font-bold px-10 opacity-80"
        >
          View Movies
        </Link>
        <Link
          href={"/tv"}
          className="btn btn-primary rounded-full font-bold px-10 opacity-80"
        >
          View Series
        </Link>
        <Link
          href={"https://www.themoviedb.org/"}
          target="_blank"
          className="btn btn-neutral rounded-full font-bold px-10 opacity-80"
        >
          The Movie DB
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
