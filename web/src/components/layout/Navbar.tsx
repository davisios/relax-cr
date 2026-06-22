"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";

const NAV_LINKS = [
  {
    label: "For Sale",
    href: "/properties",
    children: [
      { label: "Houses & Villas", href: "/properties?type=house-villa" },
      { label: "Condos & Apartments", href: "/properties?type=condo-apartment" },
      { label: "Vacant Lots & Land", href: "/properties?type=lot-vacant-land" },
      { label: "Multi-Family", href: "/properties?type=multi-family-duplex-triplex" },
      { label: "Hotel / BnB", href: "/properties?type=hotel-bnb-apt-building" },
      { label: "All Listings", href: "/properties" },
    ],
  },
  {
    label: "Neighborhoods",
    href: "/neighborhoods",
    children: [
      { label: "Jacó", href: "/neighborhoods/jaco" },
      { label: "Hermosa Beach", href: "/neighborhoods/hermosa-beach" },
      { label: "Herradura Bay", href: "/neighborhoods/herradura" },
      { label: "Punta Leona", href: "/neighborhoods/punta-leona" },
      { label: "Tárcoles", href: "/neighborhoods/tarcoles" },
      { label: "Esterillos", href: "/neighborhoods/esterillos" },
    ],
  },
  {
    label: "Visit Jacó",
    href: "/visit-jaco",
    children: [
      { label: "Top Restaurants", href: "/visit-jaco/restaurants" },
      { label: "Tours & Activities", href: "/visit-jaco/tours" },
      { label: "Vacation Rentals", href: "/visit-jaco/vacation-rentals" },
      { label: "Private Chef", href: "https://ingredientspersonalchef.com/", external: true },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navColor = "#16201d";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: "#ffffff",
          borderBottom: "1px solid rgba(20,32,29,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 28px",
            height: "74px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <BrandLogo size={38} titleSize={16} subtitleSize={10.5} />

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex"
            style={{ alignItems: "center", gap: "30px" }}
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  style={{
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "14.5px",
                    color: navColor,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0e7a66")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = navColor)}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </Link>

                {link.children && openDropdown === link.label && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      paddingTop: "14px",
                      zIndex: 50,
                    }}
                  >
                  <div
                    style={{
                      minWidth: "210px",
                      background: "#fff",
                      borderRadius: "14px",
                      boxShadow: "0 20px 44px -12px rgba(20,32,29,0.18)",
                      border: "1px solid rgba(20,32,29,0.08)",
                      padding: "8px",
                    }}
                  >
                    {link.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#3a443f",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#edf7f5")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {child.label}
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href}
                          style={{
                            display: "block",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#3a443f",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#edf7f5")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: CTA + Mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link
              href="/contact"
              className="hidden sm:inline-flex"
              style={{
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14.5px",
                color: "#fff",
                background: "#0e7a66",
                padding: "11px 20px",
                borderRadius: "999px",
                transition: "background 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#0a5f50")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#0e7a66")
              }
            >
              Contact Dominique
            </Link>

            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                color: navColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.35s ease",
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 70 }}
        >
          {/* Backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(11,23,20,0.5)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "320px",
              background: "#fff",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Drawer header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid #f0ece3",
              }}
            >
              <BrandLogo
                size={34}
                titleSize={15}
                subtitleSize={10}
                onClick={() => setMobileOpen(false)}
              />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  color: "#5b6660",
                  display: "flex",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer links */}
            <nav
              style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}
            >
              {NAV_LINKS.map((link) => (
                <div key={link.label} style={{ marginBottom: "2px" }}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      color: "#16201d",
                      fontWeight: 700,
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#edf7f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div style={{ marginLeft: "16px", marginBottom: "6px" }}>
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: "block",
                            padding: "9px 16px",
                            borderRadius: "8px",
                            color: "#5b6660",
                            fontWeight: 600,
                            fontSize: "14px",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#edf7f5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Drawer footer */}
            <div
              style={{
                padding: "20px 24px",
                borderTop: "1px solid #f0ece3",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#0e7a66",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px",
                  borderRadius: "999px",
                  textDecoration: "none",
                }}
              >
                Contact Dominique
              </Link>
              <a
                href="tel:+50684365277"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0e7a66",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                +506 8436-5277
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
