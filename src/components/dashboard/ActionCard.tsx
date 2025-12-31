import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  iconClassName?: string;
  className?: string;
}

export const ActionCard = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
  iconClassName,
  className,
}: ActionCardProps) => {
  return (
    <div className={cn("action-card flex flex-col h-full animate-slide-up", className)}>
      <div className="flex items-start gap-3 mb-4">
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          iconClassName || "bg-primary/10 text-primary"
        )}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="mt-auto">
        <Button 
          variant="outline" 
          className="w-full border-border hover:bg-muted"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
