import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, X, Send, Sparkles, RefreshCw, 
  HelpCircle, User, ArrowRight 
} from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  { text: "Recommend a 7-day cultural yurt itinerary.", label: "7-Day Yurt Itinerary" },
  { text: "What is the best season to visit Lake Song-Kul?", label: "Song-Kul Best Season" },
  { text: "Do I need a tourist visa to visit Kyrgyzstan?", label: "Visa Requirements" },
  { text: "Tell me about traditional Kyrgyz nomadic hospitality and food.", label: "Nomadic Food & Culture" }
];

export default function ClimateAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am Salkyn Tours' adventure guide. I can help recommend breathtaking tour itineraries, guide you on mountain seasons, suggest safety tips for high-altitude horse treks, or explain traditional nomadic customs. How can I help you plan your Kyrgyzstan travel experience today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           messages: [...messages, userMsg].map(m => ({
             role: m.role,
             content: m.content
           }))
         })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with Salkyn Tours advisor server.");
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.content,
        timestamp: new Date()
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `Travel Guide Connection Issue: ${error.message || "Unable to reach the server. Please verify your GEMINI_API_KEY secret key is configured."}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    handleSendMessage(suggestionText);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I am Salkyn Tours' adventure guide. I can help recommend breathtaking tour itineraries, guide you on mountain seasons, suggest safety tips for high-altitude horse treks, or explain traditional nomadic customs. How can I help you plan your Kyrgyzstan travel experience today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="climate-ai-fab"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-6 h-6" key="close" />
          ) : (
            <div className="flex items-center gap-2" key="open">
              <MessageSquare className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out font-sans font-bold text-sm whitespace-nowrap hidden md:inline">
                Salkyn Tours AI Advisor
              </span>
            </div>
          )}
        </AnimatePresence>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="climate-ai-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-full max-w-md h-[550px] bg-white rounded-[28px] shadow-2xl z-50 border border-slate-200 overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-[#0F172A] px-5 py-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-extrabold text-sm leading-tight">Salkyn Tours AI</h3>
                  <p className="text-xs text-slate-400">Kyrgyzstan Nomad Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-blue-400 flex items-center justify-center flex-shrink-0 text-xs border border-blue-500/10 shadow-md">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className="max-w-[80%] flex flex-col text-left">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-[#0F172A] text-white rounded-tr-none"
                          : "bg-white text-slate-800 rounded-tl-none border border-slate-200/80"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1 self-start">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-md">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#0F172A] text-blue-400 flex items-center justify-center flex-shrink-0 text-xs animate-pulse">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-white text-slate-500 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200/80 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-75"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-150"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-300"></span>
                    <span className="text-xs text-slate-400 ml-1">Planning route...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions list when chat is empty or fresh */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-slate-100 bg-white text-left">
                <p className="text-xs font-sans text-slate-400 mb-2 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  Common travel questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(sug.text)}
                      className="text-xs bg-slate-50 border border-slate-100 text-slate-700 py-1.5 px-3 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors text-left cursor-pointer flex items-center gap-1"
                    >
                      {sug.label}
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about yurt camps, packing, visa rules..."
                disabled={isLoading}
                className="flex-1 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-[#0F172A] text-white p-2.5 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:hover:bg-[#0F172A] cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
