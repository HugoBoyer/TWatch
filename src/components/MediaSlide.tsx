import { useState } from "react";
import useTrailerData from "../hooks/useTrailerData";
import { Link } from "react-router";

export default function MediaSlide({ show , onHoverChange  }) {
  const [isHovering, setIsHovering] = useState(false);
  const mediaType = show.media_type || 'tv';
  const { trailerUrl, loading, error } = useTrailerData(mediaType, show.id);


  const handleMouseEnter = () => {
    setIsHovering(true);
    onHoverChange?.(true, show.id); // 👈 on informe le parent
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    onHoverChange?.(false, show.id);
  };

  const canShowVideo = !!show.backdrop_path;

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&start=15`;
  };

  const embedUrl = getEmbedUrl(trailerUrl);

  const displayContent = isHovering && canShowVideo && embedUrl && !loading ? (
    <>
        <iframe
            className="w-full h-full rounded"
            src={embedUrl}
            title={show.name || show.title}
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
        <Link to={`/serie/${encodeURIComponent(show.name)}/${show.id}`}><h3>{show.name}</h3></Link>
    </>

  ) : (
    <div>
        <img
          className="w-full h-full object-cover object-top rounded"
          src={show.backdrop_path
            ? `https://image.tmdb.org/t/p/w300${show.backdrop_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={show.name || show.title}
        />
    </div>
  );

  return (
    // IMPORTANT : ce div est dans le SwiperSlide → on lui met le z-index monstrueux au hover
<div
  className={` relative w-full aspect-video transition-transform duration-300 ${
    isHovering ? 'scale-115 shadow-2xl' : 'scale-100'
  }`}
  style={{ transformOrigin: 'center' }}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <div className="relative w-full h-full rounded">
    {displayContent}
  </div>
  {isHovering && (loading || error) && (
    <div className="absolute inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center text-white rounded">
      {loading ? "Chargement du trailer..." : "Pas de trailer disponible"}
    </div>
  )}
</div>


  );
}