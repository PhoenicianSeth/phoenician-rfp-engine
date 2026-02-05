export interface ChatMessage {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
}

export async function queryAgent(message: string, context: string = ''): Promise<string> {
    try {
        const response = await fetch('http://localhost:3001/api/research', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, context }),
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
