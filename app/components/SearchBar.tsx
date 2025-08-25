"use client";
import { useState } from "react";

type Props = {
  onLocate: (arg: { center: [number, number]; bbox?: number[] }) => void;
};

export default function SearchBar({ onLocate }: Props) {
  const [q, setQ] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!q.trim() || !token) return;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      q.trim()
    )}.json?access_token=${token}&types=country,region,place&limit=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const f = data?.features?.[0];
      if (f?.center) onLocate({ center: f.center as [number, number], bbox: f.bbox });
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  }

  return (
    <form className="header" onSubmit={handleSearch}>
      <input
        placeholder="Land/Region suchen (z. B. Germany, Korea, USA)…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ flex: 1, borderRadius: 999, border: 0, padding: "8px 12px" }}
      />
      <button className="btn" type="submit">Suche</button>
    </form>
  );
}
