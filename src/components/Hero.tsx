import React from 'react';
import { FileDown, ArrowRight, Linkedin, Mail, MapPin, Phone, Award, Sparkles, Compass } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
  onNavigateToContact: () => void;
  data?: typeof PORTFOLIO_DATA;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResumeModal,
  onNavigateToContact,
  data = PORTFOLIO_DATA,
}) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-2">
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
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Preview CV</span>
              </button>

              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors whitespace-nowrap"
              >
                <span>Explore Experience</span>
                <ArrowRight className="w-4 h-4" />
              </a>
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
                <span className="text-slate-400">· Recommendations</span>
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

        {/* Quantitative Rigor Strip (Full-width row below the hero split) */}
        <div className="mt-14 pt-10 border-t border-slate-200">
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
    </section>
  );
};
