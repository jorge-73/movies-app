import Navbar from "@/components/nabvar/Navbar";
import MoviesGrid from "@/components/moviesGrid/MoviesGrid";
import ScrollUp from "@/components/scrollUp/ScrollUp";

const MoviesPage = () => {
  return (
    <div className="h-screen moviesbg">
      <Navbar />
      <MoviesGrid />
      <ScrollUp />
    </div>
  );
};

export default MoviesPage;
