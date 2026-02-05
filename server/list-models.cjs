
const { VertexAI } = require('@google-cloud/vertexai');
const dotenv = require('dotenv');
dotenv.config();

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'phoenician-rfp-engine';
const location = 'us-central1';

async function listModels() {
    console.log(`Checking models in ${projectId}/${location}...`);
    // Note: The Vertex SDK doesn't have a simple "listModels" for Model Garden.
    // We have to assume what works.
    // Let's try to verify if we can access the generic PublisherModel.
    try {
        const vertexAI = new VertexAI({ project: projectId, location });
        const model = vertexAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        // Just checking object creation isn't enough, we need to generate.
        console.log("Model object created. Attempting generation...");
        await model.generateContent("test");
        console.log("SUCCESS: gemini-1.5-flash is accessible.");
    } catch (e) {
        console.log("ERROR on gemini-1.5-flash:");
        console.log(e.message);
        if (e.message.includes("404")) {
            console.log("\nPOSSIBLE CAUSES:");
            console.log("1. The project does not have the 'Vertex AI API' enabled (checked: it is enabled).");
            console.log("2. The project is not linked to a Billing Account (Vertex AI requires billing).");
            console.log("3. You are in a VPC Service Controls perimeter blocking access.");
        }
    }
}

listModels();
