"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";

type Props = {
  events: GeoJSON.FeatureCollection;       // kommt schon als FeatureCollection rein
  flyTo?: [number, number] | null;
  box?: number[] | null;                    // [minX,minY,maxX,maxY] (lng/lat)
};

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export default function TerrorMap({ events, flyTo, box }: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // init
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [10, 51],
      zoom: 4,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      // Quelle + Layer anlegen
      map.addSource("events", { type: "geojson", data: events });

      map.addLayer({
        id: "events-dots",
        type: "circle",
        source: "events",
        paint: {
          "circle-color": "#e44",
          "circle-radius": 6,
          "circle-stroke-color": "#fff",
          "circle-stroke-width": 1,
        },
      });
    });

    return () => map.remove();
  }, [mapboxAccessToken]);

  // Daten im Layer updaten, wenn sich events ändern
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const src = map.getSource("events") as mapboxgl.GeoJSONSource | undefined;
    if (src) {
      src.setData(events);
    }
  }, [events]);

  // fliege zu Koordinate
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyTo) return;
    map.easeTo({ center: flyTo, zoom: 5, duration: 800 });
  }, [flyTo]);

  // zoome auf BBox
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !box || box.length !== 4) return;
    map.fitBounds(box as LngLatBoundsLike, { padding: 80, duration: 800 });
  }, [box]);

  return (
    <div
      ref={containerRef}
      id="map"
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
