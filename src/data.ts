import { Service, Project, Brand, SpaceType } from "./types";

export const SERVICES: Service[] = [
  {
    id: "nomadic-heritage",
    title: "Nomadic Heritage & Yurt Stays",
    description: "Immerse yourself in authentic Kyrgyz culture. Stay in traditional hand-crafted felt yurts on alpine pastures, participate in eagle hunting demonstrations, listen to traditional manaschi bards, and drink fresh kymyz (mare's milk).",
    icon: "Home",
    features: [
      "Traditional yurt-camp stays (Song-Kul & Tash Rabat)",
      "Eagle hunting & archery workshops in Bokonbaevo",
      "Traditional cooking classes (Beshbarmak & Boorsoks)",
      "Live folk music & Kyrgyz instrument concerts"
    ]
  },
  {
    id: "alpine-trekking",
    title: "High-Altitude Trekking & Expeditions",
    description: "Explore the dramatic gorges and snow-capped peaks of the Tien Shan and Pamir-Alay mountains. From the stunning waterfalls of Ala-Archa to multi-day alpine pass crossings in Karakol and custom high-altitude climbs.",
    icon: "Compass",
    features: [
      "Guided treks with certified mountain leaders",
      "Pristine alpine lake visits (Song-Kul, Ala-Kul)",
      "High-altitude mountain porter & logistics support",
      "Emergency Wilderness First Responder security"
    ]
  },
  {
    id: "horse-riding",
    title: "Guided Horseback Adventures",
    description: "Horses are the wings of the nomad. Ride well-trained Kyrgyz mountain horses across panoramic jailoo pastures, through ancient pine forests, and over high-elevation mountain passes led by expert local guides.",
    icon: "Activity",
    features: [
      "Well-mannered mountain horses for all skill levels",
      "Traditional saddle gear and safety helmets",
      "Scenic high-altitude jailoo ridge rides",
      "Pony-trekking support for luggage logistics"
    ]
  },
  {
    id: "silk-road",
    title: "Silk Road Historical Expeditions",
    description: "Walk the paths of ancient merchants, caravans, and pilgrims. Explore millennium-old ruins, stone caravanserais, and the cultural crossroads that shaped central Asian history.",
    icon: "Layers",
    features: [
      "Burana Tower & Balbals archaeological park guide",
      "Tash Rabat 15th-century stone caravanserai tour",
      "Karakol wooden architecture & Dungan mosque",
      "Ancient petroglyphs museum in Cholpon-Ata"
    ]
  },
  {
    id: "off-road-safaris",
    title: "4x4 Off-Road Adventure Safaris",
    description: "Travel deep into the remote wilderness in our premium, custom-prepared 4x4 off-road vehicles. Navigate high-mountain dirt tracks, cross raging rivers, and reach untouched landscapes in comfort and safety.",
    icon: "ShieldAlert",
    features: [
      "Rugged 4x4 off-road vehicles with professional drivers",
      "GPS satellite communications & emergency beacons",
      "Cross-border permits for border zone areas",
      "Comfortable long-distance country transfers"
    ]
  },
  {
    id: "wellness-retreats",
    title: "Issyk-Kul Wellness & Hot Springs",
    description: "Relax on the sandy beaches of Lake Issyk-Kul, the world's second-largest high-altitude saline lake. Soak in natural mineral hot springs in Ak-Suu gorge, and visit local eco-lodges.",
    icon: "Zap",
    features: [
      "Ak-Suu natural hot springs therapeutic pools",
      "Sandy lakeside beaches & high-altitude climate",
      "Local organic honey & medicinal herb teas",
      "Eco-resort wellness bookings & health spas"
    ]
  }
];

export const SPACE_TYPES: SpaceType[] = [
  {
    id: "cultural",
    name: "Nomadic Culture & Yurts",
    defaultAirChanges: 5,
    coolingLoadFactor: 95,
    heatingLoadFactor: 1,
    icon: "Home"
  },
  {
    id: "trekking",
    name: "High-Altitude Trekking",
    defaultAirChanges: 8,
    coolingLoadFactor: 125,
    heatingLoadFactor: 4,
    icon: "Compass"
  },
  {
    id: "horseriding",
    name: "Horseback Adventure",
    defaultAirChanges: 7,
    coolingLoadFactor: 115,
    heatingLoadFactor: 3,
    icon: "Activity"
  },
  {
    id: "silkroad",
    name: "Silk Road Heritage",
    defaultAirChanges: 10,
    coolingLoadFactor: 135,
    heatingLoadFactor: 2,
    icon: "Layers"
  },
  {
    id: "winter",
    name: "Winter Ski & Hot Springs",
    defaultAirChanges: 6,
    coolingLoadFactor: 145,
    heatingLoadFactor: 3,
    icon: "Zap"
  },
  {
    id: "combo",
    name: "Kyrgyz Grand Highlights Combo",
    defaultAirChanges: 12,
    coolingLoadFactor: 155,
    heatingLoadFactor: 3,
    icon: "Cpu"
  }
];

