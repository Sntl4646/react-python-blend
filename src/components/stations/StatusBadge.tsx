import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type StatusType = "active" | "warning" | "inactive" | "no-maintenance";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string; showIcon: boolean }> = {
  active: {
    label: "Active",
    className: "bg-success-light text-success border-success/30",
    showIcon: false,
  },
  warning: {
    label: "Warning",
    className: "bg-warning-light text-warning border-warning/30",
    showIcon: true,
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground border-border",
    showIcon: false,
  },
  "no-maintenance": {
    label: "No Maintenance",
    className: "bg-primary-light text-primary border-primary/30",
    showIcon: true,
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.showIcon && <AlertCircle className="h-3 w-3" />}
      {config.label}
    </span>
  );
};
