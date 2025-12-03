import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules"
import "swiper/css";
import "swiper/css/navigation";



export default function Caroussel({ items }) {

    return (
        <>
            <Swiper
                rewind={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {items.map((show) => (
                    <SwiperSlide key={show.id } className="max-h-180">
                        <img className="w-full h-auto object-cover object-top"
                            src={show.backdrop_path ? 
                                `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`:
                                "https://via.placeholder.com/300x450?text=No+Image"
                            }
                            alt={show.name}  
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}