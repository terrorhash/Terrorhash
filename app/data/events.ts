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
  { id: 1, country: "Germany", region: "Berlin", type: "Attack",   fatalities: 2, injuries: 5, date: "2025-08-20" },
  { id: 2, country: "France",  region: "Paris",  type: "Stabbing", fatalities: 0, injuries: 3, date: "2025-08-18" },
  // ← hier kannst du jederzeit mehr Einträge hinzufügen
];

export default events;
