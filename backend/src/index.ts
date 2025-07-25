import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
    res.send("Hyperlocal Business Intelligence is running!");
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));