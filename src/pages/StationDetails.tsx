import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, RefreshCw, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PlanBadge } from "@/components/stations/PlanBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStationDetails } from "@/data/mockData";

const StationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const station = mockStationDetails[id || "1"];

  if (!station) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 md:px-6 lg:px-8">
          <p className="text-muted-foreground">Station not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/assets"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to Asset Management</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-1">Station Details</h1>
          <p className="text-lg text-primary font-medium">{station.organization}</p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Station Information */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Station Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Station Name</p>
                <p className="font-semibold text-foreground">{station.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Station Type</p>
                <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground">
                  {station.type}
                </span>
              </div>
              <div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Address</p>
                    <p className="text-foreground">{station.fullAddress}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Plans */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle>Active Plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {station.plans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl border border-border p-4 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{plan.name}</p>
                      <PlanBadge type={plan.type} className="mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Start Date:</p>
                        <p className="text-sm font-medium text-foreground">{plan.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Renewal Date:</p>
                        <p className="text-sm font-medium text-foreground">{plan.renewalDate}</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Renew Subscription
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StationDetails;
