import ChoiceSerieFilm from "../components/ChoiceSerieFilm";
import Header from "../components/Header";
import Caroussel from "../components/Caroussel";
import '../pages/Home.css';
import useFetchData from "../hooks/useFetchData"

export default function Home () {
    const { data: trendingShows, loading, error } = useFetchData("http://localhost:3000/api/trending");
    if (loading) return <div>Chargement des tendances...</div>;
    if (error) return <div>Erreur: {error}</div>;
    const limitedTrendingShows = trendingShows.slice(0, 5)
    return (
        <>
            <Header />  
            <Caroussel items={limitedTrendingShows}/>
            <ChoiceSerieFilm />
        </>
    )
}