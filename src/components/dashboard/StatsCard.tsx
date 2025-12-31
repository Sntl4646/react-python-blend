import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
  iconClassName?: string;
}

export const StatsCard = ({ 
  icon, 
  label, 
  value, 
  className,
  iconClassName 
}: StatsCardProps) => {
  return (
    <div className={cn("stats-card animate-fade-in", className)}>
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl",
        iconClassName || "bg-primary/10 text-primary"
      )}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-3xl font-bold text-foreground">{value}</span>
      </div>
    </div>
  );
};
