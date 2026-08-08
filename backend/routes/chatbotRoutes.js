const express = require("express");
const router = express.Router();

dotenv = require("dotenv");
dotenv.config();

const PROJECT_CONTEXT = `This project is a Public Service Information Assistant for India. It helps citizens discover government schemes, understand eligibility, learn about required documents, and get AI guidance. The app includes pages for Home, Schemes, Eligibility, About, Contact, Login/Register, Profile, Dashboard, and a chatbot. Popular schemes highlighted include PM Kisan, Ayushman Bharat, PM Awas Yojana, National Scholarship Portal, Ujjwala Yojana, and PM Internship Scheme.`;

const PROJECT_KNOWLEDGE = `
Project facts:
- Home page message: discover government schemes, check eligibility, understand required documents, and receive instant AI-powered guidance.
- How it works: enter details, AI analysis, check eligibility.
- Smart features: smart scheme search, AI assistant, document guidance.
- Schemes shown in the home page cards:
  - Pradhan Mantri Awas Yojana: affordable housing support for eligible families.
  - Ayushman Bharat Yojana: health coverage up to ₹5 lakh per family.
  - PM Kisan Samman Nidhi: income support of ₹6,000 per year to farmers.
  - National Scholarship Portal: scholarships for students across India.
  - Pradhan Mantri Ujjwala Yojana: clean cooking fuel for BPL families.
  - PM Internship Scheme: internship opportunities for youth.
- Schemes page: explores government schemes and assistance for healthcare, education, employment, agriculture, and financial support.
- Eligibility page: checks eligibility for government schemes and provides personalized guidance.
`;

const SYSTEM_PROMPT = `You are a helpful, accurate chatbot for a public service information website focused on Indian government schemes. Answer naturally, directly, and conversationally. Use the project context below as grounding when the user asks about the app, schemes, eligibility, or documents. If you are unsure, say so clearly instead of inventing details.`;

function buildMessages(message) {
  return [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\nProject context:\n${PROJECT_CONTEXT}\n\nProject knowledge:\n${PROJECT_KNOWLEDGE}`,
    },
    {
      role: "user",
      content: message,
    },
  ];
}

router.post("/chat", async (req, res) => {
  try {
    const message = req.body?.message?.trim();

    if (!message) {
      return res.status(400).json({ error: "A message is required." });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Groq API key is not configured." });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          temperature: 0.3,
          max_tokens: 512,
          messages: buildMessages(message),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: data?.error?.message || data?.error || "Failed to get response from Groq.",
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim() ||
      "I’m not able to answer that right now. Please try again in a moment.";

    return res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Unable to generate a response right now." });
  }
});

module.exports = router;
