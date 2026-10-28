import React, { useState } from 'react';
import { FileDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeaderProps {
  onOpenResumeModal: () => void;
  onNavigateToContact: () => void;
  onSelectNav: (key: 'overview' | 'experience' | 'leadership') => void;
  onSelectPillar?: (pillarId: string) => void;
  activeSection?: string | null;
  profileName?: string;
  profileTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenResumeModal,
  onNavigateToContact,
  onSelectNav,
  activeSection = null,
  profileName = PORTFOLIO_DATA.profile.name,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reduced navigation links as requested: Overview, Experience, Leadership
  const navLinks = [
    { label: 'Overview', key: 'overview' as const },
    { label: 'Experience', key: 'experience' as const },
    { label: 'Leadership', key: 'leadership' as const },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark - Only Name "Jaideep Naidu" */}
          <button
            type="button"
            onClick={() => onSelectNav('overview')}
            className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 group text-left cursor-pointer"
            title="Overview - Collapse all pillars and return to homepage"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-semibold text-sm shadow-xs group-hover:bg-blue-600 transition-colors">
              JN
            </div>
            <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight text-lg">
              {profileName}
            </span>
          </button>

          {/* Zone 2: Reduced navigation options */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive =
                (link.key === 'overview' && activeSection === null) ||
                activeSection === link.key;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => onSelectNav(link.key)}
                  className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 font-medium ${
                    isActive
                      ? 'text-blue-600 border-blue-600 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Resume Quick Access */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenResumeModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="View & Download Official CV"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-600" />
              <span>Resume (PDF)</span>
            </button>

            <button
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                (link.key === 'overview' && activeSection === null) ||
                activeSection === link.key;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectNav(link.key);
                  }}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-slate-600" />
              <span>View &amp; Download CV (PDF)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToContact();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
