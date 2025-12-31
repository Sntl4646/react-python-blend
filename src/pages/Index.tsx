import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, AlertCircle, Clock, Grid3X3, Link2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActionCard } from "@/components/dashboard/ActionCard";
import { StationTable, Station } from "@/components/stations/StationTable";
import { CoTermBanner } from "@/components/stations/CoTermBanner";
import { mockStations } from "@/data/mockData";

const Index = () => {
  const navigate = useNavigate();
  const [selectedStations, setSelectedStations] = useState<string[]>(
    mockStations.map(s => s.id) // All selected by default
  );

  const totalStations = mockStations.length;
  const renewals3to6Months = 0;
  const missingAssure = mockStations.filter(s => s.status === "no-maintenance").length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 md:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-1">Welcome, John Smith</h1>
          <p className="text-lg text-primary font-medium">Acme Corporation</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <StatsCard
            icon={<Grid3X3 className="h-5 w-5" />}
            label="Total Stations"
            value={totalStations}
          />
          <StatsCard
            icon={<Calendar className="h-5 w-5" />}
            label="Renewals (3-6 months)"
            value={renewals3to6Months}
          />
          <StatsCard
            icon={<AlertCircle className="h-5 w-5" />}
            label="Missing Assure"
            value={missingAssure}
            iconClassName="bg-primary/10 text-primary"
          />
        </div>

        {/* Recommended Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recommended Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ActionCard
              icon={<Link2 className="h-5 w-5" />}
              title="Co-term all stations"
              description="Align all stations to have a single end date for simplified management."
              buttonText="View Options"
              onClick={() => navigate("/quote")}
            />
            <ActionCard
              icon={<AlertCircle className="h-5 w-5" />}
              title="Complete coverage required"
              description="Ensure stations have both cloud tokens and maintenance (Assure) for full protection."
              buttonText="Review Coverage"
              onClick={() => navigate("/assets")}
            />
            <ActionCard
              icon={<Clock className="h-5 w-5" />}
              title="On-time renewals"
              description="Renew on time to prevent impact on the driver experience."
              buttonText="Start Renewal"
              onClick={() => navigate("/quote")}
            />
          </div>
        </div>

        {/* Your Stations */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Stations</h2>
          <StationTable
            stations={mockStations}
            selectable
            selectedIds={selectedStations}
            onSelectionChange={setSelectedStations}
          />
        </div>

        {/* Co-term Banner */}
        {selectedStations.length > 0 && (
          <CoTermBanner
            selectedCount={selectedStations.length}
            onCoTerm={() => navigate("/quote")}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
