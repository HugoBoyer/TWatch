import { useEffect, useState } from "react";

export default function ChoiceSerieFilm() {
    const [data, setData] = useState({});

    useEffect(() => {
        async function load() {
            const genres = await fetch("http://localhost:3000/api/genres").then(r => r.json());
            const trending = await fetch("http://localhost:3000/api/trending").then(r => r.json());

            const genreMap = Object.fromEntries(genres.genres.map(g => [g.id, g.name]));

            const byGenre = {};

            trending.results.forEach(show => {
                show.genre_ids.forEach(id => {
                    const name = genreMap[id];
                    if (!byGenre[name]) byGenre[name] = [];
                    byGenre[name].push(show);
                });
            });

            setData(byGenre);
            console.log(trending, genres)
        }

        load();
    }, []);

    return (
        <div className="mx-auto px-20">
            <h2>Trending TV Series (par genre)</h2>
            {Object.entries(data).map(([genre , shows ]) => (   
                <div key={genre}>
                    <h3>{genre}</h3>
                    <div className="gap-5 grid grid-cols-6">
                        {shows.map(show => (
                            <div key={show.id} className="bg-white rounded overflow-hidden">
                                <img src={show.poster_path ? 
                                    `https://image.tmdb.org/t/p/w300${show.poster_path}`
                                    : "https://via.placeholder.com/300x450?text=No+Image"} 
                                    alt={show.name} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}