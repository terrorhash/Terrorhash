// app/data/events.ts
export type EventItem = {
  id: number;
  country: string;
  region: string;
  type: string;
  fatalities: number;
  injuries: number;
  date: string; // ISO-Format "YYYY-MM-DD"
};

export const events: EventItem[] = [
  { id: 1, country: "Germany", region: "Berlin", type: "Attack", fatalities: 2, injuries: 5, date: "2025-08-20" },
  { id: 2, country: "France", region: "Paris", type: "Stabbing", fatalities: 0, injuries: 3, date: "2025-08-18" },

  // Neue Events
  { id: 3, country: "USA", region: "New York", type: "Shooting", fatalities: 1, injuries: 4, date: "2025-08-10" },
  { id: 4, country: "Brazil", region: "Rio de Janeiro", type: "Robbery", fatalities: 0, injuries: 2, date: "2025-07-25" },
  { id: 5, country: "South Africa", region: "Cape Town", type: "Protest", fatalities: 0, injuries: 6, date: "2025-07-12" },
  { id: 6, country: "India", region: "Mumbai", type: "Explosion", fatalities: 3, injuries: 10, date: "2025-08-01" },
  { id: 7, country: "China", region: "Beijing", type: "Fire", fatalities: 2, injuries: 8, date: "2025-07-30" },
  { id: 8, country: "Australia", region: "Sydney", type: "Attack", fatalities: 0, injuries: 1, date: "2025-08-05" },
  { id: 9, country: "Russia", region: "Moscow", type: "Explosion", fatalities: 4, injuries: 12, date: "2025-08-15" },
  { id: 10, country: "Egypt", region: "Cairo", type: "Protest", fatalities: 1, injuries: 7, date: "2025-08-02" }
];


export default events;
