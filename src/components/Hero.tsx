import React from "react";
import { ArrowRight, Compass, Compass as AdventureIcon, Shield, Trees } from "lucide-react";

interface HeroProps {
  onExploreCalculator: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onExploreCalculator, onExploreServices }: HeroProps) {
  return (
    <section id="hero-section" className="relative bg-[#F8FAFC] text-slate-800 overflow-hidden min-h-[85vh] flex items-center py-12">
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Salkyn Tours • Eco-Adventures & Nomadic Safaris
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0F172A] leading-[1.1]">
                Fresh Mountain Air. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                  Authentic Journeys.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Experience the untouched beauty and nomadic hospitality of Kyrgyzstan. From cozy yurt stays on high-altitude pastures to guided mountain treks and horse riding across the heavenly Tien Shan range.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white border border-slate-200/60 rounded-xl text-blue-500 mt-1 shadow-sm">
                  <Trees className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-800">Nomadic Stay</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Authentic Yurts</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white border border-slate-200/60 rounded-xl text-blue-500 mt-1 shadow-sm">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-800">Certified Guides</h4>
                  <p className="text-[10px] text-slate-400 font-mono">WFR Emergency Care</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white border border-slate-200/60 rounded-xl text-blue-500 mt-1 shadow-sm">
                  <AdventureIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-800">Eco-Logistics</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Custom 4x4 Fleet</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreCalculator}
                className="bg-[#0F172A] hover:bg-slate-800 text-white font-sans font-semibold px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-slate-900/10 cursor-pointer group"
              >
                Tour Estimator & Planner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onExploreServices}
                className="bg-transparent border border-slate-200 hover:border-slate-300 text-slate-800 font-sans font-semibold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer"
              >
                Explore Tour Types
              </button>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Elegant preview framework replicating the Sleek Dashboard feel */}
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10 group">
              
              {/* Dynamic Status Beacon */}
              <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-100 shadow-md flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-sans font-bold text-slate-800">Eco-Tours Open • Summer 2026</span>
              </div>

              <div className="relative overflow-hidden rounded-[24px]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
                <img
                  src="/src/assets/images/kyrgyz_yurt_camp_1783410729839.jpg"
                  alt="Salkyn Tours Premium Kyrgyzstan Yurt Camp"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay sticker details */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">Signature Destination</span>
                    <p className="text-sm font-sans font-bold text-white">Song-Kul Nomadic Serenity</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800">
                    Kyrgyzstan, 3016m
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
