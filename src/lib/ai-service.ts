export interface ChatMessage {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
}

export interface FilePart {
    mimeType: string;
    gcsUri: string;
}

export async function queryAgent(message: string, context: string = '', fileParts?: FilePart[]): Promise<string> {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/research', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, context, fileParts }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Failed to query AI agent:', error);
        return "I'm having trouble connecting to my research backend. Please ensure the server is running.";
    }
}
