import React, { useState } from 'react';
import { FileDown, ExternalLink, X, FileText, Check, Copy, Download, Briefcase, File } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: typeof PORTFOLIO_DATA;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  data = PORTFOLIO_DATA,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'executive' | 'versions'>('preview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pdfUrl = data.profile.resumePdfUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + pdfUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white border border-slate-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{data.profile.name} — Curriculum Vitae</span>
                <span className="text-[11px] font-mono font-medium text-slate-300 px-2 py-0.5 rounded bg-white/10">
                  Official PDF
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                17 Years Engineering &amp; Applied AI Leadership
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Document Viewer
              </button>
              <button
                onClick={() => setViewMode('executive')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  viewMode === 'executive'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Structured Summary
              </button>
              <button
                onClick={() => setViewMode('versions')}
                className={`px-3 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === 'versions'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Role Versions</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700 font-mono">
                  {data.uploadedCVFiles?.length || 0}
                </span>
              </button>
            </div>

            {/* Direct Download Button */}
            <a
              href={pdfUrl}
              download="Jaideep_Naidu_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 bg-slate-50 overflow-y-auto p-4 sm:p-6">
          {viewMode === 'preview' ? (
            <div className="w-full h-full min-h-[500px] flex flex-col rounded-xl overflow-hidden border border-slate-300 bg-white">
              <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Displaying official PDF attachment: <strong>Jaideep_Naidu_v4.pdf</strong></span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="hover:text-blue-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Link Copied' : 'Share Link'}</span>
                  </button>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Tab</span>
                  </a>
                </div>
              </div>

              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                className="w-full flex-1 min-h-[550px] border-none"
                title="Jaideep Naidu CV Document"
              />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8 py-4 text-slate-700">
              {/* Header */}
              <div className="border-b border-slate-200 pb-6 space-y-2">
                <h1 className="text-2xl font-bold text-slate-900">{data.profile.name}</h1>
                <div className="text-xs text-slate-600 flex flex-wrap gap-3">
                  <span>{data.profile.location}</span>
                  <span>·</span>
                  <span>{data.profile.phone}</span>
                  <span>·</span>
                  <span>{data.profile.email}</span>
                  <span>·</span>
                  <a href={data.profile.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                  EXECUTIVE SUMMARY
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {data.profile.executiveSummary}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                  SELECTED LEADERSHIP HIGHLIGHTS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {data.accomplishments.slice(0, 4).map((acc) => (
                    <div key={acc.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                      <span className="font-bold text-slate-900 block">{acc.title}</span>
                      <span className="text-slate-600">{acc.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications Summary */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                  CREDENTIALS &amp; GOVERNANCE
                </h4>
                <div className="text-xs text-slate-700 space-y-1.5">
                  <p><strong>Education:</strong> MBA – Quantic School of Business &amp; Technology (2022) | Bachelor of Engineering (Distinction) – North Maharashtra University (2008)</p>
                  <p><strong>Technical:</strong> Palantir Foundry Certified, AWS Certified Cloud Practitioner, Sun-Certified Java Programmer</p>
                  <p><strong>Management:</strong> PMP®, PRINCE2® Practitioner, MSP®, Leading SAFe® 5.0, PAL, CSPO, CSM</p>
                </div>
              </div>
            </div>
          )}

          {/* Role Versions & Archived CV Documents Mode */}
          {viewMode === 'versions' && (
            <div className="max-w-4xl mx-auto space-y-6 py-2">
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-wider">
                  <FileDown className="w-3 h-3" />
                  <span>Archived CV Versions &amp; Role-Specific Deliverables</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Specialized CV Versions &amp; In-Depth Role Responsibilities
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These specialized CV editions and documents provide granular details regarding specific mandates, team topologies, budgets managed, technical deliverables, and domain nuances across Oil &amp; Gas, Defense, Pharma, and Enterprise Digital Transformation.
                </p>
              </div>

              <div className="space-y-3">
                {data.uploadedCVFiles && data.uploadedCVFiles.length > 0 ? (
                  data.uploadedCVFiles.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                            <File className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-sm font-bold text-slate-900">
                                {doc.versionLabel}
                              </h5>
                              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md font-medium">
                                {doc.roleContext}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 font-mono mt-0.5">
                              {doc.fileName} · {doc.fileSize} · {doc.uploadDate}
                            </div>
                          </div>
                        </div>

                        {doc.fileData && (
                          <a
                            href={doc.fileData}
                            download={doc.fileName}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shrink-0 shadow-2xs self-start"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Version</span>
                          </a>
                        )}
                      </div>

                      {doc.extractedNotes && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Specific Role Responsibilities &amp; Project Details:
                          </span>
                          <p>{doc.extractedNotes}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500">
                    No additional role versions uploaded yet. Use the Editor Mode (lock icon in footer) to upload older CV versions.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
