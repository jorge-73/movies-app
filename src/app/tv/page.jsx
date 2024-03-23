import Navbar from "@/components/nabvar/Navbar";
import ScrollUp from "@/components/scrollUp/ScrollUp";
import TvSeriesGrid from "@/components/tvseriesGrid/TvSeriesGrid";

const TVPage = () => {
  return (
    <div className="h-screen moviesbg">
      <Navbar />
        <TvSeriesGrid />
      <ScrollUp />
    </div>
  );
};

export default TVPage;
