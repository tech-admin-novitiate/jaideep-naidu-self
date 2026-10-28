import React, { useState } from 'react';
import { Cpu, Network, ShieldCheck, Database, GitMerge, FileText, CheckCircle, ArrowRight, Zap, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface TurnkeySolutionsProps {
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const TurnkeySolutions: React.FC<TurnkeySolutionsProps> = ({
  data = PORTFOLIO_DATA,
  isExpanded = false,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const [activeArchLayer, setActiveArchLayer] = useState<number>(0);
  const headerConfig = data.pillarHeaders?.['turnkey-tech'] || PORTFOLIO_DATA.pillarHeaders['turnkey-tech'];

  const archLayers = [
    {
      title: 'Layer 1: Industrial Ingestion & Graph RAG',
      subtitle: 'Indexing 20+ Years of Unstructured Engineering Standards',
      icon: <Network className="w-5 h-5 text-blue-600" />,
      description:
        'Oil & Gas facilities operate under decades of technical amendments, engineering deviations, and hazardous equipment specs. Generic LLMs hallucinate with catastrophic safety risks. Jaideep implemented Graph RAG with strict deterministic guardrails to index 20+ years of standards.',
      keyCapabilities: [
        'Graph RAG ontology linking ISO standards with real-time asset deviations',
        'Deterministic benchmarks enforcing strict factuality & zero semantic drift',
        'Unlocks $100M+ in reliable engineering discovery value for 10,000+ engineers',
      ],
      flow: '20+ Yrs Engineering Specs → Document Parser → Knowledge Graph Nodes → Graph RAG Engine',
      metric: '$100M+ Verified Value',
    },
    {
      title: 'Layer 2: Palantir Foundry Data Fabric',
      subtitle: 'Unifying Siloed Inspection, Anomaly & Pipeline Domains',
      icon: <Database className="w-5 h-5 text-slate-800" />,
      description:
        'Instead of disparate point solutions across basins, Jaideep engineered automated migration and schema-mapping tools on Palantir Foundry. Transforming legacy datasets into unified ISO data standards to supply the enterprise Digital Twin.',
      keyCapabilities: [
        'Multi-basin schema federation covering integrity, inspection, and anomaly domains',
        'Direct CAPEX avoidance of ~$12M through automated schema harmonization',
        'Foundation data fabric powering BP’s centralized Digital Twin',
      ],
      flow: 'Disparate Basin Datasets → Palantir Schema Mapping → ISO 14224 Models → Live Digital Twin Fabric',
      metric: '~$12M CAPEX Avoidance',
    },
    {
      title: 'Layer 3: Real-Time Barrier Risk Analytics',
      subtitle: 'e-Assurance for Safety & Operational Risk (S&OR)',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      description:
        'Replaced outdated paper audits and manual reconciliation cycles with real-time digital barrier risk analytics. Engineers and regulators obtain 100% digital traceability over active plant safety barriers and deviations.',
      keyCapabilities: [
        'Liberated 15,000+ auditor hours from repetitive manual reconciliation',
        'Delivered $3M+ in direct OPEX savings via automated risk reconciliations',
        '100% digital traceability across safety-critical barriers in real time',
      ],
      flow: 'Field Telemetry & Barrier Checks → S&OR Rules Engine → Continuous Barrier Dashboard → Automated Compliance',
      metric: '15k+ Auditor Hrs Saved',
    },
    {
      title: 'Layer 4: Human-Centric Turnkey Adoption',
      subtitle: 'Transitioning 10,000+ Field Users with Psychological Safety',
      icon: <GitMerge className="w-5 h-5 text-amber-600" />,
      description:
        'Technology only generates ROI when users embrace it. Jaideep directed enterprise-wide change management across all engineering disciplines, transitioning 10k+ operators from document-centric governance to dynamic, deviation-led workflows.',
      keyCapabilities: [
        'Coached multi-vendor delivery teams into aligned Scrum squads',
        'Eliminated operational friction, generating ~$30M in operational efficiencies',
        'Prevented over $50M+ in projected CAPEX write-offs on stalled digital programs',
      ],
      flow: 'Frontline User Co-Design → Agile Sprint Rollout → Multi-Vendor Alignment → Autonomous Field Execution',
      metric: '10,000+ Active Users',
    },
  ];

  return (
    <section id="turnkey-tech" className="py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillar Architectural Tile - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-cyan-50/60 border-cyan-300/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-cyan-400 hover:shadow-md'
          }`}
        >
          {/* Distinct Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-cyan-950 via-teal-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-cyan-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-800/80 border border-teal-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Cpu className="w-5 h-5 text-cyan-200" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-teal-800/90 text-teal-200 border border-teal-400/30">
                    {headerConfig.pillarTag}
                  </span>
                  <span className="text-xs text-teal-200/90 font-medium hidden sm:inline">
                    {headerConfig.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {headerConfig.title}
                </h2>
              </div>
            </div>

            {/* Content Highlight in Header + Expand Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-teal-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-400/20 text-xs font-medium text-cyan-200">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{headerConfig.highlight}</span>
              </div>

              {/* Naturally discoverable: show Collapse when expanded, icon only when collapsed */}
              {isExpanded ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all">
                  <span>Collapse</span>
                  <ChevronUp className="w-4 h-4 text-cyan-200" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <ChevronDown className="w-4 h-4 text-cyan-200" />
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Pillar Body with lighter cyan tinted background */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
              {/* Technical Crosshairs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-cyan-900/70 border-b border-cyan-200/70 pb-3">
                <div>+ [PILLAR 04 // APPLIED AI &amp; PALANTIR FABRIC]</div>
                <div>[ISO-14224 · GRAPH RAG · OT-IT INTEGRATION] +</div>
              </div>

              <div className="max-w-3xl space-y-2">
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  While consumer software moves quickly, safety-critical heavy industry and Upstream Oil &amp; Gas often remain technologically nascent—locked behind legacy documentation and risk aversion. Here is how Jaideep delivers production-grade turnkey AI and data solutions.
                </p>
              </div>

              {/* 4-Step Playbook Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.turnkeyPlaybook.map((item) => (
                  <div
                    key={item.step}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-blue-700 text-lg">
                          {item.step}
                        </span>
                        <span className="text-slate-500 text-[11px] font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        <strong className="text-slate-800 font-semibold block mb-0.5">Industrial Challenge:</strong>
                        {item.problem}
                      </p>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong className="text-blue-700 font-semibold block mb-0.5">Turnkey Solution:</strong>
                        {item.solution}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700 font-mono">
                      {item.businessImpact}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Architecture Deep Dive */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="text-xs font-semibold text-blue-700 tracking-wider mb-1">
                      INTERACTIVE ARCHITECTURE VISUALIZER
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      The Mission-Critical Industrial AI Pipeline
                    </h3>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Click a layer below to inspect how data transforms into bottom-line value
                  </div>
                </div>

                {/* Layer Selector Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {archLayers.map((layer, idx) => {
                    const isActive = activeArchLayer === idx;
                    return (
                      <button
                        key={layer.title}
                        onClick={() => setActiveArchLayer(idx)}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={isActive ? 'text-white' : ''}>
                            {layer.icon}
                          </div>
                          <span
                            className={`text-xs font-bold ${
                              isActive ? 'text-blue-300' : 'text-slate-600'
                            }`}
                          >
                            Layer {idx + 1}
                          </span>
                        </div>
                        <div className={`text-xs font-bold leading-snug line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {layer.title.split(': ')[1]}
                        </div>
                        <div className={`text-[11px] font-mono mt-1 font-semibold ${isActive ? 'text-emerald-300' : 'text-emerald-700'}`}>
                          {layer.metric}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Layer Deep Dive Box */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {archLayers[activeArchLayer].title}
                      </h4>
                      <p className="text-xs text-blue-700 font-medium">
                        {archLayers[activeArchLayer].subtitle}
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold font-mono">
                      {archLayers[activeArchLayer].metric}
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {archLayers[activeArchLayer].description}
                  </p>

                  {/* Architecture Pipeline Flow Diagram */}
                  <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>ARCHITECTURAL DATA FLOW</span>
                    </div>
                    <div className="font-mono text-xs text-slate-800 py-1 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                      {archLayers[activeArchLayer].flow.split(' → ').map((node, i, arr) => (
                        <React.Fragment key={node}>
                          <span className="px-3 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                            {node}
                          </span>
                          {i < arr.length - 1 && <span className="text-blue-600 font-bold">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Key Capabilities */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500">
                      SYSTEM INVARIANTS &amp; OPERATIONAL OUTCOMES
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {archLayers[activeArchLayer].keyCapabilities.map((cap) => (
                        <div
                          key={cap}
                          className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2 shadow-2xs"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
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
