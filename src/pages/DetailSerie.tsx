import { useParams } from "react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export function DetailSerie() {
    const {id} = useParams()
    console.log("ID serie", id)
    const [data, setData] = useState(null)
    const [videos, setVideos] = useState([]);
    const [actor, setActor] = useState([])
    
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:3000/api/tv/${id}`)
            const json = await res.json()
            setData(json)
        

            const videoRes = await fetch(`http://localhost:3000/api/tv/${id}/videos`);
            const videoJson = await videoRes.json();
            setVideos(videoJson.results || []);

            const actorRes = await fetch(`http://localhost:3000/api/tv/${id}/credits`);
            const actorJson = await actorRes.json();
            setActor(actorJson.cast   || []);
        }
        fetchData()
    }, [id])

console.log("ID serie", id)
// → 223300

    if (!data) return <p>Chargement...</p>;

    return (
        <>
            <Header />  
            <div className="flex mx-auto px-20 gap-12">
                <div>
                    <img className="h-100" src={data?.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "https://via.placeholder.com/300x450"} 
                    alt={data?.name} />
                    <p>Ma note etoile</p>
                    <p>Du {data?.first_air_date}</p>
                    <p>Au {data?.first_air_date}</p>
                    <p>Série de </p>
                    <p>Type</p>
                    <p>Genres: {data?.genres.map(g => g.name).join(", ")}</p>
                    <p>Pays d'origine: </p>
                    <p>Diffusseur:</p>
                </div>
                <div>
                    <div>
                        <h1 className="md:text-4xl">{data.name}</h1>
                        <p></p>
                        <h2>{data.vote_average}</h2>
                    </div>
                    <div>
                        <h3>Fiche technique</h3>
                        <p>description</p>
                        <h3>CASTING</h3>
                        <ul className="grid grid-cols-6 gap-4">
                            {actor.map(a => (
                                <li key={a.id}>
                                    <img className="w-33 rounded-lg" src={a.profile_path ? 
                                        `https://image.tmdb.org/t/p/w500${a.profile_path}`:
                                        "https://via.placeholder.com/300x450?text=No+Image"
                                    } alt={`Poster de l'acteur ${a.name}`} />
                                    {a.name} — 
                                    <p className="text-gray-400">{a.character}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Bande Annonce</h3>
                        {videos.length > 0 ? (
                            (() => {
                            const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube");
                            return trailer ? (
                                <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&controls=1`}
                                title={trailer.name}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                ></iframe>
                            ) : <p>Aucune bande-annonce disponible</p>;
                            })()
                        ) : <p>Chargement des vidéos...</p>}
                    </div>
                </div>
            </div>
        </>
    )
}