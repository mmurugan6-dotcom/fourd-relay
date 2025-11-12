import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (_req, res) => {
  res.send("✅ fourd-relay up. Try /api/mock or /api/4d/latest");
});

app.get("/healthz", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// Mock endpoint (works even without SOURCE_URL or selectors)
app.get("/api/mock", (_req, res) => {
  res.json({
    drawDate: "2025-11-12",
    drawNo: "5678",
    prizes: {
      first: "1234",
      second: "5678",
      third: "9012",
      starters: Array.from({ length: 10 }, (_, i) => String(1000 + i)),
      consolations: Array.from({ length: 10 }, (_, i) => String(2000 + i)),
    },
    source: "mock",
    fetchedAt: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 8080;        // <-- IMPORTANT on Render
app.listen(PORT, () => console.log("Relay listening on " + PORT));
