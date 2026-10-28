import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, ExternalLink, Shield } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const CareerTimeline: React.FC = () => {
  const [expandedJobId, setExpandedJobId] = useState<string>('bp');
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');

  const toggleJob = (id: string) => {
    setExpandedJobId(expandedJobId === id ? '' : id);
  };

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#0c1017] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-400">
            <span>PILLAR 04</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>17 YEARS TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
            Executive Career Milestones &amp; Credentials
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            From technical foundations in naval defence databases to governing multi-million dollar technology portfolios for energy supermajors. Backed by an MBA and industry-standard architecture credentials.
          </p>
        </div>

        {/* View Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800 w-fit mb-10 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work Experience (17 Yrs)</span>
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'certifications'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications &amp; Governance</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'education'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Credentials (MBA &amp; BE)</span>
          </button>
        </div>

        {/* ================= TAB 1: Work Experience ================= */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {PORTFOLIO_DATA.workExperience.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div
                  key={job.id}
                  className="rounded-2xl bg-[#111824] border border-slate-800 transition-all overflow-hidden"
                >
                  {/* Job Header Bar */}
                  <div
                    onClick={() => toggleJob(job.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-400">
                        <span className="font-bold text-white text-lg">{job.company}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-300 font-semibold">{job.role}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex flex-wrap items-center gap-1.5">
                        {job.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 transition-colors"
                        aria-label="Toggle job details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Body Details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                      <p className="text-sm text-slate-300 leading-relaxed font-normal bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                        {job.summary}
                      </p>

                      <div className="space-y-5">
                        {job.pillars.map((pillar) => (
                          <div key={pillar.title} className="space-y-2.5">
                            <h4 className="text-xs font-bold text-blue-400 tracking-wide uppercase">
                              {pillar.title}
                            </h4>
                            <ul className="space-y-2">
                              {pillar.highlights.map((h, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                        <span className="text-xs text-slate-500 font-semibold mr-1">Domains:</span>
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs text-slate-300 bg-slate-800/70 rounded-md border border-slate-700/60"
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
        )}

        {/* ================= TAB 2: Certifications Wall ================= */}
        {activeTab === 'certifications' && (
          <div className="space-y-8">
            <div className="rounded-2xl bg-[#111824] border border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Technical Architecture &amp; Data Platforms
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Validated competencies in enterprise data fabrics, cloud engineering, and backend architectures.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PORTFOLIO_DATA.educationAndCredentials.technicalCertifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400">
                      <span>{cert.type}</span>
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="font-bold text-white text-sm">
                      {cert.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      Issuer: {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#111824] border border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Portfolio Governance, Agile &amp; Program Management
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Globally recognized certifications in governance frameworks, program coordination, and agile team coaching.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PORTFOLIO_DATA.educationAndCredentials.managementCredentials.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span>{cert.type}</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="font-bold text-white text-sm">
                      {cert.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      Authority: {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: Academic Credentials ================= */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.educationAndCredentials.education.map((edu) => (
              <div
                key={edu.degree}
                className="p-6 sm:p-8 rounded-2xl bg-[#111824] border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-400 font-bold">{edu.year}</span>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px] font-semibold">
                    Verified Credential
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-slate-300">
                    {edu.institution}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300 block mb-1">Concentration &amp; Focus:</strong>
                  {edu.focus}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
