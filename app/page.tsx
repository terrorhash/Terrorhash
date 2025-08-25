"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="app">
      <SearchBar
        onLocate={({ center, bbox }) => {
          setFlyTo(center);
          setBbox(bbox ?? null);
        }}
      />

      <aside className="sidebar">
        <h3>Events</h3>
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              <strong>{e.country}</strong> ({e.region}) — {e.type}
              <br />
              Fatalities: {e.fatalities}, Injuries: {e.injuries}, Date: {e.date}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">
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
                injuries: e.injuries
              },
              // Dummy-Positions bis echte Koordinaten vorliegen:
              geometry: {
                type: "Point",
                coordinates: [2 + (e.id % 8) * 4, 44 + (e.id % 6) * 3]
              }
            }))
          }}
          flyTo={flyTo ?? undefined}
          bbox={bbox ?? undefined}
        />
      </main>
    </div>
  );
}
