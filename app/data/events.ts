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
  { id: 1, country: "Germany", region: "Berlin", type: "Attack", fatalities: 2, injuries: 5, date: "2025-08-20", lng: 13.405, lat: 52.52 },
  { id: 2, country: "France", region: "Paris", type: "Stabbing", fatalities: 0, injuries: 3, date: "2025-08-18", lng: 2.3522, lat: 48.8566 },

  // Neue Events mit lng/lat:
  { id: 3, country: "USA", region: "New York", type: "Shooting", fatalities: 1, injuries: 2, date: "2025-08-15", lng: -74.006, lat: 40.7128 },
  { id: 4, country: "Brazil", region: "Rio de Janeiro", type: "Robbery", fatalities: 2, injuries: 1, date: "2025-08-12", lng: -43.1729, lat: -22.9068 },
  { id: 5, country: "South Africa", region: "Cape Town", type: "Attack", fatalities: 0, injuries: 4, date: "2025-08-10", lng: 18.4233, lat: -33.9249 },
  { id: 6, country: "India", region: "Mumbai", type: "Bombing", fatalities: 3, injuries: 10, date: "2025-08-08", lng: 72.8777, lat: 19.0760 },
  { id: 7, country: "Australia", region: "Sydney", type: "Shooting", fatalities: 1, injuries: 0, date: "2025-08-05", lng: 151.2093, lat: -33.8688 },
  { id: 8, country: "Russia", region: "Moscow", type: "Explosion", fatalities: 5, injuries: 7, date: "2025-08-02", lng: 37.6173, lat: 55.7558 },
  { id: 9, country: "China", region: "Beijing", type: "Attack", fatalities: 0, injuries: 6, date: "2025-07-30", lng: 116.4074, lat: 39.9042 },
  { id: 10, country: "UK", region: "London", type: "Stabbing", fatalities: 1, injuries: 2, date: "2025-07-28", lng: -0.1276, lat: 51.5074 },
  { id: 11, country: "Canada", region: "Toronto", type: "Shooting", fatalities: 0, injuries: 1, date: "2025-07-25", lng: -79.3832, lat: 43.6532 },
  { id: 12, country: "Japan", region: "Tokyo", type: "Attack", fatalities: 2, injuries: 5, date: "2025-07-22", lng: 139.6917, lat: 35.6895 }
];

export default events;
