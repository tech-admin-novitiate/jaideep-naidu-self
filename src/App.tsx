import React, { useState, useEffect } from 'react';
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
import { PORTFOLIO_DATA, loadPortfolioData } from './data/portfolioData';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<typeof PORTFOLIO_DATA>(PORTFOLIO_DATA);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  useEffect(() => {
    // Load persisted user edits from local storage if present
    const loaded = loadPortfolioData();
    setPortfolioData(loaded);
  }, []);

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
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Navigation Header */}
      <Header
        onOpenResumeModal={handleOpenResumeModal}
        onNavigateToContact={handleNavigateToContact}
        profileName={portfolioData.profile.name}
        profileTitle={portfolioData.profile.title}
      />

      {/* Main Content Sections:
          AI Chatbot (Start of page) > Hero > Experience > Accomplishments & Education > Industries > Turnkey AI > Human Leadership > Hobbies */}
      <main className="flex-1">
        {/* Gemini-style Grounded AI Chatbot at the start of the page */}
        <GeminiChatbot
          onExploreExperience={() => {
            const exp = document.getElementById('experience');
            exp?.scrollIntoView({ behavior: 'smooth' });
          }}
          data={portfolioData}
        />

        {/* Executive Hero */}
        <Hero
          onOpenResumeModal={handleOpenResumeModal}
          onNavigateToContact={handleNavigateToContact}
          data={portfolioData}
        />

        {/* 1. Experience (Brought to the forefront!) */}
        <ExperienceSection data={portfolioData} />

        {/* 2. Accomplishments & Educational Qualifications (Highlighted separately from CV) */}
        <AccomplishmentsEducation data={portfolioData} />

        {/* 3. Breadth Across 7 Global Industries */}
        <IndustryBreadth data={portfolioData} />

        {/* 4. Turnkey AI & Modernizing Heavy Industry */}
        <TurnkeySolutions data={portfolioData} />

        {/* 5. Human-Led Leadership & LinkedIn Recommendations */}
        <HumanLeadership data={portfolioData} />

        {/* 6. Hobbies (Merged 52 Countries & Photography moved to the end) */}
        <HobbiesSection data={portfolioData} />

        {/* 7. Contact Form & Direct Inquiries */}
        <ContactSection
          onOpenResumeModal={handleOpenResumeModal}
          data={portfolioData}
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
