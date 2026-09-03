"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin, X, ArrowRight, List } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatArea } from "@/lib/utils/format";
import type { MapListing } from "./types";

function shortPrice(price: number | null): string {
  if (!price) return "Ask";
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m >= 10 ? Math.round(m) : Math.round(m * 10) / 10}M`;
  }
  return `$${Math.round(price / 1000)}K`;
}

/** City taxonomy values look like "Garabito Central Pacific Costa Rica>Jaco" — keep the last segment. */
function shortLocation(city: string | null): string {
  const segment = (city ?? "").split(">").pop()?.trim();
  return segment || "Costa Rica";
}

export default function MapExplorer({ listings }: { listings: MapListing[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const selectedElRef = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<MapListing | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [9.61, -84.62],
      zoom: 11,
      scrollWheelZoom: true,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let cluster: L.LayerGroup;
    try {
      cluster = (L as any).markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 44,
        spiderfyOnMaxZoom: true,
        iconCreateFunction: (c: any) =>
          L.divIcon({
            html: `<div class="map-cluster">${c.getChildCount()}</div>`,
            className: "map-cluster-wrap",
            iconSize: L.point(40, 40),
          }),
      });
    } catch (err) {
      console.error("markerClusterGroup unavailable, falling back to plain markers", err);
      cluster = L.layerGroup();
    }

    const bounds = L.latLngBounds([]);

    for (const listing of listings) {
      const icon = L.divIcon({
        html: `<div class="map-price-pin${listing.status === "sold" ? " map-price-pin--sold" : ""}">${shortPrice(listing.price)}</div>`,
        className: "map-price-pin-wrap",
        iconSize: undefined as unknown as L.PointExpression,
      });
      const marker = L.marker([Number(listing.lat), Number(listing.lng)], { icon });
      marker.on("click", (e: L.LeafletMouseEvent) => {
        if (selectedElRef.current) selectedElRef.current.classList.remove("map-price-pin--active");
        const el = (e.target.getElement() as HTMLElement | null)?.querySelector(".map-price-pin") as HTMLElement | null;
        if (el) {
          el.classList.add("map-price-pin--active");
          selectedElRef.current = el;
        }
        setSelected(listing);
      });
      cluster.addLayer(marker);
      bounds.extend([listing.lat, listing.lng]);
    }

    map.addLayer(cluster);

    // The container can measure 0×0 at init (dynamic import mounts before
    // layout), which Leaflet caches — keep re-measuring until it has real size,
    // and only fit the bounds once that happens.
    // The container can measure 0×0 when Leaflet initializes (hydration races
    // layout, and rAF is suspended in background tabs), which Leaflet caches.
    // Retry on a plain timer — timers fire even in hidden tabs — until the
    // container has real size, then fit the bounds once.
    let fitted = false;
    const tryFit = () => {
      map.invalidateSize();
      const size = map.getSize();
      if (!fitted && size.x > 0 && size.y > 0 && bounds.isValid()) {
        map.fitBounds(bounds.pad(0.05));
        fitted = true;
      }
    };
    tryFit();
    const fitTimer = setInterval(() => {
      tryFit();
      if (fitted) clearInterval(fitTimer);
    }, 250);
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(containerRef.current);

    return () => {
      clearInterval(fitTimer);
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="map-view-shell"
      style={{ position: "relative", marginTop: "74px", height: "calc(100vh - 74px)", overflow: "hidden" }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Top-left: count + back to list */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "56px",
          zIndex: 20,
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            background: "#16201d",
            color: "#fff",
            fontSize: "12.5px",
            fontWeight: 700,
            padding: "8px 14px",
            borderRadius: "999px",
            boxShadow: "0 4px 14px rgba(0,0,0,.18)",
          }}
        >
          {listings.length} properties
        </span>
        <Link
          href="/properties"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#fff",
            color: "#16201d",
            fontSize: "12.5px",
            fontWeight: 700,
            padding: "8px 14px",
            borderRadius: "999px",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(0,0,0,.18)",
          }}
        >
          <List size={14} />
          List view
        </Link>
      </div>

      {/* Selected property panel */}
      {selected && (
        <aside className="map-info-panel" aria-label="Selected property">
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close panel"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 2,
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(22,32,29,.55)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>

          {selected.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selected.image.src}
              alt={selected.image.alt || selected.title}
              style={{ width: "100%", height: "210px", objectFit: "cover", display: "block", background: "#e7f4f0" }}
            />
          ) : (
            <div style={{ width: "100%", height: "120px", background: "linear-gradient(135deg, #8fd6cb, #0c6f62)" }} />
          )}

          <div style={{ padding: "18px 20px 20px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }}>
              <StatusBadge status={selected.status} />
              <span className="badge bg-neutral-100 text-neutral-600">{selected.category}</span>
            </div>

            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#16201d", lineHeight: 1.3, letterSpacing: "-.4px" }}>
              {selected.title}
            </h2>

            <p style={{ margin: "8px 0 0", display: "flex", alignItems: "center", gap: "6px", fontSize: "13.5px", color: "#5b6660" }}>
              <MapPin size={14} color="#0e7a66" />
              {shortLocation(selected.city)}, Costa Rica
            </p>

            <p style={{ margin: "14px 0 0", fontSize: "26px", fontWeight: 800, color: "#0e7a66", letterSpacing: "-.6px" }}>
              {selected.priceLabel ?? "Price on request"}
            </p>

            <div style={{ display: "flex", gap: "16px", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #f0ece3", flexWrap: "wrap" }}>
              {selected.bedrooms != null && (
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 600, color: "#3a443f" }}>
                  <Bed size={15} color="#0e7a66" /> {selected.bedrooms} Bd
                </span>
              )}
              {selected.bathrooms != null && (
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 600, color: "#3a443f" }}>
                  <Bath size={15} color="#0e7a66" /> {selected.bathrooms} Ba
                </span>
              )}
              {selected.sizeM2 != null && (
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13.5px", fontWeight: 600, color: "#3a443f" }}>
                  <Maximize2 size={15} color="#0e7a66" /> {formatArea(selected.sizeM2)}
                </span>
              )}
            </div>

            <Link
              href={`/properties/${selected.slug}`}
              style={{
                marginTop: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#0e7a66",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14.5px",
                padding: "13px 20px",
                borderRadius: "999px",
                textDecoration: "none",
              }}
            >
              View full listing
              <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
