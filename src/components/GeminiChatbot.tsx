import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, RotateCcw, ChevronDown, ChevronUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

interface GeminiChatbotProps {
  onExploreExperience?: () => void;
  data?: typeof PORTFOLIO_DATA;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  onExploreExperience,
  data = PORTFOLIO_DATA,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'gemini',
      text: "Hello! I am Jaideep's personal Gemini AI representative. Ask me anything about Jaideep's 17-year engineering leadership, Graph RAG systems at BP, Palantir Foundry data models, or his 52-country travels.",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prePromptQuestions = [
    "What is Jaideep's biggest success?",
    "What is Jai's best skills?",
    "How does Jaideep apply AI in Oil & Gas?",
    "What are his credentials & MBA?",
    "Tell me about his 52 countries travel",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const buildCustomContext = (d: typeof PORTFOLIO_DATA) => {
    let ctx = '';
    if (d.knowledgeGraphNotes && d.knowledgeGraphNotes.length > 0) {
      ctx += '\nKNOWLEDGE GRAPH MILESTONES & CAPABILITIES:\n';
      d.knowledgeGraphNotes.forEach((n) => {
        ctx += `- [${n.category} | ${n.timeline}] ${n.topic}: ${n.details} (Impact: ${n.impact})\n`;
      });
    }
    if (d.accomplishments && d.accomplishments.length > 0) {
      ctx += '\nKEY PROJECT SUCCESSES & OUTCOMES:\n';
      d.accomplishments.forEach((a) => {
        ctx += `- [${a.category} ${a.timeline ? `| ${a.timeline}` : ''}] ${a.title} (${a.organization}): ${a.description} (Metric: ${a.impactMetric}. ${a.significance})\n`;
      });
    }
    if (d.uploadedCVFiles && d.uploadedCVFiles.length > 0) {
      ctx += '\nUPLOADED CV VERSIONS & DETAILED ROLE RESPONSIBILITIES (KNOWLEDGE GRAPH):\n';
      d.uploadedCVFiles.forEach((c) => {
        ctx += `- [Document: ${c.versionLabel} | Role: ${c.roleContext} (${c.uploadDate})]:\n  ${c.extractedNotes}\n`;
      });
    }
    if (d.photographyExhibition && d.photographyExhibition.length > 0) {
      ctx += '\nPHOTOGRAPHY EXHIBITIONS & GEAR:\n';
      d.photographyExhibition.forEach((p) => {
        ctx += `- ${p.title} (${p.location}, ${p.camera}${p.dateTaken ? ` | Taken: ${p.dateTaken}` : ''}): ${p.story}\n`;
      });
    }
    if (d.travelExploration) {
      ctx += `\nTRAVEL PROFILE: Navigated ${d.travelExploration.totalCountries} sovereign nations across ${d.travelExploration.continents} continents. ${d.travelExploration.perspectiveStatement}\n`;
    }
    return ctx;
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const customContext = buildCustomContext(data);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          customContext,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      const reply = json.reply || 'Jaideep is awesome. Do you want to know more about him ?';

      setMessages((prev) => [
        ...prev,
        {
          id: `gemini-${Date.now()}`,
          sender: 'gemini',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      // Client-side fallback with exact grounded logic matching prompt
      const lower = textToSend.toLowerCase();
      const isRelated =
        lower.includes('jaideep') ||
        lower.includes('jai') ||
        lower.includes('success') ||
        lower.includes('accomplish') ||
        lower.includes('skill') ||
        lower.includes('experience') ||
        lower.includes('career') ||
        lower.includes('bp') ||
        lower.includes('oil') ||
        lower.includes('gas') ||
        lower.includes('ai') ||
        lower.includes('rag') ||
        lower.includes('palantir') ||
        lower.includes('digital twin') ||
        lower.includes('pharma') ||
        lower.includes('education') ||
        lower.includes('mba') ||
        lower.includes('certif') ||
        lower.includes('contact') ||
        lower.includes('travel') ||
        lower.includes('countr') ||
        lower.includes('photograph') ||
        lower.includes('lead');

      let fallbackText = 'Jaideep is awesome. Do you want to know more about him ?';

      if (isRelated) {
        if (lower.includes('success') || lower.includes('biggest')) {
          fallbackText =
            "Jaideep's biggest success is productionizing an in-house Graph RAG LLM over 20+ years of engineering standards at BP, eliminating hallucinations to unlock $100M+ in reliable discovery value, while optimizing technology OpEx by $30M YoY.";
        } else if (lower.includes('skill') || lower.includes('best')) {
          fallbackText =
            "Jaideep's standout skills are: Applied AI & Graph RAG architectures, Palantir Foundry Data Fabrics, Safety & Operational Risk (e-Assurance), and Human-Led Agile Coaching across safety-critical heavy industries.";
        } else if (lower.includes('oil') || lower.includes('gas')) {
          fallbackText =
            "In Oil & Gas, Jaideep modernizes upstream asset operations by implementing Graph RAG for engineering standards, harmonizing data pipelines into ISO standards on Palantir (~$12M CAPEX avoidance), and rolling out e-Assurance for S&OR to save 15k+ auditor hours.";
        } else if (lower.includes('travel') || lower.includes('countr') || lower.includes('52')) {
          fallbackText =
            "Jaideep has explored 52 sovereign nations across 6 continents. This global perspective helps him lead cross-cultural engineering squads across the UK, USA, Middle East, Africa, and India with deep empathy.";
        } else if (lower.includes('mba') || lower.includes('education') || lower.includes('certif')) {
          fallbackText =
            "Jaideep holds an Executive MBA from Quantic School of Business & Technology (2022) and a Bachelor of Engineering with Distinction (2008). He is certified in Palantir Foundry, AWS Cloud, PMP®, PRINCE2®, and Leading SAFe® 5.0.";
        } else {
          fallbackText =
            "Jaideep Naidu is a Technical and Product Engineering Leader with 17 years of experience delivering applied AI, enterprise data fabrics, and human-led transformation across 7 global industries.";
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `gemini-${Date.now()}`,
          sender: 'gemini',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'init-reset',
        sender: 'gemini',
        text: "Chat cleared. What would you like to know about Jaideep's experience, applied AI architectures, or credentials?",
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <section id="ai-assistant" className="w-full bg-slate-50/90 border-b border-slate-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden transition-all">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 p-0.5 shadow-sm shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center text-blue-400">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
                    <span>Ask Gemini About Jaideep</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Grounded AI
                    </span>
                  </h3>
                </div>
                <p className="text-xs text-slate-300 hidden sm:block">
                  Specifically trained on Jaideep&rsquo;s verified CV, 17-yr leadership, and applied AI systems.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-xs">Reset</span>
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle chat visibility"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Collapsible Chat Body */}
          {isExpanded && (
            <div className="p-4 sm:p-6 space-y-5 bg-white">
              {/* Pre-prompt Quick Suggestions */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>SUGGESTED QUESTIONS (CLICK TO ASK):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prePromptQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendMessage(q)}
                      disabled={isLoading}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 rounded-lg transition-all text-left shadow-2xs disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages Stream */}
              <div className="h-56 sm:h-64 overflow-y-auto space-y-3.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80">
                {messages.map((m) => {
                  const isUser = m.sender === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs mt-0.5 ${
                          isUser
                            ? 'bg-slate-900 text-white'
                            : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs'
                        }`}
                      >
                        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      <div
                        className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                          isUser
                            ? 'bg-slate-900 text-white rounded-tr-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{m.text}</p>
                        <span
                          className={`block text-[10px] mt-1 ${
                            isUser ? 'text-slate-400 text-right' : 'text-slate-400 text-left'
                          }`}
                        >
                          {m.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs shrink-0">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-xs bg-white text-slate-500 border border-slate-200 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-200" />
                      <span className="italic">Querying Jaideep&rsquo;s knowledge graph...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Gemini about Jaideep's achievements, skills, or Oil & Gas tech..."
                    disabled={isLoading}
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ask</span>
                </button>
              </form>

              {/* Grounded Invariant Disclaimer */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Grounded exclusively on Jaideep Naidu&rsquo;s CV &amp; project portfolio
                </span>
                <span className="hidden sm:inline text-slate-400">
                  Powered by Gemini 3.8 Flash
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
