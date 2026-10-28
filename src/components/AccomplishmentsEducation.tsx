import React, { useState } from 'react';
import { Award, GraduationCap, Trophy, Shield, CheckCircle, Sparkles, Filter, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { PORTFOLIO_DATA, AccomplishmentItem } from '../data/portfolioData';

interface AccomplishmentsEducationProps {
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const AccomplishmentsEducation: React.FC<AccomplishmentsEducationProps> = ({
  data = PORTFOLIO_DATA,
  isExpanded = false,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState<'accomplishments' | 'education' | 'certifications'>('accomplishments');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const headerConfig = data.pillarHeaders?.accomplishments || PORTFOLIO_DATA.pillarHeaders.accomplishments;

  const categories = ['All', 'Applied AI & RAG', 'Operational Risk & Safety', 'Data Architecture', 'Commercial & Capex'];

  const filteredAccomplishments = categoryFilter === 'All'
    ? data.accomplishments
    : data.accomplishments.filter(acc => acc.category === categoryFilter);

  return (
    <section id="accomplishments" className="py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillar Architectural Tile - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-emerald-50/60 border-emerald-300/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-emerald-400 hover:shadow-md'
          }`}
        >
          {/* Distinct Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Trophy className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-800/90 text-emerald-200 border border-emerald-400/30">
                    {headerConfig.pillarTag}
                  </span>
                  <span className="text-xs text-emerald-200/90 font-medium hidden sm:inline">
                    {headerConfig.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {headerConfig.title}
                </h2>
              </div>
            </div>

            {/* Content Highlight in Header + Expand Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-emerald-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/20 text-xs font-medium text-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{headerConfig.highlight}</span>
              </div>

              {/* Naturally discoverable: show Collapse when expanded, icon only when collapsed */}
              {isExpanded ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all">
                  <span>Collapse</span>
                  <ChevronUp className="w-4 h-4 text-emerald-200" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <ChevronDown className="w-4 h-4 text-emerald-200" />
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Pillar Body with lighter emerald tinted background */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
              {/* Technical Crosshairs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-emerald-900/70 border-b border-emerald-200/70 pb-3">
                <div>+ [PILLAR 02 // VERIFIED IMPACT // ACADEMIC &amp; TECH ACCREDITED]</div>
                <div>[$100M+ IMPACT · 15K HRS SAVED · QUANTIC EMBA] +</div>
              </div>

              <div className="max-w-3xl space-y-2">
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  Direct from executive delivery records: multi-million dollar business impact, safety barrier innovations, top-tier academic degrees, and internationally recognized architecture governance certifications.
                </p>
              </div>

              {/* View Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 w-fit shadow-2xs overflow-x-auto whitespace-nowrap">
                <button
                  onClick={() => setActiveTab('accomplishments')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 ${
                    activeTab === 'accomplishments'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Accomplishments ({data.accomplishments.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('education')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 ${
                    activeTab === 'education'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Educational Qualifications (EMBA &amp; BE)</span>
                </button>
                <button
                  onClick={() => setActiveTab('certifications')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 ${
                    activeTab === 'certifications'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Governance &amp; Certifications</span>
                </button>
              </div>

              {/* ================= TAB 1: ACCOMPLISHMENTS ================= */}
              {activeTab === 'accomplishments' && (
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1">
                    <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5" /> Filter by:
                    </span>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          categoryFilter === cat
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Accomplishments Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAccomplishments.map((acc) => (
                      <div
                        key={acc.id}
                        className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-semibold text-blue-700 tracking-wide">
                                {acc.organization}
                              </span>
                              {acc.timeline && (
                                <span className="text-[11px] font-mono text-slate-500 font-medium">
                                  · {acc.timeline}
                                </span>
                              )}
                            </div>
                            <span className="px-2.5 py-1 text-xs font-bold font-mono text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200 shrink-0">
                              {acc.impactMetric}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                            {acc.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {acc.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">
                            {acc.category}
                          </span>
                          <span className="text-slate-900 font-semibold text-right">
                            {acc.significance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: EDUCATION ================= */}
              {activeTab === 'education' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.educationAndCredentials.education.map((edu) => (
                    <div
                      key={edu.degree}
                      className="p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-blue-700 font-bold text-sm">{edu.year}</span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                          Verified Degree
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                          {edu.degree}
                        </h3>
                        <div className="text-sm font-semibold text-slate-700">
                          {edu.institution}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <strong className="text-slate-900 block mb-1">Concentration &amp; Rigor:</strong>
                        {edu.focus}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= TAB 3: CERTIFICATIONS ================= */}
              {activeTab === 'certifications' && (
                <div className="space-y-8">
                  {/* Technical */}
                  <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Technical Architecture &amp; Data Fabric Credentials
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Applied competencies in enterprise ontologies, cloud architecture, and mission-critical backend systems.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {data.educationAndCredentials.technicalCertifications.map((cert) => (
                        <div
                          key={cert.name}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
                            <span>{cert.type}</span>
                            <Shield className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-slate-900 text-sm">
                            {cert.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Issuer: {cert.issuer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Management & Agile */}
                  <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Executive Governance, Agile Frameworks &amp; Program Coordination
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Internationally accredited credentials overseeing multi-million dollar portfolios and coaching high-trust squads.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.educationAndCredentials.managementCredentials.map((cert) => (
                        <div
                          key={cert.name}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
                            <span>{cert.type}</span>
                            <CheckCircle className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-slate-900 text-sm">
                            {cert.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Authority: {cert.issuer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
