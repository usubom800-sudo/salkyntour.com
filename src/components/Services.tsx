import React, { useState } from "react";
import { SERVICES } from "../data";
import { 
  Home, Compass, Activity, Layers, ShieldAlert, Zap, 
  CheckCircle2, ChevronRight 
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Home,
  Compass,
  Activity,
  Layers,
  ShieldAlert,
  Zap
};

export default function Services() {
  const [activeTabId, setActiveTabId] = useState("nomadic-heritage");

  const activeTabService = SERVICES.find((s) => s.id === activeTabId) || SERVICES[0];
  const IconComponent = ICON_MAP[activeTabService.icon] || Compass;

  return (
    <section id="services-section" className="py-20 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Signature Tour Profiles
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
            Authentic Kyrgyz Adventure Styles
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
            Whether you seek serene cultural immersion with nomadic shepherds or high-altitude alpine expeditions through mountain peaks, Salkyn Tours manages every details of your custom Kyrgyzstan holiday.
          </p>
        </div>

        {/* Dynamic Interactive Service Tabs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tab Selection (Left 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {SERVICES.map((serv) => {
              const TabIcon = ICON_MAP[serv.icon] || Compass;
              const isSelected = serv.id === activeTabId;
              return (
                <button
                  key={serv.id}
                  onClick={() => setActiveTabId(serv.id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-4 border cursor-pointer ${
                    isSelected
                      ? "bg-[#0F172A] border-[#0F172A] text-white shadow-xl shadow-slate-900/10"
                      : "bg-[#F8FAFC] border-slate-200/60 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${
                    isSelected ? "bg-blue-500 text-white" : "bg-white text-slate-600 border border-slate-200/60"
                  }`}>
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-sans font-bold truncate leading-snug">
                      {serv.title}
                    </h3>
                    <p className={`text-xs truncate mt-0.5 ${
                      isSelected ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {serv.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isSelected ? "text-blue-400 translate-x-1" : "text-slate-400"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Expanded Tab Display (Right 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-900/5 overflow-hidden flex flex-col">
            
            {/* Show gorgeous imagery based on selection */}
            {activeTabId === "alpine-trekking" ? (
              <div className="relative h-64 w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
                <img
                  src="/src/assets/images/kyrgyz_trekking_peaks_1783410837814.jpg"
                  alt="Kyrgyzstan Alpine Trekking"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-5 left-6 z-20">
                  <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">Trekking & Mountaineering</span>
                  <p className="text-sm font-sans font-bold text-white">Ala-Kul alpine trail, Karakol</p>
                </div>
              </div>
            ) : (
              <div className="relative h-64 w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
                <img
                  src="/src/assets/images/kyrgyz_yurt_camp_1783410729839.jpg"
                  alt="Kyrgyzstan Nomadic Heritage"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-5 left-6 z-20">
                  <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">Eco-Tourism</span>
                  <p className="text-sm font-sans font-bold text-white">Traditional yurt camps by Lake Song-Kul</p>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-blue-600 font-mono text-xs font-bold uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  <IconComponent className="w-4 h-4" />
                  Experience Profile
                </div>
                
                <h3 className="text-2xl font-display font-extrabold text-[#0F172A] tracking-tight">
                  {activeTabService.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeTabService.description}
                </p>
              </div>

              {/* Service Features Checklist */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                  Key Experience Highlights:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTabService.features.map((feat, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
