export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  sector: "Adventure" | "Alpine Trek" | "Cultural" | "Eco-Tour";
  systems: string[];
  description: string;
  metrics: { label: string; value: string }[];
}

export interface Brand {
  name: string;
  country: string;
  specialty: string;
  logoColor: string;
}

export interface SpaceType {
  id: string;
  name: string;
  defaultAirChanges: number; // ACH
  coolingLoadFactor: number; // W per m²
  heatingLoadFactor: number; // W per m²
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
