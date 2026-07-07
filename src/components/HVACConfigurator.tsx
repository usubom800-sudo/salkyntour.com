import React, { useState, useMemo } from "react";
import { SPACE_TYPES } from "../data";
import { SpaceType } from "../types";
import { 
  Calculator, HelpCircle, ArrowRight, Check, Sparkles, 
  Users, Send, Calendar, Compass, ShieldAlert, Home, Activity, Layers, Sun
} from "lucide-react";

const THEME_ICON_MAP: Record<string, React.ComponentType<any>> = {
  Home,
  Compass,
  Activity,
  Layers
};

export default function HVACConfigurator() {
  const [selectedThemeId, setSelectedThemeId] = useState("cultural");
  const [durationDays, setDurationDays] = useState(7); // Days
  const [groupSize, setGroupSize] = useState(4); // People
  const [accommodation, setAccommodation] = useState("yurt"); // yurt, eco-lodge, premium
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  // Lead form states
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const selectedTheme = useMemo(() => {
    return SPACE_TYPES.find(s => s.id === selectedThemeId) || SPACE_TYPES[0];
  }, [selectedThemeId]);

  // Handle Theme Change
  const handleThemeChange = (id: string) => {
    setSelectedThemeId(id);
    const theme = SPACE_TYPES.find(s => s.id === id);
    if (theme) {
      setDurationDays(theme.defaultAirChanges); // Reset to default duration
    }
  };

  // Live Travel Budget & Itinerary Calculations
  const calculations = useMemo(() => {
    const dailyRate = selectedTheme.coolingLoadFactor; // USD per day per person base
    
    // Accommodation Multiplier
    let lodgFactor = 1.0;
    let lodgLabel = "Authentic Nomadic Yurts";
    if (accommodation === "eco-lodge") {
      lodgFactor = 1.25;
      lodgLabel = "Eco-Lodges & Guesthouses";
    } else if (accommodation === "premium") {
      lodgFactor = 1.6;
      lodgLabel = "Premium Hotels (4-Star)";
    }

    // Group size discount on per-person rate
    let groupDiscount = 1.0;
    if (groupSize >= 2 && groupSize <= 4) {
      groupDiscount = 0.90; // 10% off
    } else if (groupSize >= 5 && groupSize <= 9) {
      groupDiscount = 0.80; // 20% off
    } else if (groupSize >= 10) {
      groupDiscount = 0.70; // 30% off
    }

    const pricePerPerson = Math.round(dailyRate * durationDays * lodgFactor * groupDiscount);
    const totalEstimate = pricePerPerson * groupSize;

    // Custom Daily Route Description generator
    let routeSummary = "";
    let itineraryItems: string[] = [];
    let requiredGear: string[] = [];

    if (selectedTheme.id === "cultural") {
      routeSummary = "Bishkek ➔ Burana Tower ➔ Kochkor ➔ Lake Song-Kul Yurt Camp ➔ Bokonbaevo (Eagle Hunting) ➔ Bishkek";
      itineraryItems = [
        "Day 1: Arrival in Bishkek, explore local museums and traditional bazaars.",
        "Day 2: Historic Burana Tower, traditional felt carpet workshop in Kochkor.",
        "Day 3-4: Ascent to alpine Lake Song-Kul, overnight in authentic felt yurts, horse riding.",
        "Day 5: Drive to Lake Issyk-Kul south shore, live eagle hunting and archery demonstration.",
        "Day 6: Fairytale canyon hike, scenic beach walk, traditional Dungan family dinner.",
        "Day 7: Return to Bishkek, souvenirs shopping, farewell Kyrgyz feast."
      ];
      requiredGear = ["Comfortable walking shoes", "Sunscreen & sunglasses", "Thermal layers for chilly jailoo nights", "Modest clothing for village visits"];
    } else if (selectedTheme.id === "trekking") {
      routeSummary = "Bishkek ➔ Ala-Archa Gorge ➔ Karakol ➔ Karakol Valley ➔ Ala-Kul Lake (3,560m) ➔ Altyn-Arashan Hot Springs ➔ Bishkek";
      itineraryItems = [
        "Day 1: Arrival & gear preparation in Bishkek, acclimatization hike in Ala-Archa Gorge.",
        "Day 2: Scenic overland transfer to Karakol mountain town.",
        "Day 3: Trekking entry into Karakol Gorge, river-side wilderness camp.",
        "Day 4: Steep ascent to the stunning turquoise waters of Lake Ala-Kul (3,560m).",
        "Day 5: Crossing the snowy Ala-Kul Pass (3,913m), descend to Altyn-Arashan hot springs.",
        "Day 6: Wellness soaking day in Altyn-Arashan thermal pools, transfer back to Karakol.",
        "Day 7: Drive to Issyk-Kul shore, relaxation, transfer back to Bishkek."
      ];
      requiredGear = ["Sturdy waterproof hiking boots", "30-50L Trekking backpack", "Quality sleeping bag & trekking poles", "Windbreaker & down jacket (sub-zero at pass)"];
    } else if (selectedTheme.id === "horseriding") {
      routeSummary = "Bishkek ➔ Kyzart Pass ➔ Kilemche pastures ➔ Lake Song-Kul pastures ➔ Kochkor ➔ Bishkek";
      itineraryItems = [
        "Day 1: Bishkek to Kyzart Village, match with horses and riding instruction guide.",
        "Day 2: Ride through high valley pastures to Kilemche jailoo.",
        "Day 3: Ride over Uzbek Pass (3,400m) with expansive views of Song-Kul Lake.",
        "Day 4: Equestrian exploration along the shorelines, watch national horse games (Kok-Boru).",
        "Day 5: Ride back to Kyzart valley, transfer to Kochkor artisan village.",
        "Day 6: Return drive via Chu canyon, relaxing riverside dinner.",
        "Day 7: Bishkek free day, departure."
      ];
      requiredGear = ["Long riding pants (prevent chafing)", "Warm gloves & woolen hat", "Compact camera strap", "Waterproof poncho / rain-gear"];
    } else if (selectedTheme.id === "silkroad") {
      routeSummary = "Bishkek ➔ Cholpon-Ata Petroglyphs ➔ Karakol ➔ Tash Rabat Stone Castle ➔ Naryn ➔ Bishkek";
      itineraryItems = [
        "Day 1-2: Bishkek heritage tour, drive to Issyk-Kul, explore ancient Saka petroglyphs.",
        "Day 3: Karakol wooden cathedral and 19th-century Dungan Pagoda mosque.",
        "Day 4: Drive via Southern Issyk-Kul through remote mountain passes to Naryn.",
        "Day 5-6: Journey to Tash Rabat hidden valley, overnight inside ancient stone caravanserai complex.",
        "Day 7: Scenic mountain drive back to Bishkek, cultural show."
      ];
      requiredGear = ["Cultural guidebooks", "Warm clothing (Tash Rabat is at 3,200m)", "Headlamp for cave & castle tunnels", "Gifts for local shepherd hosts (optional)"];
    } else {
      routeSummary = "Bishkek ➔ Ala-Archa ➔ Issyk-Kul Shoreline ➔ Karakol ➔ Jeti-Oguz Gorge ➔ Bishkek";
      itineraryItems = [
        "Day 1: Bishkek city tour, welcome dinner.",
        "Day 2: Hiking in Ala-Archa National Park Gorge.",
        "Day 3: Drive to Lake Issyk-Kul north shore, relax on beach, boat tour.",
        "Day 4: Karakol wooden monuments, visit Seven Bulls red cliffs in Jeti-Oguz.",
        "Day 5: Eco-lodge retreat on Lake Issyk-Kul south shore, local handicraft show.",
        "Day 6: Return drive to Bishkek, leisure time.",
        "Day 7: International departure."
      ];
      requiredGear = ["Multi-purpose clothing layers", "Camera with extra memory", "Swimwear for Issyk-Kul & hot springs", "Comfortable walking shoes"];
    }

    // Dynamic scale adjustments for custom duration
    if (durationDays !== selectedTheme.defaultAirChanges) {
      // Adjust itinerary dynamically
      if (durationDays < 5) {
        itineraryItems = itineraryItems.slice(0, durationDays - 1).concat([`Day ${durationDays}: Return to Bishkek & final international departure.`]);
      } else if (durationDays > 7) {
        // pad itinerary with premium excursions
        const extraExcursions = [
          "Day Excursion: Trek to Kok-Moynok canyons or alpine waterfall.",
          "Day Excursion: Horse milk tasting and local nomad dairy masterclass.",
          "Day Excursion: Scenic heli-flight or off-road 4x4 mountain ridge safari."
        ];
        itineraryItems = itineraryItems.slice(0, 6);
        for (let i = 7; i < durationDays; i++) {
          const excIdx = (i - 7) % extraExcursions.length;
          itineraryItems.push(`Day ${i}: ${extraExcursions[excIdx]}`);
        }
        itineraryItems.push(`Day ${durationDays}: Final travel overland back to Bishkek & departure.`);
      }
    }

    return {
      pricePerPerson,
      totalEstimate,
      lodgLabel,
      routeSummary,
      itineraryItems,
      requiredGear,
      difficulty: selectedTheme.heatingLoadFactor
    };
  }, [selectedTheme, durationDays, groupSize, accommodation]);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setIsFormSubmitted(true);
  };

  return (
    <div id="tour-estimator" className="bg-white rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-900/5 overflow-hidden font-sans scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Input Panel */}
        <div className="lg:col-span-7 p-6 md:p-8 border-r border-slate-100 bg-[#F8FAFC]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-sans font-bold text-[#0F172A] leading-tight font-display">Kyrgyzstan Tour Planner & Estimator</h3>
              <p className="text-xs text-slate-500">Calculate custom itineraries, daily routes, and direct package pricing</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Step 1: Tour Theme Selection */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] mb-3 text-left">
                1. Choose Your Travel Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SPACE_TYPES.map((type) => {
                  const isSelected = type.id === selectedThemeId;
                  const ThemeIcon = THEME_ICON_MAP[type.icon] || Compass;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleThemeChange(type.id)}
                      className={`px-3.5 py-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-250 flex flex-col justify-between h-24 ${
                        isSelected 
                          ? "bg-[#0F172A] border-[#0F172A] text-white shadow-lg" 
                          : "bg-white border-slate-200/60 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                          isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"
                        }`}>
                          {type.defaultAirChanges} Days
                        </span>
                        {isSelected ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <ThemeIcon className="w-4 h-4 text-slate-400" />}
                      </div>
                      <span className="text-xs font-sans font-bold line-clamp-2 leading-snug">
                        {type.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Sliders for Duration and Group Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Duration Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold uppercase tracking-wider text-[#0F172A]">2. Tour Duration (Days)</span>
                  <span className="font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {durationDays} Days
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={21}
                  step={1}
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>3 Days (Short)</span>
                  <span>21 Days (Grand Tour)</span>
                </div>
              </div>

              {/* Group Size Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold uppercase tracking-wider text-[#0F172A]">3. Group Size (People)</span>
                  <span className="font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {groupSize} Travelers
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>1 (Solo Explorer)</span>
                  <span>20 (Large Group)</span>
                </div>
              </div>
            </div>

            {/* Step 3: Accommodation Tier Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] text-left">
                4. Select Accommodation Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAccommodation("yurt")}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    accommodation === "yurt"
                      ? "bg-white border-blue-500 ring-2 ring-blue-500/10 text-slate-900"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-sans font-bold">Traditional Yurts</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">Authentic, hand-made felt yurts inside local scenic pastures.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setAccommodation("eco-lodge")}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    accommodation === "eco-lodge"
                      ? "bg-white border-blue-500 ring-2 ring-blue-500/10 text-slate-900"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-sans font-bold">Comfort Eco-Lodges</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">Charming local wooden lodges & family guesthouses with warm showers.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setAccommodation("premium")}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    accommodation === "premium"
                      ? "bg-white border-blue-500 ring-2 ring-blue-500/10 text-slate-900"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sun className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-sans font-bold">Premium Hotels</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">Boutique 4-star hotels in Bishkek & Karakol with Western comforts.</p>
                </button>
              </div>
            </div>

            {/* Physical Note / Altitude Acclimatization advisory */}
            <div className="flex items-start gap-3 bg-[#EFF6FF] p-4 rounded-2xl text-xs text-[#1E40AF] border border-blue-100 text-left">
              <HelpCircle className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>High Altitude Notice:</strong> Some destinations like Song-Kul lake and Ala-Kul pass are situated above 3,000 meters. Salkyn Tours plans slow accent profiles to ensure seamless acclimation. Mountain weather is highly variable; packing warm layers is crucial!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Outputs & Recommendations */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-[#0F172A] text-white flex flex-col justify-between text-left">
          <div>
            <span className="text-[10px] font-mono uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-full font-bold inline-block mb-4 tracking-wider">
              Estimated Tour Summary
            </span>

            {/* Calculations metrics */}
            <div className="space-y-4 mb-6">
              {/* Estimated Pricing Card */}
              <div className="bg-slate-800/40 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-medium">Estimated Package Price</h4>
                    <p className="text-xl font-mono font-bold text-blue-400">${calculations.totalEstimate.toLocaleString()} <span className="text-xs font-sans font-medium text-slate-300">USD</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-slate-400">Per Person Rate</span>
                  <p className="text-sm font-mono font-semibold text-slate-300 mt-1">~ ${calculations.pricePerPerson} USD</p>
                </div>
              </div>

              {/* Difficulty Level & Route overview */}
              <div className="bg-slate-800/40 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 border border-orange-500/20">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-medium">Difficulty & Activity level</h4>
                    <p className="text-lg font-sans font-bold text-orange-400">
                      {calculations.difficulty === 1 ? "Leisurely" : calculations.difficulty === 2 ? "Easy-Moderate" : calculations.difficulty === 3 ? "Moderate Active" : "Demanding Hike"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-slate-400">Scale Level</span>
                  <p className="text-sm font-mono font-semibold text-slate-300 mt-1">{calculations.difficulty} / 5</p>
                </div>
              </div>

              {/* Route Summary Map-line */}
              <div className="bg-slate-800/40 border border-slate-800/60 rounded-2xl p-4">
                <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider leading-none mb-2">
                  Estimated Travel Route
                </span>
                <p className="text-xs font-mono font-medium text-slate-200 leading-relaxed">
                  {calculations.routeSummary}
                </p>
              </div>
            </div>

            {/* Proposed Day-by-Day Itinerary preview */}
            <div className="border border-slate-800 bg-slate-950/65 rounded-2xl p-4 mb-6">
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-2.5 tracking-wider">
                Proposed Day-by-Day Outline
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {calculations.itineraryItems.map((item, idx) => (
                  <p key={idx} className="text-xs text-slate-300 leading-relaxed border-l-2 border-blue-500/40 pl-2.5 py-0.5">
                    {item}
                  </p>
                ))}
              </div>
              
              <div className="border-t border-slate-900 mt-3 pt-3">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1 tracking-wider">
                  Recommended Personal Gear:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {calculations.requiredGear.map((gear, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800 border border-slate-700/50 rounded px-2 py-0.5 text-slate-300">
                      {gear}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lead Generation Form */}
          <div>
            {!isFormSubmitted ? (
              <form onSubmit={handleSubmitLead} className="space-y-3">
                <p className="text-xs text-slate-400 font-sans font-medium mb-1.5">
                  Request detailed custom brochure & book travel dates:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700/50"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (+996 ...)"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700/50"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email address (optional)"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="flex-1 bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700/50"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    Inquire <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-center">
                <h4 className="text-sm font-sans font-bold text-blue-400 mb-1 flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" /> Inquiry Registered!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your customized travel estimate ({durationDays} days {selectedTheme.name} for {groupSize} persons) has been compiled. Salkyn Tours travel specialist in Bishkek will contact you on <strong>{clientPhone}</strong> to fine-tune your itinerary!
                </p>
                <button
                  onClick={() => {
                    setIsFormSubmitted(false);
                    setClientName("");
                    setClientPhone("");
                    setClientEmail("");
                  }}
                  className="mt-2.5 text-[10px] text-blue-400 hover:underline cursor-pointer"
                >
                  Configure another adventure
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
