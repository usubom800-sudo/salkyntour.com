import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HVACConfigurator from "./components/HVACConfigurator";
import Portfolio from "./components/Portfolio";
import ClimateAI from "./components/ClimateAI";
import { BRANDS } from "./data";
import { 
  Compass, MapPin, Phone, Mail, Clock, Send, 
  Check, ArrowRight, Menu, X, Sparkles, Building2, 
  ExternalLink, ArrowUpRight 
} from "lucide-react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Contact Form states
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Monitor scroll state for navigation branding effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    setContactSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-blue-500/20 selection:text-slate-900 overflow-x-hidden">
      
      {/* Sticky Header Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-200/50 py-3 text-slate-800" 
          : "bg-[#F8FAFC]/95 backdrop-blur-md border-b border-slate-200/30 py-4 text-slate-800"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Salkyn Tours Logo */}
            <button 
              onClick={() => scrollToSection("hero-section")}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className="p-2.5 bg-blue-500 text-white rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-display font-extrabold uppercase tracking-tight block text-[#0F172A]">
                  Salkyn Tours
                </span>
                <span className="text-[9px] font-mono tracking-widest text-blue-500 uppercase block -mt-1 font-bold">
                  salkyn.com
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7">
              <button 
                onClick={() => scrollToSection("services-section")}
                className="text-xs font-sans font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Experience Styles
              </button>
              <button 
                onClick={() => scrollToSection("tour-estimator")}
                className="text-xs font-sans font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Tour Estimator
              </button>
              <button 
                onClick={() => scrollToSection("portfolio-section")}
                className="text-xs font-sans font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Expeditions
              </button>
              <button 
                onClick={() => scrollToSection("partners-section")}
                className="text-xs font-sans font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Partners
              </button>
              <button 
                onClick={() => scrollToSection("contact-section")}
                className="text-xs font-sans font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Action CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection("tour-estimator")}
                className="px-5 py-2.5 bg-[#0F172A] text-white hover:bg-slate-800 rounded-full text-xs font-sans font-bold transition-all duration-300 cursor-pointer shadow-sm"
              >
                Plan Your Adventure
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl cursor-pointer text-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-Out Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-slate-800 border-t border-slate-200 py-4 px-4 space-y-3 shadow-xl absolute top-full left-0 right-0">
            <button 
              onClick={() => scrollToSection("services-section")}
              className="block w-full text-left py-2 px-3 text-sm font-sans font-bold text-slate-600 hover:text-blue-600"
            >
              Experience Styles
            </button>
            <button 
              onClick={() => scrollToSection("tour-estimator")}
              className="block w-full text-left py-2 px-3 text-sm font-sans font-bold text-slate-600 hover:text-blue-600"
            >
              Tour Estimator
            </button>
            <button 
              onClick={() => scrollToSection("portfolio-section")}
              className="block w-full text-left py-2 px-3 text-sm font-sans font-bold text-slate-600 hover:text-blue-600"
            >
              Expeditions
            </button>
            <button 
              onClick={() => scrollToSection("partners-section")}
              className="block w-full text-left py-2 px-3 text-sm font-sans font-bold text-slate-600 hover:text-blue-600"
            >
              Partners
            </button>
            <button 
              onClick={() => scrollToSection("contact-section")}
              className="block w-full text-left py-2 px-3 text-sm font-sans font-bold text-slate-600 hover:text-blue-600"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("tour-estimator")}
              className="w-full bg-[#0F172A] text-white font-bold py-2.5 rounded-full text-xs text-center block"
            >
              Plan Your Adventure
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-16 md:pt-20">
        <Hero 
          onExploreCalculator={() => scrollToSection("tour-estimator")}
          onExploreServices={() => scrollToSection("services-section")}
        />
      </div>

      {/* Services Section */}
      <Services />

      {/* Calculator Container Section */}
      <section id="tour-estimator" className="py-20 bg-white font-sans scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Adventure Planner
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight text-center">
              Interactive Adventure Estimator
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed text-center">
              Use our interactive configurator to select travel styles, group size, and durations. Instantly generate estimated pricing, custom gear checklists, and structured day-by-day itineraries.
            </p>
          </div>

          <HVACConfigurator />
        </div>
      </section>

      {/* Portfolio Showcase */}
      <Portfolio />

      {/* World-Class Partners Section */}
      <section id="partners-section" className="py-20 bg-white border-t border-b border-slate-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Salkyn Tours Partners
            </span>
            <h3 className="text-2xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Certified Local Tourism Support
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              We work directly with community-based operators, certified rescue agencies, and national crafts guilds to deliver safe, authentic, and socially responsible journeys.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {BRANDS.map((br) => (
              <div 
                key={br.name} 
                className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group h-32"
              >
                <span className={`text-sm font-sans font-black tracking-tight ${br.logoColor} group-hover:scale-105 transition-transform duration-300`}>
                  {br.name}
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-sans text-slate-400 block font-bold leading-tight">
                    {br.specialty}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase bg-[#F8FAFC] border border-slate-200/60 px-2 py-0.5 rounded-full inline-block mt-1">
                    {br.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-[#F8FAFC] font-sans scroll-mt-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Info (Left 5 cols) */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Start Your Kyrgyz Adventure
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
                  Connect with Salkyn Tours Team
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Have custom group sizes, special dietary requests, or specific alpine pass objectives? Connect directly with our main Bishkek booking team. We coordinate all transport and mountain permits.
                </p>
              </div>

              {/* Specific Contact Cards */}
              <div className="space-y-4">
                {/* Address Card */}
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5">
                  <div className="p-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Bishkek Main Office</h4>
                    <p className="text-sm font-sans font-bold text-slate-800">
                      Chuy Avenue, Building 114
                    </p>
                    <p className="text-xs text-slate-500">
                      CBT Tourism Center, 2nd floor • Bishkek, Kyrgyzstan
                    </p>
                  </div>
                </div>

                {/* Phones Card */}
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5">
                  <div className="p-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Direct Contacts</h4>
                    <p className="text-sm font-sans font-bold text-slate-800 font-mono">
                      +996 (312) 90-88-11
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      +996 (555) 75-44-22 (24/7 Adventure Desk)
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-900/5">
                  <div className="p-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Online Inbox</h4>
                    <a 
                      href="mailto:info@salkyn.com" 
                      className="text-sm font-sans font-bold text-blue-600 hover:text-blue-700 hover:underline block"
                    >
                      info@salkyn.com
                    </a>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Inquiries processed within 2 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Working Hours badge */}
              <div className="flex items-center gap-2.5 text-xs text-sky-800 font-sans font-bold px-4 py-2 bg-sky-50 border border-sky-100 rounded-full w-fit">
                <Clock className="w-4 h-4 text-sky-600" />
                Adventure Support: Mon - Sun • 24/7 Online Assistance
              </div>
            </div>

            {/* Interactive Contact Form (Right 7 cols) */}
            <div className="lg:col-span-7 bg-[#0F172A] text-white p-6 md:p-8 rounded-[32px] border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-[70px] pointer-events-none" />
              
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-5 relative z-10 text-left">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">Submit details</span>
                    <h3 className="text-xl font-display font-extrabold text-white">Request Custom Group Itinerary</h3>
                    <p className="text-xs text-slate-400">
                      Share your target dates or travel dreams, and we will prepare a preliminary, beautiful route outline.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 000-0000"
                        className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">Tell us about your trip plans</label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="e.g., We are a group of 4 planning a 10-day trekking and horse-riding trip around Lake Song-Kul and Karakol. We need local English-speaking guides and private 4x4 transport..."
                      className="w-full bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-sans font-bold py-3 px-4 rounded-full text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    Send Adventure Request <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-16 space-y-4 relative z-10">
                  <div className="w-14 h-14 bg-blue-500/20 border border-blue-500 text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-white">Request Received Successfully</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{contactName}</strong>. Your custom itinerary inquiry has been registered. Our destination specialist in Bishkek will reach you on <strong>{contactPhone}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName("");
                      setContactPhone("");
                      setContactEmail("");
                      setContactMessage("");
                    }}
                    className="text-xs text-blue-400 hover:underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              )}

              {/* Decorative location footer */}
              <div className="border-t border-slate-800 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Bishkek Headquarters, KG
                </span>
                <span className="font-mono">
                  Coordinates: 42.8746° N, 74.5698° E
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-[#0F172A] text-slate-300 py-12 border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 text-left">
            
            {/* Column 1: Logo */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-left">
                <div className="p-2.5 bg-blue-500 text-white rounded-lg">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-base font-display font-extrabold uppercase tracking-tight block text-white">
                    Salkyn Tours
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-blue-500 uppercase block -mt-1 font-bold">
                    salkyn.com
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Salkyn Tours is a licensed pioneer in community-based eco-tourism, high-altitude alpine expeditions, custom horseback journeys, and traditional yurt camp operations in Kyrgyzstan. Established in 2012.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Quick Navigation</h4>
              <div className="flex flex-col gap-2 text-xs">
                <button onClick={() => scrollToSection("services-section")} className="text-slate-400 hover:text-blue-400 cursor-pointer text-left">Experience Styles</button>
                <button onClick={() => scrollToSection("tour-estimator")} className="text-slate-400 hover:text-blue-400 cursor-pointer text-left">Tour Estimator</button>
                <button onClick={() => scrollToSection("portfolio-section")} className="text-slate-400 hover:text-blue-400 cursor-pointer text-left">Featured Expeditions</button>
                <button onClick={() => scrollToSection("partners-section")} className="text-slate-400 hover:text-blue-400 cursor-pointer text-left">Partners & Support</button>
              </div>
            </div>

            {/* Column 3: Legal / Tech */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Affiliations & Licenses</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Licensed tour operator No. KG-402, registered under the Kyrgyz Republic Board of Tourism. Proud certified member of <strong>CBT Kyrgyzstan</strong> and the <strong>KATO Association</strong>.
              </p>
              <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-500 font-mono">
                <span>CBT Partner No. 904</span>
                <span>•</span>
                <span>Licensed KG-402</span>
              </div>
            </div>

          </div>

          {/* Copyright Row */}
          <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>
              © {new Date().getFullYear()} Salkyn Tours. All rights reserved. Registered under Kyrgyz Republic Tourism Board.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://salkyn.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-0.5">
                salkyn.com <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span>•</span>
              <button onClick={() => scrollToSection("hero-section")} className="hover:text-white cursor-pointer">
                Back to top
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Salkyn Tours AI Advisor Help Agent */}
      <ClimateAI />

    </div>
  );
}
