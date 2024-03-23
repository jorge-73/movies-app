const MovieVideoPlayer = ({ videos }) => {
  // Filtrar solo los videos de YouTube
  const trailerVideos = videos.filter((video) => video.site === "YouTube");

  // Filtrar solo los que tengan de nombre Official Trailer
  const officialTrailer = trailerVideos.filter(
    (video) => video.name === "Official Trailer"
  );

  // Si no hay videos disponibles con nombre "Official Trailer", retornar null
  if (!trailerVideos || trailerVideos.length === 0) {
    return null;
  }

  // Obtener el primer video de la lista filtrada
  const trailerVideo = officialTrailer[0] || trailerVideos[0];

  // URL del video de YouTube
  const youtubeUrl = `https://www.youtube.com/embed/${trailerVideo.key}`;

  return (
    <div className="flex justify-center items-center w-full h-full">
      <iframe
        className="w-full md:w-96 lg:w-3/4 xl:w-4/5"
        height="425"
        src={youtubeUrl}
        title={trailerVideo.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieVideoPlayer;
