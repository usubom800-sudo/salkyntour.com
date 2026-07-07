import React, { useState } from "react";
import { PORTFOLIO } from "../data";
import { MapPin, ArrowUpRight, Sparkles, Sliders } from "lucide-react";

export default function Portfolio() {
  const [selectedSector, setSelectedSector] = useState<string>("All");

  const filteredProjects = PORTFOLIO.filter((proj) => {
    if (selectedSector === "All") return true;
    return proj.sector === selectedSector;
  });

  const sectors = ["All", "Adventure", "Alpine Trek", "Cultural", "Eco-Tour"];

  return (
    <section id="portfolio-section" className="py-20 bg-[#F8FAFC] font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Featured Expeditions
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Signature Kyrgyzstan Itineraries
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Browse hand-picked private and group journeys. Stay with nomadic families in cozy yurt camps, explore crystal alpine lakes, and cross spectacular mountain passes with our certified local guides.
            </p>
          </div>

          {/* Sector Filters */}
          <div className="flex flex-wrap gap-1.5 bg-slate-200/50 p-1.5 rounded-full border border-slate-200/40">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-bold transition-all duration-300 cursor-pointer ${
                  selectedSector === sec
                    ? "bg-[#0F172A] text-white shadow-md"
                    : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-200/70"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Card Upper Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {proj.sector}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {proj.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-[#0F172A] group-hover:text-blue-600 transition-colors leading-tight">
                      {proj.title}
                    </h3>
                  </div>
                  <span className="p-2 bg-[#F8FAFC] border border-slate-100 rounded-xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-left">
                  {proj.description}
                </p>

                {/* Systems deployed taglist */}
                <div className="text-left">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Features & Inclusions:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.systems.map((sys, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-sans font-medium text-slate-700 bg-[#F8FAFC] border border-slate-200/60 rounded-full px-3 py-1"
                      >
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Metrics Banner / Lower body */}
              <div className="bg-[#F8FAFC] px-6 py-4 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center">
                {proj.metrics.map((met, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider leading-none">
                      {met.label}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#0F172A]">
                      {met.value}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#0F172A] rounded-[32px] p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="space-y-1.5 z-10 text-center md:text-left">
            <h3 className="text-lg font-display font-extrabold flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Ready for a Tailor-made Kyrgyzstan Adventure?
            </h3>
            <p className="text-slate-400 text-xs max-w-xl text-left">
              Connect directly with Salkyn Tours expert Bishkek planning team. We design customized itineraries, coordinate high-altitude transport logistics, and secure mountaineering permits.
            </p>
          </div>
          <a
            href="#tour-estimator"
            className="bg-blue-500 hover:bg-blue-600 text-white font-sans font-semibold px-6 py-3 rounded-full text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-blue-500/10 whitespace-nowrap z-10"
          >
            Estimate Your Dream Tour <Sliders className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
