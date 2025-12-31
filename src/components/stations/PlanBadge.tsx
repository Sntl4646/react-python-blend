import { cn } from "@/lib/utils";
import { Cloud, Shield } from "lucide-react";

type PlanType = "cloud" | "assure";

interface PlanBadgeProps {
  type: PlanType;
  className?: string;
}

const planConfig: Record<PlanType, { label: string; icon: React.ReactNode; className: string }> = {
  cloud: {
    label: "Cloud",
    icon: <Cloud className="h-3.5 w-3.5" />,
    className: "bg-secondary text-secondary-foreground",
  },
  assure: {
    label: "Assure",
    icon: <Shield className="h-3.5 w-3.5" />,
    className: "bg-secondary text-secondary-foreground",
  },
};

export const PlanBadge = ({ type, className }: PlanBadgeProps) => {
  const config = planConfig[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
};
