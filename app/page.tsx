// app/page.tsx
import React from "react";
import SearchBar from "./components/SearchBar";
import TerrorMap from "./components/TerrorMap";

type EventItem = {
  id: number;
  country: string;
  region: string;
  type: string;
  fatalities: number;
  injuries: number;
  date: string;
};

async function getEvents(): Promise<EventItem[]> {
  // Server Component: kann direkt fetchen
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/events`, {
    // Während der Entwicklung ohne Cache:
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const events = await getEvents();

  // Dummy: Start-Zentrum (Mitteleuropa)
  const center: [number, number] = [10, 50];

  return (
    <main className="grid" style={{ gridTemplateColumns: "320px 1fr", minHeight: "100vh" }}>
      {/* Sidebar / Controls */}
      <aside className="sidebar">
        <header className="header">
          <div className="live">LIVE</div>
          <h2 style={{ margin: 0 }}>TerrorHash</h2>
        </header>

        {/* Suche (Client-Komponente) */}
        <SearchBar
          onLocate={() => {}}
        />
        <div className="panel">
          <h3>Letzte Ereignisse</h3>
          <small>Dummy-Daten aus /api/events</small>
          <ul style={{ marginTop: 12, paddingLeft: 18 }}>
            {events.map((e) => (
              <li key={e.id}>
                <strong>{e.country}</strong> – {e.region} <br />
                {e.type} • {e.date} • {e.fatalities} Tote / {e.injuries} Verletzte
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Karte */}
      <section style={{ position: "relative" }}>
        <TerrorMap
          events={{
            type: "FeatureCollection",
            features: events.map((e) => ({
              type: "Feature",
              properties: {
                id: e.id,
                title: `${e.country} – ${e.region}`,
                type: e.type,
                date: e.date,
                fatalities: e.fatalities,
                injuries: e.injuries,
              },
              // Achtung: Für echte Daten brauchst du Koordinaten (lng, lat)
              // Hier z. B. Dummy-Punkte in Europa verteilen
              geometry: {
                type: "Point",
                coordinates: [
                  2 + (e.id % 8) * 4, // lng (Dummy)
                  44 + (e.id % 6) * 3, // lat (Dummy)
                ],
              },
            })),
          }}
          flyTo={center}
        />
      </section>
    </main>
  );
"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TerrorMap from "./components/TerrorMap";

type EventItem = {
  id: number;
  country: string;
  region: string;
  type: string;
  fatalities: number;
  injuries: number;
  date: string;
};

export default function Page() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);
  const [bbox, setBbox] = useState<number[] | null>(null);

  // Lade Dummy-Events von /api/events
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Fehler beim Laden der Events:", err);
      }
    }
    loadEvents();
  }, []);

  return (
    <div className="wrap">
      {/* Sidebar mit Suche */}
      <aside className="sidebar">
        <h2>TerrorHash – Risk Map</h2>
        <SearchBar onLocate={(center, box) => {
          setFlyTo(center);
          setBbox(box || null);
        }} />
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              <strong>{e.country}</strong> ({e.region}) – {e.type}<br/>
              Fatalities: {e.fatalities}, Injuries: {e.injuries}, Date: {e.date}
            </li>
          ))}
        </ul>
      </aside>

      {/* Karte */}
      <main className="main">
        <TerrorMap 
          events={{
            type: "FeatureCollection",
            features: events.map(e => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: [13.4, 52.5] }, // Dummy coords
              properties: e
            }))
          }}
          flyTo={flyTo}
          bbox={bbox}
        />
      </main>
    </div>
  );
}
