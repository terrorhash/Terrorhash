// app/data/events.ts
export type EventItem = {
  id: number;
  country: string;
  region: string;
  type: string;
  fatalities: number;
  injuries: number;
  date: string;   // YYYY-MM-DD
  lng: number;    // Longitude
  lat: number;    // Latitude
};

  export const events: EventItem[] = [
  { id: 1, country: "Germany", region: "Berlin", type: "Attack", fatalities: 2, injuries: 5, date: "2025-08-20", lng: 13.404954, lat: 52.520008 },
  { id: 2, country: "France", region: "Paris", type: "Stabbing", fatalities: 0, injuries: 3, date: "2025-08-18", lng: 2.352222, lat: 48.856613 },
  { id: 3, country: "USA", region: "New York", type: "Shooting", fatalities: 1, injuries: 2, date: "2025-08-15", lng: -74.0060, lat: 40.7128 },
  { id: 4, country: "UK", region: "London", type: "Explosion", fatalities: 0, injuries: 4, date: "2025-08-12", lng: -0.1276, lat: 51.5072 },
  { id: 5, country: "Japan", region: "Tokyo", type: "Attack", fatalities: 2, injuries: 1, date: "2025-08-10", lng: 139.6917, lat: 35.6895 },
];

export default events;
