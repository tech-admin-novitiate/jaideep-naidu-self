import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceItem } from '../data/portfolioData';

interface ExperienceSectionProps {
  data?: typeof PORTFOLIO_DATA;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data = PORTFOLIO_DATA,
}) => {
  const [expandedJobId, setExpandedJobId] = useState<string>('bp');

  const toggleJob = (id: string) => {
    setExpandedJobId(expandedJobId === id ? '' : id);
  };

  return (
    <section id="experience" className="py-20 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700">
            <span>PILLAR 01</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>17 YEARS WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Executive Leadership &amp; Engineering Track Record
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Leading engineering squads, capital allocation, and digital modernization across Oil &amp; Gas supermajors, automotive leaders, defense backbones, and healthcare analytics.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6">
          {data.workExperience.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
                className="rounded-2xl bg-white border border-slate-200 transition-all overflow-hidden shadow-2xs hover:border-slate-300"
              >
                {/* Job Header Bar */}
                <div
                  onClick={() => toggleJob(job.id)}
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
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Body Details */}
                {isExpanded && (
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
    </section>
  );
};
