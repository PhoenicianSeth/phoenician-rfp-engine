import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';
import { queryAgent } from '../lib/ai-service';
import type { ChatMessage, FilePart } from '../lib/ai-service';

interface ResearchAgentProps {
  initialContext?: string;
  fileParts?: FilePart[];
}

export function ResearchAgent({ initialContext, fileParts }: ResearchAgentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Added scrollAreaRef
  const hasStartedRef = useRef(false); // Added hasStartedRef

  // Auto-Start Analysis for New Projects
  useEffect(() => {
    const startAutoAnalysis = async () => {
      // Only auto-start if initialContext is provided, no messages yet, and it hasn't started before
      if (initialContext && messages.length === 0 && !hasStartedRef.current) {
        hasStartedRef.current = true; // Mark as started to prevent re-triggering
        setIsTyping(true);

        // Add system greeting message
        const systemMsg: ChatMessage = {
          id: 'init',
          role: 'agent',
          content: "I have received your RFP documents and Content Library assets. I am now analyzing the requirements, synthesizing a strategy, and generating your initial draft proposal. This may take a moment...",
          timestamp: new Date(),
        };
        setMessages([systemMsg]);

        try {
          const prompt = "Please act as the Lead Proposal Architect. Synthesize the provided RFP documents (requirements) and the Content Library (assets/historical data). 1) Identify the key winning themes. 2) Outline the proposal structure. 3) Draft the Executive Summary and Key Methodology sections. Ensure the tone is compliant, competitive, and compelling.";

          const response = await queryAgent(prompt, initialContext, fileParts);

          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'agent',
            content: response,
            timestamp: new Date()
          }]);
        } catch (error) {
          console.error(error);
          // Optionally add an error message to the chat
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'agent',
            content: "An error occurred during analysis. Please try again or provide more details.",
            timestamp: new Date()
          }]);
        } finally {
          setIsTyping(false);
        }
      }
    };

    startAutoAnalysis();
  }, [initialContext, messages.length, fileParts]); // Dependencies for the effect

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await queryAgent(input, initialContext || "Current RFP Context", fileParts);
      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 ml-[260px] h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex flex-col">
      {/* Header - Matching Dashboard/Library Style */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#001A38] mb-1 flex items-center gap-3">
                <Bot className="text-[#7C3AED]" size={32} />
                Research Agent
              </h1>
              <p className="text-sm text-gray-500">Interactive deep dive analysis and strategy generation</p>
            </div>
            <a
              href="https://gemini.google.com/gem/1k9BmpMwUcH_TuxQak2qXNHqeGa_Qcs-R?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#a855f7] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Open in Gemini
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area - Fixed Height for Chat */}
      <div className="flex-1 overflow-hidden p-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 flex flex-col h-full overflow-hidden relative">

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'agent'
                  ? 'bg-gradient-to-br from-indigo-50 to-white border border-indigo-100'
                  : 'bg-gradient-to-br from-[#7C3AED] to-[#a855f7]'
                  }`}>
                  {msg.role === 'agent' ? (
                    <Bot size={20} className="text-[#7C3AED]" />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>

                {/* Bubble */}
                <div className={`space-y-1 max-w-3xl ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-5 rounded-2xl text-sm whitespace-pre-line text-left shadow-sm ${msg.role === 'agent'
                    ? 'bg-gray-50 text-[#001A38] rounded-tl-none border border-gray-100'
                    : 'bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-white rounded-tr-none shadow-purple-500/20'
                    }`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium px-1 uppercase tracking-wider">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 animate-in fade-in duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={20} className="text-[#7C3AED]" />
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
                  <Loader2 size={16} className="animate-spin text-[#7C3AED]" />
                  <span className="text-xs font-medium text-gray-500">Analyzing RFP data...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex gap-4 items-end bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-purple-500/10 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your Research Architect..."
                className="flex-1 px-4 py-3 bg-transparent border-none focus:ring-0 outline-none text-sm text-[#001A38] placeholder-gray-400 resize-none h-14 max-h-32"
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !input.trim()}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#001A38] text-white hover:bg-[#002a5c] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-900/20"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-gray-400">
                AI can make mistakes. Please verify important details.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
