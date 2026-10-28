import React from 'react';
import { Heart, Users, Linkedin, Sparkles, MessageSquareQuote, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HumanLeadershipProps {
  data?: typeof PORTFOLIO_DATA;
}

export const HumanLeadership: React.FC<HumanLeadershipProps> = ({
  data = PORTFOLIO_DATA,
}) => {
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
    <section id="leadership" className="py-20 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700">
            <span>PILLAR 05</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>HUMAN-LED TRANSFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Human Connection as the Engine of Technological Change
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Algorithmic sophistication is meaningless without human resonance. Real leadership means listening to the frontline, creating psychological safety, and coaching global teams to believe in what they are building together.
          </p>
        </div>

        {/* Leadership Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {leadershipPrinciples.map((principle, index) => (
            <div
              key={principle.title}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3 shadow-2xs"
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
        <div className="rounded-2xl bg-slate-50/70 border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
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
                className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-2xs hover:border-slate-300 transition-colors"
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

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
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
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
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
    </section>
  );
};
