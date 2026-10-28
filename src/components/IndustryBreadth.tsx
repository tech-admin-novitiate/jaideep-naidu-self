import React, { useState } from 'react';
import { Layers, Shield, Cpu, Activity, Truck, Anchor, Globe, CheckCircle2, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { PORTFOLIO_DATA, IndustryItem } from '../data/portfolioData';

interface IndustryBreadthProps {
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const IndustryBreadth: React.FC<IndustryBreadthProps> = ({
  data = PORTFOLIO_DATA,
  isExpanded = false,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('oil-gas');
  const headerConfig = data.pillarHeaders?.industries || PORTFOLIO_DATA.pillarHeaders.industries;

  const selectedIndustry =
    data.industries.find((ind) => ind.id === selectedIndustryId) ||
    data.industries[0];

  const getIndustryIcon = (id: string, isSelected: boolean) => {
    const iconClass = `w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-700'}`;
    switch (id) {
      case 'oil-gas':
        return <Layers className={iconClass} />;
      case 'pharma':
        return <Activity className={iconClass} />;
      case 'automotive':
        return <Truck className={iconClass} />;
      case 'defence':
        return <Anchor className={iconClass} />;
      case 'fmcg':
        return <Shield className={iconClass} />;
      case 'semiconductors':
        return <Cpu className={iconClass} />;
      case 'digital-research':
        return <Globe className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <section id="industries" className="py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillar Architectural Tile - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-indigo-50/60 border-indigo-300/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-indigo-400 hover:shadow-md'
          }`}
        >
          {/* Distinct Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-indigo-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-800/80 border border-indigo-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Layers className="w-5 h-5 text-indigo-200" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-800/90 text-indigo-200 border border-indigo-400/30">
                    {headerConfig.pillarTag}
                  </span>
                  <span className="text-xs text-indigo-200/90 font-medium hidden sm:inline">
                    {headerConfig.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {headerConfig.title}
                </h2>
              </div>
            </div>

            {/* Content Highlight in Header + Expand Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-indigo-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-400/20 text-xs font-medium text-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>{headerConfig.highlight}</span>
              </div>

              {/* Naturally discoverable: show Collapse when expanded, icon only when collapsed */}
              {isExpanded ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all">
                  <span>Collapse</span>
                  <ChevronUp className="w-4 h-4 text-indigo-200" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <ChevronDown className="w-4 h-4 text-indigo-200" />
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Pillar Body with lighter indigo tinted background */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
              {/* Technical Crosshairs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-indigo-900/70 border-b border-indigo-200/70 pb-3">
                <div>+ [PILLAR 03 // MULTI-SECTOR MATRIX // 7 DOMAINS FEDERATED]</div>
                <div>[CROSS-INDUSTRY VELOCITY · MISSION CRITICAL] +</div>
              </div>

              <div className="max-w-3xl space-y-2">
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  True engineering leadership is forged across differing regulatory regimes, physical hazard profiles, and high-concurrency systems. From mission-critical naval defence databases to predictive biopharma AI and Upstream energy supermajors.
                </p>
              </div>

              {/* Interactive Industry Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Interactive Industry Selectors */}
                <div className="lg:col-span-5 space-y-2">
                  {data.industries.map((industry) => {
                    const isSelected = industry.id === selectedIndustryId;
                    return (
                      <button
                        key={industry.id}
                        onClick={() => setSelectedIndustryId(industry.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between gap-4 border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected ? 'bg-white/10' : 'bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {getIndustryIcon(industry.id, isSelected)}
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {industry.name}
                            </div>
                            <div className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                              {industry.companies.join(' · ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[11px] font-mono tabular-nums hidden sm:inline ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {industry.impactMetrics[0]}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? 'text-white translate-x-0.5' : 'text-slate-400'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Selected Industry Deep-Dive Panel */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1">
                          <span>{selectedIndustry.sector}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-slate-500">{selectedIndustry.role}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                          {selectedIndustry.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-slate-400">Clients / Orgs:</span>
                        <span className="text-slate-900 font-medium">
                          {selectedIndustry.companies.join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Key Achievement Callout */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 tracking-wider">
                        KEY TRANSFORMATION &amp; ACHIEVEMENT
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed font-medium">
                        {selectedIndustry.keyAchievement}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 tracking-wider">
                        TECHNICAL SCOPE &amp; CHALLENGE
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {selectedIndustry.description}
                      </p>
                    </div>

                    {/* Impact Metrics Row */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 tracking-wider">
                        VERIFIED IMPACT METRICS
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {selectedIndustry.impactMetrics.map((metric) => (
                          <div
                            key={metric}
                            className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="font-semibold text-slate-800">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack / Standards */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-semibold text-slate-500 tracking-wider">
                        CORE TECHNOLOGIES &amp; ARCHITECTURAL PATTERNS
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {selectedIndustry.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cross-Industry Synthesis Footnote */}
                  <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                    <span className="font-bold text-blue-700 shrink-0">Turnkey Advantage:</span>
                    <span>
                      Engineers in heavy industries often suffer from insular thinking. Jaideep brings agile velocity from FMCG and predictive ML from Pharma to unlock massive dormant value in complex industrial plants.
                    </span>
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
