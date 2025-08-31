import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://your-domain.com"],  // ✅ allow dev + production    For test purpose only, remove localhost in production
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
console.log("🔑 Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY?.slice(0, 6) + "...");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], system } = req.body;

    // Ensure the first message is from the user
    let filteredHistory = [...history];
    while (filteredHistory.length && filteredHistory[0].sender !== 'user') {
      filteredHistory.shift();
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: system
        ? { role: "system", parts: [{ text: system }] }
        : undefined,
    });

    const chat = model.startChat({
      history: filteredHistory.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
    });

    const response = await chat.sendMessage(message);

    res.json({ reply: response.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gemini request failed', details: err.message });
  }
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));
