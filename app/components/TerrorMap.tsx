"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

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
    if (!containerRef.current || mapRef.current) return;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [10, 20],
      zoom: 1.6
    });
    mapRef.current = map;

    map.on("load", () => {
      // Source mit Clustering
      map.addSource("events", {
        type: "geojson",
        data: events,
        cluster: true,
        clusterMaxZoom: 8,
        clusterRadius: 40
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "events",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#22c55e", 10,
            "#fbbf24", 30,
            "#ef4444"
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            12, 10,
            18, 30,
            26
          ]
        }
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "events",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
        },
        paint: { "text-color": "#0b1220" }
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "events",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#38bdf8",
          "circle-radius": 6,
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#0b1220"
        }
      });

      // Popup auf Einzelpunkten
      map.on("click", "unclustered-point", (e) => {
        const f = e.features?.[0];
        if (!f) return;
        const coords = (f.geometry as any).coordinates as [number, number];
        const { title = "Event", date = "-", type = "unknown" } = (f.properties as any) || {};
        new mapboxgl.Popup({ closeButton: true })
          .setLngLat(coords)
          .setHTML(
            `<strong>${title}</strong><br/><small>${type} • ${date}</small>`
          )
          .addTo(map);
      });

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        const clusterId = features[0].properties?.cluster_id;
        (map.getSource("events") as mapboxgl.GeoJSONSource).getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            map.easeTo({
              center: (features[0].geometry as any).coordinates,
              zoom
            });
          }
        );
      });

      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
    });

    return () => { map.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Daten aktualisieren
  useEffect(() => {
    const src = mapRef.current?.getSource("events") as mapboxgl.GeoJSONSource | undefined;
    if (src) src.setData(events);
  }, [events]);

  // Suche / FlyTo
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (bbox && bbox.length === 4) {
      map.fitBounds(bbox as LngLatBoundsLike, { padding: 40, duration: 800 });
    } else if (flyTo) {
      map.easeTo({ center: flyTo, zoom: 4.2, duration: 800 });
    }
  }, [flyTo, bbox]);

  return (
    <>
      <div ref={containerRef} id="map" />
      <div className="legend">
        <strong>Cluster‑Farben</strong><br/>
        Grün: wenige • Gelb: mittel • Rot: viele
      </div>
    </>
  );
}
