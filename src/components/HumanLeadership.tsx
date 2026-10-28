import React from 'react';
import { Heart, Users, Linkedin, Sparkles, MessageSquareQuote, CheckCircle2, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HumanLeadershipProps {
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const HumanLeadership: React.FC<HumanLeadershipProps> = ({
  data = PORTFOLIO_DATA,
  isExpanded = false,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const headerConfig = data.pillarHeaders?.leadership || PORTFOLIO_DATA.pillarHeaders.leadership;

  const leadershipPrinciples = [
    {
      title: 'Empathy Before Architecture',
      description:
        'Software cannot succeed if the human workflow is not respected. We conduct on-site shadowing with field operators and upstream inspectors before a single line of schema is drawn.',
    },
    {
      title: 'Vendor Neutrality & High-Trust Squads',
      description:
        'Eliminating the adversarial dynamic between client and tier-1 vendor squads. Aligning multi-vendor teams under unified Scrum cadences prevented $50M+ in CAPEX write-offs.',
    },
    {
      title: 'Psychological Safety in Innovation',
      description:
        'Engineers build revolutionary AI systems like Graph RAG only when given safe sandboxes to experiment, benchmark, and fail fast without fear of blame.',
    },
    {
      title: 'Dynamic Deviation Over Bureaucracy',
      description:
        'Transitioned 10,000+ global engineers from static 300-page document reviews to self-service, deviation-led dynamic workflows that respect their time.',
    },
  ];

  return (
    <section id="leadership" className="py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillar Architectural Tile - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-amber-50/60 border-amber-300/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-amber-400 hover:shadow-md'
          }`}
        >
          {/* Distinct Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-amber-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-800/80 border border-amber-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Heart className="w-5 h-5 text-amber-200" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-800/90 text-amber-200 border border-amber-400/30">
                    {headerConfig.pillarTag}
                  </span>
                  <span className="text-xs text-amber-200/90 font-medium hidden sm:inline">
                    {headerConfig.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {headerConfig.title}
                </h2>
              </div>
            </div>

            {/* Content Highlight in Header + Expand Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-amber-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/20 text-xs font-medium text-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{headerConfig.highlight}</span>
              </div>

              {/* Naturally discoverable: show Collapse when expanded, icon only when collapsed */}
              {isExpanded ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all">
                  <span>Collapse</span>
                  <ChevronUp className="w-4 h-4 text-amber-200" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <ChevronDown className="w-4 h-4 text-amber-200" />
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Pillar Body with lighter amber tinted background */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
              {/* Technical Crosshairs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-amber-900/70 border-b border-amber-200/70 pb-3">
                <div>+ [PILLAR 05 // HUMAN RESIDUE // HIGH-TRUST SQUADS]</div>
                <div>[PEOPLE FIRST · PSYCHOLOGICAL SAFETY · 100+ RECOMMENDATIONS] +</div>
              </div>

              <div className="max-w-3xl space-y-2">
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  Algorithmic sophistication is meaningless without human resonance. Real leadership means listening to the frontline, creating psychological safety, and coaching global teams to believe in what they are building together.
                </p>
              </div>

              {/* Leadership Principles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leadershipPrinciples.map((principle, index) => (
                  <div
                    key={principle.title}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-700">
                      <span>0{index + 1}.</span>
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* LinkedIn Recommendations Showcase */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1">
                      <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                      <span>LINKEDIN PEER &amp; STAKEHOLDER RECOMMENDATIONS</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      How People Connect With Jaideep
                    </h3>
                  </div>

                  <a
                    href={data.profile.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0a66c2] hover:bg-[#084e96] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>View Verified LinkedIn Recommendations</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-blue-700 font-bold">
                          <MessageSquareQuote className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{rec.highlight}</span>
                        </div>

                        <p className="text-sm text-slate-700 italic leading-relaxed">
                          &ldquo;{rec.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{rec.author}</div>
                          <div className="text-slate-600 text-[11px] font-medium">{rec.title}</div>
                          <div className="text-slate-500 text-[11px]">{rec.company}</div>
                        </div>
                        <div className="text-right text-[11px] text-slate-500 max-w-[150px] truncate">
                          {rec.relationship}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* LinkedIn Footer Link Callout */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-700 shrink-0" />
                    <span>
                      <strong>Deep Professional Bonds:</strong> 17 years building high-trust relationships across BP, BJSS, Informa, Capgemini, and L&amp;T.
                    </span>
                  </div>
                  <a
                    href={data.profile.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
