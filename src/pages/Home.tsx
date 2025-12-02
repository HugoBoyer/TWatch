import ChoiceSerieFilm from "../components/ChoiceSerieFilm";
import Header from "../components/Header";
import Caroussel from "../components/Caroussel";
import '../pages/Home.css';
import useFetchData from "../hooks/useFetchData"

export default function Home () {
    const { data: trendingShows, loading: trendingLoading, error: trendingError } = useFetchData("http://localhost:3000/api/trending");
    const {data : topRatedShows, loading: topRatedLoading, error: topRatedError} = useFetchData("http://localhost:3000/api/top_rated");
    
    const isLoading = trendingLoading || topRatedLoading
    const hasError = trendingError || topRatedError;

    if (isLoading) return <div>Chargement des tendances...</div>;
    if (hasError) return <div>Erreur: {trendingError || topRatedError}</div>;

    const limitedTrendingShows = (trendingShows || []).slice(0, 5)
    const top10Shows = (topRatedShows || []).slice(0, 10);

    if (limitedTrendingShows.length === 0 && top10Shows.length === 0) {
        return <div>Aucune donnée disponible.</div>;
    }
    return (
        <>
            <Header />  
            <Caroussel items={limitedTrendingShows}/>
            <ChoiceSerieFilm top10Shows={top10Shows}/>
        </>
    )
}