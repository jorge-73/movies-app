import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-full md:w-6/12 px-4">
      <h2 className="text-4xl md:text-6xl text-white font-bold text-center md:text-left">
        Get curated show and movie recommendations with Open AI
      </h2>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-3 md:gap-5 mt-5">
        <Link href={"/movies"}>
          <a className="btn btn-secondary rounded-full font-bold px-6 md:px-10 py-3 md:py-4 text-base md:text-lg opacity-80">View Movies</a>
        </Link>
        <button className="btn btn-neutral rounded-full font-bold px-6 md:px-10 py-3 md:py-4 text-base md:text-lg opacity-80">Ghost</button>
      </div>
    </div>
  );
};

export default LandingPage;

