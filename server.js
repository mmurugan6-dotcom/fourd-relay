import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const app = express();
app.use(cors());

const SOURCE_URL = "https://example.com/4d"; // later replace with real URL

app.get("/api/4d/latest", async (req, res) => {
  try {
    const response = await fetch(SOURCE_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const first = $("#firstPrize").text().trim() || "1234";
    const second = $("#secondPrize").text().trim() || "5678";
    const third = $("#thirdPrize").text().trim() || "9012";

    res.json({
      prizes: { first, second, third },
      fetchedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
