import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceItem } from '../data/portfolioData';

interface ExperienceSectionProps {
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data = PORTFOLIO_DATA,
  isExpanded = true,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const [expandedJobId, setExpandedJobId] = useState<string>('bp');
  const headerConfig = data.pillarHeaders?.experience || PORTFOLIO_DATA.pillarHeaders.experience;

  const toggleJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedJobId(expandedJobId === id ? '' : id);
  };

  return (
    <section id="experience" className="py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillar Architectural Tile - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-blue-50/70 border-blue-300/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-blue-400 hover:shadow-md'
          }`}
        >
          {/* Distinct Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-blue-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-800/80 border border-blue-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Briefcase className="w-5 h-5 text-blue-200" />
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

            {/* Content Highlight in Header + Expand Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-blue-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-400/20 text-xs font-medium text-blue-200">
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

          {/* Collapsible Pillar Body with lighter tinted background */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
              {/* Pillar Technical Crosshair & Overview Description */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-blue-900/70 border-b border-blue-200/70 pb-3">
                <div>+ [PILLAR 01 // CAREER TRACK // OIL &amp; GAS LEADERSHIP]</div>
                <div>[BP · BJSS · CAPGEMINI · L&amp;T] +</div>
              </div>

              <div className="max-w-3xl space-y-2">
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  Leading engineering squads, capital allocation, and digital modernization across Oil &amp; Gas supermajors, automotive leaders, defense backbones, and healthcare analytics.
                </p>
              </div>

              {/* Experience Timeline Cards */}
              <div className="space-y-6">
                {data.workExperience.map((job) => {
                  const isJobExpanded = expandedJobId === job.id;
                  return (
                    <div
                      key={job.id}
                      className="rounded-2xl bg-white border border-slate-200 transition-all overflow-hidden shadow-2xs hover:border-slate-300"
                    >
                      {/* Job Header Bar */}
                      <div
                        onClick={(e) => toggleJob(job.id, e)}
                        className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
                            <span className="font-bold text-slate-900 text-xl tracking-tight">{job.company}</span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-blue-700 font-semibold text-sm">{job.role}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {job.period}
                            </span>
                            <span className="flex items-center gap-1 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {job.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex flex-wrap items-center gap-1.5">
                            {job.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-md border border-slate-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg bg-slate-100 transition-colors"
                            aria-label="Toggle job details"
                          >
                            {isJobExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Body Details */}
                      {isJobExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
                          <p className="text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200">
                            {job.summary}
                          </p>

                          <div className="space-y-5">
                            {job.pillars.map((pillar) => (
                              <div key={pillar.title} className="space-y-2.5">
                                <h4 className="text-xs font-bold text-slate-900 tracking-wide uppercase flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                  <span>{pillar.title}</span>
                                </h4>
                                <ul className="space-y-2">
                                  {pillar.highlights.map((h, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                            <span className="text-xs text-slate-400 font-semibold mr-1">Domains &amp; Methods:</span>
                            {job.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 text-xs text-slate-700 bg-slate-100 rounded-md border border-slate-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
