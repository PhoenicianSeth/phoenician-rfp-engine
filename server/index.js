import express from 'express';
import cors from 'cors';
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Vertex AI
// Note: This requires GOOGLE_APPLICATION_CREDENTIALS env var to be set
// or a Default Application Credentials JSON file in the environment.
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'phoenician-rfp-engine';
const location = 'us-central1';

// Routes
app.post('/api/research', async (req, res) => {
    try {
        const { message, context } = req.body;

        // For now, if no credentials are set, return the mock response to avoid crashing
        // Note: In production, you'd likely want to fail if credentials are missing.
        // But for development without initial auth, we keep the check or just let Vertex try.
        // Given we are authenticating, we'll try to use VertexAI.

        // However, if we fail to init VertexAI (e.g. auth fail), it will throw.

        const vertexAI = new VertexAI({ project: projectId, location: location });
        const model = vertexAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: `System Context: You are the RFP Research Architect. \n${context || ''}` }],
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood. I am ready to analyze the RFP and provide strategic insights." }]
                }
            ],
        });

        const result = await chat.sendMessage(message);

        if (!result.response || !result.response.candidates || result.response.candidates.length === 0) {
            throw new Error("No candidates returned from Gemini");
        }

        const response = result.response.candidates[0].content.parts[0].text;

        res.json({ content: response });

    } catch (error) {
        console.error('Error querying Vertex AI:', error);

        // Fallback or Error message
        res.status(500).json({
            content: "I'm having trouble connecting to the AI service. Please check the backend logs or ensure authentication is set up."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
