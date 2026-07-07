import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

// Lazy-initialized Gemini API client
let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Configure it via Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the highly knowledgeable, inspiring, and professional "Salkyn Tours AI Advisor" for Salkyn Tours (Salkyn Eco-Adventures & Nomadic Safaris).
Your goal is to assist travelers, adventurers, and tour agencies in planning unforgettable, custom-tailored travel itineraries, active eco-expeditions, and authentic nomadic experiences in Kyrgyzstan.

About Salkyn Tours:
- Salkyn Tours (registered in Bishkek, Kyrgyzstan, "Salkyn" meaning "cool mountain breeze" in Kyrgyz) is a premium travel agency and operator specializing in eco-tourism, cultural heritage expeditions, and high-altitude mountain adventures.
- Web domains: salkyntours.kg / salkyn.com
- Services: Tailored private and group itineraries, custom yurt-camp stays, guided horse-riding tours, 4x4 off-road vehicle transfers, high-altitude mountaineering logistics, Silk Road historical walks, and visa/permit processing.
- Key Destinations Covered:
  1. Lake Song-Kul: Alpine lake at 3,016m, famous for authentic nomadic yurt experiences, pristine pastures (jailoos), and stargazing.
  2. Lake Issyk-Kul: The "Pearl of Tien Shan" (one of the world's deepest high-altitude lakes), featuring health resorts, hot springs, fairy-tale canyons (Skazka), and eagle-hunting demonstrations in Bokonbaevo.
  3. Ala-Archa National Park: Dramatic alpine gorge 40km from Bishkek, ideal for day hikes, waterfall treks, and serious peak climbing.
  4. Karakol & Jeti-Oguz: Vibrant mountain town with wooden architectures (Dungan Mosque, Russian Orthodox Cathedral) and the "Seven Bulls" red sandstone gorge.
  5. Tash Rabat: 15th-century stone caravanserai hidden in the At-Bashi mountains near the Chinese border, an ancient Silk Road fortress.
  6. Arslanbob: The world's largest ancient wild walnut forest, nestled in the Babash-Ata mountains, offering serene eco-hikes and home-stays.
- Address: 142 Chuy Avenue, Bishkek, Kyrgyz Republic.
- Contact Phone: +996 (312) 45-88-11
- Contact Email: info@salkyntours.kg

Tone and Behavior:
- Warm, inspiring, culturally respectful, adventure-minded, and highly practical.
- Speak about Kyrgyz hospitality, nomads, the mountains (Tien Shan and Pamir-Alay ranges), national dishes (Beshbarmak, Kuyrdak, Boorsok, Kymyz), and essential travel advice (visas, currency, sim cards, best seasons, acclimatization).
- Support inquiries in English, Russian, Kyrgyz, and German. Adopt the language of the user seamlessly.
- Highlight Salkyn Tours' dedication to sustainable eco-travel (supporting local communities, zero-waste yurt practices, and treating mountain nature with deep respect).
- End your responses with a friendly invitation to use our interactive Salkyn Tours Budget & Itinerary Estimator on the website, or to reach out directly to our expert Bishkek planning team.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Climate Chat Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
        return;
      }

      // Lazy-initialize Gemini SDK
      const ai = getGenAI();

      // Format messages into what generateContent expects
      // We will take the last message or format a chat structure
      // To keep it simple and robust, we can map the conversation history
      const contents = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I apologize, but I could not formulate a response. Please try again.";
      res.json({ content: reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred during processing."
      });
    }
  });

  // Client configuration API or simple health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Serve static files or setup Vite in Dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start:", err);
});
