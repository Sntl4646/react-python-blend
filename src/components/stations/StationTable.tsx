import { ChevronRight, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlanBadge } from "./PlanBadge";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

export interface Station {
  id: string;
  name: string;
  type: string;
  location: string;
  plans: ("cloud" | "assure")[];
  status: "active" | "warning" | "inactive" | "no-maintenance";
}

interface StationTableProps {
  stations: Station[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  className?: string;
}

export const StationTable = ({
  stations,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  className,
}: StationTableProps) => {
  const allSelected = selectedIds.length === stations.length && stations.length > 0;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(stations.map((s) => s.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange?.([...selectedIds, id]);
    }
  };

  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-table-header">
              {selectable && (
                <th className="w-12 p-4">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className={cn(someSelected && "data-[state=checked]:bg-primary")}
                  />
                </th>
              )}
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Station Name
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Location
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Plans
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr
                key={station.id}
                className={cn(
                  "border-b border-border last:border-0 table-row-interactive",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {selectable && (
                  <td className="w-12 p-4">
                    <Checkbox
                      checked={selectedIds.includes(station.id)}
                      onCheckedChange={() => handleSelectOne(station.id)}
                      aria-label={`Select ${station.name}`}
                    />
                  </td>
                )}
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{station.name}</p>
                    <p className="text-sm text-muted-foreground">{station.type}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="text-sm">{station.location}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {station.plans.map((plan) => (
                      <PlanBadge key={plan} type={plan} />
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={station.status} />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    {station.status === "no-maintenance" && (
                      <Button size="sm" className="gap-1.5">
                        <Plus className="h-4 w-4" />
                        Add Assure
                      </Button>
                    )}
                    <Link to={`/station/${station.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
