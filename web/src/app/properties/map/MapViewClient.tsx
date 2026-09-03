"use client";

import dynamic from "next/dynamic";
import type { MapListing } from "./types";

// Leaflet touches `window` at import time, so it can only load in the browser.
const MapExplorer = dynamic(() => import("./MapExplorer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "calc(100vh - 74px)",
        marginTop: "74px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#7a857f",
        background: "#f7f5f0",
      }}
    >
      Loading map…
    </div>
  ),
});

export default function MapViewClient({ listings }: { listings: MapListing[] }) {
  return <MapExplorer listings={listings} />;
}
