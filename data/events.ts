// data/events.ts

export type EventItem = {
  id: number;
  country: string;
  region: string;
  type: string;
  fatalities: number;
  injuries: number;
  date: string;   // ISO YYYY-MM-DD
  lat: number;
  lng: number;
};

const events: EventItem[] = [
  { id: 1, country: "Germany", region: "Berlin", type: "Attack", fatalities: 2, injuries: 5, date: "2025-08-20", lat: 52.5200, lng: 13.4050 },
  { id: 2, country: "France", region: "Paris", type: "Stabbing", fatalities: 0, injuries: 3, date: "2025-08-18", lat: 48.8566, lng: 2.3522 },
  { id: 3, country: "Spain", region: "Madrid", type: "Bomb", fatalities: 1, injuries: 7, date: "2025-08-17", lat: 40.4168, lng: -3.7038 },
  { id: 4, country: "Italy", region: "Rome", type: "Shooting", fatalities: 0, injuries: 2, date: "2025-08-16", lat: 41.9028, lng: 12.4964 },
  { id: 5, country: "United Kingdom", region: "London", type: "Attack", fatalities: 0, injuries: 4, date: "2025-08-15", lat: 51.5072, lng: -0.1276 }
];

export default events;
