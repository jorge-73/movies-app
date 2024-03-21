import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-6/12">
      <h2 className="text-6xl text-white font-bold">
        Get curated show and movie recommendations with Open AI
      </h2>
      <div className="flex justify-center gap-5 mt-5">
      <Link href={"/movies"} class="btn btn-secondary rounded-full font-bold px-10 opacity-80">View Movies</Link>
      <button className="btn btn-neutral rounded-full font-bold px-10 opacity-80">Ghost</button>
      </div>
    </div>
  );
};

export default LandingPage;
