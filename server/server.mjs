import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = process.env.PORT || 5174;

// ✅ Middleware
app.use(cors({ origin: "*" })); // You can restrict later to your domain
app.use(express.json());

// ✅ Check API Key
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Health check
app.get("/", (req, res) => {
  res.send({ status: "ok", service: "AI Chat API" });
});

// ✅ Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid request", details: "Message is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);

    const reply =
      result.response?.text() || "I'm sorry, I don’t have a response.";

    res.json({ reply });
  } catch (err) {
    console.error("❌ Gemini API error:", err);

    let details = "Unknown error";
    if (err instanceof Error) details = err.message;

    res.status(500).json({
      error: "Gemini request failed",
      details,
    });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ API running at http://localhost:${port}`);
  console.log(
    `🔑 Gemini key loaded: ${process.env.GEMINI_API_KEY.slice(0, 6)}...`
  );
});

