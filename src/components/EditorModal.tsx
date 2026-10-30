import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  X,
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  FileText,
  Briefcase,
  Trophy,
  Cpu,
  Compass,
  Camera,
  Upload,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  FileDown,
  Download,
  File,
  Sliders,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import {
  PORTFOLIO_DATA,
  savePortfolioData,
  resetPortfolioData,
  AccomplishmentItem,
  PhotographyItem,
  KnowledgeGraphNote,
  ExperienceItem,
  UploadedCVDocument,
  PillarHeaderConfig,
} from '../data/portfolioData';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: typeof PORTFOLIO_DATA;
  onSave: (newData: typeof PORTFOLIO_DATA) => void;
}

export const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    | 'profile'
    | 'knowledge-graph'
    | 'accomplishments'
    | 'cv-files'
    | 'experience'
    | 'photography'
    | 'travel'
    | 'turnkey'
    | 'metrics'
    | 'pillar-headers'
  >('knowledge-graph');
  const [formData, setFormData] = useState<typeof PORTFOLIO_DATA>(currentData);
  const [saveToast, setSaveToast] = useState<string>('');

  // New photo staging
  const [newPhoto, setNewPhoto] = useState<{
    title: string;
    category: PhotographyItem['category'];
    location: string;
    camera: string;
    settings: string;
    story: string;
    imageUrl: string;
    dateTaken: string;
  }>({
    title: '',
    category: 'Industrial & Marine',
    location: '',
    camera: 'Sony A7R IV · 35mm GM',
    settings: 'f/2.8 · 1/500s · ISO 100',
    story: '',
    imageUrl: '',
    dateTaken: '',
  });

  // Staging for new accomplishment
  const [newAcc, setNewAcc] = useState<Omit<AccomplishmentItem, 'id'>>({
    title: '',
    impactMetric: '',
    organization: 'BP Upstream Operations',
    category: 'Applied AI & RAG',
    description: '',
    significance: '',
    timeline: '',
  });

  // Staging for new Knowledge Graph node
  const [newKGNode, setNewKGNode] = useState<Omit<KnowledgeGraphNote, 'id'>>({
    category: 'Timeline Milestone',
    topic: '',
    timeline: '',
    details: '',
    impact: '',
  });

  // Staging for new uploaded CV / Role file
  const [newCVFile, setNewCVFile] = useState<{
    fileName: string;
    fileSize: string;
    versionLabel: string;
    roleContext: string;
    fileData: string;
    extractedNotes: string;
  }>({
    fileName: '',
    fileSize: '',
    versionLabel: '',
    roleContext: '',
    fileData: '',
    extractedNotes: '',
  });
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  useEffect(() => {
    setFormData({
      ...currentData,
      pillarHeaders: {
        ...PORTFOLIO_DATA.pillarHeaders,
        ...(currentData.pillarHeaders || {}),
      },
    });
  }, [currentData, isOpen]);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'EditPage') {
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Incorrect password. Please enter "EditPage".');
    }
  };

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveToast('Persisting to separate deployment file (src/data/portfolioCustomData.json)...');
    try {
      const res = await savePortfolioData(formData);
      onSave(formData);
      if (res.success) {
        setSaveToast('✓ Stored in separate file (src/data/portfolioCustomData.json) & ready for deployment!');
      } else {
        setSaveToast(`Saved locally: ${res.message}`);
      }
    } catch (e: any) {
      onSave(formData);
      setSaveToast('Saved locally in browser cache.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveToast(''), 4500);
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'portfolioCustomData.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSaveToast('Downloaded portfolioCustomData.json file.');
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          setFormData((prev) => ({
            ...prev,
            ...parsed,
            pillarHeaders: {
              ...PORTFOLIO_DATA.pillarHeaders,
              ...(parsed.pillarHeaders || {}),
            },
          }));
          setSaveToast('Imported JSON data! Click "Save & Push to Deployment File" to persist.');
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all customized copy back to the official CV defaults?')) {
      const reset = resetPortfolioData();
      setFormData(reset);
      onSave(reset);
      setSaveToast('Reset to original CV defaults.');
      setTimeout(() => setSaveToast(''), 3500);
    }
  };

  // Image upload handler (converts file to base64 Data URL)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please upload an image under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new photo to exhibition
  const handleAddPhoto = () => {
    if (!newPhoto.title.trim()) {
      alert('Please provide a title for the photograph.');
      return;
    }
    const item: PhotographyItem = {
      id: `photo-${Date.now()}`,
      title: newPhoto.title.trim(),
      category: newPhoto.category,
      location: newPhoto.location.trim() || 'London, UK',
      camera: newPhoto.camera.trim() || '35mm Lens',
      settings: newPhoto.settings.trim() || 'f/2.8 · 1/250s · ISO 100',
      story: newPhoto.story.trim(),
      gradient: 'from-slate-900 via-slate-800 to-slate-950',
      accent: '#2563eb',
      imageUrl: newPhoto.imageUrl || undefined,
      dateTaken: newPhoto.dateTaken.trim() || undefined,
    };

    setFormData((prev) => ({
      ...prev,
      photographyExhibition: [item, ...prev.photographyExhibition],
    }));

    setNewPhoto({
      title: '',
      category: 'Industrial & Marine',
      location: '',
      camera: 'Sony A7R IV · 35mm GM',
      settings: 'f/2.8 · 1/500s · ISO 100',
      story: '',
      imageUrl: '',
      dateTaken: '',
    });
    setSaveToast('Photograph added! Remember to click "Save to Website" above.');
  };

  // Delete photo
  const handleDeletePhoto = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      photographyExhibition: prev.photographyExhibition.filter((p) => p.id !== id),
    }));
  };

  // Add new accomplishment
  const handleAddAccomplishment = () => {
    if (!newAcc.title.trim() || !newAcc.impactMetric.trim()) {
      alert('Please provide a title and impact metric.');
      return;
    }
    const item: AccomplishmentItem = {
      id: `acc-${Date.now()}`,
      ...newAcc,
    };
    setFormData((prev) => ({
      ...prev,
      accomplishments: [item, ...prev.accomplishments],
    }));
    setNewAcc({
      title: '',
      impactMetric: '',
      organization: 'BP Upstream Operations',
      category: 'Applied AI & RAG',
      description: '',
      significance: '',
      timeline: '',
    });
    setSaveToast('Project success added to Knowledge Graph! Click "Save to Website".');
  };

  // Delete accomplishment
  const handleDeleteAccomplishment = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.filter((a) => a.id !== id),
    }));
  };

  // Add new Knowledge Graph node
  const handleAddKGNode = () => {
    if (!newKGNode.topic.trim()) {
      alert('Please provide a topic or milestone name.');
      return;
    }
    const item: KnowledgeGraphNote = {
      id: `kgn-${Date.now()}`,
      ...newKGNode,
    };
    setFormData((prev) => ({
      ...prev,
      knowledgeGraphNotes: [item, ...(prev.knowledgeGraphNotes || [])],
    }));
    setNewKGNode({
      category: 'Timeline Milestone',
      topic: '',
      timeline: '',
      details: '',
      impact: '',
    });
    setSaveToast('Knowledge node added! AI Assistant now incorporates this context.');
  };

  // Delete Knowledge Graph node
  const handleDeleteKGNode = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      knowledgeGraphNotes: (prev.knowledgeGraphNotes || []).filter((n) => n.id !== id),
    }));
  };

  // Process uploaded CV or role document
  const processCVFile = (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      alert('File size exceeds 20MB. Please upload a document under 20MB.');
      return;
    }
    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCVFile((prev) => ({
        ...prev,
        fileName: file.name,
        fileSize: sizeStr,
        fileData: reader.result as string,
        versionLabel: prev.versionLabel || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      }));
    };
    reader.readAsDataURL(file);

    // Auto-extract text if text or markdown
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const textReader = new FileReader();
      textReader.onloadend = () => {
        if (typeof textReader.result === 'string') {
          setNewCVFile((prev) => ({
            ...prev,
            extractedNotes: prev.extractedNotes || (textReader.result as string),
          }));
        }
      };
      textReader.readAsText(file);
    }
  };

  // CV / Role file upload input handler
  const handleCVFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCVFile(file);
    }
  };

  // Drag-and-drop file upload handler
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processCVFile(file);
    }
  };

  // Add CV file to archive & knowledge graph
  const handleAddCVFile = () => {
    if (!newCVFile.fileName && !newCVFile.versionLabel.trim()) {
      alert('Please select a file to upload or enter a document title.');
      return;
    }
    const doc: UploadedCVDocument = {
      id: `cv-${Date.now()}`,
      fileName: newCVFile.fileName || `${newCVFile.versionLabel.trim().replace(/\s+/g, '_')}.pdf`,
      fileSize: newCVFile.fileSize || 'Attached File',
      uploadDate: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      versionLabel: newCVFile.versionLabel.trim() || 'Role Document / CV Version',
      roleContext: newCVFile.roleContext.trim() || 'Engineering & Product Leadership',
      fileData: newCVFile.fileData || undefined,
      extractedNotes: newCVFile.extractedNotes.trim(),
    };

    setFormData((prev) => ({
      ...prev,
      uploadedCVFiles: [doc, ...(prev.uploadedCVFiles || [])],
    }));

    setNewCVFile({
      fileName: '',
      fileSize: '',
      versionLabel: '',
      roleContext: '',
      fileData: '',
      extractedNotes: '',
    });
    setSaveToast('CV / Role file uploaded! Click "Save to Website" above to persist.');
  };

  // Delete CV file
  const handleDeleteCVFile = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      uploadedCVFiles: (prev.uploadedCVFiles || []).filter((c) => c.id !== id),
    }));
  };

  // Update a single field in a pillar's header config
  const handleUpdatePillarHeader = (
    key: string,
    field: keyof PillarHeaderConfig,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      pillarHeaders: {
        ...prev.pillarHeaders,
        [key]: {
          ...(prev.pillarHeaders?.[key] || PORTFOLIO_DATA.pillarHeaders[key]),
          [field]: value,
        },
      },
    }));
  };

  // Reset a specific pillar's header back to default
  const handleResetSinglePillarHeader = (key: string) => {
    if (PORTFOLIO_DATA.pillarHeaders[key]) {
      setFormData((prev) => ({
        ...prev,
        pillarHeaders: {
          ...prev.pillarHeaders,
          [key]: { ...PORTFOLIO_DATA.pillarHeaders[key] },
        },
      }));
      setSaveToast(`Reset ${key} header to default.`);
    }
  };

  // Reset all pillar headers back to default
  const handleResetAllPillarHeaders = () => {
    setFormData((prev) => ({
      ...prev,
      pillarHeaders: { ...PORTFOLIO_DATA.pillarHeaders },
    }));
    setSaveToast('Reset all pillar headers & highlights to defaults.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs">
      {!isAuthenticated ? (
        /* Password Gate Modal */
        <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-800">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Content &amp; Knowledge Graph Editor
            </h3>
            <p className="text-xs text-slate-500">
              Enter password to edit copy, add timelines, and expand the AI Knowledge Graph. All changes are stored in a dedicated file (<code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">portfolioCustomData.json</code>) and pushed with the website deployment.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {passwordError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter 'EditPage'..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Editor</span>
            </button>
          </form>
        </div>
      ) : (
        /* Full Administrative Editor Drawer */
        <div className="relative w-full max-w-6xl h-[94vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-white">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Jaideep Naidu — Profile &amp; Knowledge Graph Studio</span>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Session
                  </span>
                </h3>
                <p className="text-xs text-slate-300">
                  Enrich timeline successes, upload photos, and ground the Gemini AI to market Jaideep for executive roles.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Separate File Persistence Badge */}
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>File: <strong className="text-white font-mono text-[10px]">portfolioCustomData.json</strong></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" title="In sync with deployment file" />
              </div>

              {/* Import JSON file */}
              <label
                className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Import/restore custom JSON data file"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Import JSON</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>

              {/* Download JSON file */}
              <button
                onClick={handleDownloadJSON}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Download full portfolioCustomData.json file for offline backup or versioning"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export JSON</span>
              </button>

              {/* Reset to defaults */}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors"
                title="Reset to default CV contents"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              {/* Save & Deploy File Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-lg transition-colors shadow-sm cursor-pointer"
                title="Persist changes to separate file (src/data/portfolioCustomData.json) to be pushed with deployment"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to File...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save &amp; Deploy File</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  onClose();
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors ml-1"
                aria-label="Close editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {saveToast && (
            <div className="px-6 py-2 bg-emerald-600 text-white text-xs font-medium flex items-center justify-between transition-all shrink-0">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                {saveToast}
              </span>
              <button onClick={() => setSaveToast('')} className="text-white/80 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Editor Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-60 bg-slate-50 border-r border-slate-200 p-3 space-y-1 shrink-0 overflow-y-auto">
              <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                AI Knowledge Graph
              </div>

              <button
                onClick={() => setActiveTab('knowledge-graph')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                  activeTab === 'knowledge-graph'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>AI Knowledge Graph</span>
                </div>
                <span className="text-[10px] bg-blue-900 text-blue-200 px-1.5 py-0.5 rounded font-mono">
                  {formData.knowledgeGraphNotes?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('cv-files')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                  activeTab === 'cv-files'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileDown className="w-4 h-4 text-indigo-500" />
                  <span>Upload Role Files &amp; CVs</span>
                </div>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-full font-mono font-bold">
                  {formData.uploadedCVFiles?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('accomplishments')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'accomplishments'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Project Successes ({formData.accomplishments.length})</span>
              </button>

              <div className="text-[10px] font-bold text-slate-400 px-3 pt-3 py-1 uppercase tracking-wider">
                Multimedia &amp; Passions
              </div>

              <button
                onClick={() => setActiveTab('photography')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'photography'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Camera className="w-4 h-4 text-emerald-500" />
                <span>Upload Photos ({formData.photographyExhibition.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('travel')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                  activeTab === 'travel'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-500" />
                  <span>Hobby Travel details</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  52 Nations
                </span>
              </button>

              <div className="text-[10px] font-bold text-slate-400 px-3 pt-3 py-1 uppercase tracking-wider">
                Executive Profile
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'profile'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Profile &amp; Executive Summary</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'experience'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4 text-indigo-500" />
                <span>Work Experience ({formData.workExperience.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('turnkey')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'turnkey'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-4 h-4 text-purple-500" />
                <span>Turnkey AI Playbook</span>
              </button>

              <button
                onClick={() => setActiveTab('metrics')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'metrics'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Trophy className="w-4 h-4 text-blue-500" />
                <span>Hero Metrics Strip</span>
              </button>

              <div className="text-[10px] font-bold text-slate-400 px-3 pt-3 py-1 uppercase tracking-wider">
                Pillar Architecture
              </div>

              <button
                onClick={() => setActiveTab('pillar-headers')}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                  activeTab === 'pillar-headers'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-500" />
                  <span>Pillar Headers &amp; Highlights</span>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
                  8
                </span>
              </button>
            </div>

            {/* Main Form Content Pane */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white">
              {/* ================= TAB 1: KNOWLEDGE GRAPH ENRICHMENT & FILE INGESTION ================= */}
              {(activeTab === 'knowledge-graph' || activeTab === 'cv-files') && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>AI Knowledge Graph &amp; Grounded Context Engine</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      AI Knowledge Graph &amp; Role Document Archive
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Enrich the Knowledge Graph grounding Jaideep&rsquo;s Gemini AI chatbot. Upload older versions of the CV with varying levels of detail about each role and responsibilities, and inject granular milestone nodes.
                    </p>
                  </div>

                  {/* ================= SECTION: UPLOAD FILES (OLDER CV VERSIONS & ROLE RESPONSIBILITIES) ================= */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 border border-indigo-200/80 shadow-xs space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                          <FileDown className="w-3 h-3" />
                          <span>Knowledge Graph File Ingestion</span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900">
                          Upload Files &amp; Older CV Versions
                        </h5>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          Upload older versions of the CV with varying levels of relevant detail about each role and responsibilities. These files and detailed notes are ingested into the AI Knowledge Graph so the chatbot can market Jaideep for any role.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-indigo-700 shrink-0">
                        {formData.uploadedCVFiles?.length || 0} file(s) archived
                      </span>
                    </div>

                    {/* File Upload Box */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingFile(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDraggingFile(false);
                      }}
                      onDrop={handleFileDrop}
                      className={`p-5 rounded-xl border-2 border-dashed transition-all space-y-4 ${
                        isDraggingFile
                          ? 'border-indigo-600 bg-indigo-50 shadow-md scale-[1.01]'
                          : 'border-indigo-200 hover:border-indigo-400 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">
                              Choose or Drag &amp; Drop a CV / Role Document to Upload
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Supports PDF, DOC, DOCX, TXT, Markdown (up to 20MB) — older CV versions with role details
                            </div>
                          </div>
                        </div>

                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Select Document</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.md,.rtf"
                            onChange={handleCVFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {newCVFile.fileName && (
                        <div className="p-2.5 rounded-lg bg-indigo-50/80 border border-indigo-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-indigo-950 font-medium truncate">
                            <File className="w-4 h-4 text-indigo-600 shrink-0" />
                            <span className="truncate">{newCVFile.fileName}</span>
                            <span className="text-[10px] text-indigo-600 font-mono">({newCVFile.fileSize})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNewCVFile({ ...newCVFile, fileName: '', fileSize: '', fileData: '' })}
                            className="text-slate-400 hover:text-rose-600 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700">
                            Document / CV Version Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 2021 Senior Technical PM CV - BP Subsea & Digital Transformation"
                            value={newCVFile.versionLabel}
                            onChange={(e) => setNewCVFile({ ...newCVFile, versionLabel: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700">
                            Role, Domain &amp; Team Context
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. BP Upstream Deepwater · Remote Operations · Team of 35"
                            value={newCVFile.roleContext}
                            onChange={(e) => setNewCVFile({ ...newCVFile, roleContext: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                          <span>Specific Role Responsibilities &amp; Granular Details (AI Knowledge Context)</span>
                          <span className="text-[10px] text-slate-400 font-normal">Grounded directly for Gemini AI chatbot</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Paste or enter detailed role responsibilities, specific team sizes, technical deliverables, operational milestones, budgets managed, methodologies (Scrum/Palantir/OT/IT), and project nuances from this version..."
                          value={newCVFile.extractedNotes}
                          onChange={(e) => setNewCVFile({ ...newCVFile, extractedNotes: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 leading-relaxed font-sans"
                        />
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={handleAddCVFile}
                          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add File to Knowledge Graph</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Uploaded Files List */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
                        <span>Archived CV Versions &amp; Role Files ({formData.uploadedCVFiles?.length || 0})</span>
                        <span className="text-[11px] font-normal text-slate-500">Available to AI &amp; visitors</span>
                      </div>

                      <div className="space-y-2">
                        {formData.uploadedCVFiles && formData.uploadedCVFiles.length > 0 ? (
                          formData.uploadedCVFiles.map((doc) => (
                            <div
                              key={doc.id}
                              className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="space-y-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h6 className="text-xs font-bold text-slate-900 truncate">
                                      {doc.versionLabel}
                                    </h6>
                                    <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded font-medium">
                                      {doc.roleContext}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {doc.uploadDate}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                                    <span>{doc.fileName}</span>
                                    <span>·</span>
                                    <span>{doc.fileSize}</span>
                                  </div>
                                  {doc.extractedNotes && (
                                    <p className="text-[11px] text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded border border-slate-100 mt-1 italic">
                                      &ldquo;{doc.extractedNotes}&rdquo;
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                {doc.fileData && (
                                  <a
                                    href={doc.fileData}
                                    download={doc.fileName}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                                    title="Download file"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download</span>
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCVFile(doc.id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                                  title="Delete document"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                            No older CV versions uploaded yet. Upload your first document above to enrich the Knowledge Graph.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add New Knowledge Node Form */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                      <Plus className="w-4 h-4" />
                      <span>ADD NEW STRUCTURED KNOWLEDGE NODE</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Category</label>
                        <select
                          value={newKGNode.category}
                          onChange={(e) =>
                            setNewKGNode({
                              ...newKGNode,
                              category: e.target.value as KnowledgeGraphNote['category'],
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        >
                          <option value="Timeline Milestone">Timeline Milestone</option>
                          <option value="Project Success">Project Success</option>
                          <option value="Domain Expertise">Domain Expertise</option>
                          <option value="Leadership Trait">Leadership Trait</option>
                          <option value="Turnkey Capability">Turnkey Capability</option>
                        </select>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-700">Topic / Core Capability</label>
                        <input
                          type="text"
                          placeholder="e.g. Graph RAG Benchmark Automation &amp; Palantir Scaling"
                          value={newKGNode.topic}
                          onChange={(e) => setNewKGNode({ ...newKGNode, topic: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Timeline / Date Period</label>
                        <input
                          type="text"
                          placeholder="e.g. Q3 2023 - Present"
                          value={newKGNode.timeline}
                          onChange={(e) => setNewKGNode({ ...newKGNode, timeline: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Verified Impact / Metric</label>
                        <input
                          type="text"
                          placeholder="e.g. $100M+ discovery value; 10,000+ users adopted"
                          value={newKGNode.impact}
                          onChange={(e) => setNewKGNode({ ...newKGNode, impact: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 text-emerald-700 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Contextual Narrative &amp; Details</label>
                      <textarea
                        rows={2}
                        placeholder="Describe the architectural challenge, cross-functional teams led, and exact technologies used..."
                        value={newKGNode.details}
                        onChange={(e) => setNewKGNode({ ...newKGNode, details: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddKGNode}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Inject Into Knowledge Graph</span>
                    </button>
                  </div>

                  {/* Existing Knowledge Nodes */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Active Knowledge Graph Nodes ({formData.knowledgeGraphNotes?.length || 0})
                    </h5>

                    {(formData.knowledgeGraphNotes || []).map((node, idx) => (
                      <div
                        key={node.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                                {node.category}
                              </span>
                              {node.timeline && (
                                <span className="text-[11px] font-mono text-slate-500 font-medium">
                                  {node.timeline}
                                </span>
                              )}
                            </div>
                            <h6 className="text-sm font-bold text-slate-900">{node.topic}</h6>
                          </div>

                          <button
                            onClick={() => handleDeleteKGNode(node.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Delete node"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">{node.details}</p>

                        <div className="text-[11px] font-semibold text-emerald-700 pt-1 border-t border-slate-100">
                          Impact: {node.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: PROJECT SUCCESSES ================= */}
              {activeTab === 'accomplishments' && (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Project Successes &amp; Executive Outcomes
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage and add new high-impact milestones displayed on the accomplishments section and taught to the AI chatbot.
                    </p>
                  </div>

                  {/* Add New Accomplishment Form */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                      <Plus className="w-4 h-4" />
                      <span>ADD NEW PROJECT SUCCESS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Project / Success Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Graph RAG Ingestion Pipeline for ISO Standards"
                          value={newAcc.title}
                          onChange={(e) => setNewAcc({ ...newAcc, title: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Impact Metric (Hero Figure)</label>
                        <input
                          type="text"
                          placeholder="e.g. $100M+ Value, 15k+ Hrs, or 90% Automation"
                          value={newAcc.impactMetric}
                          onChange={(e) => setNewAcc({ ...newAcc, impactMetric: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-bold text-emerald-700 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. BP Upstream Operations"
                          value={newAcc.organization}
                          onChange={(e) => setNewAcc({ ...newAcc, organization: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Category</label>
                        <select
                          value={newAcc.category}
                          onChange={(e) =>
                            setNewAcc({
                              ...newAcc,
                              category: e.target.value as AccomplishmentItem['category'],
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        >
                          <option value="Applied AI & RAG">Applied AI &amp; RAG</option>
                          <option value="Operational Risk & Safety">Operational Risk &amp; Safety</option>
                          <option value="Data Architecture">Data Architecture</option>
                          <option value="Commercial & Capex">Commercial &amp; Capex</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Timeline / Date</label>
                        <input
                          type="text"
                          placeholder="e.g. May 2023 - Present"
                          value={newAcc.timeline || ''}
                          onChange={(e) => setNewAcc({ ...newAcc, timeline: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Technical Description</label>
                      <textarea
                        rows={2}
                        placeholder="Indexed 20+ years of standards and technical deviations with deterministic benchmarks..."
                        value={newAcc.description}
                        onChange={(e) => setNewAcc({ ...newAcc, description: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Strategic Significance</label>
                      <input
                        type="text"
                        placeholder="e.g. Unlocked $100M+ in reliable engineering discovery value across upstream assets."
                        value={newAcc.significance}
                        onChange={(e) => setNewAcc({ ...newAcc, significance: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddAccomplishment}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project Success</span>
                    </button>
                  </div>

                  {/* List of Accomplishments */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Active Project Successes ({formData.accomplishments.length})
                    </h5>

                    {formData.accomplishments.map((acc, idx) => (
                      <div
                        key={acc.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-blue-700">{acc.organization}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                                {acc.impactMetric}
                              </span>
                              {acc.timeline && (
                                <span className="text-[11px] font-mono text-slate-400">
                                  {acc.timeline}
                                </span>
                              )}
                            </div>
                            <h6 className="text-sm font-bold text-slate-900">{acc.title}</h6>
                          </div>

                          <button
                            onClick={() => handleDeleteAccomplishment(acc.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Delete accomplishment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">{acc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 3: PHOTOGRAPHY & UPLOAD ================= */}
              {activeTab === 'photography' && (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Upload Photographs &amp; Pass-Time Art
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload your real high-resolution photographs, specify camera settings, locations, and compositional stories to enrich the exhibition and AI knowledge.
                    </p>
                  </div>

                  {/* Upload New Picture Box */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                      <Upload className="w-4 h-4" />
                      <span>UPLOAD NEW PHOTOGRAPH</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                      {/* Image Upload Drop Area */}
                      <div className="sm:col-span-5 space-y-2">
                        <label className="text-[11px] font-semibold text-slate-700 block">
                          Select Image File (PNG, JPG, WEBP)
                        </label>
                        <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-600 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {newPhoto.imageUrl ? (
                            <div className="space-y-2">
                              <img
                                src={newPhoto.imageUrl}
                                alt="Upload preview"
                                className="h-32 w-full object-cover rounded-lg border border-slate-200"
                              />
                              <span className="text-[11px] text-blue-600 font-semibold block">
                                Click or drag to replace
                              </span>
                            </div>
                          ) : (
                            <div className="py-4 space-y-2 text-slate-500">
                              <ImageIcon className="w-8 h-8 mx-auto text-slate-400" />
                              <div className="text-xs font-medium text-slate-700">
                                Click to choose image or drag &amp; drop
                              </div>
                              <div className="text-[10px] text-slate-400">Max size: 5MB</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Photo Metadata Details */}
                      <div className="sm:col-span-7 space-y-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700">Photo Title</label>
                          <input
                            type="text"
                            placeholder="e.g. North Sea Steel Sentinel at Dusk"
                            value={newPhoto.title}
                            onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">Category</label>
                            <select
                              value={newPhoto.category}
                              onChange={(e) =>
                                setNewPhoto({
                                  ...newPhoto,
                                  category: e.target.value as PhotographyItem['category'],
                                })
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                            >
                              <option value="Industrial & Marine">Industrial &amp; Marine</option>
                              <option value="Architectural Form">Architectural Form</option>
                              <option value="Global Horizons">Global Horizons</option>
                              <option value="Street & Culture">Street &amp; Culture</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">Location</label>
                            <input
                              type="text"
                              placeholder="e.g. Aberdeen Basin, Scotland"
                              value={newPhoto.location}
                              onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">Camera &amp; Lens</label>
                            <input
                              type="text"
                              placeholder="e.g. Leica Q2 · 28mm Summilux"
                              value={newPhoto.camera}
                              onChange={(e) => setNewPhoto({ ...newPhoto, camera: e.target.value })}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">EXIF Settings</label>
                            <input
                              type="text"
                              placeholder="e.g. f/4.0 · 1/800s · ISO 100"
                              value={newPhoto.settings}
                              onChange={(e) => setNewPhoto({ ...newPhoto, settings: e.target.value })}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700">Compositional Story / Insight</label>
                          <textarea
                            rows={2}
                            placeholder="Share the personal story behind this shot..."
                            value={newPhoto.story}
                            onChange={(e) => setNewPhoto({ ...newPhoto, story: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleAddPhoto}
                          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Photography Gallery</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Active Gallery Preview */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Current Exhibition Photographs ({formData.photographyExhibition.length})
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {formData.photographyExhibition.map((photo) => (
                        <div
                          key={photo.id}
                          className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex gap-3 items-start"
                        >
                          <div className="w-20 h-20 bg-slate-900 rounded-lg shrink-0 overflow-hidden relative">
                            {photo.imageUrl ? (
                              <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/50">
                                <Camera className="w-6 h-6" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h6 className="text-xs font-bold text-slate-900 truncate">
                                {photo.title}
                              </h6>
                              <button
                                onClick={() => handleDeletePhoto(photo.id)}
                                className="text-slate-400 hover:text-rose-600 p-0.5"
                                title="Remove photograph"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[10px] text-blue-700 font-semibold">{photo.category}</div>
                            <div className="text-[10px] text-slate-500 font-mono truncate">{photo.camera}</div>
                            <p className="text-[11px] text-slate-600 line-clamp-1">{photo.story}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAB 4: HOBBY TRAVEL DETAILS ================= */}
              {activeTab === 'travel' && (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                      <Compass className="w-3 h-3" />
                      <span>Pillar 06 · Global Horizons</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-sky-500" />
                      <span>Hobby Travel details</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage your 52 sovereign nations exploration across 6 continents, regional lists, and leadership travel perspective narrative.
                    </p>
                  </div>

                  {/* ================= SECTION: 52 SOVEREIGN NATIONS & GLOBAL PERSPECTIVE ================= */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Compass className="w-3 h-3" />
                        <span>Global Experience</span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900">
                        52 Sovereign Nations &amp; Global Exploration
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Update your total countries count, regional lists, and leadership travel perspective narrative.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Total Sovereign Nations</label>
                        <input
                          type="number"
                          value={formData.travelExploration.totalCountries}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              travelExploration: {
                                ...formData.travelExploration,
                                totalCountries: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Continents Explored</label>
                        <input
                          type="number"
                          value={formData.travelExploration.continents}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              travelExploration: {
                                ...formData.travelExploration,
                                continents: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Global Perspective Narrative</label>
                      <textarea
                        rows={4}
                        value={formData.travelExploration.perspectiveStatement}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            travelExploration: {
                              ...formData.travelExploration,
                              perspectiveStatement: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 leading-relaxed italic"
                      />
                    </div>

                    <div className="space-y-4">
                      <h6 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Regional Breakdowns &amp; Country Lists
                      </h6>

                      {formData.travelExploration.regions.map((reg, rIdx) => (
                        <div key={reg.region} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{reg.region}</span>
                            <span className="text-[11px] text-slate-500 font-mono">{reg.countries.length} nations</span>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-slate-500">Countries (comma separated)</label>
                            <input
                              type="text"
                              value={reg.countries.join(', ')}
                              onChange={(e) => {
                                const updatedRegions = [...formData.travelExploration.regions];
                                updatedRegions[rIdx].countries = e.target.value
                                  .split(',')
                                  .map((c) => c.trim())
                                  .filter(Boolean);
                                setFormData({
                                  ...formData,
                                  travelExploration: {
                                    ...formData.travelExploration,
                                    regions: updatedRegions,
                                  },
                                });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-slate-500">Regional Milestone Highlight</label>
                            <input
                              type="text"
                              value={reg.highlight}
                              onChange={(e) => {
                                const updatedRegions = [...formData.travelExploration.regions];
                                updatedRegions[rIdx].highlight = e.target.value;
                                setFormData({
                                  ...formData,
                                  travelExploration: {
                                    ...formData.travelExploration,
                                    regions: updatedRegions,
                                  },
                                });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAB 5: PROFILE ================= */}
              {activeTab === 'profile' && (
                <div className="space-y-5 max-w-3xl">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Executive Profile Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        value={formData.profile.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Executive Title</label>
                      <input
                        type="text"
                        value={formData.profile.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Current Role &amp; Organization</label>
                      <input
                        type="text"
                        value={formData.profile.currentRole}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, currentRole: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Location Base</label>
                      <input
                        type="text"
                        value={formData.profile.location}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, location: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        value={formData.profile.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, email: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Telephone</label>
                      <input
                        type="text"
                        value={formData.profile.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profile: { ...formData.profile, phone: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Executive Summary</label>
                    <textarea
                      rows={4}
                      value={formData.profile.executiveSummary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, executiveSummary: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Human-Led Philosophy Statement</label>
                    <textarea
                      rows={3}
                      value={formData.profile.humanPhilosophy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, humanPhilosophy: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 leading-relaxed italic"
                    />
                  </div>
                </div>
              )}

              {/* ================= TAB 6: EXPERIENCE ================= */}
              {activeTab === 'experience' && (
                <div className="space-y-5 max-w-3xl">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Work Experience Timelines
                  </h4>

                  <div className="space-y-4">
                    {formData.workExperience.map((job, idx) => (
                      <div key={job.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">Company</label>
                            <input
                              type="text"
                              value={job.company}
                              onChange={(e) => {
                                const newJobs = [...formData.workExperience];
                                newJobs[idx].company = e.target.value;
                                setFormData({ ...formData, workExperience: newJobs });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-md bg-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">Role Title</label>
                            <input
                              type="text"
                              value={job.role}
                              onChange={(e) => {
                                const newJobs = [...formData.workExperience];
                                newJobs[idx].role = e.target.value;
                                setFormData({ ...formData, workExperience: newJobs });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-md bg-white text-blue-700"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">Period / Specific Dates</label>
                            <input
                              type="text"
                              value={job.period}
                              onChange={(e) => {
                                const newJobs = [...formData.workExperience];
                                newJobs[idx].period = e.target.value;
                                setFormData({ ...formData, workExperience: newJobs });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-700">Location</label>
                            <input
                              type="text"
                              value={job.location}
                              onChange={(e) => {
                                const newJobs = [...formData.workExperience];
                                newJobs[idx].location = e.target.value;
                                setFormData({ ...formData, workExperience: newJobs });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700">Summary &amp; Scope</label>
                          <textarea
                            rows={2}
                            value={job.summary}
                            onChange={(e) => {
                              const newJobs = [...formData.workExperience];
                              newJobs[idx].summary = e.target.value;
                              setFormData({ ...formData, workExperience: newJobs });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 7: TURNKEY ================= */}
              {activeTab === 'turnkey' && (
                <div className="space-y-5 max-w-3xl">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Turnkey AI 4-Step Playbook
                  </h4>

                  <div className="space-y-4">
                    {formData.turnkeyPlaybook.map((step, idx) => (
                      <div key={step.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-blue-700 text-sm">Step {step.step}</span>
                          <span className="text-xs font-semibold text-slate-500">{step.badge}</span>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600">Step Title</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const newPb = [...formData.turnkeyPlaybook];
                              newPb[idx].title = e.target.value;
                              setFormData({ ...formData, turnkeyPlaybook: newPb });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-md bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600">Industrial Challenge</label>
                          <textarea
                            rows={2}
                            value={step.problem}
                            onChange={(e) => {
                              const newPb = [...formData.turnkeyPlaybook];
                              newPb[idx].problem = e.target.value;
                              setFormData({ ...formData, turnkeyPlaybook: newPb });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600">Turnkey Solution</label>
                          <textarea
                            rows={2}
                            value={step.solution}
                            onChange={(e) => {
                              const newPb = [...formData.turnkeyPlaybook];
                              newPb[idx].solution = e.target.value;
                              setFormData({ ...formData, turnkeyPlaybook: newPb });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 8: METRICS ================= */}
              {activeTab === 'metrics' && (
                <div className="space-y-5 max-w-3xl">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Hero Metrics Strip (6 Numbers)
                  </h4>

                  <div className="space-y-4">
                    {formData.keyMetrics.map((metric, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600">Metric Value</label>
                          <input
                            type="text"
                            value={metric.value}
                            onChange={(e) => {
                              const newMetrics = [...formData.keyMetrics];
                              newMetrics[idx].value = e.target.value;
                              setFormData({ ...formData, keyMetrics: newMetrics });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-300 rounded-md bg-white font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600">Metric Label</label>
                          <input
                            type="text"
                            value={metric.label}
                            onChange={(e) => {
                              const newMetrics = [...formData.keyMetrics];
                              newMetrics[idx].label = e.target.value;
                              setFormData({ ...formData, keyMetrics: newMetrics });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600">Context Subtitle</label>
                          <input
                            type="text"
                            value={metric.sublabel}
                            onChange={(e) => {
                              const newMetrics = [...formData.keyMetrics];
                              newMetrics[idx].sublabel = e.target.value;
                              setFormData({ ...formData, keyMetrics: newMetrics });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 10: PILLAR HEADERS & HIGHLIGHTS ================= */}
              {activeTab === 'pillar-headers' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>Pillar Headers &amp; Highlights Editor</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-medium">
                          8 Sections
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Customize the titles, badges, and header summary highlights for each collapsible pillar and section.
                      </p>
                    </div>

                    <button
                      onClick={handleResetAllPillarHeaders}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
                      title="Reset all pillar headers to default CV values"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset All Headers</span>
                    </button>
                  </div>

                  {/* List of 8 Pillar Header Config Cards */}
                  <div className="space-y-6">
                    {[
                      {
                        key: 'hero',
                        name: 'Executive Hero Overview',
                        gradient: 'bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white',
                        badgeBorder: 'border-slate-700',
                      },
                      {
                        key: 'experience',
                        name: 'Pillar 01: Experience Track Record',
                        gradient: 'bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white',
                        badgeBorder: 'border-blue-400/30',
                      },
                      {
                        key: 'accomplishments',
                        name: 'Pillar 02: Accomplishments & Qualifications',
                        gradient: 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white',
                        badgeBorder: 'border-emerald-400/30',
                      },
                      {
                        key: 'industries',
                        name: 'Pillar 03: 7 Global Industries',
                        gradient: 'bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-900 text-white',
                        badgeBorder: 'border-indigo-400/30',
                      },
                      {
                        key: 'turnkey-tech',
                        name: 'Pillar 04: Turnkey AI & Modernization',
                        gradient: 'bg-gradient-to-r from-cyan-950 via-teal-950 to-slate-900 text-white',
                        badgeBorder: 'border-teal-400/30',
                      },
                      {
                        key: 'leadership',
                        name: 'Pillar 05: Human-Led Leadership',
                        gradient: 'bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-white',
                        badgeBorder: 'border-amber-400/30',
                      },
                      {
                        key: 'hobbies',
                        name: 'Pillar 06: Hobbies & Photography',
                        gradient: 'bg-gradient-to-r from-rose-950 via-rose-900 to-slate-950 text-white',
                        badgeBorder: 'border-rose-400/30',
                      },
                      {
                        key: 'contact',
                        name: 'Connect & Advisory (Direct Dispatch)',
                        gradient: 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white',
                        badgeBorder: 'border-blue-400/30',
                      },
                    ].map((sectionMeta) => {
                      const cfg =
                        formData.pillarHeaders?.[sectionMeta.key] ||
                        PORTFOLIO_DATA.pillarHeaders[sectionMeta.key] || {
                          id: sectionMeta.key,
                          pillarTag: sectionMeta.name,
                          title: sectionMeta.name,
                          subtitle: '',
                          highlight: '',
                        };

                      return (
                        <div
                          key={sectionMeta.key}
                          className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4 shadow-2xs hover:border-slate-300 transition-all"
                        >
                          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">
                                {sectionMeta.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                                id: #{sectionMeta.key}
                              </span>
                            </div>

                            <button
                              onClick={() => handleResetSinglePillarHeader(sectionMeta.key)}
                              className="text-[11px] font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                              title="Reset this pillar header to default"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset to Default</span>
                            </button>
                          </div>

                          {/* Editable Inputs Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 sm:col-span-2">
                              <label className="text-xs font-semibold text-slate-700">
                                Pillar Title
                              </label>
                              <input
                                type="text"
                                value={cfg.title}
                                onChange={(e) =>
                                  handleUpdatePillarHeader(sectionMeta.key, 'title', e.target.value)
                                }
                                placeholder="Enter pillar title..."
                                className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                              />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                              <label className="text-xs font-semibold text-slate-700">
                                Header Highlight Summary (Displayed in collapsed &amp; expanded header bar)
                              </label>
                              <input
                                type="text"
                                value={cfg.highlight}
                                onChange={(e) =>
                                  handleUpdatePillarHeader(sectionMeta.key, 'highlight', e.target.value)
                                }
                                placeholder="e.g. BP Upstream · BJSS · Capgemini · 10k+ Engineers..."
                                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 font-mono text-[11px]"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-700">
                                Pillar Tag / Badge
                              </label>
                              <input
                                type="text"
                                value={cfg.pillarTag}
                                onChange={(e) =>
                                  handleUpdatePillarHeader(sectionMeta.key, 'pillarTag', e.target.value)
                                }
                                placeholder="e.g. PILLAR 01..."
                                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-700">
                                Subtitle / Discipline Label
                              </label>
                              <input
                                type="text"
                                value={cfg.subtitle}
                                onChange={(e) =>
                                  handleUpdatePillarHeader(sectionMeta.key, 'subtitle', e.target.value)
                                }
                                placeholder="e.g. 17 Years Executive Leadership..."
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                              />
                            </div>
                          </div>

                          {/* Live Visual Header Preview Box */}
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                              Live Header Bar Preview
                            </div>
                            <div
                              className={`p-4 rounded-xl ${sectionMeta.gradient} flex items-center justify-between gap-4 shadow-sm border border-black/20`}
                            >
                              <div className="space-y-1 truncate">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/20 border ${sectionMeta.badgeBorder}`}
                                  >
                                    {cfg.pillarTag || 'TAG'}
                                  </span>
                                  <span className="text-xs opacity-80 truncate hidden sm:inline">
                                    {cfg.subtitle}
                                  </span>
                                </div>
                                <div className="font-bold text-sm sm:text-base tracking-tight truncate">
                                  {cfg.title || 'Untitled Pillar'}
                                </div>
                              </div>

                              <div className="shrink-0 flex items-center gap-2">
                                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20 truncate max-w-[200px] hidden md:inline">
                                  {cfg.highlight || 'No highlight defined'}
                                </span>
                                <div className="p-1 rounded bg-white/10 text-white/80">
                                  <ChevronDown className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
