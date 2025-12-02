import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules"

import "swiper/css";
import "swiper/css/navigation";

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
                <div key={genre} className="my-8">
                    <h3>{genre}</h3>
                    <Swiper 
                        slidesPerView={6}   
                        spaceBetween={10}
                        navigation={true}
                        modules={[Navigation]}
                        rewind={true}
                    >
                        {shows.map(show => (
                            <SwiperSlide key={show.id}>
                                <div  className="rounded overflow-hidden">
                                    <img className="w-full h-40 object-cover object-top rounded" src={show.backdrop_path ? 
                                        `https://image.tmdb.org/t/p/w300${show.backdrop_path}`
                                        : "https://via.placeholder.com/300x450?text=No+Image"} 
                                        alt={show.name} 
                                    />
                                    <div className="text-sm text-center mt-1">{show.name}</div>
                                </div>
                            </SwiperSlide>
                            
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>
    )
}

