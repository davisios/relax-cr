import Image from "next/image";
import Link from "next/link";

export const BRAND_LOGO_SRC =
  "https://relaxcostarica.com/wp-content/uploads/2021/09/cropped-DB-Real-Estate-200.png";

interface BrandLogoProps {
  size?: number;
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  onClick?: () => void;
  titleSize?: number;
  subtitleSize?: number;
}

export default function BrandLogo({
  size = 40,
  variant = "dark",
  showSubtitle = true,
  onClick,
  titleSize = 16,
  subtitleSize = 10.5,
}: BrandLogoProps) {
  const titleColor = variant === "dark" ? "#16201d" : "#ffffff";
  const subtitleColor = variant === "dark" ? "#7a857f" : "rgba(255,255,255,0.75)";

  return (
    <Link
      href="/"
      onClick={onClick}
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: size >= 48 ? "12px" : "11px",
        flexShrink: 0,
      }}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt="Dominique Brousseau — Relax Costa Rica"
        width={size}
        height={size}
        className="rounded-full bg-white shrink-0"
        unoptimized
      />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <span
          style={{
            fontWeight: 800,
            fontSize: `${titleSize}px`,
            letterSpacing: "-0.3px",
            color: titleColor,
          }}
        >
          Relax Costa Rica
        </span>
        {showSubtitle && (
          <span
            style={{
              fontSize: `${subtitleSize}px`,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
              color: subtitleColor,
            }}
          >
            Jacó Beach Real Estate
          </span>
        )}
      </span>
    </Link>
  );
}
