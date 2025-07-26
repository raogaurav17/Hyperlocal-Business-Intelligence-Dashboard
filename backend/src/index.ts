import express from "express";
import dotenv from "dotenv";
import analysisRoutes from './api/analysis/analysis.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/analysis", analysisRoutes);

app.post("/api/analyze", (req, res) => {
    // Forward to the competitor intelligence analysis
    const { getCompetitorIntel } = require('./api/analysis/analysis.controller');
    getCompetitorIntel(req, res);
});

app.get("/", (req, res) => {
    res.send("Hyperlocal Business Intelligence is running!");
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));