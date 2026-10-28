import React, { useState } from 'react';
import { Camera, Compass, Globe2, MapPin, Eye, X, Sliders, Info, Sparkles, Filter } from 'lucide-react';
import { PORTFOLIO_DATA, PhotographyItem } from '../data/portfolioData';

export const PersonalWorld: React.FC = () => {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [countrySearch, setCountrySearch] = useState<string>('');
  const [photoCategory, setPhotoCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<PhotographyItem | null>(null);

  const categories = ['All', 'Industrial & Marine', 'Architectural Form', 'Global Horizons', 'Street & Culture'];

  const filteredPhotos =
    photoCategory === 'All'
      ? PORTFOLIO_DATA.photographyExhibition
      : PORTFOLIO_DATA.photographyExhibition.filter((p) => p.category === photoCategory);

  const activeRegion = PORTFOLIO_DATA.travelExploration.regions[selectedRegionIndex];

  const filteredCountries = activeRegion.countries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <section id="travel" className="py-20 md:py-28 bg-[#090d14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* ================= Part 1: 52 Countries Worldview ================= */}
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400">
              <Compass className="w-4 h-4" />
              <span>GLOBAL ODYSSEY</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>52 SOVEREIGN NATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
              52 Countries Across 6 Continents
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Leading global engineering squads across the UK, USA, Middle East, Africa, and India requires intuitive cultural adaptability. Traveling across 52 nations has shaped a grounded, empathetic worldview that no boardroom can teach.
            </p>
          </div>

          {/* Worldview Dashboard */}
          <div className="rounded-2xl bg-[#111824] border border-slate-700/80 p-6 sm:p-8 space-y-8 shadow-2xl">
            {/* Top stats & philosophy quote */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-8">
              <div className="lg:col-span-4 flex items-center gap-6">
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums">
                    52
                  </div>
                  <div className="text-xs font-semibold text-slate-300">
                    Nations Navigated
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    6
                  </div>
                  <div className="text-xs font-semibold text-slate-300">
                    Continents Explored
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{PORTFOLIO_DATA.travelExploration.perspectiveStatement}&rdquo;
              </div>
            </div>

            {/* Continent Navigation & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Region Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800 overflow-x-auto whitespace-nowrap">
                {PORTFOLIO_DATA.travelExploration.regions.map((reg, idx) => (
                  <button
                    key={reg.region}
                    onClick={() => {
                      setSelectedRegionIndex(idx);
                      setCountrySearch('');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      selectedRegionIndex === idx
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
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
                  className="w-full sm:w-60 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Region Details & Country Tags */}
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="font-bold text-white text-base">
                  {activeRegion.region}
                </div>
                <div className="text-xs text-slate-400">
                  {activeRegion.highlight}
                </div>
              </div>

              {/* Unboxed Country Pills with Subtle Borders */}
              <div className="flex flex-wrap gap-2 pt-2">
                {filteredCountries.map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 rounded-lg border border-slate-700/60 hover:border-emerald-500/60 hover:text-white transition-colors"
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

        {/* ================= Part 2: Through the Lens (Photography Gallery) ================= */}
        <div id="photography" className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-400">
              <Camera className="w-4 h-4" />
              <span>THROUGH THE LENS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>CREATIVE PURSUIT &amp; OBSERVATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
              Framing Structure, Light &amp; Human Essence
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Photography is Jaideep’s creative sanctuary. Whether capturing monolithic offshore oil rigs amidst North Sea twilight or the kinetic cadence of Shinjuku alleyways, framing a shot demands the same patient observation as diagnosing complex systems.
            </p>
          </div>

          {/* Editorial Note & Upload Announcement */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-start gap-3 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold block mb-0.5">
                Exhibition Preview Note:
              </strong>
              Jaideep is currently curating a high-resolution monograph series for publication. Below is an interactive curation preview detailing themes, camera gear, and shot telemetry.
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800 w-fit overflow-x-auto whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setPhotoCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  photoCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photography Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group cursor-pointer rounded-2xl bg-[#111824] border border-slate-800 hover:border-slate-700/80 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
              >
                {/* Visual Canvas Card */}
                <div
                  className={`h-52 w-full bg-gradient-to-br ${photo.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}
                >
                  {/* Subtle geometric framing lines */}
                  <div className="absolute inset-0 border border-white/10 m-3 rounded-lg pointer-events-none" />

                  <div className="flex items-center justify-between text-[11px] text-white/80 font-mono z-10">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/70" />
                      {photo.location}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-white text-[10px]">
                      {photo.category}
                    </span>
                  </div>

                  {/* Centered Graphic Silhouette / Art Motif */}
                  <div className="flex flex-col items-center justify-center my-auto z-10 space-y-2">
                    <Camera className="w-8 h-8 text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <div className="text-[11px] text-white/70 font-mono tracking-widest uppercase">
                      Exhibition Frame
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-white/80 font-mono z-10 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                    <span>{photo.camera.split(' · ')[0]}</span>
                    <span>{photo.settings.split(' · ')[0]}</span>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {photo.story}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-slate-300">{photo.camera}</span>
                    <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Inspect</span>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox / EXIF Detail Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative max-w-2xl w-full rounded-2xl bg-[#121926] border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>

              <div
                className={`h-64 sm:h-72 w-full rounded-xl bg-gradient-to-br ${activePhoto.gradient} p-6 flex flex-col justify-between border border-white/10`}
              >
                <div className="flex items-center justify-between text-xs text-white/90 font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    {activePhoto.location}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/50 text-white text-xs border border-white/20">
                    {activePhoto.category}
                  </span>
                </div>

                <div className="text-center my-auto space-y-2">
                  <Camera className="w-12 h-12 text-white/70 mx-auto" />
                  <div className="text-xs text-white/80 font-mono tracking-widest uppercase">
                    35mm Full-Frame Art Capture
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/90 font-mono bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                  <span>{activePhoto.camera}</span>
                  <span>{activePhoto.settings}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {activePhoto.title}
                  </h3>
                  <div className="text-xs text-amber-400 font-medium mt-0.5">
                    {activePhoto.location}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {activePhoto.story}
                </p>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Gear</span>
                    <span className="font-semibold text-white block truncate">{activePhoto.camera.split(' · ')[0]}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Optic</span>
                    <span className="font-semibold text-white block truncate">{activePhoto.camera.split(' · ')[1] || 'Prime'}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Exposure</span>
                    <span className="font-semibold text-white block">{activePhoto.settings.split(' · ')[0]} · {activePhoto.settings.split(' · ')[1]}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Sensitivity</span>
                    <span className="font-semibold text-white block">{activePhoto.settings.split(' · ')[2]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
