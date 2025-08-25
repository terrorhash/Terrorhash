"use client";
import { useEffect, useRef } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

type Props = {
  events: GeoJSON.FeatureCollection;
  flyTo?: [number, number] | null;
  bbox?: number[] | null;
};

export default function TerrorMap({ events, flyTo, bbox }: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // init
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 20],
      zoom: 2
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.on("load", () => {
      map.addSource("events", { type: "geojson", data: events });
      map.addLayer({
        id: "events-dots",
        type: "circle",
        source: "events",
        paint: { "circle-color": "#ef4444", "circle-radius": 6, "circle-stroke-color": "#fff", "circle-stroke-width": 1 }
      });
    });
    mapRef.current = map;
    return () => map.remove();
  }, []);

  // update data
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const src = map.getSource("events") as mapboxgl.GeoJSONSource | undefined;
    if (src) src.setData(events);
  }, [events]);

  // flyTo / bbox
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (bbox && bbox.length === 4) {
      map.fitBounds(bbox as LngLatBoundsLike, { padding: 80, duration: 800 });
    } else if (flyTo) {
      map.easeTo({ center: flyTo, zoom: 5, duration: 800 });
    }
  }, [flyTo, bbox]);

  return <div ref={containerRef} id="map" style={{ position: "absolute", inset: 0 }} />;
}
