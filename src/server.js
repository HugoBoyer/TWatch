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

app.listen(3000, () => console.log("Serveur proxy sécurisé sur http://localhost:3000"));