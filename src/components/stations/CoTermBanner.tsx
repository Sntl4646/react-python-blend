import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoTermBannerProps {
  selectedCount?: number;
  onCoTerm?: () => void;
}

export const CoTermBanner = ({ selectedCount = 0, onCoTerm }: CoTermBannerProps) => {
  return (
    <div className="floating-banner animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
          <Link2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Co-term all stations</p>
          <p className="text-sm text-muted-foreground">
            {selectedCount > 0
              ? `Select stations above or align ${selectedCount} renewals to a single end date`
              : "Select stations above or align all renewals to a single end date"}
          </p>
        </div>
      </div>
      <Button onClick={onCoTerm} className="shadow-button hover:shadow-button-hover">
        Co-term All Stations
      </Button>
    </div>
  );
};
