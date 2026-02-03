import { Status } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700 border-blue-200" },
  contacted: { label: "Contacted", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  qualified: { label: "Qualified", className: "bg-purple-100 text-purple-700 border-purple-200" },
  won: { label: "Won", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  lost: { label: "Lost", className: "bg-gray-100 text-gray-600 border-gray-200" }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
