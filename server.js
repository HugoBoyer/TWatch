import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors()); // autorise React à appeler ton serveur

// tendance TV
app.get("/api/trending", async (req, res) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    )
    const data = await response.json();
    res.json(data);
})

// genres TV
app.get("/api/genres", async (req, res) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    res.json(data);
});

// top rated TV
app.get("/api/top_rated", async (req, res) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    res.json(data);
});

// Video TV
app.get("/api/:type/:id/videos", async (req, res) => {
    const { type, id } = req.params;
    
    try {
        // Essaie d'abord en français
        let url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`;
        console.log(`🔍 Tentative FR: ${type}/${id}`);
        
        let response = await fetch(url);
        let data = await response.json();
        
        // Si pas de résultats en français, essaie en anglais
        if (!data.results || data.results.length === 0) {
            console.log(`⚠️ Aucune vidéo en FR, essai en EN pour ${type}/${id}`);
            url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
            response = await fetch(url);
            data = await response.json();
        }
        
        if (!response.ok) {
            throw new Error(`Erreur TMDB API: ${response.status}`);
        }
        
        console.log(`✅ Vidéos trouvées pour ${type}/${id}:`, data.results?.length || 0);
        res.json(data);
        
    } catch (error) {
        console.error('❌ Erreur videos:', error);
        res.status(500).json({ error: error.message, results: [] });
    }
});


app.get("/api/tv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur récupération détails" });
  }
});

app.get("/api/tv/:id/credits", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    res.json( {cast: data.cast}); // renvoie uniquement les acteurs
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du cast" });
  }
});



app.listen(3000, () => console.log("Serveur proxy sécurisé sur http://localhost:3000"));