import React from 'react';
import {
  FileDown,
  ArrowRight,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Award,
  Sparkles,
  Compass,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
  onNavigateToContact: () => void;
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResumeModal,
  onNavigateToContact,
  data = PORTFOLIO_DATA,
  isExpanded = true,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const headerConfig = data.pillarHeaders?.hero || PORTFOLIO_DATA.pillarHeaders.hero;

  return (
    <section id="hero" className="relative py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Tile Container - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-slate-50/85 border-slate-300/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-slate-400 hover:shadow-md'
          }`}
        >
          {/* Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-blue-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 text-blue-300" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800/90 text-slate-200 border border-slate-700/60">
                    {headerConfig.pillarTag}
                  </span>
                  <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                    {headerConfig.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {headerConfig.title}
                </h2>
              </div>
            </div>

            {/* Header Content Highlight & Toggle Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-slate-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/50 text-xs font-medium text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>{headerConfig.highlight}</span>
              </div>

              {/* No expand label when collapsed - purely discoverable with chevron */}
              {isExpanded ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all">
                  <span>Collapse</span>
                  <ChevronUp className="w-4 h-4 text-blue-300" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <ChevronDown className="w-4 h-4 text-blue-300" />
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Body with Lazy-Mount */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-10 animate-fadeIn">
              {/* Engineering blueprint technical corner crosshairs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 border-b border-slate-200/80 pb-3">
                <div>+ [SYS-CMD // 00.EXEC-HERO // OT-IT BUS ACTIVE]</div>
                <div>[N57°26' W01°48' · ISO-14224 VERIFIED] +</div>
              </div>

              {/* Split-Screen Hero */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                {/* Left Column: Typographic Hierarchy */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Clean unboxed kicker with dot separator */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-blue-700">
                    <span>{data.profile.currentRole}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>17 Years Global Engineering Experience</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {data.profile.location}
                    </span>
                  </div>

                  {/* Display Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 tracking-tight leading-[1.15] text-balance">
                    Pioneering <span className="text-blue-700">Applied AI &amp; Turnkey Systems</span> Across Safety-Critical Industries.
                  </h1>

                  {/* Lead Narrative */}
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    Technical &amp; Product Engineering Leader orchestrating OT/IT backbones, enterprise data fabrics, and applied AI systems. Currently steering BP’s $20M+ upstream tools portfolio—reducing technology operating costs by <strong className="text-slate-900 font-semibold">$30M YoY</strong> while unlocking <strong className="text-slate-900 font-semibold">$300M+</strong> in engineering value.
                  </p>

                  {/* Human-led Ethos Callout Box */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-2 shadow-2xs">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>The Human-Led Philosophy</span>
                    </div>
                    <p className="italic text-slate-600 text-sm">
                      &ldquo;{data.profile.humanPhilosophy}&rdquo;
                    </p>
                  </div>

                  {/* Primary Action Zone */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={data.profile.resumePdfUrl}
                      download="Jaideep_Naidu_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg shadow-sm transition-all hover:scale-[1.01] whitespace-nowrap"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download CV (PDF)</span>
                    </a>

                    <button
                      onClick={onOpenResumeModal}
                      className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
                    >
                      <span>Preview CV</span>
                    </button>

                    <button
                      onClick={onNavigateToContact}
                      className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors whitespace-nowrap"
                    >
                      <span>Connect with Jaideep</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Social Proof & LinkedIn Adjacency */}
                  <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-500 border-t border-slate-200">
                    <a
                      href={data.profile.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                      <span className="font-semibold">Verified LinkedIn Profile</span>
                      <span className="text-slate-400">· 100+ Recommendations</span>
                    </a>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <a
                      href={`mailto:${data.profile.email}`}
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{data.profile.email}</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Executive Profile & Turnkey Command Card */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
                    {/* Header profile badge */}
                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <div className="text-xs font-semibold tracking-wider text-blue-700 mb-1">
                          EXECUTIVE PROFILE
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                          {data.profile.name}
                        </h2>
                        <p className="text-sm text-slate-600 font-medium">
                          MBA · BE (Distinction) · PMP® · SAFe 5.0
                        </p>
                      </div>
                      <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
                        JN
                      </div>
                    </div>

                    {/* Turnkey Capabilities Grid */}
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-500 tracking-wide">
                        CURRENT FOCUS &amp; TURNKEY ARCHITECTURES
                      </div>
                      <div className="grid grid-cols-2 gap-2.5 text-xs">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="font-semibold text-slate-900 block">Graph RAG LLM</span>
                          <span className="text-slate-500 block text-[11px] leading-tight">20+ yrs ISO standards indexed</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="font-semibold text-slate-900 block">Palantir Foundry</span>
                          <span className="text-slate-500 block text-[11px] leading-tight">Enterprise data fabric &amp; Twin</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="font-semibold text-slate-900 block">e-Assurance (S&amp;OR)</span>
                          <span className="text-slate-500 block text-[11px] leading-tight">15k+ auditor hrs liberated</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="font-semibold text-slate-900 block">Digital Twin (ALIM)</span>
                          <span className="text-slate-500 block text-[11px] leading-tight">$35M+ multi-basin rollout</span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Well-Rounded Anchor */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                      <div className="flex items-center gap-2.5">
                        <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-900 block">52 Sovereign Nations</span>
                          <span className="text-slate-500 text-[11px]">Avid Photographer &amp; World Explorer</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Global Mindset
                      </span>
                    </div>

                    {/* Direct Connect Quick Actions */}
                    <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                      <a
                        href={`tel:${data.profile.phone.replace(/\s+/g, '')}`}
                        className="flex-1 py-2 px-3 text-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 font-medium"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-600" />
                        <span>Call Direct</span>
                      </a>
                      <a
                        href={data.profile.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 text-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors flex items-center justify-center gap-1.5 font-medium"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        <span>LinkedIn</span>
                      </a>
                      <button
                        onClick={onNavigateToContact}
                        className="flex-1 py-2 px-3 text-center rounded-lg bg-slate-900 hover:bg-blue-700 text-white font-semibold transition-colors"
                      >
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantitative Rigor Strip */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
                  {data.keyMetrics.map((metric) => (
                    <div key={metric.label} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs font-semibold text-slate-800">
                        {metric.label}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-snug">
                        {metric.sublabel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
