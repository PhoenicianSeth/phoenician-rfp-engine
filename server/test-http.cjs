
const { GoogleAuth } = require('google-auth-library');
const https = require('https');

async function testHttp() {
    const auth = new GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    const token = await client.getAccessToken();

    console.log(`Project: ${projectId}`);

    // Construct URL for Gemini 1.5 Flash in us-central1
    const location = 'us-central1';
    const model = 'gemini-1.5-flash';
    const path = `/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:generateContent`;

    const options = {
        hostname: `${location}-aiplatform.googleapis.com`,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token.token}`,
            'Content-Type': 'application/json'
        }
    };

    const req = https.request(options, res => {
        console.log(`STATUS: ${res.statusCode}`);
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
            console.log('BODY:', data);
        });
    });

    req.on('error', error => {
        console.error('REQ ERROR:', error);
    });

    req.write(JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "Hello" }] }]
    }));
    req.end();
}

testHttp();
