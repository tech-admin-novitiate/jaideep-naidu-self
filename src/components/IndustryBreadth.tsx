import React, { useState } from 'react';
import { Layers, Shield, Cpu, Activity, Truck, Anchor, Globe, CheckCircle2, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA, IndustryItem } from '../data/portfolioData';

interface IndustryBreadthProps {
  data?: typeof PORTFOLIO_DATA;
}

export const IndustryBreadth: React.FC<IndustryBreadthProps> = ({
  data = PORTFOLIO_DATA,
}) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('oil-gas');

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
    <section id="industries" className="py-20 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700">
            <span>PILLAR 03</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>CROSS-DOMAIN VERSATILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Breadth Across 7 Global Industries
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
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
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-white/10' : 'bg-white border border-slate-200'
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
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <span className="font-bold text-blue-700 shrink-0">Turnkey Advantage:</span>
              <span>
                Engineers in heavy industries often suffer from insular thinking. Jaideep brings agile velocity from FMCG and predictive ML from Pharma to unlock massive dormant value in complex industrial plants.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