export const PORTFOLIO: Project[] = [
  {
    id: "song-kul-serenity",
    title: "Song-Kul Nomadic Serenity Trek",
    client: "Active Travel Club Germany",
    location: "Lake Song-Kul, Naryn Province",
    sector: "Adventure",
    systems: ["Yurt Camp Comfort Stays", "Professional Horse Hire", "Wilderness First Aid Support"],
    description: "A gorgeous horseback and trekking expedition up to the crystal-clear alpine waters of Lake Song-Kul at 3,016 meters. Guests stayed with local families in summer pastures, enjoying traditional cuisine and deep mountain stargazing.",
    metrics: [
      { label: "Tour Duration", value: "7 Days" },
      { label: "Max Elevation", value: "3,150 m" },
      { label: "Community Income", value: "+35% local jailoo support" }
    ]
  },
  {
    id: "tian-shan-expedition",
    title: "Tian Shan High Alpine Passes",
    client: "Explorers Club UK",
    location: "Karakol Gorges & Ala-Kul Lake",
    sector: "Alpine Trek",
    systems: ["Certified Mountain Leaders", "Weatherproof Base Camp Tents", "High-Altitude Porter Service"],
    description: "An intensive alpine trekking crossing through Ala-Kul pass (3,913m) down into the hot springs of Altyn-Arashan. Managed cold high-altitude conditions, providing warm, chef-prepared mountain camps and emergency communications.",
    metrics: [
      { label: "Tour Duration", value: "10 Days" },
      { label: "Max Elevation", value: "3,913 m" },
      { label: "Pass Crossings", value: "3 High Passes" }
    ]
  },
  {
    id: "silk-road-classic",
    title: "Great Silk Road Classic Caravan",
    client: "Cultural Heritage Association France",
    location: "Bishkek, Burana, Tash Rabat, Karakol",
    sector: "Cultural",
    systems: ["Premium 4x4 Private Sprinter", "Historical Site Lecturers", "Stone Caravanserai Overnight"],
    description: "A cultural and historical voyage covering Northern and Southern Kyrgyzstan. Hand-crafted highlights included the ancient Burana Tower site, petroglyphs of Cholpon-Ata, wooden Karakol church, and the mystic stone halls of Tash Rabat.",
    metrics: [
      { label: "Tour Duration", value: "12 Days" },
      { label: "UNESCO Sites", value: "3 Visited" },
      { label: "Ground Transport", value: "2,400 km comfort drive" }
    ]
  },
  {
    id: "issyk-kul-eco-wellness",
    title: "Pearl of the Alps Eco-Wellness",
    client: "Mindfulness Retreat Switzerland",
    location: "Lake Issyk-Kul Shoreline & Jeti-Oguz",
    sector: "Eco-Tour",
    systems: ["Lakeside Eco-Lodges", "Thermal Bath Soaks", "Eagle Hunting Demonstration"],
    description: "A peaceful retreat combining gentle day walks through the spectacular red cliffs of Jeti-Oguz, sandy beach relaxing on Lake Issyk-Kul, hot spring therapy, and sustainable local community interactions.",
    metrics: [
      { label: "Tour Duration", value: "6 Days" },
      { label: "Altitude Level", value: "Leisurely (<1,700m)" },
      { label: "Wellness Days", value: "4 Soaking/Spa Days" }
    ]
  }
];

export const BRANDS: Brand[] = [
  { name: "CBT Kyrgyzstan", country: "Kyrgyzstan", specialty: "Community Based Eco-Tourism Association", logoColor: "text-emerald-600" },
  { name: "KATO", country: "Kyrgyzstan", specialty: "Kyrgyz Association of Tour Operators", logoColor: "text-blue-600" },
  { name: "TJS Alpine Rescue", country: "Kyrgyzstan", specialty: "Tien Shan High Mountain Safety Service", logoColor: "text-red-600" },
  { name: "Kyrgyz Nomadic Union", country: "Kyrgyzstan", specialty: "National Felt & Yurts Craft Guild", logoColor: "text-orange-600" },
  { name: "Bishkek Eco-Logs", country: "Kyrgyzstan", specialty: "Green Travel & Carbon-Neutral Logistics", logoColor: "text-teal-600" }
];
