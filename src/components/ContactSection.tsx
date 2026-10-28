import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  CheckCircle2,
  FileDown,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResumeModal,
  data = PORTFOLIO_DATA,
  isExpanded = false,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    topic: 'Turnkey AI & Heavy Industry Modernization',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const headerConfig = data.pillarHeaders?.contact || PORTFOLIO_DATA.pillarHeaders.contact;

  const topics = [
    'Turnkey AI & Heavy Industry Modernization',
    'Executive Product & Engineering Leadership',
    'Graph RAG & Enterprise Data Platforms',
    'Advisory & Consulting Engagements',
    'Photography & Creative Dialogue',
    'General Inquiry / Coffee & Catchup',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your name, email, and message.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        organization: '',
        topic: 'Turnkey AI & Heavy Industry Modernization',
        message: '',
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Tile Container - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-blue-50/40 border-blue-200/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-blue-400 hover:shadow-md'
          }`}
        >
          {/* Distinct Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-blue-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-900/80 border border-blue-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <MessageSquare className="w-5 h-5 text-blue-200" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-blue-800/90 text-blue-200 border border-blue-400/30">
                    {headerConfig.pillarTag}
                  </span>
                  <span className="text-xs text-blue-200/90 font-medium hidden sm:inline">
                    {headerConfig.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {headerConfig.title}
                </h2>
              </div>
            </div>

            {/* Header Content Highlight & Toggle Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-blue-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-400/20 text-xs font-medium text-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>{headerConfig.highlight}</span>
              </div>

              {/* Naturally discoverable: show Collapse when expanded, icon only when collapsed */}
              {isExpanded ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all">
                  <span>Collapse</span>
                  <ChevronUp className="w-4 h-4 text-blue-200" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <ChevronDown className="w-4 h-4 text-blue-200" />
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Body with Lazy-Mount */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
              {/* Technical crosshairs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 border-b border-slate-200/80 pb-3">
                <div>+ [DIRECT DISPATCH // CONNECT &amp; ADVISORY // ZERO LATENCY]</div>
                <div>[LONDON HQ · GLOBAL MOBILITY · CONFIDENTIAL] +</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Left Column: Direct Channels & Download CV Card */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      Let&rsquo;s Build Something Extraordinary
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Whether you are exploring turnkey AI solutions for a safety-critical industry, scaling enterprise data fabrics, or looking for seasoned executive product leadership, I am always energized by bold ideas.
                    </p>
                  </div>

                  {/* Direct Contact Cards */}
                  <div className="space-y-3">
                    <a
                      href={`mailto:${data.profile.email}`}
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-600 transition-all flex items-center gap-3.5 group shadow-2xs"
                    >
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Direct Email</div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {data.profile.email}
                        </div>
                      </div>
                    </a>

                    <a
                      href={`tel:${data.profile.phone.replace(/\s+/g, '')}`}
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-600 transition-all flex items-center gap-3.5 group shadow-2xs"
                    >
                      <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Telephone (UK)</div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors font-mono">
                          {data.profile.phone}
                        </div>
                      </div>
                    </a>

                    <a
                      href={data.profile.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#0a66c2] transition-all flex items-center gap-3.5 group shadow-2xs"
                    >
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-[#0a66c2] group-hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">LinkedIn Network</div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                          linkedin.com/in/jaideepnaidu
                        </div>
                      </div>
                    </a>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3.5 text-xs text-slate-600 shadow-2xs">
                      <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Based in London, United Kingdom</span>
                        <span>Available for global travel, advisory &amp; executive mandates</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Resume Download Callout */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 uppercase tracking-wider">
                        Official CV Attachment
                      </span>
                      <span className="text-slate-500 text-[11px]">PDF Document</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Download the complete verified curriculum vitae with full project delivery details and enterprise credentials.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={data.profile.resumePdfUrl}
                        download="Jaideep_Naidu_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 text-center text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Download CV</span>
                      </a>
                      <button
                        onClick={onOpenResumeModal}
                        className="py-2 px-3 text-center text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors shadow-2xs"
                      >
                        Preview Document
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Contact Form */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Fill in the details below and Jaideep will respond directly within 24 hours.
                      </p>
                    </div>

                    {submitted ? (
                      <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h4 className="text-lg font-bold text-slate-900">Message Dispatched Successfully</h4>
                        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                          Thank you for reaching out. Your message has been forwarded directly to Jaideep Naidu. You can also connect immediately on LinkedIn or via telephone.
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="mt-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                        >
                          Send Another Note
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMessage && (
                          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                            {errorMessage}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Your Full Name <span className="text-blue-600">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. John Henderson"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Your Email Address <span className="text-blue-600">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. j.henderson@energycorp.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Organization / Company
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. BP, Shell, Equinor, Siemens"
                              value={formData.organization}
                              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Topic of Discussion
                            </label>
                            <select
                              value={formData.topic}
                              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                            >
                              {topics.map((t) => (
                                <option key={t} value={t} className="text-slate-900">
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Message <span className="text-blue-600">*</span>
                          </label>
                          <textarea
                            required
                            rows={5}
                            placeholder="Share your goals, challenges, or context..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Transmitting Message...</span>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Message to Jaideep</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                            Confidential &amp; direct routing
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            Response typically under 24 hrs
                          </span>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
