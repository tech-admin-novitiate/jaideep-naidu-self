import React, { useState } from 'react';
import { Camera, Compass, MapPin, Eye, X, Info, Sparkles, Filter, Globe2, ChevronDown, ChevronUp } from 'lucide-react';
import { PORTFOLIO_DATA, PhotographyItem } from '../data/portfolioData';

interface HobbiesSectionProps {
  data?: typeof PORTFOLIO_DATA;
  isExpanded?: boolean;
  isPendingHover?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onToggle?: () => void;
}

export const HobbiesSection: React.FC<HobbiesSectionProps> = ({
  data = PORTFOLIO_DATA,
  isExpanded = false,
  isPendingHover = false,
  onHoverStart,
  onHoverEnd,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'travel' | 'photography'>('both');
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [countrySearch, setCountrySearch] = useState<string>('');
  const [photoCategory, setPhotoCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<PhotographyItem | null>(null);
  const headerConfig = data.pillarHeaders?.hobbies || PORTFOLIO_DATA.pillarHeaders.hobbies;

  const categories = ['All', 'Industrial & Marine', 'Architectural Form', 'Global Horizons', 'Street & Culture'];

  const filteredPhotos = photoCategory === 'All'
    ? data.photographyExhibition
    : data.photographyExhibition.filter((p) => p.category === photoCategory);

  const activeRegion = data.travelExploration.regions[selectedRegionIndex];

  const filteredCountries = activeRegion.countries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <section id="hobbies" className="py-5 sm:py-7 bg-transparent scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillar Architectural Tile - Hover triggers ONLY on this tile */}
        <div
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
          className={`rounded-3xl border-2 transition-all duration-300 shadow-md overflow-hidden ${
            isExpanded
              ? 'bg-rose-50/60 border-rose-300/90 shadow-lg'
              : 'bg-white/90 border-slate-300 hover:border-rose-400 hover:shadow-md'
          }`}
        >
          {/* Distinct Articulated Header Bar */}
          <div
            onClick={onToggle}
            className="cursor-pointer select-none px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-rose-950 via-rose-900 to-slate-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors relative overflow-hidden"
          >
            {/* 1s Hover Progress Bar */}
            {isPendingHover && !isExpanded && (
              <div className="absolute bottom-0 left-0 h-1 bg-rose-400 animate-expand-progress w-full" />
            )}

            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-800/80 border border-rose-400/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Compass className="w-5 h-5 text-rose-200" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-rose-800/90 text-rose-200 border border-rose-400/30">
                    {headerConfig.pillarTag}
                  </span>
                  <span className="text-xs text-rose-200/90 font-medium hidden sm:inline">
                    {headerConfig.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {headerConfig.title}
                </h2>
              </div>
            </div>

            {/* Content Highlight in Header + Expand Button */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-rose-800/50 md:border-none">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-400/20 text-xs font-medium text-rose-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span>{headerConfig.highlight}</span>
              </div>

              {/* Naturally discoverable: show Collapse when expanded, icon only when collapsed */}
              {isExpanded ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all">
                  <span>Collapse</span>
                  <ChevronUp className="w-4 h-4 text-rose-200" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <ChevronDown className="w-4 h-4 text-rose-200" />
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Pillar Body with lighter rose tinted background */}
          {isExpanded && (
            <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-fadeIn">
              {/* Technical Crosshairs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-rose-900/70 border-b border-rose-200/70 pb-3">
                <div>+ [PILLAR 06 // GLOBAL HORIZONS &amp; 35MM MONOGRAPHS]</div>
                <div>[52 NATIONS · SONY A7R IV · CROSS-CULTURAL AGILITY] +</div>
              </div>

              <div className="max-w-3xl space-y-2">
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  Beyond the boardroom and terminal: exploring 52 nations across 6 continents to cultivate cross-cultural agility, and capturing geometric form, maritime structures, and human moments through 35mm fine-art photography.
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 w-fit shadow-2xs overflow-x-auto whitespace-nowrap">
                <button
                  onClick={() => setActiveTab('both')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'both' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Hobbies Overview
                </button>
                <button
                  onClick={() => setActiveTab('travel')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                    activeTab === 'travel' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>52 Nations Odyssey</span>
                </button>
                <button
                  onClick={() => setActiveTab('photography')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                    activeTab === 'photography' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Through the Lens</span>
                </button>
              </div>

              {/* ================= SUB-SECTION 1: 52 COUNTRIES ================= */}
              {(activeTab === 'both' || activeTab === 'travel') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wide">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    <span>GLOBAL ODYSSEY · 52 COUNTRIES EXPLORED</span>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
                    {/* Top stats & philosophy quote */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8">
                      <div className="lg:col-span-4 flex items-center gap-6">
                        <div className="space-y-1">
                          <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tabular-nums">
                            {data.travelExploration.totalCountries}
                          </div>
                          <div className="text-xs font-semibold text-slate-600">
                            Nations Navigated
                          </div>
                        </div>
                        <div className="h-10 w-px bg-slate-200" />
                        <div className="space-y-1">
                          <div className="text-4xl sm:text-5xl font-extrabold text-emerald-700 font-mono tabular-nums">
                            {data.travelExploration.continents}
                          </div>
                          <div className="text-xs font-semibold text-slate-600">
                            Continents Explored
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                        &ldquo;{data.travelExploration.perspectiveStatement}&rdquo;
                      </div>
                    </div>

                    {/* Continent Navigation & Search */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Region Tabs */}
                      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto whitespace-nowrap">
                        {data.travelExploration.regions.map((reg, idx) => (
                          <button
                            key={reg.region}
                            onClick={() => {
                              setSelectedRegionIndex(idx);
                              setCountrySearch('');
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                              selectedRegionIndex === idx
                                ? 'bg-slate-900 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {reg.region.split(' ')[0]} ({reg.countries.length})
                          </button>
                        ))}
                      </div>

                      {/* Country search bar */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Filter countries..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full sm:w-60 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600"
                        />
                      </div>
                    </div>

                    {/* Region Details & Country Tags */}
                    <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div className="font-bold text-slate-900 text-base">
                          {activeRegion.region}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {activeRegion.highlight}
                        </div>
                      </div>

                      {/* Country Pills */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {filteredCountries.map((country) => (
                          <span
                            key={country}
                            className="px-3 py-1.5 text-xs font-medium text-slate-800 bg-white rounded-lg border border-slate-200 hover:border-slate-400 transition-colors shadow-2xs"
                          >
                            {country}
                          </span>
                        ))}
                        {filteredCountries.length === 0 && (
                          <div className="text-xs text-slate-500 py-2">
                            No countries matching &ldquo;{countrySearch}&rdquo; in this region.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= SUB-SECTION 2: PHOTOGRAPHY ================= */}
              {(activeTab === 'both' || activeTab === 'photography') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wide">
                    <Camera className="w-4 h-4" />
                    <span>THROUGH THE LENS · PASS-TIME PHOTOGRAPHY</span>
                  </div>

                  {/* Editorial Note & Notice */}
                  <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold block mb-0.5">
                        Curated Monograph Preview:
                      </strong>
                      Some shots are great ones good enough to publish; Jaideep will provide high-resolution personal monograph uploads soon. Below is a curated preview showing sample frames, camera settings, and compositional stories.
                    </div>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 w-fit overflow-x-auto whitespace-nowrap shadow-2xs">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setPhotoCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          photoCategory === cat
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Photography Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => setActivePhoto(photo)}
                        className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-slate-300 overflow-hidden transition-all flex flex-col justify-between shadow-2xs hover:-translate-y-0.5"
                      >
                        {/* Photo Visual Frame */}
                        <div
                          className="h-52 w-full bg-slate-900 p-5 flex flex-col justify-between relative overflow-hidden"
                        >
                          {photo.imageUrl ? (
                            <>
                              <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-black/40" />
                            </>
                          ) : null}

                          <div className="flex items-center justify-between text-[11px] text-white/90 font-mono z-10">
                            <span className="flex items-center gap-1 drop-shadow-sm">
                              <MapPin className="w-3 h-3 text-white/80" />
                              {photo.location}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium border border-white/10">
                              {photo.category}
                            </span>
                          </div>

                          {!photo.imageUrl ? (
                            <div className="flex flex-col items-center justify-center my-auto z-10 space-y-1.5 text-white/70 group-hover:text-white transition-colors">
                              <Camera className="w-8 h-8" />
                              <div className="text-[10px] font-mono tracking-widest uppercase">
                                Framed Capture
                              </div>
                            </div>
                          ) : <div className="my-auto" />}

                          <div className="flex items-center justify-between text-[10px] text-white/90 font-mono z-10 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
                            <span>{photo.camera.split(' · ')[0]}</span>
                            <span>{photo.settings.split(' · ')[0]}</span>
                          </div>
                        </div>

                        {/* Details Footer */}
                        <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                                {photo.title}
                              </h3>
                              {photo.dateTaken && (
                                <span className="text-[11px] font-mono text-slate-400">
                                  {photo.dateTaken}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                              {photo.story}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-mono text-slate-700">{photo.camera}</span>
                            <span className="text-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                              <span>Inspect</span>
                              <Eye className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lightbox / EXIF Detail Modal */}
              {activePhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
                  <div className="relative max-w-2xl w-full rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl">
                    <button
                      onClick={() => setActivePhoto(null)}
                      className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors z-20"
                      aria-label="Close photo view"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div
                      className="h-64 sm:h-80 w-full rounded-xl bg-slate-900 p-6 flex flex-col justify-between text-white relative overflow-hidden"
                    >
                      {activePhoto.imageUrl ? (
                        <>
                          <img
                            src={activePhoto.imageUrl}
                            alt={activePhoto.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40" />
                        </>
                      ) : null}

                      <div className="flex items-center justify-between text-xs font-mono z-10">
                        <span className="flex items-center gap-1.5 text-white/90 drop-shadow-sm">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          {activePhoto.location}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-black/60 text-white text-xs backdrop-blur-sm border border-white/20">
                          {activePhoto.category}
                        </span>
                      </div>

                      {!activePhoto.imageUrl ? (
                        <div className="text-center my-auto space-y-2 z-10">
                          <Camera className="w-12 h-12 text-white/80 mx-auto" />
                          <div className="text-xs text-white/70 font-mono tracking-widest uppercase">
                            35mm Fine-Art Capture
                          </div>
                        </div>
                      ) : <div className="my-auto" />}

                      <div className="flex items-center justify-between text-xs font-mono bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 z-10">
                        <span>{activePhoto.camera}</span>
                        <span>{activePhoto.settings}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {activePhoto.title}
                        </h3>
                        <div className="text-xs text-blue-700 font-semibold mt-0.5">
                          {activePhoto.location}
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {activePhoto.story}
                      </p>

                      {/* Telemetry Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Gear</span>
                          <span className="font-semibold text-slate-900 block truncate">{activePhoto.camera.split(' · ')[0]}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Optic</span>
                          <span className="font-semibold text-slate-900 block truncate">{activePhoto.camera.split(' · ')[1] || 'Prime'}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Exposure</span>
                          <span className="font-semibold text-slate-900 block">{activePhoto.settings.split(' · ')[0]} · {activePhoto.settings.split(' · ')[1]}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                          <span className="text-[10px] text-slate-500 font-semibold block uppercase">Sensitivity</span>
                          <span className="font-semibold text-slate-900 block">{activePhoto.settings.split(' · ')[2]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
