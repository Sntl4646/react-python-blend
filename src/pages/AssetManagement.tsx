import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StationTable } from "@/components/stations/StationTable";
import { CoTermBanner } from "@/components/stations/CoTermBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockStations } from "@/data/mockData";

const AssetManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All Plans");
  const [selectedStations, setSelectedStations] = useState<string[]>([]);

  const filteredStations = mockStations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan =
      selectedPlan === "All Plans" ||
      station.plans.includes(selectedPlan.toLowerCase() as "cloud" | "assure");

    return matchesSearch && matchesPlan;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-1">Station Management</h1>
          <p className="text-muted-foreground">Total: {mockStations.length} stations</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[140px]">
                {selectedPlan}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedPlan("All Plans")}>
                All Plans
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPlan("Cloud")}>
                Cloud
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPlan("Assure")}>
                Assure
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Station Table */}
        <div className="mb-6">
          <StationTable
            stations={filteredStations}
            selectable
            selectedIds={selectedStations}
            onSelectionChange={setSelectedStations}
          />
        </div>

        {/* Co-term Banner */}
        <CoTermBanner
          selectedCount={selectedStations.length}
          onCoTerm={() => navigate("/quote")}
        />
      </main>
    </div>
  );
};

export default AssetManagement;
