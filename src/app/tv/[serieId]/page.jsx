"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMoviesRequest } from "@/api/axios";
import Navbar from "@/components/nabvar/Navbar";
import SerieDetails from "@/components/serieDetails/SerieDetails";

const SerieId = () => {
  const params = useParams();
  const [serie, setSerie] = useState(null);

  useEffect(() => {
    const getSerie = async () => {
      const res = await getMoviesRequest(`/tv/${params?.serieId}`);
      // console.log(res.data);
      setSerie(res?.data);
    }
    getSerie();
  }, [params?.serieId])

  if (!serie) return null;
  const urlImg = `https://image.tmdb.org/t/p/w300/${serie.poster_path}`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen moviebg pt-10 px-8 md:px-8 lg:px-16 xl:px-20">
        <SerieDetails serie={serie} urlImg={urlImg} />
      </div>
    </>
  );
};

export default SerieId;
