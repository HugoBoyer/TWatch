import { useState, useEffect } from 'react';

export default function useTrailerData(mediaType, id) {
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchTrailer = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // ✅ Appelle ton serveur proxy (pas directement TMDB)
                const response = await fetch(
                    `http://localhost:3000/api/${mediaType}/${id}/videos`
                );
                
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération');
                }
                
                const data = await response.json();
                
                console.log(`Vidéos pour ${mediaType} ${id}:`, data.results);
                
                // Trouve le premier trailer YouTube
                const trailer = data.results?.find(
                    video => video.type === 'Trailer' && video.site === 'YouTube'
                );
                
                if (trailer) {
                    // ✅ Parenthèses corrigées
                    setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
                    console.log(`✅ Trailer trouvé: ${trailer.key}`);
                } else {
                    setTrailerUrl(null);
                    console.log(`❌ Pas de trailer pour ${id}`);
                }
                
            } catch (err) {
                console.error('Erreur trailer:', err);
                setError(err.message);
                setTrailerUrl(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer();
    }, [mediaType, id]);

    return { trailerUrl, loading, error };
}
