"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize2, MapPin, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatArea } from "@/lib/utils/format";
import type { MapListing } from "./types";

const PAGE_SIZE = 12;

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
  const clusterRef = useRef<any>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const selectedElRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<MapListing | null>(null);
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(listings.length / PAGE_SIZE));
  const pageListings = useMemo(
    () => listings.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [listings, page],
  );

  const highlightPin = (slug: string | null) => {
    if (selectedElRef.current) {
      selectedElRef.current.classList.remove("map-price-pin--active");
      selectedElRef.current = null;
    }
    if (!slug) return;
    const marker = markersRef.current.get(slug);
    const el = marker?.getElement()?.querySelector(".map-price-pin") as HTMLElement | null;
    if (el) {
      el.classList.add("map-price-pin--active");
      selectedElRef.current = el;
    }
  };

  const selectListing = (listing: MapListing, focusMap: boolean) => {
    setSelected(listing);
    panelRef.current?.scrollTo({ top: 0 });
    const map = mapRef.current;
    const marker = markersRef.current.get(listing.slug);
    if (!map || !marker) return;
    if (focusMap) {
      const cluster = clusterRef.current;
      if (cluster?.zoomToShowLayer) {
        cluster.zoomToShowLayer(marker, () => highlightPin(listing.slug));
      } else {
        map.setView([listing.lat, listing.lng], Math.max(map.getZoom(), 15));
        highlightPin(listing.slug);
      }
    } else {
      highlightPin(listing.slug);
    }
  };

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

    let cluster: any;
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
    } catch {
      cluster = L.layerGroup();
    }
    clusterRef.current = cluster;

    const bounds = L.latLngBounds([]);

    for (const listing of listings) {
      const icon = L.divIcon({
        html: `<div class="map-price-pin${listing.status === "sold" ? " map-price-pin--sold" : ""}">${shortPrice(listing.price)}</div>`,
        className: "map-price-pin-wrap",
        iconSize: undefined as unknown as L.PointExpression,
      });
      const marker = L.marker([Number(listing.lat), Number(listing.lng)], { icon });
      marker.on("click", () => selectListing(listing, false));
      markersRef.current.set(listing.slug, marker);
      cluster.addLayer(marker);
      bounds.extend([listing.lat, listing.lng]);
    }

    map.addLayer(cluster);

    // The container can measure 0×0 when Leaflet initializes (hydration races
    // layout, and rAF is suspended in background tabs), which Leaflet caches.
    // Retry on a plain timer until the container has real size, then fit once.
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
      markersRef.current.clear();
      clusterRef.current = null;
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="map-split">
      {/* Side panel: paginated list, or the selected listing */}
      <div className="map-side-panel" ref={panelRef}>
        {selected ? (
          <div>
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                highlightPin(null);
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-ocean-700 transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "18px 20px 6px", fontFamily: "inherit" }}
            >
              <ArrowLeft size={15} />
              Back to all listings
            </button>

            {selected.image ? (
              <div style={{ position: "relative", margin: "10px 20px 0", height: "230px", background: "#e7f4f0", borderRadius: "14px", overflow: "hidden" }}>
                <Image
                  src={selected.image.src}
                  alt={selected.image.alt || selected.title}
                  fill
                  sizes="440px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div style={{ margin: "10px 20px 0", height: "120px", background: "linear-gradient(135deg, #8fd6cb, #0c6f62)", borderRadius: "14px" }} />
            )}

            <div style={{ padding: "16px 20px 24px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }}>
                <StatusBadge status={selected.status} />
                <span className="badge bg-neutral-100 text-neutral-600">{selected.category}</span>
              </div>

              <h2 style={{ margin: 0, fontSize: "19px", fontWeight: 800, color: "#16201d", lineHeight: 1.3, letterSpacing: "-.4px" }}>
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
          </div>
        ) : (
          <div style={{ padding: "18px 20px 24px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "14px" }}>
              <h1 style={{ margin: 0, fontSize: "17px", fontWeight: 800, color: "#16201d", letterSpacing: "-.3px" }}>
                {listings.length} properties on the map
              </h1>
              <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#7a857f", whiteSpace: "nowrap" }}>
                Page {page + 1} / {pageCount}
              </span>
            </div>

            <div className="map-card-grid">
              {pageListings.map((listing) => (
                <button
                  key={listing.slug}
                  type="button"
                  onClick={() => selectListing(listing, true)}
                  className="map-card"
                >
                  <span className="map-card__image">
                    {listing.image ? (
                      <Image
                        src={listing.image.src}
                        alt={listing.image.alt || listing.title}
                        fill
                        sizes="220px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span className="map-card__placeholder" />
                    )}
                    <span className="map-card__price">{shortPrice(listing.price)}</span>
                  </span>
                  <span className="map-card__body">
                    <span className="map-card__title">{listing.title}</span>
                    <span className="map-card__meta">
                      {shortLocation(listing.city)}
                      {listing.bedrooms != null && ` · ${listing.bedrooms} Bd`}
                      {listing.bathrooms != null && ` · ${listing.bathrooms} Ba`}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="map-page-btn"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#3a443f" }}>
                {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, listings.length)} of {listings.length}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={page >= pageCount - 1}
                className="map-page-btn"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="map-canvas">
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
        <Link href="/properties" className="map-list-link">
          Classic list view
        </Link>
      </div>
    </div>
  );
}
