import React, { useState } from 'react';
import { FileDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeaderProps {
  onOpenResumeModal: () => void;
  onNavigateToContact: () => void;
  profileName?: string;
  profileTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenResumeModal,
  onNavigateToContact,
  profileName = PORTFOLIO_DATA.profile.name,
  profileTitle = PORTFOLIO_DATA.profile.title,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { label: 'Ask AI', href: '#ai-assistant' },
    { label: 'Experience', href: '#experience' },
    { label: 'Accomplishments', href: '#accomplishments' },
    { label: 'Industries', href: '#industries' },
    { label: 'Turnkey AI', href: '#turnkey-tech' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Hobbies', href: '#hobbies' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-900 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-semibold text-sm shadow-xs group-hover:bg-blue-600 transition-colors">
              JN
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight">
                {profileName}
              </span>
              <span className="text-xs text-slate-500 font-normal hidden sm:inline">
                {profileTitle}
              </span>
            </div>
          </a>

          {/* Zone 2: 5–6 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Resume Quick Access */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenResumeModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="View & Download Official CV"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-600" />
              <span>Resume (PDF)</span>
            </button>

            <button
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <FileDown className="w-4 h-4 text-slate-600" />
              <span>View &amp; Download CV (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
