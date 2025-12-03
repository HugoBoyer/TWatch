import { useState } from "react";
import useTrailerData from "../hooks/useTrailerData";

export default function MediaSlide({ show }) {
    const [isHovering, setIsHovering] = useState(false);
    const mediaType = show.media_type || 'tv'; 
    const { trailerUrl, loading, error } = useTrailerData(mediaType, show.id);
    
    // ✅ Parenthèses correctes
    console.log(`ID: ${show.id}, URL Trailer: ${trailerUrl}, Loading: ${loading}, Erreur: ${error}`);
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false); 
    
    const canShowVideo = !!show.backdrop_path;
    
    const getEmbedUrl = (url) => {
        if (!url) return null;
        const baseUrl = url.includes('embed') ? url : url;
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}autoplay=1&mute=1&controls=0&modestbranding=1&start=15`;
    };
    
    const embedUrl = getEmbedUrl(trailerUrl);
    
    const displayContent = isHovering && canShowVideo && embedUrl && !loading ? (
        <iframe
            className="w-full h-40 object-cover object-top rounded" 
            src={embedUrl}
            title={show.name || show.title}
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    ) : (
        <img 
            className="w-full h-40 object-cover object-top rounded" 
            src={show.backdrop_path ? 
                `https://image.tmdb.org/t/p/w300${show.backdrop_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            } 
            alt={show.name || show.title} 
        />
    );
    
    return (
        <div 
            className="max-h-180 relative"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
        >
            {displayContent}
            
            {isHovering && loading && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white">
                    Chargement du trailer...
                </div>
            )}
            
            {isHovering && error && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-xs">
                    Pas de trailer disponible
                </div>
            )}
        </div>
    );
}
