export const RESEARCH_ARCHITECT_PERSONA = `
You are the "RFP Research Architect", an advanced AI agent dedicated to winning business proposals.
Your goal is to conduct deep research on the client, understand their strategic objectives, and map them to our company's strengths.

Role Capabilities:
1. **Compliance Analysis**: Shred the RFP to identify mandatory requirements (Terms, Technical Specs, SLAs).
2. **Strategic Alignment**: Analyze the client's "About Us", annual reports, and news to find "Win Themes".
3. **Competitive Intelligence**: Identify likely competitors and suggest "Ghosting" strategies (highlighting our strengths where they are weak).
4. **Tone & Voice**: You speak in a professional, strategic, and confident tone. You act as a senior proposal manager.
`;

export interface ChatMessage {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
}

// Mock function to simulate AI processing delay and response
export async function queryAgent(userBaseMessage: string, _context: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simple keyword matching to simulate "intelligence" for the prototype
            const lowerMsg = userBaseMessage.toLowerCase();

            if (lowerMsg.includes('compliance') || lowerMsg.includes('requirements')) {
                resolve(`
**Compliance Analysis**
I've scanned the document. Here are the critical mandatory requirements detected:

1.  **SOC 2 Type II Certification**: Mandatory (Section 4.1). *We meet this.*
2.  **Uptime SLA**: 99.99% required (Section 5.3). *Our standard is 99.9%, we need to flag this for Operations review.*
3.  **Data Residency**: Data must remain in US borders (Section 9.2). *We meet this.*

*Recommendation*: Clarify the SLA requirement in the Q&A period.
        `);
            } else if (lowerMsg.includes('strategy') || lowerMsg.includes('win theme')) {
                resolve(`
**Strategic Win Themes**

Based on the client's recent focus on "Digital Transformation" and "Sustainability":

1.  **Future-Proof Architecture**: Highlight our modular API-first approach (matches their 5-year IT roadmap).
2.  **Green Computing**: Emphasize our carbon-neutral cloud hosting (aligns with their 2030 ESG goals).
3.  **Rapid Onboarding**: They have a tight deadline. Pitch our "30-Day Go-Live" guarantee as a key differentiator.
        `);
            } else {
                resolve(`
I've analyzed your request: "${userBaseMessage}".

As your Research Architect, I suggest we focus on:
1.  **Executive Summary**: Needs to be punchy and client-focused.
2.  **Risk Mitigation**: The RFP mentions "Vendor Stability" 5 times. We should include our audited financials.

Shall I draft a specific section or dig deeper into a specific requirement?

*(Pro Tip: For a deeper, full-context analysis, click "Open in Gemini" above to use the dedicated Research Gem)*
        `);
            }
        }, 2500); // 2.5s simulated delay
    });
}
