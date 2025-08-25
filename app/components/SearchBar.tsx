'use client';

import React, { useState } from 'react';

type Props = {
  // zwei Positions-Argumente!
  onLocate: (center: [number, number] | null, bbox: number[] | null) => void;
};

export default function SearchBar({ onLocate }: Props) {
  const [value, setValue] = useState('');

  async function doSearch(e: React.FormEvent) {
    e.preventDefault();

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string | undefined;
    if (!token || !value.trim()) {
      onLocate(null, null);
      return;
    }

    try {
      const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
        `${encodeURIComponent(value)}.json?limit=1&access_token=${token}`;
      const res = await fetch(url);
      const data = await res.json();

      const f = data?.features?.[0];
      if (!f) {
        onLocate(null, null);
        return;
      }

      const center = (f.center as [number, number]) ?? null;   // [lng, lat]
      const bbox = (f.bbox as number[]) ?? null;                // [minX, minY, maxX, maxY] oder null

      onLocate(center, bbox); // <<< zwei Argumente übergeben
    } catch {
      onLocate(null, null);
    }
  }

  return (
    <form onSubmit={doSearch} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Land/Region suchen z. B. DE, Berlin"
        className="px-3 py-2 rounded-lg"
      />
      <button type="submit" className="px-3 py-2 rounded-lg bg-white/10">
        Suche
      </button>
    </form>
  );
}
