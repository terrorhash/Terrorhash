"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import TerrorMap from "./components/TerrorMap";

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

// WICHTIG: kein Cache, damit neue Daten sofort da sind
export const revalidate = 0;

async function getEvents(): Promise<EventItem[]> {
  const res = await fetch("/api/events", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export default function Page() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);
  const [bbox, setBbox] = useState<number[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // FeatureCollection aus den Events bauen (lng, lat!)
  const featureCollection: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: events.map((e) => ({
      type: "Feature",
      properties: {
        id: e.id,
        title: `${e.country} — ${e.region}`,
        type: e.type,
        date: e.date,
        fatalities: e.fatalities,
        injuries: e.injuries,
      },
      geometry: {
        type: "Point",
        coordinates: [e.lng, e.lat], // <— WICHTIG: [lng, lat]
      },
    })),
  };

  return (
    <main className="w-full h-[100dvh] overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <SearchBar
          onLocate={(center) => {
            setFlyTo(center ?? null);
            setBbox(null);
          }}
        />
      </div>

      <TerrorMap events={featureCollection} flyTo={flyTo} box={bbox} />

      <aside
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 300,
          padding: 16,
          background: "#0f172a",
          color: "white",
          overflowY: "auto",
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>
          Events
        </h2>
        <ul style={{ lineHeight: 1.4 }}>
          {events.map((e) => (
            <li key={e.id} style={{ marginBottom: 10 }}>
              <strong>{e.country}</strong> ({e.region}) — {e.type}
              <br />
              Fatalities: {e.fatalities}, Injuries: {e.injuries}, Date: {e.date}
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
