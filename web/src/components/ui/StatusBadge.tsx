import { cn } from "@/lib/utils/cn";
import type { PropertyStatus } from "@/lib/types/property";

const STATUS_CONFIG: Record<PropertyStatus, { label: string; className: string }> = {
  "for-sale": { label: "For Sale", className: "bg-jungle-700 text-white" },
  sold: { label: "Sold", className: "bg-red-800 text-white" },
  "in-contract": { label: "In Contract", className: "bg-amber-800 text-white" },
  "recently-reduced": { label: "Reduced", className: "bg-ocean-700 text-white" },
  exclusive: { label: "Exclusive", className: "bg-purple-800 text-white" },
};

export default function StatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG["for-sale"];
  return (
    <span className={cn("badge text-[11px] font-semibold tracking-wide", config.className, className)}>
      {config.label}
    </span>
  );
}
