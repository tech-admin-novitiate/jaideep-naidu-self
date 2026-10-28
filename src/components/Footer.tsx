import React from 'react';
import { Linkedin, Mail, FileDown, ArrowUp, Lock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenResumeModal: () => void;
  onOpenEditor: () => void;
  profileName?: string;
  email?: string;
  linkedIn?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenResumeModal,
  onOpenEditor,
  profileName = PORTFOLIO_DATA.profile.name,
  email = PORTFOLIO_DATA.profile.email,
  linkedIn = PORTFOLIO_DATA.profile.linkedIn,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white/95 backdrop-blur-md border-t-2 border-slate-300 py-12 text-slate-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-1">
            <div className="text-base font-bold text-slate-900 tracking-tight">
              {profileName}
            </div>
            <div className="text-xs text-slate-500">
              Technical &amp; Product Engineering Leader · London, United Kingdom
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={onOpenResumeModal}
              className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-700" />
              <span>Resume PDF</span>
            </button>
            <span className="text-slate-300">·</span>
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-300">·</span>
            <a
              href={`mailto:${email}`}
              className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              &copy; {new Date().getFullYear()} {profileName}. All rights reserved. Built for executive engineering and applied AI leadership.
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* The Lock icon in the footer that opens password-protected editor */}
            <button
              onClick={onOpenEditor}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors flex items-center gap-1 text-[11px]"
              title="Site Copy Editor (Password: EditPage)"
              aria-label="Open editor view"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editor Mode</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-800 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
