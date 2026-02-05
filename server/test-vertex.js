
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';
dotenv.config();

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'phoenician-rfp-engine';
const location = 'us-central1';

console.log(`Testing Connection to Project: ${projectId} in ${location}`);

async function testModel(modelName) {
    console.log(`\n--- Testing Model: ${modelName} ---`);
    const vertexAI = new VertexAI({ project: projectId, location });
    const model = vertexAI.getGenerativeModel({ model: modelName });

    try {
        const result = await model.generateContent("Hello, are you online?");
        const response = await result.response;
        console.log(`✅ SUCCESS: ${modelName} responded.`);
        console.log(`Response: ${response.candidates[0].content.parts[0].text}`);
    } catch (error) {
        console.error(`❌ FAILED: ${modelName}`);
        console.error('Full Error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    }
}

async function run() {
    await testModel('gemini-1.5-flash');
    await testModel('gemini-1.0-pro');
}

run();
