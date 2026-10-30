import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { GeminiChatbot } from './components/GeminiChatbot';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { AccomplishmentsEducation } from './components/AccomplishmentsEducation';
import { IndustryBreadth } from './components/IndustryBreadth';
import { TurnkeySolutions } from './components/TurnkeySolutions';
import { HumanLeadership } from './components/HumanLeadership';
import { HobbiesSection } from './components/HobbiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { EditorModal } from './components/EditorModal';
import { PORTFOLIO_DATA, loadPortfolioData, fetchServerPortfolioData } from './data/portfolioData';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<typeof PORTFOLIO_DATA>(PORTFOLIO_DATA);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  // Coordinated Collapsible State across Hero, Pillars 01-06, and Connect & Advisory
  // Default expanded: 'experience'
  const [activeSection, setActiveSection] = useState<string | null>('experience');

  // 1-second hover delay staging state & ref timer
  const [pendingHoverSection, setPendingHoverSection] = useState<string | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Jump to Top floating bubble visibility state
  const [showJumpToTop, setShowJumpToTop] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initial load from local storage & pre-bundled separate JSON
    const loaded = loadPortfolioData();
    setPortfolioData(loaded);

    // 2. Fetch canonical custom data file from deployment/server
    fetchServerPortfolioData().then((serverData) => {
      if (serverData) {
        setPortfolioData(serverData);
      }
    });

    // Scroll listener for Jump to Top floating bubble
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setShowJumpToTop(true);
      } else {
        setShowJumpToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Sync active section if URL contains anchor hash
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');
      const validSections = [
        'hero',
        'experience',
        'accomplishments',
        'industries',
        'turnkey-tech',
        'leadership',
        'hobbies',
        'contact',
      ];
      if (validSections.includes(hash)) {
        setActiveSection(hash);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashSync);
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  // 1-second hover delay: starts the timer when mouse enters a collapsed section
  const handleHoverStart = (id: string) => {
    if (activeSection === id) return;
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setPendingHoverSection(id);
    hoverTimerRef.current = setTimeout(() => {
      // 1000ms delay completed: expand this section and collapse the previous one immediately
      setActiveSection(id);
      setPendingHoverSection(null);
      hoverTimerRef.current = null;
    }, 1000);
  };

  // Cancel 1-second hover delay if user moves mouse away before 1s
  const handleHoverEnd = (id: string) => {
    if (pendingHoverSection === id) {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setPendingHoverSection(null);
    }
  };

  // Immediate toggle on click
  const handleToggleSection = (id: string) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setPendingHoverSection(null);
    setActiveSection((prev) => (prev === id ? null : id));
  };

  // Immediate expansion (e.g. from nav link clicks)
  const handleImmediateExpand = (id: string) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setPendingHoverSection(null);
    setActiveSection(id);
  };

  const handleOpenResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const handleCloseResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  const handleOpenEditor = () => {
    setIsEditorModalOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorModalOpen(false);
  };

  const handleSaveData = (newData: typeof PORTFOLIO_DATA) => {
    setPortfolioData(newData);
  };

  const handleNavigateToContact = () => {
    handleImmediateExpand('contact');
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav handler for reduced options:
  // 1 - Overview : Collapses all Pillars. Stays on Homepage / scrolls to top.
  // 2 - Experience : Jumps to Pillar 01 and expands it.
  // 3 - Leadership : Jumps to Pillar 05 and expands it.
  const handleSelectNav = (key: 'overview' | 'experience' | 'leadership') => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setPendingHoverSection(null);

    if (key === 'overview') {
      setActiveSection(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
      }
    } else if (key === 'experience') {
      setActiveSection('experience');
      const elem = document.getElementById('experience');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (key === 'leadership') {
      setActiveSection('leadership');
      const elem = document.getElementById('leadership');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white relative">
      {/* Floating Bubble on the right top corner to Jump to Top */}
      {showJumpToTop && (
        <button
          onClick={handleJumpToTop}
          className="fixed top-24 right-5 sm:right-7 z-50 group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-blue-600 text-white shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ring-1 ring-slate-800 animate-fadeIn"
          title="Jump to Top of page"
          aria-label="Jump to top of page"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:-translate-y-0.5 transition-transform">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1">Jump to Top</span>
        </button>
      )}

      {/* 1. Navigation Header */}
      <Header
        onOpenResumeModal={handleOpenResumeModal}
        onNavigateToContact={handleNavigateToContact}
        onSelectNav={handleSelectNav}
        onSelectPillar={(sectionId) => {
          handleImmediateExpand(sectionId);
          const elem = document.getElementById(sectionId);
          elem?.scrollIntoView({ behavior: 'smooth' });
        }}
        activeSection={activeSection}
        profileName={portfolioData.profile.name}
        profileTitle={portfolioData.profile.title}
      />

      {/* Main Content Sections:
          AI Chatbot (Start of page) > Exec Hero > Pillars 01-06 > Connect & Advisory */}
      <main className="flex-1 pb-16">
        {/* Gemini-style Grounded AI Chatbot at the start of the page */}
        <GeminiChatbot
          onExploreExperience={() => {
            handleImmediateExpand('experience');
            const exp = document.getElementById('experience');
            exp?.scrollIntoView({ behavior: 'smooth' });
          }}
          data={portfolioData}
        />

        {/* Collapsible Executive Hero with 1s hover delay */}
        <Hero
          onOpenResumeModal={handleOpenResumeModal}
          onNavigateToContact={handleNavigateToContact}
          data={portfolioData}
          isExpanded={activeSection === 'hero'}
          isPendingHover={pendingHoverSection === 'hero'}
          onHoverStart={() => handleHoverStart('hero')}
          onHoverEnd={() => handleHoverEnd('hero')}
          onToggle={() => handleToggleSection('hero')}
        />

        {/* Collapsible Pillar 01: Experience (Default expanded on page load) */}
        <ExperienceSection
          data={portfolioData}
          isExpanded={activeSection === 'experience'}
          isPendingHover={pendingHoverSection === 'experience'}
          onHoverStart={() => handleHoverStart('experience')}
          onHoverEnd={() => handleHoverEnd('experience')}
          onToggle={() => handleToggleSection('experience')}
        />

        {/* Collapsible Pillar 02: Accomplishments & Educational Qualifications */}
        <AccomplishmentsEducation
          data={portfolioData}
          isExpanded={activeSection === 'accomplishments'}
          isPendingHover={pendingHoverSection === 'accomplishments'}
          onHoverStart={() => handleHoverStart('accomplishments')}
          onHoverEnd={() => handleHoverEnd('accomplishments')}
          onToggle={() => handleToggleSection('accomplishments')}
        />

        {/* Collapsible Pillar 03: Breadth Across 7 Global Industries */}
        <IndustryBreadth
          data={portfolioData}
          isExpanded={activeSection === 'industries'}
          isPendingHover={pendingHoverSection === 'industries'}
          onHoverStart={() => handleHoverStart('industries')}
          onHoverEnd={() => handleHoverEnd('industries')}
          onToggle={() => handleToggleSection('industries')}
        />

        {/* Collapsible Pillar 04: Turnkey AI & Modernizing Heavy Industry */}
        <TurnkeySolutions
          data={portfolioData}
          isExpanded={activeSection === 'turnkey-tech'}
          isPendingHover={pendingHoverSection === 'turnkey-tech'}
          onHoverStart={() => handleHoverStart('turnkey-tech')}
          onHoverEnd={() => handleHoverEnd('turnkey-tech')}
          onToggle={() => handleToggleSection('turnkey-tech')}
        />

        {/* Collapsible Pillar 05: Human-Led Leadership & LinkedIn Recommendations */}
        <HumanLeadership
          data={portfolioData}
          isExpanded={activeSection === 'leadership'}
          isPendingHover={pendingHoverSection === 'leadership'}
          onHoverStart={() => handleHoverStart('leadership')}
          onHoverEnd={() => handleHoverEnd('leadership')}
          onToggle={() => handleToggleSection('leadership')}
        />

        {/* Collapsible Pillar 06: Hobbies (52 Sovereign Nations & 35mm Photography) */}
        <HobbiesSection
          data={portfolioData}
          isExpanded={activeSection === 'hobbies'}
          isPendingHover={pendingHoverSection === 'hobbies'}
          onHoverStart={() => handleHoverStart('hobbies')}
          onHoverEnd={() => handleHoverEnd('hobbies')}
          onToggle={() => handleToggleSection('hobbies')}
        />

        {/* Collapsible Connect & Advisory Section with 1s hover delay */}
        <ContactSection
          onOpenResumeModal={handleOpenResumeModal}
          data={portfolioData}
          isExpanded={activeSection === 'contact'}
          isPendingHover={pendingHoverSection === 'contact'}
          onHoverStart={() => handleHoverStart('contact')}
          onHoverEnd={() => handleHoverEnd('contact')}
          onToggle={() => handleToggleSection('contact')}
        />
      </main>

      {/* Footer with Lock icon for password-protected Edit View */}
      <Footer
        onOpenResumeModal={handleOpenResumeModal}
        onOpenEditor={handleOpenEditor}
        profileName={portfolioData.profile.name}
        email={portfolioData.profile.email}
        linkedIn={portfolioData.profile.linkedIn}
      />

      {/* Downloadable / Embeddable Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={handleCloseResumeModal}
        data={portfolioData}
      />

      {/* Password Protected Editor Modal (Password: EditPage) */}
      <EditorModal
        isOpen={isEditorModalOpen}
        onClose={handleCloseEditor}
        currentData={portfolioData}
        onSave={handleSaveData}
      />
    </div>
  );
}
