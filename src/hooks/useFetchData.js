import { useEffect, useState } from "react";

export default function useFetchData(apiUrl) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let isMounted = true

        async function fetchData() {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! Statut: ${response.status} lors de l'appel à ${apiUrl}`);
                }
                const result = await response.json()
                if(isMounted) {
                    setData(result.results || result)
                }
            } catch (err) {
                if(isMounted) {
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        // Fonction de nettoyage de useEffect
        return () => {
            isMounted = false;
        };

    }, [apiUrl])

    return { data, loading , error}
}